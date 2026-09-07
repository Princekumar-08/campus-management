package com.campus.campus_management.repository;

import com.campus.campus_management.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);

}