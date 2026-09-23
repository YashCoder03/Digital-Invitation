package com.shubhinvite.rsvp.service;

import com.shubhinvite.common.exception.BadRequestException;
import com.shubhinvite.common.exception.ResourceNotFoundException;
import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.entity.InvitationStatus;
import com.shubhinvite.invitation.repository.InvitationRepository;
import com.shubhinvite.rsvp.dto.RsvpResponseItem;
import com.shubhinvite.rsvp.dto.RsvpSummaryResponse;
import com.shubhinvite.rsvp.dto.SubmitRsvpRequest;
import com.shubhinvite.rsvp.dto.SubmitRsvpResponse;
import com.shubhinvite.rsvp.entity.RsvpResponse;
import com.shubhinvite.rsvp.repository.RsvpResponseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class RsvpService {

    private final InvitationRepository invitationRepository;
    private final RsvpResponseRepository rsvpResponseRepository;

    public RsvpService(InvitationRepository invitationRepository, RsvpResponseRepository rsvpResponseRepository) {
        this.invitationRepository = invitationRepository;
        this.rsvpResponseRepository = rsvpResponseRepository;
    }

    @Transactional
    public SubmitRsvpResponse submit(String slug, SubmitRsvpRequest request) {
        Invitation invitation = invitationRepository.findBySlugAndStatus(slug, InvitationStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Invitation not found"));

        if (!invitation.isRsvpEnabled()) {
            throw new BadRequestException("RSVP is not enabled for this invitation");
        }

        RsvpResponse response = new RsvpResponse();
        response.setInvitation(invitation);
        response.setGuestName(request.guestName().trim());
        response.setAttending(request.attending());
        response.setGuestCount(request.guestCount());
        rsvpResponseRepository.save(response);

        return SubmitRsvpResponse.ok();
    }

    @Transactional(readOnly = true)
    public RsvpSummaryResponse getSummary(UUID invitationId, UUID userId) {
        invitationRepository.findByIdAndUser_Id(invitationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Invitation not found"));

        List<RsvpResponse> responses = rsvpResponseRepository.findByInvitation_IdOrderByCreatedAtDesc(invitationId);

        long attending = responses.stream().filter(RsvpResponse::isAttending).count();
        long notAttending = responses.size() - attending;
        long totalGuests = responses.stream()
                .filter(RsvpResponse::isAttending)
                .mapToInt(RsvpResponse::getGuestCount)
                .sum();

        List<RsvpResponseItem> items = responses.stream().map(RsvpResponseItem::from).toList();

        return new RsvpSummaryResponse(responses.size(), attending, notAttending, totalGuests, items);
    }
}
