package com.harith.ecommerce.Resources;

import java.util.Map;

public class CheckoutRequest {
    private String customerId;
    private Map<String, Integer> cartItem;

    public CheckoutRequest() {

    }

    public CheckoutRequest(String customerId, Map<String, Integer> cartItem) {
        this.customerId = customerId;
        this.cartItem = cartItem;
    }
public void setCustomerId(String customerId){this.customerId = customerId;}

public void setCustomerId(Map<String, Integer> cartItem) {
    this.cartItem = cartItem;
}
    public String getCustomerId(){return this.customerId;}

    public Map<String, Integer> getCartItem() {
        return this.cartItem;
    }

    public void addCartItem(String key, int value) {
        cartItem.put(key, value);
}
}
