package com.shubhinvite.photo.repository;

import com.shubhinvite.photo.entity.InvitationPhoto;
import com.shubhinvite.photo.entity.PhotoType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PhotoRepository extends JpaRepository<InvitationPhoto, UUID> {

    List<InvitationPhoto> findByInvitation_IdOrderByDisplayOrderAsc(UUID invitationId);

    List<InvitationPhoto> findByInvitation_IdAndTypeOrderByDisplayOrderAsc(UUID invitationId, PhotoType type);

    Optional<InvitationPhoto> findByIdAndInvitation_Id(UUID id, UUID invitationId);

    long countByInvitation_IdAndType(UUID invitationId, PhotoType type);
}
