# JWT Token Generation Guide

This document explains how JWT tokens are generated and used in the HMS backend.

## 📋 Overview

The project uses **JSON Web Tokens (JWT)** for authentication. Tokens are generated when users login and are validated on each API request.

## 🔑 JWT Service (`JwtService.java`)

### Key Components

#### 1. Configuration
```java
@Value("${jwt.secret}")
private String secretKey;  // From application.properties

@Value("${jwt.expiration}")
private long jwtExpiration;  // Default: 86400000ms (24 hours)
```

#### 2. Token Generation

**Simple Token Generation:**
```java
public String generateToken(UserDetails userDetails) {
    return generateToken(new HashMap<>(), userDetails);
}
```

**Token with Extra Claims:**
```java
public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    return buildToken(extraClaims, userDetails, jwtExpiration);
}
```

**Build Token (Core Method):**
```java
private String buildToken(
        Map<String, Object> extraClaims,
        UserDetails userDetails,
        long expiration
) {
    return Jwts
            .builder()
            .setClaims(extraClaims)                    // Custom claims
            .setSubject(userDetails.getUsername())      // Email as subject
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)  // HMAC SHA-256
            .compact();
}
```

#### 3. Token Validation

```java
public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
}
```

#### 4. Token Extraction

```java
public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
}

private Claims extractAllClaims(String token) {
    return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
}
```

## 🔐 Configuration

### application.properties
```properties
# JWT Configuration
jwt.secret=${JWT_SECRET:mySuperSecretKeyThatIsAtLeast32CharactersLongForJWT}
jwt.expiration=86400000  # 24 hours in milliseconds
```

**Important:** The secret key must be:
- At least 32 characters long
- Base64 encoded (if using BASE64 decoder)
- Kept secure (use environment variables in production)

## 🚀 Usage in AuthController

### Login - Generate Token

```java
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    // 1. Find user
    User user = userService.findByEmail(loginRequest.getEmail());
    
    // 2. Verify password
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        return ResponseEntity.badRequest().body("Invalid password");
    }
    
    // 3. Create UserDetails
    UserDetails userDetails = new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            new ArrayList<>()
    );
    
    // 4. Generate JWT Token
    String token = jwtService.generateToken(userDetails);
    
    // 5. Return token and user info
    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("user", userResponse);
    
    return ResponseEntity.ok(response);
}
```

### Response Format
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "patient@example.com",
    "name": "John Doe",
    "role": "patient"
  }
}
```

## 🔒 Token Validation

### Validate Endpoint
```java
@GetMapping("/validate")
public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
    String jwt = token.substring(7);  // Remove "Bearer "
    String email = jwtService.extractUsername(jwt);
    
    User user = userService.findByEmail(email).orElse(null);
    if (user != null && jwtService.isTokenValid(jwt, userDetails)) {
        return ResponseEntity.ok(Map.of("valid", true, "user", user));
    }
    return ResponseEntity.status(401).body(Map.of("valid", false));
}
```

## 🛡️ JWT Authentication Filter

The `JwtAuthenticationFilter` intercepts requests and validates tokens:

```java
@Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {
    final String authHeader = request.getHeader("Authorization");
    
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }
    
    final String jwt = authHeader.substring(7);
    final String userEmail = jwtService.extractUsername(jwt);
    
    if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
        
        if (jwtService.isTokenValid(jwt, userDetails)) {
            // Set authentication in security context
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }
    
    filterChain.doFilter(request, response);
}
```

## 📝 Token Structure

A JWT token consists of three parts:

1. **Header**: Algorithm and token type
   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```

2. **Payload**: Claims (data)
   ```json
   {
     "sub": "user@example.com",  // Subject (email)
     "iat": 1234567890,          // Issued at
     "exp": 1234654290            // Expiration
   }
   ```

3. **Signature**: HMAC SHA-256 signature

## 🧪 Testing JWT Tokens

### 1. Login to Get Token
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@example.com",
    "password": "password123"
  }'
```

### 2. Use Token in API Requests
```bash
# Get token from login response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Use token in Authorization header
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/patients/profile
```

### 3. Validate Token
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/auth/validate
```

## 🔧 Customization

### Add Custom Claims to Token

Modify the `buildToken` method to include role or other user data:

```java
private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
    // Add role to claims
    extraClaims.put("role", user.getRole());
    extraClaims.put("userId", user.getId());
    
    return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
}
```

### Change Token Expiration

In `application.properties`:
```properties
# 1 hour
jwt.expiration=3600000

# 7 days
jwt.expiration=604800000

# 30 days
jwt.expiration=2592000000
```

### Generate Strong Secret Key

```bash
# Generate a secure random key (Base64)
openssl rand -base64 64

# Or use online tools to generate JWT secret
```

## 🔐 Security Best Practices

1. **Use Environment Variables** for secret key:
   ```properties
   jwt.secret=${JWT_SECRET}
   ```

2. **Set Appropriate Expiration** based on security needs

3. **Use HTTPS** in production to protect tokens in transit

4. **Store Tokens Securely** on frontend (localStorage or httpOnly cookies)

5. **Implement Token Refresh** for long-lived sessions

## 📚 Code Files

- **JWT Service**: `src/main/java/com/medvault/hmsbackend/service/JwtService.java`
- **Auth Controller**: `src/main/java/com/medvault/hmsbackend/controller/AuthController.java`
- **JWT Filter**: `src/main/java/com/medvault/hmsbackend/config/JwtAuthenticationFilter.java`
- **Security Config**: `src/main/java/com/medvault/hmsbackend/config/SecurityConfig.java`
- **Properties**: `src/main/resources/application.properties`

## 🎯 Quick Reference

### Generate Token
```java
String token = jwtService.generateToken(userDetails);
```

### Extract Username from Token
```java
String email = jwtService.extractUsername(token);
```

### Validate Token
```java
boolean isValid = jwtService.isTokenValid(token, userDetails);
```

### Check Token Expiration
```java
boolean isExpired = jwtService.isTokenExpired(token);
```

## 🐛 Troubleshooting

### Token Invalid Error
- Check if secret key matches
- Verify token hasn't expired
- Ensure token format is correct (Bearer <token>)

### Token Expired
- Increase expiration time in properties
- Implement token refresh mechanism
- Re-login to get new token

### Secret Key Error
- Ensure secret is at least 32 characters
- Use Base64 encoded key if using BASE64 decoder
- Check environment variable is set correctly

