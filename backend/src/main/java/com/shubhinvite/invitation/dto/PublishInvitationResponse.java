package com.shubhinvite.invitation.dto;

import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.entity.InvitationStatus;

import java.util.UUID;

public record PublishInvitationResponse(UUID id, String slug, InvitationStatus status, String publicUrl) {

    public static PublishInvitationResponse from(Invitation invitation) {
        return new PublishInvitationResponse(
                invitation.getId(),
                invitation.getSlug(),
                invitation.getStatus(),
                "/invite/" + invitation.getSlug()
        );
    }
}
