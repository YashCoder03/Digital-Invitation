package com.shubhinvite.security;

import com.shubhinvite.common.exception.UnauthorizedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

/** Convenience access to the authenticated user id/email; never trust a user id sent by the client. */
public final class SecurityUtils {

    private SecurityUtils() {
    }

    public static CurrentUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUser currentUser)) {
            throw new UnauthorizedException("Authentication is required");
        }
        return currentUser;
    }

    public static UUID getCurrentUserId() {
        return getCurrentUser().id();
    }
}
