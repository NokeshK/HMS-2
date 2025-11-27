# HMS API Documentation

RESTful API documentation for the Hospital Management System backend.

## 🔗 Base URL

```
http://localhost:8082/api
```

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📚 Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "ADMIN|DOCTOR|PATIENT"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string",
    "role": "ADMIN"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string",
    "role": "ADMIN"
  }
}
```

### Patients

#### Get All Patients
```http
GET /api/patients
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "dateOfBirth": "2023-01-01",
    "address": "string",
    "medicalHistory": "string"
  }
]
```

#### Create Patient
```http
POST /api/patients
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "dateOfBirth": "2023-01-01",
  "address": "string",
  "medicalHistory": "string"
}
```

#### Get Patient by ID
```http
GET /api/patients/{id}
Authorization: Bearer <token>
```

#### Update Patient
```http
PUT /api/patients/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "dateOfBirth": "2023-01-01",
  "address": "string",
  "medicalHistory": "string"
}
```

#### Delete Patient
```http
DELETE /api/patients/{id}
Authorization: Bearer <token>
```

### Doctors

#### Get All Doctors
```http
GET /api/doctors
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "specialization": "string",
    "licenseNumber": "string",
    "experience": 5
  }
]
```

#### Create Doctor
```http
POST /api/doctors
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "specialization": "string",
  "licenseNumber": "string",
  "experience": 5
}
```

#### Get Doctor by ID
```http
GET /api/doctors/{id}
Authorization: Bearer <token>
```

#### Update Doctor
```http
PUT /api/doctors/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "specialization": "string",
  "licenseNumber": "string",
  "experience": 5
}
```

### Appointments

#### Get All Appointments
```http
GET /api/appointments
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "patientId": 1,
    "doctorId": 1,
    "appointmentDate": "2023-12-01T10:00:00",
    "status": "SCHEDULED",
    "notes": "string"
  }
]
```

#### Book Appointment
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": 1,
  "doctorId": 1,
  "appointmentDate": "2023-12-01T10:00:00",
  "notes": "string"
}
```

#### Update Appointment Status
```http
PUT /api/appointments/{id}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "SCHEDULED|CONFIRMED|CANCELLED|COMPLETED"
}
```

#### Get Appointments by Patient
```http
GET /api/appointments/patient/{patientId}
Authorization: Bearer <token>
```

#### Get Appointments by Doctor
```http
GET /api/appointments/doctor/{doctorId}
Authorization: Bearer <token>
```

### Medical Records

#### Get Medical Records
```http
GET /api/medical-records
Authorization: Bearer <token>
```

#### Get Medical Records by Patient
```http
GET /api/medical-records/patient/{patientId}
Authorization: Bearer <token>
```

#### Create Medical Record
```http
POST /api/medical-records
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": 1,
  "doctorId": 1,
  "diagnosis": "string",
  "treatment": "string",
  "notes": "string",
  "date": "2023-12-01"
}
```

## 📊 Status Codes

| Code | Description |
|------|-------------|
| 200  | OK |
| 201  | Created |
| 400  | Bad Request |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 500  | Internal Server Error |

## 🔒 Error Responses

### Validation Error
```json
{
  "error": "Validation failed",
  "message": "Email is required",
  "timestamp": "2023-12-01T10:00:00Z"
}
```

### Authentication Error
```json
{
  "error": "Unauthorized",
  "message": "Invalid token",
  "timestamp": "2023-12-01T10:00:00Z"
}
```

### Not Found Error
```json
{
  "error": "Not Found",
  "message": "Patient not found",
  "timestamp": "2023-12-01T10:00:00Z"
}
```

## 🧪 Testing

### Using cURL

#### Register User
```bash
curl -X POST http://localhost:8082/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "PATIENT"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:8082/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

#### Get Patients (with token)
```bash
curl -X GET http://localhost:8082/api/patients \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Using Postman

1. Import the API collection
2. Set base URL to `http://localhost:8082/api`
3. Use the authentication endpoint to get a token
4. Set the token in the Authorization header for protected endpoints

## 📝 Notes

- All dates are in ISO 8601 format
- Passwords must be at least 8 characters
- Email addresses must be valid
- Phone numbers should include country code
- JWT tokens expire after 24 hours
- Rate limiting is applied to prevent abuse
