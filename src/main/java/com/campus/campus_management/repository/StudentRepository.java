package com.campus.campus_management.repository;

import com.campus.campus_management.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {

    Optional<Student> findByEmail(String email);

    Optional<Student> findByPhone(String phone);

    boolean existsByAdmissionNumber(String admissionNumber);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}