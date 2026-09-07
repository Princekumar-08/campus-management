package com.campus.campus_management.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "complaints")
public class Complaint {

    @Id
    private String id;

    // Student who raised the complaint
    private String studentId;

    // Type of complaint
    // Example: CAMPUS_ISSUE, CANTEEN_SHOP
    private String complaintType;

    // Specific category
    // Example: Water Supply, Smart Board, Overcharging
    private String category;

    // Short title of complaint
    private String subject;

    // Full problem description
    private String description;

    // Location where the issue occurred
    private String location;

    // LOW, MEDIUM, HIGH
    private String priority;

    // PENDING, ASSIGNED, IN_PROGRESS, RESOLVED
    private String status;

    // Optional image/evidence path or URL
    private String photoUrl;

    // Message/response from admin
    private String adminSuggestion;

    // Complaint creation time
    private LocalDateTime createdAt;

    // Last update time
    private LocalDateTime updatedAt;


    // Default constructor
    public Complaint() {
    }


    // Existing constructor
    public Complaint(String studentId,
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


    // Full constructor
    public Complaint(String studentId,
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


    // Getters and Setters

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


    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }


    public String getAdminSuggestion() {
        return adminSuggestion;
    }

    public void setAdminSuggestion(String adminSuggestion) {
        this.adminSuggestion = adminSuggestion;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}