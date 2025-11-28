#!/bin/bash

# Script to fix port 8081 already in use error

echo "=== Fixing Port 8081 Error ==="
echo ""

# Find process using port 8081
PID=$(lsof -ti :8081)

if [ -z "$PID" ]; then
    echo "✅ Port 8081 is free"
else
    echo "⚠️  Port 8081 is in use by process: $PID"
    echo "Stopping process..."
    kill -9 $PID 2>/dev/null
    sleep 2
    echo "✅ Process stopped"
fi

# Verify port is free
if lsof -i :8081 &>/dev/null; then
    echo "❌ Port 8081 is still in use. Please manually stop the process."
    exit 1
else
    echo "✅ Port 8081 is now free"
    echo ""
    echo "You can now run:"
    echo "  mvn spring-boot:run"
    echo "  or"
    echo "  ./run-backend.sh"
fi

