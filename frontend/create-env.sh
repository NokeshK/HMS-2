#!/bin/bash
# Create .env.local file for frontend
IP="10.136.10.48"
echo "VITE_API_URL=http://$IP:8081" > .env.local
echo "✅ Created .env.local with API URL: http://$IP:8081"
