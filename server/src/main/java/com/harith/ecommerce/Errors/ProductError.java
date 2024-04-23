package com.harith.ecommerce.Errors;

public enum ProductError {
    NO_PRODUCT_FOUND("no-product-found"),
    NOT_ENOUGH_STOCK("not-enough-stock"),
    INSUFFICIENT_FUNDS("not-enough-Relm");
public final String errorMessage;
    ProductError(String errorMessage){
        this.errorMessage = errorMessage;
    }
    public String getErrorMessage(){
        return this.errorMessage;
    }


}
