package com.shubhinvite.security;

import java.util.UUID;

/** Authenticated principal derived from a validated JWT; set as the Authentication principal. */
public record CurrentUser(UUID id, String email) {
}
