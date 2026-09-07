package com.campus.campus_management.controller;

import com.campus.campus_management.model.LostFound;
import com.campus.campus_management.repository.LostFoundRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/lost-found")
public class LostFoundController {

    private final LostFoundRepository lostFoundRepository;

    public LostFoundController(LostFoundRepository lostFoundRepository) {
        this.lostFoundRepository = lostFoundRepository;
    }

    // =========================
    // STUDENT - REPORT LOST/FOUND ITEM
    // =========================
    @PostMapping("/report")
    public LostFound reportItem(
            @RequestBody LostFound item,
            Authentication authentication) {

        String studentId = authentication.getName();

        item.setStudentId(studentId);

        // New item starts as OPEN
        item.setStatus("OPEN");

        item.setCreatedAt(LocalDateTime.now());
        item.setUpdatedAt(LocalDateTime.now());

        return lostFoundRepository.save(item);
    }

    // =========================
    // STUDENT - VIEW OWN POSTS
    // =========================
    @GetMapping("/student/{studentId}")
    public List<LostFound> getStudentItems(
            @PathVariable String studentId,
            Authentication authentication) {

        String loggedInStudentId = authentication.getName();

        if (!loggedInStudentId.equals(studentId)) {
            return List.of();
        }

        return lostFoundRepository.findByStudentId(studentId);
    }

    // =========================
    // ADMIN - VIEW ALL
    // =========================
    @GetMapping("/all")
    public List<LostFound> getAllItems() {
        return lostFoundRepository.findAll();
    }

    // =========================
    // ADMIN - FILTER LOST / FOUND
    // =========================
    @GetMapping("/type/{type}")
    public List<LostFound> getItemsByType(
            @PathVariable String type) {

        return lostFoundRepository.findByType(
                type.toUpperCase()
        );
    }

    // =========================
    // ADMIN - MARK AS CLAIMED
    // =========================
    @PutMapping("/{id}/claimed")
    public LostFound markAsClaimed(
            @PathVariable String id) {

        LostFound item =
                lostFoundRepository.findById(id).orElse(null);

        if (item == null) {
            return null;
        }

        item.setStatus("CLAIMED");
        item.setUpdatedAt(LocalDateTime.now());

        return lostFoundRepository.save(item);
    }

    // =========================
    // ADMIN - DELETE ITEM
    // =========================
    @DeleteMapping("/{id}")
    public String deleteItem(
            @PathVariable String id) {

        if (!lostFoundRepository.existsById(id)) {
            return "Item not found";
        }

        lostFoundRepository.deleteById(id);

        return "Lost & Found item deleted successfully";
    }
}