package com.shubhinvite.rsvp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SubmitRsvpRequest(

        @NotBlank(message = "Guest name is required")
        @Size(max = 150, message = "Guest name must be at most 150 characters")
        String guestName,

        @NotNull(message = "Attending is required")
        Boolean attending,

        @NotNull(message = "Guest count is required")
        @Min(value = 1, message = "Guest count must be at least 1")
        Integer guestCount
) {
}
