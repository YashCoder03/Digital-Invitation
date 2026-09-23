package com.shubhinvite.event.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.UUID;

public record ReorderEventsRequest(

        @NotEmpty(message = "eventIds is required")
        List<UUID> eventIds
) {
}
