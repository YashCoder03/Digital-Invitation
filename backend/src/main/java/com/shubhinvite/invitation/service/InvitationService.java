package com.shubhinvite.invitation.service;

import com.shubhinvite.common.exception.ResourceNotFoundException;
import com.shubhinvite.event.dto.PublicEventResponse;
import com.shubhinvite.event.repository.EventRepository;
import com.shubhinvite.invitation.dto.CreateInvitationRequest;
import com.shubhinvite.invitation.dto.InvitationResponse;
import com.shubhinvite.invitation.dto.PublicInvitationResponse;
import com.shubhinvite.invitation.dto.PublishInvitationResponse;
import com.shubhinvite.invitation.dto.UpdateInvitationRequest;
import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.entity.InvitationStatus;
import com.shubhinvite.invitation.repository.InvitationRepository;
import com.shubhinvite.photo.service.PhotoService;
import com.shubhinvite.user.entity.User;
import com.shubhinvite.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final PhotoService photoService;
    private final SlugGenerator slugGenerator;

    public InvitationService(InvitationRepository invitationRepository,
                              UserRepository userRepository,
                              EventRepository eventRepository,
                              PhotoService photoService,
                              SlugGenerator slugGenerator) {
        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.photoService = photoService;
        this.slugGenerator = slugGenerator;
    }

    @Transactional
    public InvitationResponse create(UUID userId, CreateInvitationRequest request) {
        User user = userRepository.getReferenceById(userId);

        Invitation invitation = new Invitation();
        invitation.setUser(user);
        invitation.setSlug(slugGenerator.generate(request.groomName(), request.brideName()));
        applyFields(invitation, request.templateId(), request.groomName(), request.brideName(),
                request.weddingDate(), request.weddingTime(), request.location(), request.message());

        return InvitationResponse.from(invitationRepository.save(invitation));
    }

    @Transactional(readOnly = true)
    public List<InvitationResponse> listForUser(UUID userId) {
        return invitationRepository.findByUser_IdOrderByCreatedAtDesc(userId).stream()
                .map(InvitationResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public InvitationResponse get(UUID invitationId, UUID userId) {
        return InvitationResponse.from(getOwnedInvitation(invitationId, userId));
    }

    @Transactional
    public InvitationResponse update(UUID invitationId, UUID userId, UpdateInvitationRequest request) {
        Invitation invitation = getOwnedInvitation(invitationId, userId);
        applyFields(invitation, request.templateId(), request.groomName(), request.brideName(),
                request.weddingDate(), request.weddingTime(), request.location(), request.message());
        return InvitationResponse.from(invitation);
    }

    @Transactional
    public void delete(UUID invitationId, UUID userId) {
        Invitation invitation = getOwnedInvitation(invitationId, userId);
        photoService.deleteAllForInvitation(invitationId);
        invitationRepository.delete(invitation);
    }

    @Transactional
    public PublishInvitationResponse publish(UUID invitationId, UUID userId) {
        Invitation invitation = getOwnedInvitation(invitationId, userId);
        invitation.setStatus(InvitationStatus.PUBLISHED);
        return PublishInvitationResponse.from(invitation);
    }

    @Transactional(readOnly = true)
    public PublicInvitationResponse getPublic(String slug) {
        Invitation invitation = invitationRepository.findBySlugAndStatus(slug, InvitationStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Invitation not found"));

        List<PublicEventResponse> events = eventRepository.findByInvitation_IdOrderByDisplayOrderAsc(invitation.getId())
                .stream()
                .map(PublicEventResponse::from)
                .toList();

        return new PublicInvitationResponse(
                invitation.getTemplateId(),
                invitation.getGroomName(),
                invitation.getBrideName(),
                invitation.getWeddingDate(),
                invitation.getWeddingTime(),
                invitation.getLocation(),
                invitation.getMessage(),
                events,
                null,
                List.of(),
                photoService.listPublic(invitation.getId()),
                new PublicInvitationResponse.RsvpAvailability(invitation.isRsvpEnabled())
        );
    }

    private Invitation getOwnedInvitation(UUID invitationId, UUID userId) {
        return invitationRepository.findByIdAndUser_Id(invitationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Invitation not found"));
    }

    private void applyFields(Invitation invitation, String templateId, String groomName, String brideName,
                              java.time.LocalDate weddingDate, java.time.LocalTime weddingTime,
                              String location, String message) {
        invitation.setTemplateId(templateId);
        invitation.setGroomName(groomName);
        invitation.setBrideName(brideName);
        invitation.setWeddingDate(weddingDate);
        invitation.setWeddingTime(weddingTime);
        invitation.setLocation(location);
        invitation.setMessage(message);
    }
}
