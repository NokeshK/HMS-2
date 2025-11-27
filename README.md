# HMS - Hospital Management System

A comprehensive Hospital Management System built with React frontend and Spring Boot backend.

## 🏗️ Project Structure

```
HMS-GitHub-Project/
├── backend/          # Spring Boot REST API
├── frontend/         # React + Vite Frontend
├── docker/           # Docker configurations
├── docs/            # Documentation
├── scripts/         # Utility scripts
└── README.md        # This file
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- MySQL 8.0+

### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd HMS-GitHub-Project

# Run the entire stack
cd docker
docker-compose up -d
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8082
- **Database**: localhost:3307 (MySQL)

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Docker Setup](./docker/README.md)
- [API Documentation](./docs/API.md)

## 🛠️ Technologies Used

### Backend
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL
- JWT Authentication
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

### DevOps
- Docker
- Docker Compose
- Nginx

## 📝 Features

- **Authentication & Authorization**
- **Patient Management**
- **Doctor Management**
- **Appointment Booking**
- **Medical Records**
- **Prescription Management**
- **Real-time Chat**
- **Admin Dashboard**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Nokesh Kothagundla

## 📞 Support

For support, email support@medvault.com or create an issue in the repository.
