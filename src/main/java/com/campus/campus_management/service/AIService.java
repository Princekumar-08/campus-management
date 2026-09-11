package com.campus.campus_management.service;

import com.campus.campus_management.model.Complaint;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    public AIAnalysisResponse analyzeComplaint(Complaint complaint) {

        String text = "";

        if (complaint.getSubject() != null) {
            text += complaint.getSubject() + " ";
        }

        if (complaint.getDescription() != null) {
            text += complaint.getDescription() + " ";
        }

        if (complaint.getCategory() != null) {
            text += complaint.getCategory() + " ";
        }

        text = text.toLowerCase();

        // =====================================================
        // CATEGORY DETECTION
        // =====================================================

        String category = detectCategory(text);

        // =====================================================
        // PRIORITY DETECTION
        // =====================================================

        String priority = detectPriority(text);

        // =====================================================
        // DEPARTMENT DETECTION
        // =====================================================

        String department = detectDepartment(category, text);

        // =====================================================
        // SUMMARY
        // =====================================================

        String summary = generateSummary(
                complaint,
                category,
                priority
        );

        return new AIAnalysisResponse(
                category,
                priority,
                department,
                summary
        );
    }


    // =========================================================
    // CATEGORY DETECTION
    // =========================================================

    private String detectCategory(String text) {

        if (containsAny(text,
                "water",
                "leakage",
                "tap",
                "pipe",
                "drainage",
                "washroom",
                "bathroom")) {

            return "WATER_SUPPLY";
        }

        if (containsAny(text,
                "electricity",
                "electric",
                "light",
                "fan",
                "ac",
                "power",
                "switch",
                "socket",
                "voltage")) {

            return "ELECTRICITY";
        }

        if (containsAny(text,
                "wifi",
                "internet",
                "network",
                "router",
                "connection",
                "online")) {

            return "INTERNET_NETWORK";
        }

        if (containsAny(text,
                "smart board",
                "projector",
                "computer",
                "lab",
                "keyboard",
                "mouse",
                "printer")) {

            return "IT_EQUIPMENT";
        }

        if (containsAny(text,
                "clean",
                "garbage",
                "dustbin",
                "dirty",
                "toilet",
                "sanitation")) {

            return "CLEANLINESS";
        }

        if (containsAny(text,
                "food",
                "canteen",
                "cafe",
                "restaurant",
                "overcharging",
                "meal")) {

            return "CANTEEN_FOOD";
        }

        if (containsAny(text,
                "security",
                "guard",
                "theft",
                "unsafe",
                "fight",
                "harassment",
                "entry")) {

            return "SECURITY";
        }

        if (containsAny(text,
                "road",
                "parking",
                "vehicle",
                "transport",
                "bus",
                "traffic")) {

            return "TRANSPORTATION";
        }

        if (containsAny(text,
                "classroom",
                "desk",
                "chair",
                "bench",
                "door",
                "window",
                "building",
                "room")) {

            return "INFRASTRUCTURE";
        }

        if (containsAny(text,
                "medical",
                "doctor",
                "injury",
                "hospital",
                "health",
                "pain",
                "ambulance",
                "emergency")) {

            return "MEDICAL";
        }

        return "GENERAL_CAMPUS_ISSUE";
    }


    // =========================================================
    // PRIORITY DETECTION
    // =========================================================

    private String detectPriority(String text) {

        // HIGH PRIORITY
        if (containsAny(text,
                "emergency",
                "urgent",
                "danger",
                "dangerous",
                "fire",
                "accident",
                "injury",
                "medical emergency",
                "electric shock",
                "short circuit",
                "gas leak",
                "theft",
                "violence",
                "harassment",
                "flood")) {

            return "HIGH";
        }

        // MEDIUM PRIORITY
        if (containsAny(text,
                "leakage",
                "leak",
                "broken",
                "not working",
                "damaged",
                "problem",
                "issue",
                "failure",
                "repair",
                "complaint")) {

            return "MEDIUM";
        }

        // LOW PRIORITY
        return "LOW";
    }


    // =========================================================
    // DEPARTMENT DETECTION
    // =========================================================

    private String detectDepartment(
            String category,
            String text) {

        switch (category) {

            case "WATER_SUPPLY":
            case "CLEANLINESS":
                return "MAINTENANCE";

            case "ELECTRICITY":
                return "ELECTRICAL_MAINTENANCE";

            case "INTERNET_NETWORK":
            case "IT_EQUIPMENT":
                return "IT_SUPPORT";

            case "CANTEEN_FOOD":
                return "CANTEEN_MANAGEMENT";

            case "SECURITY":
                return "SECURITY";

            case "TRANSPORTATION":
                return "TRANSPORT_DEPARTMENT";

            case "INFRASTRUCTURE":
                return "CAMPUS_MAINTENANCE";

            case "MEDICAL":
                return "MEDICAL_CENTER";

            default:
                return "ADMINISTRATION";
        }
    }


    // =========================================================
    // SUMMARY GENERATION
    // =========================================================

    private String generateSummary(
            Complaint complaint,
            String category,
            String priority) {

        String subject = complaint.getSubject();

        if (subject == null || subject.isBlank()) {
            subject = "Campus issue";
        }

        return subject.trim()
                + " has been automatically classified as "
                + category.replace("_", " ")
                + " with "
                + priority
                + " priority.";
    }


    // =========================================================
    // KEYWORD MATCHING
    // =========================================================

    private boolean containsAny(
            String text,
            String... keywords) {

        for (String keyword : keywords) {

            if (text.contains(keyword.toLowerCase())) {
                return true;
            }
        }

        return false;
    }
}