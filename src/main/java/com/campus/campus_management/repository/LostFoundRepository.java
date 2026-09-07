package com.campus.campus_management.repository;

import com.campus.campus_management.model.LostFound;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LostFoundRepository
        extends MongoRepository<LostFound, String> {

    List<LostFound> findByStudentId(String studentId);

    List<LostFound> findByType(String type);
}