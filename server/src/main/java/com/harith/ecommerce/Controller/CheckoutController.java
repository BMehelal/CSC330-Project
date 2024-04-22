package com.harith.ecommerce.Controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.harith.ecommerce.Repository.ProductRepository;
import com.harith.ecommerce.Repository.UserRepository;
import com.harith.ecommerce.Resources.CheckoutRequest;

@RestController
@RequestMapping("api")
public class CheckoutController {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    
    public CheckoutController(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // To be finished
     @PostMapping("checkout")
     public ArrayList<String> checkout(@RequestBody CheckoutRequest checkoutRequest){
         return null;
     }

}
