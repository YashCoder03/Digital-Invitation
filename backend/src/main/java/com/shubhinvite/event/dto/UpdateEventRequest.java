package com.shubhinvite.event.dto;

import com.shubhinvite.event.entity.EventType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record UpdateEventRequest(

        @NotBlank(message = "Event name is required")
        @Size(max = 150, message = "Event name must be at most 150 characters")
        String name,

        @NotNull(message = "Event type is required")
        EventType type,

        @NotNull(message = "Event date is required")
        LocalDate date,

        @NotNull(message = "Event time is required")
        LocalTime time,

        @Size(max = 255, message = "Venue must be at most 255 characters")
        String venue,

        @Size(max = 255, message = "Address must be at most 255 characters")
        String address,

        @Min(value = 0, message = "Display order must be zero or greater")
        Integer displayOrder
) {
}
