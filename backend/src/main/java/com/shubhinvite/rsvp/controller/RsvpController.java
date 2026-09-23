package com.shubhinvite.rsvp.controller;

import com.shubhinvite.rsvp.dto.RsvpSummaryResponse;
import com.shubhinvite.rsvp.dto.SubmitRsvpRequest;
import com.shubhinvite.rsvp.dto.SubmitRsvpResponse;
import com.shubhinvite.rsvp.service.RsvpService;
import com.shubhinvite.security.SecurityUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@Tag(name = "RSVP", description = "Public RSVP submission and owner-only RSVP summary")
public class RsvpController {

    private final RsvpService rsvpService;

    public RsvpController(RsvpService rsvpService) {
        this.rsvpService = rsvpService;
    }

    @PostMapping("/api/invitations/public/{slug}/rsvp")
    @Operation(summary = "Submit an RSVP for a published invitation (no authentication required)")
    public ResponseEntity<SubmitRsvpResponse> submit(@PathVariable String slug,
                                                      @Valid @RequestBody SubmitRsvpRequest request) {
        return ResponseEntity.ok(rsvpService.submit(slug, request));
    }

    @GetMapping("/api/invitations/{invitationId}/rsvps")
    @Operation(summary = "View RSVP responses for an invitation you own")
    public ResponseEntity<RsvpSummaryResponse> getSummary(@PathVariable UUID invitationId) {
        return ResponseEntity.ok(rsvpService.getSummary(invitationId, SecurityUtils.getCurrentUserId()));
    }
}
