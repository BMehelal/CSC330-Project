package com.harith.ecommerce.Resources;



public class LoginRequest {
     
     private String username;
     private String password;

    LoginRequest(String UN, String PW) {
        this.username = UN;
        this.password = PW;
    }
public void setUsername(String UN){this.username = UN;}

public void setPassword(String PW) {
    this.password = PW;
}
    public String getUsername(){return this.username;}
public String getPassword(){return this.password;}
}
