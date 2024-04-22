package com.harith.ecommerce.Model;

public class CartItem {
    private String productId;
    private int quanity;
public CartItem(){}

public CartItem(String PI, int Q) {
    this.productId = PI;
    this.quanity = Q;
}
    public void setProductId(String PI) {
        this.productId = PI;
    }


public void setQuanity(int Q) {
    this.quanity = Q;
}
    public String getProductId(){return this.productId;}
public int getQuanity(){return this.quanity;}
}
