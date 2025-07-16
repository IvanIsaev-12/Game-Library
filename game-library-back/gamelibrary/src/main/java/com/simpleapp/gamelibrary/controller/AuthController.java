package com.simpleapp.gamelibrary.controller;

import com.simpleapp.gamelibrary.dto.RegisterRequest;
import com.simpleapp.gamelibrary.entity.User;
import com.simpleapp.gamelibrary.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            authService.register(request.getEmail(), request.getPassword(), request.getFirstName(), request.getLastName());
            return ResponseEntity.ok("User registered successfully");
        }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
