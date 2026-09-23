package com.shubhinvite.photo.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.UUID;

public record ReorderPhotosRequest(

        @NotEmpty(message = "photoIds is required")
        List<UUID> photoIds
) {
}
