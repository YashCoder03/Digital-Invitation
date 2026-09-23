package com.shubhinvite.common.exception;

/** Thrown when Cloudinary upload/delete fails; distinct from validation errors so it maps to 502. */
public class PhotoStorageException extends RuntimeException {
    public PhotoStorageException(String message) {
        super(message);
    }
}
