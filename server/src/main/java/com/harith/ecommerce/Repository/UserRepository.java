package com.harith.ecommerce.Repository;

import com.harith.ecommerce.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;;
// Gives us preDefined methods that allow us to interact with our database with ease, specifcally for our User table
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
