# Network Setup Guide - Access from Multiple Devices

## Problem
When accessing the app from another laptop/device, registration and login don't work because:
- Frontend uses `localhost` which points to the device's own localhost
- Backend is only accessible from the server laptop
- CORS doesn't allow requests from other devices

## Solution
Configure the app to use your backend server's IP address instead of localhost.

## Step 1: Find Your Backend Server IP Address

### On Mac/Linux:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Or
ipconfig getifaddr en0
```

### On Windows:
```bash
ipconfig
# Look for IPv4 Address under your active network adapter
```

**Your current IP:** `10.136.10.48` (already detected)

## Step 2: Update Frontend Configuration

### Option A: Create `.env.local` file (Recommended)

1. Go to `frontend` folder
2. Create file `.env.local`:
```bash
cd frontend
cat > .env.local << EOF
# Backend API URL - Use your server's IP address
VITE_API_URL=http://10.136.10.48:8081
EOF
```

### Option B: Update `vite.config.js`

Edit `frontend/vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://10.136.10.48:8081',  // Change this to your IP
      changeOrigin: true,
      secure: false
    }
  }
}
```

### Option C: Set Environment Variable

```bash
# Mac/Linux
export VITE_API_URL=http://10.136.10.48:8081
npm run dev

# Windows
set VITE_API_URL=http://10.136.10.48:8081
npm run dev
```

## Step 3: Update Backend CORS Configuration

### Edit `backend/src/main/resources/application.properties`:

```properties
# Add your frontend IP addresses
cors.allowed-origins=http://localhost:5173,http://localhost:3000,http://10.136.10.48:5173,http://10.136.10.48:3000
```

### Or use environment variable:

```bash
export CORS_ALLOWED_ORIGINS="http://10.136.10.48:5173,http://10.136.10.48:3000,http://localhost:5173"
```

## Step 4: Restart Services

### Backend:
```bash
cd backend
# Stop current instance (Ctrl+C)
mvn spring-boot:run
```

### Frontend:
```bash
cd frontend
# Stop current instance (Ctrl+C)
npm run dev
```

## Step 5: Access from Other Devices

### On the same WiFi network:

1. **From another laptop:**
   - Open browser
   - Go to: `http://10.136.10.48:5173` (or your frontend port)
   - Registration and login will now work!

2. **From mobile device:**
   - Connect to same WiFi
   - Open browser
   - Go to: `http://10.136.10.48:5173`

## Quick Setup Script

Save this as `setup-network.sh`:

```bash
#!/bin/bash

# Get IP address
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

echo "Your IP Address: $IP"
echo ""

# Create frontend .env.local
cat > frontend/.env.local << EOF
VITE_API_URL=http://$IP:8081
EOF

echo "✅ Created frontend/.env.local"
echo ""

# Update backend application.properties
echo "Update backend/src/main/resources/application.properties:"
echo "Add to cors.allowed-origins: http://$IP:5173,http://$IP:3000"
echo ""

echo "Next steps:"
echo "1. Restart backend: cd backend && mvn spring-boot:run"
echo "2. Restart frontend: cd frontend && npm run dev"
echo "3. Access from other devices: http://$IP:5173"
```

Make it executable:
```bash
chmod +x setup-network.sh
./setup-network.sh
```

## Troubleshooting

### Issue: Still can't connect from other device

1. **Check firewall:**
   ```bash
   # Mac - Allow incoming connections
   System Preferences → Security & Privacy → Firewall
   
   # Linux
   sudo ufw allow 8081
   sudo ufw allow 5173
   ```

2. **Verify IP address:**
   ```bash
   # Make sure you're using the correct IP
   ifconfig
   ```

3. **Check both devices are on same network:**
   - Both must be on same WiFi network
   - Check IP ranges match (e.g., both 10.136.x.x)

4. **Test backend directly:**
   ```bash
   # From another device, test if backend is accessible
   curl http://10.136.10.48:8081/api/auth/login
   # Should return error (needs POST), but confirms connection
   ```

### Issue: CORS errors in browser

1. **Check CORS configuration:**
   - Verify IP is in `cors.allowed-origins`
   - Restart backend after changes

2. **Check browser console:**
   - Look for CORS error messages
   - Verify request URL is correct

## Testing

### Test from command line (another device):
```bash
# Test backend is accessible
curl http://10.136.10.48:8081/api/auth/login

# Test registration
curl -X POST http://10.136.10.48:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test","role":"patient"}'
```

## Summary

✅ **Backend IP:** `10.136.10.48:8081`  
✅ **Frontend URL:** `http://10.136.10.48:5173`  
✅ **CORS:** Updated to allow requests from IP  
✅ **Network:** Both devices on same WiFi  

After setup, registration and login will work from any device on the same network!

