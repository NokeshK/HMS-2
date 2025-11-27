# HMS Frontend

React-based frontend application for the Hospital Management System.

## 🏗️ Architecture

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Auth/       # Authentication components
│   │   ├── Dashboard/  # Dashboard components
│   │   ├── Layout/     # Layout components
│   │   ├── Modals/     # Modal components
│   │   └── Profile/    # Profile components
│   ├── contexts/       # React contexts
│   ├── pages/          # Page components
│   ├── data/           # Mock data
│   └── assets/         # Static assets
├── public/             # Public assets
├── package.json
├── Dockerfile
└── nginx.conf
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker
```bash
# Build image
docker build -t hms-frontend .

# Run container
docker run -p 3000:80 hms-frontend
```

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean and intuitive interface
- **Dark/Light Theme** - Theme switching capability
- **Component Library** - Reusable UI components
- **Form Validation** - Client-side validation
- **Loading States** - User feedback during operations

## 🧩 Components

### Authentication
- `LoginForm` - User login interface
- `RegisterForm` - User registration interface
- `LoginLeftPanel` - Login page branding

### Dashboard
- `AdminDashboard` - Admin-specific dashboard
- `DoctorDashboard` - Doctor-specific dashboard
- `PatientDashboard` - Patient-specific dashboard

### Layout
- `Layout` - Main application layout
- `Navbar` - Navigation bar
- `Sidebar` - Side navigation

### Modals
- `AddNotesModal` - Add medical notes
- `AddPatientModal` - Add new patient
- `BookAppointmentModal` - Book appointments
- `ChatModal` - Real-time chat
- `PatientRecordModal` - View patient records

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📱 Pages

- **Login/Register** - Authentication pages
- **Dashboard** - Role-based dashboards
- **Appointments** - Appointment management
- **Medical Records** - Medical history
- **Chat** - Real-time messaging
- **Settings** - User settings
- **Reports** - Analytics and reports

## 🎯 Features

### Authentication
- User login/registration
- JWT token management
- Role-based access control
- Protected routes

### Patient Management
- Patient registration
- Medical history tracking
- Appointment booking
- Prescription management

### Doctor Management
- Doctor profiles
- Patient assignment
- Appointment scheduling
- Medical record access

### Admin Features
- User management
- System configuration
- Analytics dashboard
- Report generation

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```bash
VITE_API_BASE_URL=http://localhost:8082/api
VITE_APP_NAME=MedVault HMS
```

### API Integration
The frontend communicates with the backend through:
- RESTful API calls
- JWT token authentication
- Error handling
- Loading states

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run deploy       # Deploy to GitHub Pages
```

## 🎨 Styling

The application uses Tailwind CSS for styling:
- Utility-first CSS framework
- Responsive design
- Custom color scheme
- Component-based styling

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interfaces
- Optimized for all devices

## 🚀 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Docker
```bash
docker build -t hms-frontend .
docker run -p 3000:80 hms-frontend
```

### Nginx Configuration
The application includes nginx configuration for production deployment with:
- Gzip compression
- Static file serving
- SPA routing support
- Security headers

## 🔒 Security

- JWT token storage
- Secure API communication
- Input sanitization
- XSS protection
- CSRF protection

## 📊 Performance

- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies
