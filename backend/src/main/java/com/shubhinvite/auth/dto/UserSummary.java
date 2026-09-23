package com.shubhinvite.auth.dto;

import com.shubhinvite.user.entity.User;

import java.util.UUID;

public record UserSummary(UUID id, String name, String email) {

    public static UserSummary from(User user) {
        return new UserSummary(user.getId(), user.getName(), user.getEmail());
    }
}
