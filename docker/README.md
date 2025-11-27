# Docker Configuration

Docker setup for the HMS (Hospital Management System) fullstack application.

## 🐳 Overview

This directory contains Docker configurations for running the entire HMS application stack.

## 📁 Structure

```
docker/
├── docker-compose.yml    # Full stack orchestration
├── README.md            # This file
└── .env.example         # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

### Run Full Stack
```bash
# Clone repository and navigate to docker directory
cd docker

# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🏗️ Services

### 1. MySQL Database
- **Image**: mysql:8.0
- **Port**: 3307
- **Database**: hms_db
- **Environment**: MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD

### 2. Backend API
- **Image**: hms-backend (custom)
- **Port**: 8082
- **Dependencies**: MySQL
- **Health Check**: /actuator/health

### 3. Frontend
- **Image**: hms-frontend (custom)
- **Port**: 3000
- **Dependencies**: Backend API
- **Web Server**: Nginx

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Database Configuration
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=hms_db
MYSQL_USER=hms_user
MYSQL_PASSWORD=hms_password

# Backend Configuration
DB_HOST=mysql
DB_PORT=3306
DB_NAME=hms_db
DB_USERNAME=hms_user
DB_PASSWORD=hms_password
JWT_SECRET=your-super-secret-jwt-key

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:8082/api
VITE_APP_NAME=MedVault HMS
```

### Docker Compose Services

#### MySQL Service
```yaml
mysql:
  image: mysql:8.0
  container_name: hms-mysql
  environment:
    MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    MYSQL_DATABASE: ${MYSQL_DATABASE}
    MYSQL_USER: ${MYSQL_USER}
    MYSQL_PASSWORD: ${MYSQL_PASSWORD}
  ports:
    - "3307:3306"
  volumes:
    - mysql_data:/var/lib/mysql
    - ./init.sql:/docker-entrypoint-initdb.d/init.sql
  networks:
    - hms-network
```

#### Backend Service
```yaml
backend:
  build:
    context: ../backend
    dockerfile: Dockerfile
  container_name: hms-backend
  environment:
    DB_HOST: mysql
    DB_PORT: 3306
    DB_NAME: ${MYSQL_DATABASE}
    DB_USERNAME: ${MYSQL_USER}
    DB_PASSWORD: ${MYSQL_PASSWORD}
    JWT_SECRET: ${JWT_SECRET}
  ports:
    - "8082:8081"
  depends_on:
    - mysql
  networks:
    - hms-network
```

#### Frontend Service
```yaml
frontend:
  build:
    context: ../frontend
    dockerfile: Dockerfile
  container_name: hms-frontend
  ports:
    - "3000:80"
  depends_on:
    - backend
  networks:
    - hms-network
```

## 🛠️ Development

### Build Images
```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Run Individual Services
```bash
# Run only database
docker-compose up mysql -d

# Run backend with database
docker-compose up mysql backend -d

# Run frontend with backend
docker-compose up backend frontend -d
```

### Development with Hot Reload
```bash
# Backend development
cd ../backend
mvn spring-boot:run

# Frontend development
cd ../frontend
npm run dev
```

## 📊 Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Health Checks
```bash
# Check service status
docker-compose ps

# Check backend health
curl http://localhost:8082/actuator/health

# Check frontend
curl http://localhost:3000
```

## 🗄️ Data Management

### Backup Database
```bash
# Create backup
docker-compose exec mysql mysqldump -u root -p hms_db > backup.sql

# Restore backup
docker-compose exec -T mysql mysql -u root -p hms_db < backup.sql
```

### Reset Database
```bash
# Stop services
docker-compose down

# Remove volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

## 🔒 Security

### Network Security
- Services communicate through internal network
- Only necessary ports exposed to host
- Database not directly accessible from outside

### Environment Security
- Use strong passwords
- Keep JWT secret secure
- Don't commit .env file

## 🚀 Production Deployment

### Environment Setup
```bash
# Production environment variables
export MYSQL_ROOT_PASSWORD=strong-production-password
export JWT_SECRET=very-long-random-secret-key
export DB_PASSWORD=strong-db-password
```

### Production Commands
```bash
# Run in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale backend=3
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check port usage
   lsof -i :3000
   lsof -i :8082
   lsof -i :3307
   ```

2. **Database Connection Issues**
   ```bash
   # Check database logs
   docker-compose logs mysql
   
   # Test database connection
   docker-compose exec backend ping mysql
   ```

3. **Build Issues**
   ```bash
   # Clean build
   docker-compose build --no-cache
   
   # Remove unused images
   docker system prune -a
   ```

### Debug Mode
```bash
# Run with debug logs
docker-compose up --build
```

## 📝 Notes

- Database data persists in Docker volumes
- Frontend is served through Nginx
- Backend includes health check endpoint
- All services are connected via internal network
- Environment variables can be overridden in .env file
