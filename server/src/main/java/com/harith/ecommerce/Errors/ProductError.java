package com.harith.ecommerce.Errors;

public enum ProductError {
    NO_PRODUCT_FOUND("No-Product-Found"),
    NOT_ENOUGH_STOCK("Not-Enough-Stock"),
    INSUFFICIENT_FUNDS("Not-Enough-Relm"),
    CANNOT_BUY_YOUR_OWN_PRODUCT("Cannot-Buy-Your-Own-Product");
    public final String errorMessage;
    ProductError(String errorMessage){
        this.errorMessage = errorMessage;
    }
    public String getErrorMessage(){
        return this.errorMessage;
    }


}
