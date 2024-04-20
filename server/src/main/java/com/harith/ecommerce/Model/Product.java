package com.harith.ecommerce.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Creating blueprint for product document 
@Document("product")
public class Product {
    @Id
    private String id;
    private String productName;
    private int price;
    private String description;
    private String productURL;
    private int stockQuanity;

    // Default Constructor
    Product() {

    }

    // Parameterized constructor
    Product(String PN, int PR, String DE, String PURL, int SQ) {
        this.productName = PN;
        this.price = PR;
        this.description = DE;
        this.productURL = PURL;
        this.stockQuanity = SQ;
    }

    public String getProductId() {
        return this.id;
    }

    public String getProductName() {
        return this.productName;
    }

    public int getPrice() {
        return this.price;
    }

    public String getDescription() {
        return this.description;
    }

    public String getProductURL() {
        return this.productURL;
    }

    public int getStockQuanity() {
        return this.stockQuanity;
    }

    public void setProductName(String PN) {
        this.productName = PN;
    }

    public void setPrice(int PR) {
        this.price = PR;
    }

    public void setDescription(String DE) {
        this.description = DE;
    }

    public void setProductURL(String PURL) {
        this.productURL = PURL;
    }

    public void setStockQuanity(int SQ) {
        this.stockQuanity = SQ;
    }

}
