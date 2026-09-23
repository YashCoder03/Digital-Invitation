package com.shubhinvite.common.exception;

/** Thrown when a uniqueness constraint (email, slug, ...) is violated. */
public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}
