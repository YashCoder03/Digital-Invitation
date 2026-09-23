package com.shubhinvite.common.response;

/** Standard error envelope for non-validation failures (404, 401, 403, 409, 500...). */
public record ErrorResponse(boolean success, String message) {

    public static ErrorResponse of(String message) {
        return new ErrorResponse(false, message);
    }
}
