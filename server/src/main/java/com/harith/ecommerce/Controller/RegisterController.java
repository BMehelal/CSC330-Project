package com.harith.ecommerce.Controller;

import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;
import com.harith.ecommerce.Model.User;
import com.harith.ecommerce.Errors.UserError;
import com.harith.ecommerce.Repository.UserRepository;
import com.harith.ecommerce.Resources.RegisterRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.MediaType;



@RestController
@RequestMapping("api")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class RegisterController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("register")
    public ResponseEntity<String> registerUser(@RequestBody final RegisterRequest registerRequest) {
        final String username = registerRequest.getUsername();
        try {
            final Optional<User> existingUser = userRepository.findByUsername(username);
            if (existingUser.isPresent()) {
                return ResponseEntity.status(400)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(UserError.USERNAME_ALREADY_EXISTS.getErrorMessage());
            }
            final String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
            final User user = new User(username, hashedPassword, registerRequest.getGender(),
                    registerRequest.getCharacterURL());
            userRepository.save(user);
            return ResponseEntity.status(201).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to register user " + e.getMessage());
        }

    }
}
