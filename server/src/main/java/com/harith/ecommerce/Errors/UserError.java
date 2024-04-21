package com.harith.ecommerce.Errors;

public enum UserError {
    NO_USER_FOUND("no-user-found"),
    USERNAME_ALREADY_EXISTS("username-already-exists"),
    WRONG_CREDENTIALS("wrong-credentials");

    public final String errorMessage;

    UserError(String errorMessage){
        this.errorMessage = errorMessage;
    }
    public String getErrorMessage(){
        return this.errorMessage;
    }
}
