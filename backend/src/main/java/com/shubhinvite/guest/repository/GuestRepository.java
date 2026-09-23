package com.shubhinvite.guest.repository;

import com.shubhinvite.guest.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GuestRepository extends JpaRepository<Guest, UUID> {

    List<Guest> findByInvitation_Id(UUID invitationId);
}
