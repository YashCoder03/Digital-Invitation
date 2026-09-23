package com.shubhinvite.common.exception;

/** Thrown when an authenticated user tries to access a resource they do not own. */
public class ForbiddenException extends RuntimeException {
    public ForbiddenException(String message) {
        super(message);
    }
}
