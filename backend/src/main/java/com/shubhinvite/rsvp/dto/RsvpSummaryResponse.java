package com.shubhinvite.rsvp.dto;

import java.util.List;

public record RsvpSummaryResponse(
        long totalResponses,
        long attending,
        long notAttending,
        long totalGuests,
        List<RsvpResponseItem> responses
) {
}
