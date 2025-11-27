# HMS Backend

Spring Boot REST API for the Hospital Management System.

## 🏗️ Architecture

```
backend/
├── src/main/java/com/medvault/hmsbackend/
│   ├── config/          # Security & JWT configuration
│   ├── controller/      # REST controllers
│   ├── model/          # JPA entities
│   ├── repository/     # Data access layer
│   └── service/        # Business logic
├── src/main/resources/
│   ├── application.properties
│   └── data.sql
├── pom.xml
├── Dockerfile
└── docker-compose.yml
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Local Development
```bash
# Install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

### Docker
```bash
# Build image
docker build -t hms-backend .

# Run container
docker run -p 8082:8081 hms-backend
```

## 🔧 Configuration

### Database Setup
1. Install MySQL 8.0+
2. Create database: `hms_db`
3. Update `application.properties` with your database credentials

### Environment Variables
```bash
DB_HOST=localhost
DB_PORT=3306
DB_NAME=hms_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create patient
- `GET /api/patients/{id}` - Get patient by ID
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor
- `GET /api/doctors/{id}` - Get doctor by ID
- `PUT /api/doctors/{id}` - Update doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/{id}/status` - Update appointment status

## 🛠️ Technologies

- **Spring Boot 3.2.0** - Main framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Data persistence
- **MySQL** - Database
- **JWT** - Token-based authentication
- **Maven** - Dependency management

## 📝 Features

- JWT-based authentication
- Role-based access control (Admin, Doctor, Patient)
- RESTful API design
- Data validation
- Error handling
- CORS configuration
- Docker support

## 🔒 Security

- JWT token authentication
- Password encryption with BCrypt
- CORS configuration
- Input validation
- SQL injection prevention

## 🧪 Testing

```bash
# Run tests
mvn test

# Run with coverage
mvn test jacoco:report
```

## 📦 Dependencies

Key dependencies in `pom.xml`:
- Spring Boot Starter Web
- Spring Boot Starter Security
- Spring Boot Starter Data JPA
- MySQL Connector
- JWT libraries
- Lombok
- Spring Boot Test

## 🐳 Docker

The backend includes Docker configuration for easy deployment:

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/hms-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 📊 Database Schema

The application uses the following main entities:
- User (authentication)
- Patient (patient information)
- Doctor (doctor information)
- Appointment (appointment scheduling)
- MedicalRecord (medical history)
- Prescription (prescription management)
