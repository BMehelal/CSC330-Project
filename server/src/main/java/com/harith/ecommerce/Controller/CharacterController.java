package com.harith.ecommerce.Controller;

import com.harith.ecommerce.Model.User;
import com.harith.ecommerce.Repository.UserRepository;
import com.harith.ecommerce.Resources.CharacterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;
import java.util.Optional;

// Basically getting(loading everytime) user's profile picture
// Controller for handling requests related to Character
@RestController
@RequestMapping("api")
public class CharacterController {
    private final UserRepository userRepository;
    
    public CharacterController(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @PostMapping("getCharacterURL")
    //When user load on to page where he can see the profile picture(it post a request to get url for that picture)
    public ResponseEntity<String> getCharacterURL(@RequestBody CharacterRequest characterRequest){
        //Response Entity from Spring framework(deal with api stuff, https stuff)
        try {
            Optional<User> existingUser = userRepository.findById(characterRequest.getId());
            // Optional container object(can have a value or not have value), helps to avoid null pointer exception
            // findById from spring Framework
            if (existingUser.isPresent()) {
                return ResponseEntity.ok(existingUser.get().getCharacterURL());
                // User is found then we are A-OK
            }
            else {
                // User not found, ResponseEntity error code 404
                return ResponseEntity.status(404).body("User not found");
            }
        }
        catch (NoSuchElementException e) {
            // Handle case where no user is found with the provided ID
            return ResponseEntity.status(500).body("No user found with provided ID: " + e.getMessage());
        }
        catch (Exception e) {
            // Handle any other exceptions that occur
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
}
