package com.harith.ecommerce.Resources;


public class RegisterRequest {
    private String username;
    private String password;
    private String gender;
    private String characterURL;

    public RegisterRequest() {
    }

    public RegisterRequest(String UN, String PW, String G, String CURL) {
        this.username = UN;
        this.password = PW;
        this.gender = G;
        this.characterURL = CURL;
    }

    public void setUsername(String UN) {
        this.username = UN;
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
}
