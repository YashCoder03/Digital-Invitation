package com.shubhinvite.photo.service;

import com.shubhinvite.common.exception.BadRequestException;
import com.shubhinvite.common.exception.ResourceNotFoundException;
import com.shubhinvite.config.PhotoLimitsProperties;
import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.repository.InvitationRepository;
import com.shubhinvite.photo.dto.PhotoResponse;
import com.shubhinvite.photo.dto.PublicPhotoResponse;
import com.shubhinvite.photo.entity.InvitationPhoto;
import com.shubhinvite.photo.entity.PhotoType;
import com.shubhinvite.photo.repository.PhotoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final InvitationRepository invitationRepository;
    private final CloudinaryImageService cloudinaryImageService;
    private final PhotoLimitsProperties limits;

    public PhotoService(PhotoRepository photoRepository,
                         InvitationRepository invitationRepository,
                         CloudinaryImageService cloudinaryImageService,
                         PhotoLimitsProperties limits) {
        this.photoRepository = photoRepository;
        this.invitationRepository = invitationRepository;
        this.cloudinaryImageService = cloudinaryImageService;
        this.limits = limits;
    }

    @Transactional
    public PhotoResponse upload(UUID invitationId, UUID userId, PhotoType type, MultipartFile file) {
        Invitation invitation = getOwnedInvitation(invitationId, userId);
        ImageValidator.validate(file);

        if (type != PhotoType.COUPLE) {
            long existingCount = photoRepository.countByInvitation_IdAndType(invitationId, type);
            if (existingCount >= limits.limitFor(type)) {
                throw new BadRequestException("You've reached the maximum number of photos for this section.");
            }
        }

        String folder = "shubhinvite/invitations/%s/%s".formatted(invitationId, type.name().toLowerCase());
        UploadResult uploaded = cloudinaryImageService.upload(file, folder);

        if (type == PhotoType.COUPLE) {
            // Single-slot type: a new upload always replaces whatever was there before.
            for (InvitationPhoto previous : photoRepository.findByInvitation_IdAndTypeOrderByDisplayOrderAsc(invitationId, type)) {
                cloudinaryImageService.deleteAsset(previous.getPublicId());
                photoRepository.delete(previous);
            }
        }

        InvitationPhoto photo = new InvitationPhoto();
        photo.setInvitation(invitation);
        photo.setUrl(uploaded.url());
        photo.setPublicId(uploaded.publicId());
        photo.setType(type);
        photo.setDisplayOrder((int) photoRepository.countByInvitation_IdAndType(invitationId, type));

        InvitationPhoto saved = photoRepository.save(photo);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<PhotoResponse> list(UUID invitationId, UUID userId) {
        getOwnedInvitation(invitationId, userId);
        return photoRepository.findByInvitation_IdOrderByDisplayOrderAsc(invitationId).stream()
                .map(this::toResponse)
                .toList();
    }

    /** No ownership check - callers must have already confirmed the invitation is public/published. */
    @Transactional(readOnly = true)
    public List<PublicPhotoResponse> listPublic(UUID invitationId) {
        return photoRepository.findByInvitation_IdOrderByDisplayOrderAsc(invitationId).stream()
                .map(photo -> new PublicPhotoResponse(
                        cloudinaryImageService.buildDeliveryUrl(photo.getPublicId()),
                        photo.getType(),
                        photo.getDisplayOrder()))
                .toList();
    }

    @Transactional
    public void delete(UUID photoId, UUID userId) {
        InvitationPhoto photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new ResourceNotFoundException("Photo not found"));

        if (!photo.getInvitation().getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Photo not found");
        }

        cloudinaryImageService.deleteAsset(photo.getPublicId());
        photoRepository.delete(photo);
    }

    @Transactional
    public void reorder(UUID invitationId, UUID userId, List<UUID> photoIds) {
        getOwnedInvitation(invitationId, userId);

        for (int index = 0; index < photoIds.size(); index++) {
            InvitationPhoto photo = photoRepository.findByIdAndInvitation_Id(photoIds.get(index), invitationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Photo not found: " + photoIds.get(index)));
            photo.setDisplayOrder(index);
        }
    }

    /** Deletes every Cloudinary asset + DB row for an invitation - called right before the invitation itself is deleted. */
    @Transactional
    public void deleteAllForInvitation(UUID invitationId) {
        for (InvitationPhoto photo : photoRepository.findByInvitation_IdOrderByDisplayOrderAsc(invitationId)) {
            cloudinaryImageService.deleteAsset(photo.getPublicId());
            photoRepository.delete(photo);
        }
    }

    private PhotoResponse toResponse(InvitationPhoto photo) {
        return new PhotoResponse(
                photo.getId(),
                cloudinaryImageService.buildDeliveryUrl(photo.getPublicId()),
                photo.getType(),
                photo.getDisplayOrder());
    }

    private Invitation getOwnedInvitation(UUID invitationId, UUID userId) {
        return invitationRepository.findByIdAndUser_Id(invitationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Invitation not found"));
    }
}
