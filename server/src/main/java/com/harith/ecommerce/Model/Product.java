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
    private String sellerName;
    private String sellerId;
    private String vocation;

    // Default Constructor
    public Product() {

    }

    // Parameterized constructor
    public Product(String PN, int PR, String DE, String PURL, int SQ, String SN, String SI, String V) {
        this.productName = PN;
        this.price = PR;
        this.description = DE;
        this.productURL = PURL;
        this.stockQuanity = SQ;
        this.sellerName = SN;
        this.sellerId = SI;
        this.vocation = V;

    }
    public void setVocation(String V){this.vocation = V;}

    public String getVocation() {
    return this.vocation;
}
    
    public void setSellerId(String SI){this.sellerId = SI;}

    public String getSellerId() {
    return this.sellerId;
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
    public void SetSellerName(String SN){this.sellerName = SN;}

    public String getSellerName() {
        return this.sellerName;
    
    }

}
