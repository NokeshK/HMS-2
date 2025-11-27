export const mockPatients = [
  {
    id: '1',
    name: 'John Smith',
    age: 34,
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    emergencyContact: 'Jane Smith - (555) 987-6543',
    medicalHistory: []
  },
  {
    id: '2',
    name: 'Emily Davis',
    age: 28,
    email: 'emily.davis@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    emergencyContact: 'Michael Davis - (555) 876-5432',
    medicalHistory: []
  },
  {
    id: '3',
    name: 'Robert Johnson',
    age: 45,
    email: 'robert.johnson@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, Chicago, IL 60601',
    emergencyContact: 'Lisa Johnson - (555) 765-4321',
    medicalHistory: []
  }
];

export const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    email: 'sarah.johnson@medixhub.com',
    phone: '+1 (555) 111-2222',
    department: 'Cardiology',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    experience: '12 years',
    rating: 4.8,
    bio: 'Specialized in cardiovascular diseases with extensive experience in heart surgery and preventive cardiology.'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Orthopedics',
    email: 'michael.chen@medixhub.com',
    phone: '+1 (555) 222-3333',
    department: 'Orthopedics',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    experience: '15 years',
    rating: 4.9,
    bio: 'Expert in orthopedic surgery and sports medicine, specializing in joint replacements and rehabilitation.'
  },
  {
    id: '3',
    name: 'Dr. Amanda Rodriguez',
    specialization: 'Pediatrics',
    email: 'amanda.rodriguez@medixhub.com',
    phone: '+1 (555) 333-4444',
    department: 'Pediatrics',
    avatar: 'https://images.unsplash.com/photo-1594824804732-ca8db723f8fa?w=150&h=150&fit=crop&crop=face',
    experience: '8 years',
    rating: 4.7,
    bio: 'Dedicated pediatrician focused on child development, vaccinations, and family-centered care.'
  }
];

export const mockAppointments = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-20',
    time: '09:00',
    status: 'pending',
    reason: 'Regular checkup'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Emily Davis',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    date: '2025-01-20',
    time: '10:30',
    status: 'completed',
    reason: 'Knee pain consultation',
    notes: 'Patient reported improvement after prescribed treatment.'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Robert Johnson',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-20',
    time: '14:00',
    status: 'pending',
    reason: 'Blood pressure monitoring'
  }
];

export const mockMedicalRecords = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-15',
    type: 'consultation',
    title: 'Annual Physical Examination',
    description: 'Routine annual physical examination. Patient reports feeling well overall. Vital signs within normal limits.',
    prescription: [
      {
        id: '1',
        medication: 'Multivitamin',
        dosage: '1 tablet',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with breakfast'
      }
    ]
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Emily Davis',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    date: '2025-01-10',
    type: 'test',
    title: 'MRI Scan - Right Knee',
    description: 'MRI scan of right knee to evaluate pain and mobility issues. Results show minor inflammation.',
    files: [
      {
        id: '1',
        name: 'knee_mri_results.pdf',
        type: 'pdf',
        size: 2048000,
        url: '#',
        uploadDate: '2025-01-10'
      }
    ]
  }
];

export const mockNotifications = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 9:00 AM',
    timestamp: '2025-01-19T10:00:00Z',
    read: false,
    userId: '1'
  },
  {
    id: '2',
    type: 'prescription',
    title: 'Prescription Ready',
    message: 'Your prescription for blood pressure medication is ready for pickup',
    timestamp: '2025-01-19T14:30:00Z',
    read: false,
    userId: '1'
  },
  {
    id: '3',
    type: 'report',
    title: 'Lab Results Available',
    message: 'Your recent blood test results are now available in your medical records',
    timestamp: '2025-01-18T16:45:00Z',
    read: true,
    userId: '1'
  }
];
