package com.shubhinvite.auth.dto;

public record AuthResponse(String token, UserSummary user) {
}
