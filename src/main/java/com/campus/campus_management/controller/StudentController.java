package com.campus.campus_management.controller;

import com.campus.campus_management.JwtUtil;
import com.campus.campus_management.model.Student;
import com.campus.campus_management.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public StudentController(StudentRepository studentRepository,
                             PasswordEncoder passwordEncoder,
                             JwtUtil jwtUtil) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Old testing API
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // Student Registration
    @PostMapping("/register")
    public Object registerStudent(@RequestBody Student student) {

        if (studentRepository.existsByAdmissionNumber(
                student.getAdmissionNumber())) {
            return "Admission number already registered";
        }

        if (studentRepository.existsByEmail(student.getEmail())) {
            return "Email already registered";
        }

        if (studentRepository.existsByPhone(student.getPhone())) {
            return "Phone number already registered";
        }

        student.setPassword(
                passwordEncoder.encode(student.getPassword())
        );

        return studentRepository.save(student);
    }

    // Student Login - Email OR Phone
    @PostMapping("/login")
    public String loginStudent(@RequestBody Student student) {

        for (Student existingStudent : studentRepository.findAll()) {

            boolean emailMatch = existingStudent.getEmail() != null
                    && existingStudent.getEmail()
                    .equals(student.getEmail());

            boolean phoneMatch = existingStudent.getPhone() != null
                    && existingStudent.getPhone()
                    .equals(student.getPhone());

            boolean passwordMatch = existingStudent.getPassword() != null
                    && passwordEncoder.matches(
                    student.getPassword(),
                    existingStudent.getPassword()
            );

            if ((emailMatch || phoneMatch) && passwordMatch) {

                return jwtUtil.generateToken(
                        existingStudent.getId(),
                        "STUDENT"
                );
            }
        }

        return "Invalid email/phone or password";
    }

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Delete student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable String id) {
        studentRepository.deleteById(id);
        return "Student deleted successfully";
    }

    // Update student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable String id,
                                 @RequestBody Student student) {

        Student existingStudent =
                studentRepository.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(student.getName());
        existingStudent.setAdmissionNumber(
                student.getAdmissionNumber()
        );
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());

        if (student.getPassword() != null
                && !student.getPassword().isBlank()) {

            existingStudent.setPassword(
                    passwordEncoder.encode(student.getPassword())
            );
        }

        return studentRepository.save(existingStudent);
    }
}