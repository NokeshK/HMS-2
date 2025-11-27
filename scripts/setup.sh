#!/bin/bash

# HMS Project Setup Script
# This script helps set up the HMS project for development

set -e

echo "🏥 HMS Project Setup Script"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    echo "🔍 Checking requirements..."
    
    # Check Java
    if command -v java &> /dev/null; then
        JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
        if [ "$JAVA_VERSION" -ge 17 ]; then
            print_status "Java $JAVA_VERSION is installed"
        else
            print_error "Java 17+ is required. Current version: $JAVA_VERSION"
            exit 1
        fi
    else
        print_error "Java is not installed. Please install Java 17+"
        exit 1
    fi
    
    # Check Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -ge 18 ]; then
            print_status "Node.js $NODE_VERSION is installed"
        else
            print_error "Node.js 18+ is required. Current version: $NODE_VERSION"
            exit 1
        fi
    else
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    # Check Maven
    if command -v mvn &> /dev/null; then
        print_status "Maven is installed"
    else
        print_error "Maven is not installed. Please install Maven"
        exit 1
    fi
    
    # Check Docker
    if command -v docker &> /dev/null; then
        print_status "Docker is installed"
    else
        print_warning "Docker is not installed. Docker is optional but recommended"
    fi
    
    # Check Docker Compose
    if command -v docker-compose &> /dev/null; then
        print_status "Docker Compose is installed"
    else
        print_warning "Docker Compose is not installed. Docker Compose is optional but recommended"
    fi
}

# Setup backend
setup_backend() {
    echo "🔧 Setting up backend..."
    
    cd backend
    
    # Install dependencies
    print_status "Installing Maven dependencies..."
    mvn clean install -DskipTests
    
    # Create application.properties if it doesn't exist
    if [ ! -f "src/main/resources/application.properties" ]; then
        print_status "Creating application.properties..."
        cat > src/main/resources/application.properties << EOF
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/hms_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=hms_user
spring.datasource.password=hms_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=your-super-secret-jwt-key-change-this-in-production
jwt.expiration=86400000

# Server Configuration
server.port=8081
server.servlet.context-path=/api

# CORS Configuration
cors.allowed-origins=http://localhost:3000
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed-headers=*
cors.allow-credentials=true
EOF
    fi
    
    cd ..
    print_status "Backend setup completed"
}

# Setup frontend
setup_frontend() {
    echo "🔧 Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing npm dependencies..."
    npm install
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating .env file..."
        cat > .env << EOF
VITE_API_BASE_URL=http://localhost:8082/api
VITE_APP_NAME=MedVault HMS
EOF
    fi
    
    cd ..
    print_status "Frontend setup completed"
}

# Setup database
setup_database() {
    echo "🗄️ Setting up database..."
    
    print_warning "Please ensure MySQL is running on your system"
    print_warning "Default connection: localhost:3306"
    
    read -p "Do you want to create the database and user? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Creating database and user..."
        
        # MySQL commands
        mysql -u root -p << EOF
CREATE DATABASE IF NOT EXISTS hms_db;
CREATE USER IF NOT EXISTS 'hms_user'@'localhost' IDENTIFIED BY 'hms_password';
GRANT ALL PRIVILEGES ON hms_db.* TO 'hms_user'@'localhost';
FLUSH PRIVILEGES;
EOF
        
        print_status "Database setup completed"
    else
        print_warning "Skipping database setup. Please create the database manually:"
        print_warning "Database: hms_db"
        print_warning "User: hms_user"
        print_warning "Password: hms_password"
    fi
}

# Setup Docker
setup_docker() {
    echo "🐳 Setting up Docker..."
    
    cd docker
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        print_status "Creating .env file..."
        cp env.example .env
        print_warning "Please edit docker/.env file with your configuration"
    fi
    
    cd ..
    print_status "Docker setup completed"
}

# Main setup function
main() {
    echo "Starting HMS project setup..."
    echo
    
    check_requirements
    echo
    
    setup_backend
    echo
    
    setup_frontend
    echo
    
    setup_database
    echo
    
    setup_docker
    echo
    
    echo "🎉 Setup completed successfully!"
    echo
    echo "Next steps:"
    echo "1. Start the database (if not using Docker)"
    echo "2. Run the backend: cd backend && mvn spring-boot:run"
    echo "3. Run the frontend: cd frontend && npm run dev"
    echo "4. Or use Docker: cd docker && docker-compose up -d"
    echo
    echo "Access points:"
    echo "- Frontend: http://localhost:3000"
    echo "- Backend API: http://localhost:8082/api"
    echo "- Database: localhost:3306"
}

# Run main function
main "$@"
