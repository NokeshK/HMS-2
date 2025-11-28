#!/bin/bash

# Spring Boot Backend Runner Script

cd "$(dirname "$0")"

echo "=== Starting HMS Backend (Spring Boot) ==="
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven first."
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

echo "✅ Maven found: $(mvn --version | head -1)"
echo "✅ Java found: $(java -version 2>&1 | head -1)"
echo ""

# Check if MySQL is running
echo "Checking MySQL connection..."
if docker ps | grep -q mysql; then
    echo "✅ MySQL container is running"
elif mysql -u root -phthe1234567 -e "SELECT 1" &>/dev/null; then
    echo "✅ MySQL is accessible"
else
    echo "⚠️  Warning: MySQL might not be running"
    echo "   Make sure MySQL is running on localhost:3306"
    echo "   Or start MySQL container: docker-compose up -d"
fi

echo ""
echo "Building and starting Spring Boot application..."
echo ""

# Run Spring Boot application
mvn spring-boot:run

