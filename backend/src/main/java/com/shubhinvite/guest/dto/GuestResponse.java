package com.shubhinvite.guest.dto;

import com.shubhinvite.guest.entity.Guest;

import java.util.UUID;

/** Reserved for the guest-list management API planned for a later phase. */
public record GuestResponse(UUID id, String name, String phone, String email) {

    public static GuestResponse from(Guest guest) {
        return new GuestResponse(guest.getId(), guest.getName(), guest.getPhone(), guest.getEmail());
    }
}
