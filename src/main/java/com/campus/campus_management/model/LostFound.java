package com.campus.campus_management.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "lost_found")
public class LostFound {

    @Id
    private String id;

    private String studentId;

    // LOST or FOUND
    private String type;

    private String itemName;

    private String category;

    private String location;

    private String date;

    private String description;

    // Image URL/path
    private String photoUrl;

    // OPEN or CLAIMED
    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    // Default constructor
    public LostFound() {
    }


    // Constructor
    public LostFound(
            String studentId,
            String type,
            String itemName,
            String category,
            String location,
            String date,
            String description,
            String photoUrl,
            String status) {

        this.studentId = studentId;
        this.type = type;
        this.itemName = itemName;
        this.category = category;
        this.location = location;
        this.date = date;
        this.description = description;
        this.photoUrl = photoUrl;
        this.status = status;

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


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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