package com.shubhinvite.invitation.dto;

import com.shubhinvite.event.dto.PublicEventResponse;
import com.shubhinvite.photo.dto.PublicPhotoResponse;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/** Public-facing invitation shape: no user info, no internal ids, no draft data. */
public record PublicInvitationResponse(
        String templateId,
        String groomName,
        String brideName,
        LocalDate weddingDate,
        LocalTime weddingTime,
        String location,
        String message,
        List<PublicEventResponse> events,
        String venue,
        List<String> contacts,
        List<PublicPhotoResponse> photos,
        RsvpAvailability rsvp
) {

    public record RsvpAvailability(boolean enabled) {
    }
}
