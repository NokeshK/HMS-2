-- Insert sample users
INSERT IGNORE INTO users (email, password, name, role) VALUES
('admin@medvault.com', '$2a$10$8K3W5Q8X9Y2Z4A6B8C0D2E4F6G8H0J2K4L6M8N0P2Q4R6S8T0V2W', 'Admin User', 'ADMIN'),
('dr.sarah.johnson@medvault.com', '$2a$10$8K3W5Q8X9Y2Z4A6B8C0D2E4F6G8H0J2K4L6M8N0P2Q4R6S8T0V2W', 'Dr. Sarah Johnson', 'DOCTOR'),
('dr.michael.chen@medvault.com', '$2a$10$8K3W5Q8X9Y2Z4A6B8C0D2E4F6G8H0J2K4L6M8N0P2Q4R6S8T0V2W', 'Dr. Michael Chen', 'DOCTOR'),
('dr.amanda.rodriguez@medvault.com', '$2a$10$8K3W5Q8X9Y2Z4A6B8C0D2E4F6G8H0J2K4L6M8N0P2Q4R6S8T0V2W', 'Dr. Amanda Rodriguez', 'DOCTOR'),
('patient1@medvault.com', '$2a$10$8K3W5Q8X9Y2Z4A6B8C0D2E4F6G8H0J2K4L6M8N0P2Q4R6S8T0V2W', 'John Smith', 'PATIENT'),
('patient2@medvault.com', '$2a$10$8K3W5Q8X9Y2Z4A6B8C0D2E4F6G8H0J2K4L6M8N0P2Q4R6S8T0V2W', 'Emily Davis', 'PATIENT');

-- Insert sample doctors
INSERT IGNORE INTO doctors (user_id, name, specialization, phone, department, avatar, experience, rating, bio) VALUES
(1, 'Dr. Sarah Johnson', 'Cardiology', '+1 (555) 111-2222', 'Cardiology', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face', '12 years', 4.8, 'Specialized in cardiovascular diseases with extensive experience in heart surgery and preventive cardiology.'),
(2, 'Dr. Michael Chen', 'Orthopedics', '+1 (555) 222-3333', 'Orthopedics', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face', '15 years', 4.9, 'Expert in orthopedic surgery and sports medicine, specializing in joint replacements and rehabilitation.'),
(3, 'Dr. Amanda Rodriguez', 'Pediatrics', '+1 (555) 333-4444', 'Pediatrics', 'https://images.unsplash.com/photo-1594824804732-ca8db723f8fa?w=150&h=150&fit=crop&crop=face', '8 years', 4.7, 'Dedicated pediatrician focused on child development, vaccinations, and family-centered care.');

-- Insert sample patients
INSERT IGNORE INTO patients (user_id, name, age, phone, address, emergency_contact, medical_history) VALUES
(4, 'John Smith', 34, '+1 (555) 123-4567', '123 Main St, New York, NY 10001', 'Jane Smith - (555) 987-6543', 'No significant medical history'),
(5, 'Emily Davis', 28, '+1 (555) 234-5678', '456 Oak Ave, Los Angeles, CA 90210', 'Michael Davis - (555) 876-5432', 'Mild allergies');