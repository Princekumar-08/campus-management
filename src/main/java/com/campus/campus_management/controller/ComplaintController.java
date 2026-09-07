package com.campus.campus_management.controller;

import com.campus.campus_management.model.Complaint;
import com.campus.campus_management.repository.ComplaintRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;

    public ComplaintController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    // =========================================================
    // STUDENT - RAISE NEW COMPLAINT
    // =========================================================

    @PostMapping("/raise")
    public Complaint raiseComplaint(
            @RequestBody Complaint complaint,
            Authentication authentication) {

        String studentId = authentication.getName();

        complaint.setStudentId(studentId);

        // Every new complaint starts as PENDING
        complaint.setStatus("PENDING");

        // Set default priority if student does not provide it
        if (complaint.getPriority() == null ||
                complaint.getPriority().trim().isEmpty()) {

            complaint.setPriority("MEDIUM");
        }

        complaint.setCreatedAt(LocalDateTime.now());
        complaint.setUpdatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }


    // =========================================================
    // STUDENT - VIEW ONLY OWN COMPLAINTS
    // =========================================================

    @GetMapping("/student/{studentId}")
    public List<Complaint> getStudentComplaints(
            @PathVariable String studentId,
            Authentication authentication) {

        String loggedInStudentId = authentication.getName();

        // Student can only access their own complaints
        if (!loggedInStudentId.equals(studentId)) {
            return List.of();
        }

        return complaintRepository.findByStudentId(studentId);
    }


    // =========================================================
    // ADMIN - VIEW ALL COMPLAINTS
    // =========================================================

    @GetMapping("/all")
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }


    // =========================================================
    // ADMIN - CHANGE COMPLAINT STATUS
    // =========================================================

    @PutMapping("/{id}/status")
    public Complaint updateComplaintStatus(
            @PathVariable String id,
            @RequestParam String status) {

        Complaint complaint =
                complaintRepository.findById(id).orElse(null);

        if (complaint == null) {
            return null;
        }

        String newStatus = status.toUpperCase();

        // Allowed status values
        if (!newStatus.equals("PENDING")
                && !newStatus.equals("ASSIGNED")
                && !newStatus.equals("IN_PROGRESS")
                && !newStatus.equals("RESOLVED")) {

            return null;
        }

        complaint.setStatus(newStatus);
        complaint.setUpdatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }


    // =========================================================
    // ADMIN - SEND MESSAGE / SUGGESTION TO STUDENT
    // =========================================================

    @PutMapping("/{id}/message")
    public Complaint updateAdminMessage(
            @PathVariable String id,
            @RequestParam String adminSuggestion) {

        Complaint complaint =
                complaintRepository.findById(id).orElse(null);

        if (complaint == null) {
            return null;
        }

        if (adminSuggestion == null
                || adminSuggestion.trim().isEmpty()) {

            return null;
        }

        complaint.setAdminSuggestion(
                adminSuggestion.trim()
        );

        complaint.setUpdatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }


    // =========================================================
    // ADMIN - UPDATE PRIORITY
    // =========================================================

    @PutMapping("/{id}/priority")
    public Complaint updatePriority(
            @PathVariable String id,
            @RequestParam String priority) {

        Complaint complaint =
                complaintRepository.findById(id).orElse(null);

        if (complaint == null) {
            return null;
        }

        String newPriority = priority.toUpperCase();

        // Allowed priority values
        if (!newPriority.equals("LOW")
                && !newPriority.equals("MEDIUM")
                && !newPriority.equals("HIGH")) {

            return null;
        }

        complaint.setPriority(newPriority);
        complaint.setUpdatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }


    // =========================================================
    // ADMIN - DELETE COMPLAINT
    // =========================================================

    @DeleteMapping("/{id}")
    public String deleteComplaint(
            @PathVariable String id) {

        if (!complaintRepository.existsById(id)) {
            return "Complaint not found";
        }

        complaintRepository.deleteById(id);

        return "Complaint deleted successfully";
    }
}