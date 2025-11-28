# Frontend API Configuration

## For Network Access (Multiple Devices)

To allow other devices to connect to your backend, you need to configure the API URL.

### Option 1: Create `.env.local` file (Recommended)

Create `frontend/.env.local`:
```
VITE_API_URL=http://10.136.10.48:8081
```

Replace `10.136.10.48` with your backend server's IP address.

### Option 2: Set Environment Variable

```bash
# Mac/Linux
export VITE_API_URL=http://10.136.10.48:8081
npm run dev

# Windows
set VITE_API_URL=http://10.136.10.48:8081
npm run dev
```

### Option 3: Update vite.config.js

Edit `frontend/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://10.136.10.48:8081',  // Your IP here
    changeOrigin: true,
    secure: false
  }
}
```

## Find Your IP Address

```bash
# Mac/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

## After Configuration

1. Restart frontend: `npm run dev`
2. Access from other devices: `http://10.136.10.48:5173`

