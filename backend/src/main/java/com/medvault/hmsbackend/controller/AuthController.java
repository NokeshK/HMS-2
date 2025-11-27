package com.medvault.hmsbackend.controller;

import com.medvault.hmsbackend.model.User;
import com.medvault.hmsbackend.model.Patient;
import com.medvault.hmsbackend.model.Doctor;
import com.medvault.hmsbackend.repository.PatientRepository;
import com.medvault.hmsbackend.repository.DoctorRepository;
import com.medvault.hmsbackend.service.JwtService;
import com.medvault.hmsbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Login attempt for email: " + loginRequest.getEmail());
            Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());

            if (userOpt.isEmpty()) {
                logger.warning("User not found: " + loginRequest.getEmail());
                return ResponseEntity.badRequest().body("User not found");
            }

            User user = userOpt.get();
            logger.info("User found: " + user.getEmail() + ", role: " + user.getRole());

            // Check password using BCrypt
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                logger.warning("Invalid password for user: " + user.getEmail());
                return ResponseEntity.badRequest().body("Invalid password");
            }
            logger.info("Password matched for user: " + user.getEmail());

            // Create UserDetails for JWT
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    new ArrayList<>()
            );

            String token = jwtService.generateToken(userDetails);

            // Create user response with lowercase role
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("email", user.getEmail());
            userResponse.put("name", user.getName());
            userResponse.put("role", user.getRole().toLowerCase());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", userResponse);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        logger.info("Registration attempt for email: " + registerRequest.getEmail());
        if (userService.existsByEmail(registerRequest.getEmail())) {
            logger.warning("Email already exists: " + registerRequest.getEmail());
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setName(registerRequest.getName());
        user.setRole(User.Role.valueOf(registerRequest.getRole().toUpperCase()));

        logger.info("Saving user: " + user.getEmail());
        User savedUser = userService.registerUser(user);
        logger.info("User saved with ID: " + savedUser.getId());

        // Create Patient or Doctor entity
        if (savedUser.getRoleEnum() == User.Role.PATIENT) {
            logger.info("Creating patient for user: " + savedUser.getEmail());
            Patient patient = new Patient();
            patient.setUser(savedUser);
            patient.setName(savedUser.getName());
            patient.setPhone(registerRequest.getPhone() != null ? registerRequest.getPhone() : "");
            patient.setAddress(registerRequest.getAddress());
            patient.setEmergencyContact(registerRequest.getEmergencyContact());
            // Calculate age from dateOfBirth
            if (registerRequest.getDateOfBirth() != null && !registerRequest.getDateOfBirth().isEmpty()) {
                try {
                    java.time.LocalDate birthDate = java.time.LocalDate.parse(registerRequest.getDateOfBirth());
                    int age = java.time.Period.between(birthDate, java.time.LocalDate.now()).getYears();
                    patient.setAge(age);
                } catch (Exception e) {
                    patient.setAge(null);
                }
            }
            // Store blood group in medical history
            String medicalHistory = "";
            if (registerRequest.getBloodGroup() != null) {
                medicalHistory = "Blood Group: " + registerRequest.getBloodGroup();
            }
            patient.setMedicalHistory(medicalHistory);
            patientRepository.save(patient);
            logger.info("Patient saved for user: " + savedUser.getEmail());
        } else if (savedUser.getRoleEnum() == User.Role.DOCTOR) {
            logger.info("Creating doctor for user: " + savedUser.getEmail());
            Doctor doctor = new Doctor();
            doctor.setUser(savedUser);
            doctor.setName(savedUser.getName());
            doctor.setPhone(registerRequest.getPhone() != null ? registerRequest.getPhone() : "");
            doctor.setSpecialization(registerRequest.getSpecialization());
            // Store license number in bio
            String bio = "";
            if (registerRequest.getLicenseNumber() != null) {
                bio = "License Number: " + registerRequest.getLicenseNumber();
            }
            doctor.setBio(bio);
            doctorRepository.save(doctor);
            logger.info("Doctor saved for user: " + savedUser.getEmail());
        }

        logger.info("Registration successful for: " + savedUser.getEmail());
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        try {
            // Extract token from "Bearer <token>"
            String jwt = token.substring(7);
            String email = jwtService.extractUsername(jwt);

            User user = userService.findByEmail(email).orElse(null);
            if (user != null && jwtService.isTokenValid(jwt, new org.springframework.security.core.userdetails.User(
                    user.getEmail(), user.getPassword(), new java.util.ArrayList<>()))) {
                return ResponseEntity.ok(Map.of("valid", true, "user", user));
            }
            return ResponseEntity.status(401).body(Map.of("valid", false));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("valid", false));
        }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        // getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String email;
        private String password;
        private String name;
        private String role;
        private String phone;
        private String address;
        private String dateOfBirth;
        private String emergencyContact;
        private String bloodGroup;
        private String specialization;
        private String licenseNumber;

        // getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }
        public String getDateOfBirth() { return dateOfBirth; }
        public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
        public String getEmergencyContact() { return emergencyContact; }
        public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
        public String getBloodGroup() { return bloodGroup; }
        public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
        public String getSpecialization() { return specialization; }
        public void setSpecialization(String specialization) { this.specialization = specialization; }
        public String getLicenseNumber() { return licenseNumber; }
        public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }
    }
}