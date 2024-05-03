package com.harith.ecommerce.Model;

import java.util.ArrayList;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Creating blueprint for user document 
@Document("user")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String gender;
    private String characterURL;
    private int availableMoney;
    private ArrayList<String> purchasedItems;

    // Default Constructor
    public User() {
        this.availableMoney = 3500;
        this.purchasedItems = new ArrayList<>();
    }

    // Parameterized constructor
    public User(String U, String PW, String G, String CURL) {
        this.username = U;
        this.password = PW;
        this.gender = G;
        this.characterURL = CURL;
        this.availableMoney = 3500;
        purchasedItems = new ArrayList<>();
    }

    // getters and setters for everything
    public String getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getGender() {
        return this.gender;
    }

    public String getCharacterURL() {
        return this.characterURL;
    }

    public int getAvailableMoney() {
        return this.availableMoney;
    }

    public ArrayList<String> getPurchasedItems() {
        return this.purchasedItems;
    }

    public void setUsername(String U) {
        this.username = U;
    }

    public void setPassword(String PW) {
        this.password = PW;
    }

    public void setGender(String G) {
        this.gender = G;
    }

    public void setCharacterURL(String CURL) {
        this.characterURL = CURL;
    }

    public void setAvailableMoney(int AM) {
        this.availableMoney = AM;
    }

    public void addPurchasedItem(String item) {
        this.purchasedItems.add(item);
    }

    public void addPurchasedItem(Set<String> item) {
        this.purchasedItems.addAll(item);
    }
    

    public void setPurchasedItems(ArrayList<String> PI) {
        this.purchasedItems = PI;
    }

}
