# JWT Token Generation - Code Summary

## 🔑 Complete JWT Implementation

### 1. JWT Service (`JwtService.java`)

**Location:** `src/main/java/com/medvault/hmsbackend/service/JwtService.java`

#### Token Generation Method
```java
@Service
public class JwtService {
    
    @Value("${jwt.secret}")
    private String secretKey;
    
    @Value("${jwt.expiration}")
    private long jwtExpiration;  // 86400000ms = 24 hours
    
    // Generate token with UserDetails
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    
    // Generate token with extra claims
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }
    
    // Core token building method
    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)                           // Custom claims
                .setSubject(userDetails.getUsername())           // Email as subject
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)  // HMAC SHA-256
                .compact();
    }
    
    // Get signing key from secret
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    // Extract username from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    // Validate token
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    
    // Check if token expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
```

### 2. Usage in AuthController

**Location:** `src/main/java/com/medvault/hmsbackend/controller/AuthController.java`

#### Login Endpoint - Generate Token
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
    
    // 3. Create UserDetails for JWT
    UserDetails userDetails = new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            new ArrayList<>()
    );
    
    // 4. Generate JWT Token
    String token = jwtService.generateToken(userDetails);
    
    // 5. Return response
    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("user", userResponse);
    
    return ResponseEntity.ok(response);
}
```

### 3. JWT Authentication Filter

**Location:** `src/main/java/com/medvault/hmsbackend/config/JwtAuthenticationFilter.java`

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   FilterChain filterChain) {
        final String authHeader = request.getHeader("Authorization");
        
        // Check if Authorization header exists and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        // Extract token (remove "Bearer " prefix)
        final String jwt = authHeader.substring(7);
        final String userEmail = jwtService.extractUsername(jwt);
        
        // Validate token and set authentication
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                    );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
```

## 📝 Configuration

### application.properties
```properties
# JWT Secret Key (must be at least 32 characters, Base64 encoded)
jwt.secret=${JWT_SECRET:mySuperSecretKeyThatIsAtLeast32CharactersLongForJWT}

# JWT Expiration (24 hours in milliseconds)
jwt.expiration=86400000
```

## 🚀 How It Works

### Step-by-Step Flow

1. **User Login**
   - User sends email/password to `/api/auth/login`
   - Backend verifies credentials
   - JWT token is generated using `jwtService.generateToken()`

2. **Token Structure**
   ```
   Header.Payload.Signature
   ```
   - Header: Algorithm (HS256)
   - Payload: Email (subject), issued at, expiration
   - Signature: HMAC SHA-256 signature

3. **Token Usage**
   - Frontend stores token (localStorage)
   - Sends token in `Authorization: Bearer <token>` header
   - `JwtAuthenticationFilter` intercepts and validates token
   - Sets authentication in Spring Security context

4. **Token Validation**
   - Extract username from token
   - Load user details
   - Verify token signature and expiration
   - Set authentication if valid

## 🧪 Test Token Generation

### Quick Test
```bash
# 1. Login to get token
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Response contains token:
# {
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {...}
# }

# 2. Use token
TOKEN="your-token-here"
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8081/api/patients/profile
```

## 📚 Key Files

1. **JwtService.java** - Token generation, validation, extraction
2. **AuthController.java** - Login endpoint that generates tokens
3. **JwtAuthenticationFilter.java** - Validates tokens on each request
4. **SecurityConfig.java** - Configures JWT filter in security chain
5. **application.properties** - JWT configuration (secret, expiration)

## ✅ Summary

- **Token Generation**: `jwtService.generateToken(userDetails)`
- **Algorithm**: HMAC SHA-256 (HS256)
- **Expiration**: 24 hours (configurable)
- **Subject**: User email
- **Validation**: Automatic via `JwtAuthenticationFilter`
- **Usage**: `Authorization: Bearer <token>` header

The JWT implementation is complete and working! 🎉

