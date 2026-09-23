package com.shubhinvite.invitation.dto;

import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.entity.InvitationStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record InvitationResponse(
        UUID id,
        String templateId,
        String slug,
        InvitationStatus status,
        String groomName,
        String brideName,
        LocalDate weddingDate,
        LocalTime weddingTime,
        String location,
        String message,
        boolean rsvpEnabled,
        String publicUrl,
        Instant createdAt,
        Instant updatedAt
) {

    public static InvitationResponse from(Invitation invitation) {
        String publicUrl = invitation.getStatus() == InvitationStatus.PUBLISHED
                ? "/invite/" + invitation.getSlug()
                : null;

        return new InvitationResponse(
                invitation.getId(),
                invitation.getTemplateId(),
                invitation.getSlug(),
                invitation.getStatus(),
                invitation.getGroomName(),
                invitation.getBrideName(),
                invitation.getWeddingDate(),
                invitation.getWeddingTime(),
                invitation.getLocation(),
                invitation.getMessage(),
                invitation.isRsvpEnabled(),
                publicUrl,
                invitation.getCreatedAt(),
                invitation.getUpdatedAt()
        );
    }
}
