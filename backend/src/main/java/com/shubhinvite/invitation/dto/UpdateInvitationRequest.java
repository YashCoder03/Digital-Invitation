package com.shubhinvite.invitation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public record UpdateInvitationRequest(

        @NotBlank(message = "Template is required")
        @Size(max = 100, message = "Template id must be at most 100 characters")
        String templateId,

        @NotBlank(message = "Groom name is required")
        @Size(max = 150, message = "Groom name must be at most 150 characters")
        String groomName,

        @NotBlank(message = "Bride name is required")
        @Size(max = 150, message = "Bride name must be at most 150 characters")
        String brideName,

        @NotNull(message = "Wedding date is required")
        LocalDate weddingDate,

        @NotNull(message = "Wedding time is required")
        LocalTime weddingTime,

        @NotBlank(message = "Location is required")
        @Size(max = 255, message = "Location must be at most 255 characters")
        String location,

        @Size(max = 2000, message = "Message must be at most 2000 characters")
        String message
) {
}
