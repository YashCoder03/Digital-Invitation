package com.shubhinvite.invitation.controller;

import com.shubhinvite.invitation.dto.PublicInvitationResponse;
import com.shubhinvite.invitation.service.InvitationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/invitations/public")
@Tag(name = "Public Invitation", description = "Public, unauthenticated invitation lookup by slug")
public class PublicInvitationController {

    private final InvitationService invitationService;

    public PublicInvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get a published invitation by its public slug")
    public PublicInvitationResponse getBySlug(@PathVariable String slug) {
        return invitationService.getPublic(slug);
    }
}
