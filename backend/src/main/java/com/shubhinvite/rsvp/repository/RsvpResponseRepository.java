package com.shubhinvite.rsvp.repository;

import com.shubhinvite.rsvp.entity.RsvpResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RsvpResponseRepository extends JpaRepository<RsvpResponse, UUID> {

    List<RsvpResponse> findByInvitation_IdOrderByCreatedAtDesc(UUID invitationId);
}
