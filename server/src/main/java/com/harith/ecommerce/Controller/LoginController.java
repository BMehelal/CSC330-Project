package com.harith.ecommerce.Controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harith.ecommerce.Model.User;
import com.harith.ecommerce.Errors.UserError;
import com.harith.ecommerce.Repository.UserRepository;
import com.harith.ecommerce.Resources.LoginRequest;


@RestController
@RequestMapping("api")
public class LoginController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public LoginController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("login")
    
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
         String username = loginRequest.getUsername();
         Optional<User> optionalUser = userRepository.findByUsername(username);
            if (!optionalUser.isPresent()) {
                return ResponseEntity.status(401).body(UserError.NO_USER_FOUND.getErrorMessage());
            }
         User user = optionalUser.get();
         boolean isPasswordValid = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
            if (!isPasswordValid) {
                return ResponseEntity.status(401).body(UserError.WRONG_CREDENTIALS.getErrorMessage());
            }
            return ResponseEntity.status(200).body(user.getId());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

}
