# Fix White Page Issue

## Problem
When accessing `http://10.136.10.48:5173`, you see a white/blank page.

## Solutions

### Solution 1: Check Browser Console (Most Important)

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for red error messages
4. Common errors:
   - `Failed to fetch` - API connection issue
   - `CORS error` - Backend CORS not configured
   - `Module not found` - Build issue
   - `Cannot read property` - JavaScript error

### Solution 2: Restart Frontend with Network Access

**Stop current frontend** (Ctrl+C in terminal), then:

```bash
cd frontend
./start-dev-network.sh
```

Or manually:
```bash
cd frontend
VITE_API_URL=http://10.136.10.48:8081 npm run dev -- --host 0.0.0.0
```

### Solution 3: Verify Configuration

1. **Check .env.local exists:**
   ```bash
   cat frontend/.env.local
   # Should show: VITE_API_URL=http://10.136.10.48:8081
   ```

2. **If missing, create it:**
   ```bash
   cd frontend
   ./create-env.sh
   ```

3. **Restart frontend after creating .env.local**

### Solution 4: Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Refresh page
4. Check if:
   - `main.jsx` loads (should be 200)
   - `index.css` loads (should be 200)
   - API requests work (check `/api/auth/validate`)

### Solution 5: Test API Connection

From browser console (F12 → Console):
```javascript
// Test if API is reachable
fetch('http://10.136.10.48:8081/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email:'test', password:'test'})
})
.then(r => console.log('API Status:', r.status))
.catch(e => console.error('API Error:', e));
```

### Solution 6: Use Production Build

If dev server has issues, use production build:

```bash
cd frontend
npm run build
npm run preview -- --host 0.0.0.0
```

Then access: `http://10.136.10.48:4173`

## Common Issues & Fixes

### Issue: "Failed to fetch" or Network Error
**Fix:** 
- Check backend is running: `curl http://10.136.10.48:8081`
- Check firewall allows port 8081
- Verify IP address is correct

### Issue: CORS Error
**Fix:**
- Update `backend/src/main/resources/application.properties`
- Add: `http://10.136.10.48:5173` to `cors.allowed-origins`
- Restart backend

### Issue: "Cannot GET /" or 404
**Fix:**
- Make sure Vite dev server is running
- Check port 5173 is not blocked
- Try: `npm run dev -- --host 0.0.0.0 --port 5173`

### Issue: React App Not Mounting
**Fix:**
- Check browser console for JavaScript errors
- Verify `main.jsx` is loading
- Check if `#root` element exists in HTML

## Quick Diagnostic Commands

```bash
# 1. Check if frontend is running
lsof -i :5173

# 2. Check if backend is running
curl http://10.136.10.48:8081/api/auth/login

# 3. Test frontend locally
curl http://localhost:5173

# 4. Test frontend from IP
curl http://10.136.10.48:5173

# 5. Check .env.local
cat frontend/.env.local
```

## Step-by-Step Fix

1. **Stop all frontend processes:**
   ```bash
   pkill -f "vite"
   ```

2. **Create/verify .env.local:**
   ```bash
   cd frontend
   echo "VITE_API_URL=http://10.136.10.48:8081" > .env.local
   ```

3. **Start frontend with network access:**
   ```bash
   npm run dev -- --host 0.0.0.0
   ```

4. **Open browser:**
   - Go to: `http://10.136.10.48:5173`
   - Open DevTools (F12)
   - Check Console for errors
   - Check Network tab for failed requests

5. **If still white page:**
   - Share the console errors
   - Check Network tab for failed requests
   - Verify backend is accessible

## Still Not Working?

1. Check browser console errors (F12)
2. Check Network tab for failed requests
3. Verify backend is running and accessible
4. Try accessing from localhost first: `http://localhost:5173`
5. Check if firewall is blocking connections

