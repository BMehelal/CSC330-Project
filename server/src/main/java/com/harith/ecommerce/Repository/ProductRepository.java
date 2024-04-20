package com.harith.ecommerce.Repository;

import com.harith.ecommerce.Model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

// Gives us preDdefined methods that allow us to interact with our database with ease, specifcally for our Product table
public interface ProductRepository extends MongoRepository<Product, String> {

}
