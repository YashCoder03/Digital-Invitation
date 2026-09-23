package com.shubhinvite.rsvp.dto;

public record SubmitRsvpResponse(boolean success, String message) {

    public static SubmitRsvpResponse ok() {
        return new SubmitRsvpResponse(true, "RSVP submitted successfully");
    }
}
