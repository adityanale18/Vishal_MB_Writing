package com.vishal.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishal.backend.model.Booking;
import com.vishal.backend.model.User;
import com.vishal.backend.repository.UserRepository;
import com.vishal.backend.service.BookingService;
import com.vishal.backend.service.LoginService;
import com.vishal.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/book")
    public Booking book(@RequestBody Booking booking) {
        return bookingService.save(booking);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User found = userService.login(user.getEmail(), user.getPassword());
        if (found == null) return ResponseEntity.status(401).body("Invalid credentials");
        loginService.saveLogin(found.getEmail(), found.getPassword());
        return ResponseEntity.ok(found);
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String name = body.get("name");
        User existing = userRepository.findByEmail(email).orElse(null);
        if (existing == null) {
            User newUser = new User();
            newUser.setFullname(name);
            newUser.setEmail(email);
            newUser.setPassword("GOOGLE_AUTH");
            newUser.setCPassword("GOOGLE_AUTH");
            existing = userRepository.save(newUser);
        }
        return ResponseEntity.ok(existing);
    }
}
