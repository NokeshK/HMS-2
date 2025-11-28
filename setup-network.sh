#!/bin/bash

# Network Setup Script for HMS Application
# This script configures the app to work from multiple devices

echo "=== HMS Network Setup ==="
echo ""

# Get IP address
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -z "$IP" ]; then
    IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "192.168.1.100")
fi

echo "📍 Detected IP Address: $IP"
echo ""

# Create frontend .env.local
echo "📝 Creating frontend/.env.local..."
mkdir -p frontend
cat > frontend/.env.local << ENVEOF
# Backend API URL - Use your server's IP address for network access
VITE_API_URL=http://$IP:8081

# For local development only, use:
# VITE_API_URL=http://localhost:8081
ENVEOF

echo "✅ Created frontend/.env.local with IP: $IP"
echo ""

# Show backend CORS update needed
echo "📝 Backend CORS Configuration:"
echo "   Update backend/src/main/resources/application.properties"
echo "   Add to cors.allowed-origins:"
echo "   http://$IP:5173,http://$IP:3000"
echo ""

echo "=== Next Steps ==="
echo ""
echo "1. ✅ Frontend configured (frontend/.env.local created)"
echo "2. ⚠️  Update backend CORS (see above)"
echo "3. 🔄 Restart backend:"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "4. 🔄 Restart frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "5. 🌐 Access from other devices:"
echo "   http://$IP:5173"
echo ""
echo "✅ Setup complete!"
