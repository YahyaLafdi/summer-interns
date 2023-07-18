package ensa.pfa.kitcoop.exception;

public class IncorrectCredentialsException extends RuntimeException{
    public IncorrectCredentialsException(String message) {
        super(message);
    }

    public IncorrectCredentialsException(String message, Throwable cause) {
        super(message, cause);
    }
}
