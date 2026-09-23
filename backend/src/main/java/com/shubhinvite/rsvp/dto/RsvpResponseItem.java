package com.shubhinvite.rsvp.dto;

import com.shubhinvite.rsvp.entity.RsvpResponse;

import java.time.Instant;
import java.util.UUID;

public record RsvpResponseItem(UUID id, String guestName, boolean attending, int guestCount, Instant createdAt) {

    public static RsvpResponseItem from(RsvpResponse response) {
        return new RsvpResponseItem(
                response.getId(),
                response.getGuestName(),
                response.isAttending(),
                response.getGuestCount(),
                response.getCreatedAt()
        );
    }
}
