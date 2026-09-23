package com.shubhinvite.event.dto;

import com.shubhinvite.event.entity.Event;
import com.shubhinvite.event.entity.EventType;

import java.time.LocalDate;
import java.time.LocalTime;

/** Event shape exposed on the public invitation endpoint - no invitation/internal ids. */
public record PublicEventResponse(
        String name,
        EventType type,
        LocalDate date,
        LocalTime time,
        String venue,
        String address,
        int displayOrder
) {

    public static PublicEventResponse from(Event event) {
        return new PublicEventResponse(
                event.getName(),
                event.getType(),
                event.getDate(),
                event.getTime(),
                event.getVenue(),
                event.getAddress(),
                event.getDisplayOrder()
        );
    }
}
