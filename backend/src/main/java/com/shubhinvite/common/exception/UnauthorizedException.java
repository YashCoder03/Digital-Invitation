package com.shubhinvite.common.exception;

/** Thrown when the caller is not authenticated. */
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
