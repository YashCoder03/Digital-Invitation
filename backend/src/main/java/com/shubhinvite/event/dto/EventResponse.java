package com.shubhinvite.event.dto;

import com.shubhinvite.event.entity.Event;
import com.shubhinvite.event.entity.EventType;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record EventResponse(
        UUID id,
        UUID invitationId,
        String name,
        EventType type,
        LocalDate date,
        LocalTime time,
        String venue,
        String address,
        int displayOrder,
        Instant createdAt,
        Instant updatedAt
) {

    public static EventResponse from(Event event) {
        return new EventResponse(
                event.getId(),
                event.getInvitation().getId(),
                event.getName(),
                event.getType(),
                event.getDate(),
                event.getTime(),
                event.getVenue(),
                event.getAddress(),
                event.getDisplayOrder(),
                event.getCreatedAt(),
                event.getUpdatedAt()
        );
    }
}
