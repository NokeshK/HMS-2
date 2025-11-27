package com.medvault.hmsbackend.controller;

import com.medvault.hmsbackend.model.Patient;
import com.medvault.hmsbackend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getPatientProfile() {
        try {
            // Get current user (patient)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            return patientRepository.findByUserEmail(email)
                    .map(patient -> ResponseEntity.ok(patient))
                    .orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching patient profile: " + e.getMessage());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updatePatientProfile(@RequestBody Patient updatedPatient) {
        try {
            // Get current user (patient)
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            return patientRepository.findByUserEmail(email)
                    .map(existingPatient -> {
                        // Update allowed fields
                        existingPatient.setName(updatedPatient.getName());
                        existingPatient.setPhone(updatedPatient.getPhone());
                        existingPatient.setAddress(updatedPatient.getAddress());
                        existingPatient.setEmergencyContact(updatedPatient.getEmergencyContact());

                        Patient savedPatient = patientRepository.save(existingPatient);
                        return ResponseEntity.ok(savedPatient);
                    })
                    .orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating patient profile: " + e.getMessage());
        }
    }
}