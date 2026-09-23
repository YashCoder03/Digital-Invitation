package com.shubhinvite.invitation.repository;

import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.entity.InvitationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvitationRepository extends JpaRepository<Invitation, UUID> {

    List<Invitation> findByUser_IdOrderByCreatedAtDesc(UUID userId);

    Optional<Invitation> findByIdAndUser_Id(UUID id, UUID userId);

    Optional<Invitation> findBySlugAndStatus(String slug, InvitationStatus status);

    boolean existsBySlug(String slug);
}
