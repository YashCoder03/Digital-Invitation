package com.shubhinvite.invitation.controller;

import com.shubhinvite.invitation.dto.CreateInvitationRequest;
import com.shubhinvite.invitation.dto.InvitationResponse;
import com.shubhinvite.invitation.dto.PublishInvitationResponse;
import com.shubhinvite.invitation.dto.UpdateInvitationRequest;
import com.shubhinvite.invitation.service.InvitationService;
import com.shubhinvite.security.SecurityUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/invitations")
@Tag(name = "Invitations", description = "Owner-only invitation CRUD and publishing (requires authentication)")
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @PostMapping
    @Operation(summary = "Create a new draft invitation")
    public ResponseEntity<InvitationResponse> create(@Valid @RequestBody CreateInvitationRequest request) {
        InvitationResponse response = invitationService.create(SecurityUtils.getCurrentUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "List invitations owned by the authenticated user")
    public ResponseEntity<List<InvitationResponse>> list() {
        return ResponseEntity.ok(invitationService.listForUser(SecurityUtils.getCurrentUserId()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an invitation you own")
    public ResponseEntity<InvitationResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(invitationService.get(id, SecurityUtils.getCurrentUserId()));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an invitation you own")
    public ResponseEntity<InvitationResponse> update(@PathVariable UUID id,
                                                       @Valid @RequestBody UpdateInvitationRequest request) {
        return ResponseEntity.ok(invitationService.update(id, SecurityUtils.getCurrentUserId(), request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an invitation you own")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        invitationService.delete(id, SecurityUtils.getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/publish")
    @Operation(summary = "Publish a draft invitation")
    public ResponseEntity<PublishInvitationResponse> publish(@PathVariable UUID id) {
        return ResponseEntity.ok(invitationService.publish(id, SecurityUtils.getCurrentUserId()));
    }
}
