# Spring Boot Backend - Run Commands

## 🚀 Quick Start

### Run Backend (Recommended)
```bash
cd backend
./run-backend.sh
```

### Or Use Maven Directly
```bash
cd backend
mvn spring-boot:run
```

## 📋 Prerequisites

1. **Java 17+** installed
   ```bash
   java -version
   ```

2. **Maven** installed
   ```bash
   mvn --version
   ```

3. **MySQL** running
   - Local MySQL on port 3306, OR
   - Docker MySQL container

## 🔧 Commands

### Build Project
```bash
mvn clean compile
```

### Run Application
```bash
mvn spring-boot:run
```

### Build JAR File
```bash
mvn clean package
```

### Run JAR File
```bash
java -jar target/hms-backend-0.0.1-SNAPSHOT.jar
```

### Run with Custom Port
```bash
PORT=8082 mvn spring-boot:run
```

### Run with Custom Database
```bash
DATABASE_URL=jdbc:mysql://localhost:3306/mydb \
DB_USERNAME=root \
DB_PASSWORD=mypassword \
mvn spring-boot:run
```

## 🌐 Access Backend

Once running, the backend will be available at:
- **URL**: http://localhost:8081
- **API Base**: http://localhost:8081/api

### Test Endpoints
```bash
# Get all doctors
curl http://localhost:8081/api/doctors

# Health check
curl http://localhost:8081/api/health
```

## 🗄️ Database Setup

### Using Local MySQL
```bash
# Start MySQL (if using Homebrew)
brew services start mysql

# Create database
mysql -u root -p
CREATE DATABASE hms_db;
```

### Using Docker MySQL
```bash
# Start MySQL container
docker run -d \
  --name mysql-hms \
  -e MYSQL_ROOT_PASSWORD=hthe1234567 \
  -e MYSQL_DATABASE=hms_db \
  -p 3306:3306 \
  mysql:8.0
```

## ⚙️ Configuration

Edit `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/hms_db
spring.datasource.username=root
spring.datasource.password=hthe1234567

# Server Port
server.port=8081

# JWT Secret
jwt.secret=your-secret-key-here
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 8081
lsof -i :8081

# Kill process
kill -9 <PID>
```

### Database Connection Error
```bash
# Check MySQL is running
mysql -u root -phthe1234567 -e "SELECT 1"

# Check Docker MySQL
docker ps | grep mysql
```

### Build Errors
```bash
# Clean and rebuild
mvn clean install

# Skip tests
mvn clean install -DskipTests
```

## 📝 Environment Variables

You can override configuration using environment variables:

```bash
export DATABASE_URL=jdbc:mysql://localhost:3306/hms_db
export DB_USERNAME=root
export DB_PASSWORD=yourpassword
export PORT=8081
export JWT_SECRET=your-secret-key

mvn spring-boot:run
```

## ✅ Verify Backend is Running

```bash
# Check if backend is responding
curl http://localhost:8081

# Check logs
tail -f logs/spring-boot.log  # if logging to file
```

## 🛑 Stop Backend

Press `Ctrl+C` in the terminal where it's running, or:

```bash
# Find and kill process
lsof -i :8081
kill -9 <PID>
```

