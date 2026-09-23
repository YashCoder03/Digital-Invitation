package com.shubhinvite.common.response;

import java.util.Map;

/** Error envelope returned for Bean Validation (400) failures with per-field messages. */
public record ValidationErrorResponse(int status, String message, Map<String, String> errors) {
}
