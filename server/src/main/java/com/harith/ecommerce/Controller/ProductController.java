package com.harith.ecommerce.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;
import com.harith.ecommerce.Model.Product;
import com.harith.ecommerce.Model.User;
import com.harith.ecommerce.Repository.ProductRepository;
import com.harith.ecommerce.Repository.UserRepository;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api")
public class ProductController {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    public ProductController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("products")
    public ResponseEntity<List<Product>> getProducts() {
        try {
            final List<Product> products = productRepository.findAll();
            if (products.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
   
}
