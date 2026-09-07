package com.campus.campus_management.controller;

import com.campus.campus_management.JwtUtil;
import com.campus.campus_management.model.Admin;
import com.campus.campus_management.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
public class AdminController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminController(AdminRepository adminRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Admin Registration
    @PostMapping("/register")
    public Object registerAdmin(@RequestBody Admin admin) {

        if (adminRepository.existsByEmail(admin.getEmail())) {
            return "Email already registered";
        }

        if (adminRepository.existsByPhone(admin.getPhone())) {
            return "Phone number already registered";
        }

        admin.setPassword(
                passwordEncoder.encode(admin.getPassword())
        );

        return adminRepository.save(admin);
    }

    // Admin Login - Email OR Phone
    @PostMapping("/login")
    public String loginAdmin(@RequestBody Admin admin) {

        for (Admin existingAdmin : adminRepository.findAll()) {

            boolean emailMatch = existingAdmin.getEmail() != null
                    && existingAdmin.getEmail()
                    .equals(admin.getEmail());

            boolean phoneMatch = existingAdmin.getPhone() != null
                    && existingAdmin.getPhone()
                    .equals(admin.getPhone());

            boolean passwordMatch = existingAdmin.getPassword() != null
                    && passwordEncoder.matches(
                    admin.getPassword(),
                    existingAdmin.getPassword()
            );

            if ((emailMatch || phoneMatch) && passwordMatch) {

                return jwtUtil.generateToken(
                        existingAdmin.getId(),
                        "ADMIN"
                );
            }
        }

        return "Invalid email/phone or password";
    }
}