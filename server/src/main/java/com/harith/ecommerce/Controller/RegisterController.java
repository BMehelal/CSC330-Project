package com.harith.ecommerce.Controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;
import com.harith.ecommerce.Model.User;
import com.harith.ecommerce.Errors.UserError;
import com.harith.ecommerce.Repository.UserRepository;
import com.harith.ecommerce.Resources.RegisterRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.MediaType;



@RestController
@RequestMapping("api")
public class RegisterController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        String username = registerRequest.getUsername();
        try {
            Optional<User> existingUser = userRepository.findByUsername(username);
            if (existingUser.isPresent()) {
                return ResponseEntity.status(400)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(UserError.USERNAME_ALREADY_EXISTS.getErrorMessage());
            }
            String hasedPassword = passwordEncoder.encode(registerRequest.getPassword());
            User user = new User(username, hasedPassword, registerRequest.getGender(),
                    registerRequest.getCharacterURL());
            userRepository.save(user);
            return ResponseEntity.status(201).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to register user " + e.getMessage());
        }

    }
}
