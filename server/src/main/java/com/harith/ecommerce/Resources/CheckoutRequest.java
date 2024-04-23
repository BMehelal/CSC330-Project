package com.harith.ecommerce.Resources;

import java.util.HashMap;
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

    public String getCustomerId(){return this.customerId;}

    public Map<String, Integer> getCartItem() {
        return this.cartItem;
    }
        public void setCartItem(Map<String, Integer> cartItem) {
            this.cartItem = cartItem;
    }

    public void addCartItem(String key, int value) {
        if (cartItem == null) {
            cartItem = new HashMap<>();
        }
        cartItem.put(key, value);
    }
}
