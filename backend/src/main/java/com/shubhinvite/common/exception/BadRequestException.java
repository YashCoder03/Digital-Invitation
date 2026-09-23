package com.shubhinvite.common.exception;

/** Thrown for semantically invalid requests that are not simple bean-validation failures. */
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
