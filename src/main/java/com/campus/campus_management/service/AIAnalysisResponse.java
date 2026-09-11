package com.campus.campus_management.service;

public class AIAnalysisResponse {

    private String category;
    private String priority;
    private String department;
    private String summary;

    public AIAnalysisResponse() {
    }

    public AIAnalysisResponse(
            String category,
            String priority,
            String department,
            String summary) {

        this.category = category;
        this.priority = priority;
        this.department = department;
        this.summary = summary;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}