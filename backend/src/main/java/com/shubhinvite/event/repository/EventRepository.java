package com.shubhinvite.event.repository;

import com.shubhinvite.event.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {

    List<Event> findByInvitation_IdOrderByDisplayOrderAsc(UUID invitationId);

    Optional<Event> findByIdAndInvitation_Id(UUID id, UUID invitationId);

    long countByInvitation_Id(UUID invitationId);
}
