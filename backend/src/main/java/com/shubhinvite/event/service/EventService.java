package com.shubhinvite.event.service;

import com.shubhinvite.common.exception.ResourceNotFoundException;
import com.shubhinvite.event.dto.CreateEventRequest;
import com.shubhinvite.event.dto.EventResponse;
import com.shubhinvite.event.dto.ReorderEventsRequest;
import com.shubhinvite.event.dto.UpdateEventRequest;
import com.shubhinvite.event.entity.Event;
import com.shubhinvite.event.repository.EventRepository;
import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.repository.InvitationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final InvitationRepository invitationRepository;

    public EventService(EventRepository eventRepository, InvitationRepository invitationRepository) {
        this.eventRepository = eventRepository;
        this.invitationRepository = invitationRepository;
    }

    @Transactional
    public EventResponse create(UUID invitationId, UUID userId, CreateEventRequest request) {
        Invitation invitation = getOwnedInvitation(invitationId, userId);

        Event event = new Event();
        event.setInvitation(invitation);
        event.setName(request.name());
        event.setType(request.type());
        event.setDate(request.date());
        event.setTime(request.time());
        event.setVenue(request.venue());
        event.setAddress(request.address());
        event.setDisplayOrder(request.displayOrder() != null
                ? request.displayOrder()
                : (int) eventRepository.countByInvitation_Id(invitationId));

        return EventResponse.from(eventRepository.save(event));
    }

    @Transactional(readOnly = true)
    public List<EventResponse> list(UUID invitationId, UUID userId) {
        getOwnedInvitation(invitationId, userId);
        return eventRepository.findByInvitation_IdOrderByDisplayOrderAsc(invitationId).stream()
                .map(EventResponse::from)
                .toList();
    }

    @Transactional
    public EventResponse update(UUID eventId, UUID userId, UpdateEventRequest request) {
        Event event = getOwnedEvent(eventId, userId);

        event.setName(request.name());
        event.setType(request.type());
        event.setDate(request.date());
        event.setTime(request.time());
        event.setVenue(request.venue());
        event.setAddress(request.address());
        if (request.displayOrder() != null) {
            event.setDisplayOrder(request.displayOrder());
        }

        return EventResponse.from(event);
    }

    @Transactional
    public void delete(UUID eventId, UUID userId) {
        Event event = getOwnedEvent(eventId, userId);
        eventRepository.delete(event);
    }

    @Transactional
    public void reorder(UUID invitationId, UUID userId, ReorderEventsRequest request) {
        getOwnedInvitation(invitationId, userId);

        List<UUID> eventIds = request.eventIds();
        for (int index = 0; index < eventIds.size(); index++) {
            UUID eventId = eventIds.get(index);
            Event event = eventRepository.findByIdAndInvitation_Id(eventId, invitationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + eventId));
            event.setDisplayOrder(index);
        }
    }

    private Invitation getOwnedInvitation(UUID invitationId, UUID userId) {
        return invitationRepository.findByIdAndUser_Id(invitationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Invitation not found"));
    }

    private Event getOwnedEvent(UUID eventId, UUID userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        if (!event.getInvitation().getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Event not found");
        }

        return event;
    }
}
