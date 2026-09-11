package com.campus.campus_management.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "complaints")
public class Complaint {

    @Id
    private String id;

    // =========================================================
    // STUDENT DETAILS
    // =========================================================

    private String studentId;


    // =========================================================
    // COMPLAINT DETAILS
    // =========================================================

    // Example:
    // CAMPUS_ISSUE
    // CANTEEN_SHOP
    // FACULTY_ISSUE
    // MEDICAL_ISSUE
    // SECURITY_ISSUE
    private String complaintType;

    // Example:
    // WATER_SUPPLY
    // ELECTRICITY
    // INTERNET_NETWORK
    // CLEANLINESS
    // etc.
    private String category;

    // Short title of complaint
    private String subject;

    // Original complaint description
    private String description;

    // Location of the issue
    private String location;


    // =========================================================
    // AI GENERATED INFORMATION
    // =========================================================

    // AI generated short summary of the complaint
    private String aiSummary;

    // Department responsible for handling the complaint
    // Example:
    // MAINTENANCE
    // ELECTRICAL_MAINTENANCE
    // IT_SUPPORT
    // SECURITY
    private String department;


    // =========================================================
    // COMPLAINT MANAGEMENT
    // =========================================================

    // LOW, MEDIUM, HIGH
    private String priority;

    // PENDING, ASSIGNED, IN_PROGRESS, RESOLVED
    private String status;


    // =========================================================
    // ADDITIONAL INFORMATION
    // =========================================================

    // Optional image/evidence URL
    private String photoUrl;

    // Admin response/message to student
    private String adminSuggestion;


    // =========================================================
    // TIMESTAMPS
    // =========================================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    // =========================================================
    // DEFAULT CONSTRUCTOR
    // =========================================================

    public Complaint() {
    }


    // =========================================================
    // EXISTING CONSTRUCTOR
    // =========================================================

    public Complaint(
            String studentId,
            String subject,
            String description,
            String status) {

        this.studentId = studentId;
        this.subject = subject;
        this.description = description;
        this.status = status;

        this.priority = "MEDIUM";

        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }


    // =========================================================
    // FULL CONSTRUCTOR
    // =========================================================

    public Complaint(
            String studentId,
            String complaintType,
            String category,
            String subject,
            String description,
            String location,
            String priority,
            String status,
            String photoUrl,
            String adminSuggestion) {

        this.studentId = studentId;
        this.complaintType = complaintType;
        this.category = category;
        this.subject = subject;
        this.description = description;
        this.location = location;
        this.priority = priority;
        this.status = status;
        this.photoUrl = photoUrl;
        this.adminSuggestion = adminSuggestion;

        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }


    // =========================================================
    // GETTERS AND SETTERS
    // =========================================================

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }


    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    // =========================================================
    // AI SUMMARY
    // =========================================================

    public String getAiSummary() {
        return aiSummary;
    }

    public void setAiSummary(String aiSummary) {
        this.aiSummary = aiSummary;
    }


    // =========================================================
    // DEPARTMENT
    // =========================================================

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }


    // =========================================================
    // PRIORITY
    // =========================================================

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }


    // =========================================================
    // STATUS
    // =========================================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    // =========================================================
    // PHOTO
    // =========================================================

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }


    // =========================================================
    // ADMIN SUGGESTION
    // =========================================================

    public String getAdminSuggestion() {
        return adminSuggestion;
    }

    public void setAdminSuggestion(String adminSuggestion) {
        this.adminSuggestion = adminSuggestion;
    }


    // =========================================================
    // CREATED AT
    // =========================================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    // =========================================================
    // UPDATED AT
    // =========================================================

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}