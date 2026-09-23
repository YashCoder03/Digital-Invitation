package com.shubhinvite.event.controller;

import com.shubhinvite.event.dto.CreateEventRequest;
import com.shubhinvite.event.dto.EventResponse;
import com.shubhinvite.event.dto.ReorderEventsRequest;
import com.shubhinvite.event.dto.UpdateEventRequest;
import com.shubhinvite.event.service.EventService;
import com.shubhinvite.security.SecurityUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "Events", description = "Wedding event schedule management (requires authentication)")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/api/invitations/{invitationId}/events")
    @Operation(summary = "Add an event to an invitation")
    public ResponseEntity<EventResponse> create(@PathVariable UUID invitationId,
                                                 @Valid @RequestBody CreateEventRequest request) {
        EventResponse response = eventService.create(invitationId, SecurityUtils.getCurrentUserId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/api/invitations/{invitationId}/events")
    @Operation(summary = "List events for an invitation")
    public ResponseEntity<List<EventResponse>> list(@PathVariable UUID invitationId) {
        return ResponseEntity.ok(eventService.list(invitationId, SecurityUtils.getCurrentUserId()));
    }

    @PutMapping("/api/events/{eventId}")
    @Operation(summary = "Update an event")
    public ResponseEntity<EventResponse> update(@PathVariable UUID eventId,
                                                 @Valid @RequestBody UpdateEventRequest request) {
        return ResponseEntity.ok(eventService.update(eventId, SecurityUtils.getCurrentUserId(), request));
    }

    @DeleteMapping("/api/events/{eventId}")
    @Operation(summary = "Delete an event")
    public ResponseEntity<Void> delete(@PathVariable UUID eventId) {
        eventService.delete(eventId, SecurityUtils.getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/api/invitations/{invitationId}/events/reorder")
    @Operation(summary = "Reorder events within an invitation")
    public ResponseEntity<Void> reorder(@PathVariable UUID invitationId,
                                         @Valid @RequestBody ReorderEventsRequest request) {
        eventService.reorder(invitationId, SecurityUtils.getCurrentUserId(), request);
        return ResponseEntity.noContent().build();
    }
}
