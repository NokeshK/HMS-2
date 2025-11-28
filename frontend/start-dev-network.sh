#!/bin/bash

# Start frontend dev server with network access
# This allows other devices to connect

cd "$(dirname "$0")"

# Get IP address
IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

if [ -z "$IP" ]; then
    IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "10.136.10.48")
fi

echo "=== Starting Frontend Dev Server ==="
echo "📍 Your IP: $IP"
echo "🌐 Access from other devices: http://$IP:5173"
echo ""

# Set API URL
export VITE_API_URL="http://$IP:8081"

# Start Vite with network access
npm run dev -- --host 0.0.0.0

