package com.medvault.hmsbackend.controller;

import com.medvault.hmsbackend.model.Appointment;
import com.medvault.hmsbackend.model.Patient;
import com.medvault.hmsbackend.model.Doctor;
import com.medvault.hmsbackend.repository.AppointmentRepository;
import com.medvault.hmsbackend.repository.PatientRepository;
import com.medvault.hmsbackend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody BookAppointmentRequest request) {
        try {
            // Get current user (patient)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            Optional<Patient> patientOpt = patientRepository.findByUserEmail(email);
            if (!patientOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Patient not found");
            }
            Patient patient = patientOpt.get();

            // Find doctor
            Optional<Doctor> doctorOpt = doctorRepository.findById(request.getDoctorId());
            if (!doctorOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Doctor not found");
            }
            Doctor doctor = doctorOpt.get();

            // Create appointment
            Appointment appointment = new Appointment();
            appointment.setPatient(patient);
            appointment.setDoctor(doctor);
            appointment.setDate(LocalDate.parse(request.getDate()));
            appointment.setTime(LocalTime.parse(request.getTime()));
            appointment.setReason(request.getReason());
            appointment.setStatus(Appointment.Status.PENDING);

            Appointment savedAppointment = appointmentRepository.save(appointment);
            return ResponseEntity.ok(savedAppointment);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error booking appointment: " + e.getMessage());
        }
    }

    @GetMapping("/patient")
    public ResponseEntity<?> getPatientAppointments() {
        try {
            // Get current user (patient)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            Optional<Patient> patientOpt = patientRepository.findByUserEmail(email);
            if (!patientOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Patient not found");
            }
            Patient patient = patientOpt.get();

            List<Appointment> appointments = appointmentRepository.findByPatientId(patient.getId());
            return ResponseEntity.ok(appointments);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching appointments: " + e.getMessage());
        }
    }

    @GetMapping("/doctor")
    public ResponseEntity<?> getDoctorAppointments() {
        try {
            // Get current user (doctor)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            Optional<Doctor> doctorOpt = doctorRepository.findByUserEmail(email);
            if (!doctorOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Doctor not found");
            }
            Doctor doctor = doctorOpt.get();

            List<Appointment> appointments = appointmentRepository.findByDoctorId(doctor.getId());
            return ResponseEntity.ok(appointments);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching appointments: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        try {
            Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
            if (!appointmentOpt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Appointment appointment = appointmentOpt.get();
            appointment.setStatus(Appointment.Status.valueOf(request.getStatus().toUpperCase()));

            if (request.getNotes() != null) {
                appointment.setNotes(request.getNotes());
            }

            Appointment updatedAppointment = appointmentRepository.save(appointment);
            return ResponseEntity.ok(updatedAppointment);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating appointment: " + e.getMessage());
        }
    }

    // Request DTOs
    public static class BookAppointmentRequest {
        private Long doctorId;
        private String date;
        private String time;
        private String reason;

        // getters and setters
        public Long getDoctorId() { return doctorId; }
        public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }

    public static class UpdateStatusRequest {
        private String status;
        private String notes;

        // getters and setters
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }
}