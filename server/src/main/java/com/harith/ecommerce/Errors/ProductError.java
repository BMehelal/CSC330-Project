package com.harith.ecommerce.Errors;

public enum ProductError {
    NO_PRODUCT_FOUND("no-product-found"),
    NOT_ENOUGH_STOCK("not-enough-stock"),
    INSUFFICIENT_FUNDS("not-enough-Relm"),
    CANNOT_BUY_YOUR_OWN_PRODUCT("cannot-buy-your-own-product");
    public final String errorMessage;
    ProductError(String errorMessage){
        this.errorMessage = errorMessage;
    }
    public String getErrorMessage(){
        return this.errorMessage;
    }


}
