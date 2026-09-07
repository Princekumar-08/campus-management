package com.campus.campus_management.repository;

import com.campus.campus_management.model.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ComplaintRepository extends MongoRepository<Complaint, String> {

    List<Complaint> findByStudentId(String studentId);
}