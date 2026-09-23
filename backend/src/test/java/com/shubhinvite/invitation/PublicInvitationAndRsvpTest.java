package com.shubhinvite.invitation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shubhinvite.invitation.entity.Invitation;
import com.shubhinvite.invitation.entity.InvitationStatus;
import com.shubhinvite.invitation.repository.InvitationRepository;
import com.shubhinvite.support.AuthTestSupport;
import com.shubhinvite.support.AuthTestSupport.RegisteredUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class PublicInvitationAndRsvpTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private InvitationRepository invitationRepository;

    private Map<String, Object> sampleInvitationRequest(String groom, String bride) {
        Map<String, Object> request = new LinkedHashMap<>();
        request.put("templateId", "paithani-elegance");
        request.put("groomName", groom);
        request.put("brideName", bride);
        request.put("weddingDate", "2027-01-18");
        request.put("weddingTime", "11:30");
        request.put("location", "Pune, Maharashtra");
        request.put("message", "You are invited");
        return request;
    }

    private String createInvitationAndGetSlug(RegisteredUser user, String groom, String bride) throws Exception {
        String body = mockMvc.perform(post("/api/invitations")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleInvitationRequest(groom, bride))))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(body).get("slug").asText();
    }

    private void publish(RegisteredUser user, String invitationId) throws Exception {
        mockMvc.perform(post("/api/invitations/" + invitationId + "/publish")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isOk());
    }

    @Test
    void publishedInvitation_isAccessibleThroughPublicEndpoint() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "pub1@example.com", "password123");
        String slug = createInvitationAndGetSlug(user, "Yash Deshmukh", "Priya Patil");
        Invitation invitation = invitationRepository.findBySlugAndStatus(slug, InvitationStatus.DRAFT).orElseThrow();
        publish(user, invitation.getId().toString());

        mockMvc.perform(get("/api/invitations/public/" + slug))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.groomName").value("Yash Deshmukh"))
                .andExpect(jsonPath("$.brideName").value("Priya Patil"))
                .andExpect(jsonPath("$.rsvp.enabled").value(true));
    }

    @Test
    void draftInvitation_isNotAccessibleThroughPublicEndpoint() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "pub2@example.com", "password123");
        String slug = createInvitationAndGetSlug(user, "Yash Deshmukh", "Priya Patil");

        mockMvc.perform(get("/api/invitations/public/" + slug))
                .andExpect(status().isNotFound());
    }

    @Test
    void invalidSlug_returnsNotFound() throws Exception {
        mockMvc.perform(get("/api/invitations/public/does-not-exist"))
                .andExpect(status().isNotFound());
    }

    @Test
    void validRsvp_succeedsForPublishedInvitation() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "rsvp1@example.com", "password123");
        String slug = createInvitationAndGetSlug(user, "Yash Deshmukh", "Priya Patil");
        UUID invitationId = invitationRepository.findBySlugAndStatus(slug, InvitationStatus.DRAFT).orElseThrow().getId();
        publish(user, invitationId.toString());

        Map<String, Object> rsvp = Map.of("guestName", "Rahul Sharma", "attending", true, "guestCount", 2);

        mockMvc.perform(post("/api/invitations/public/" + slug + "/rsvp")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(rsvp)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void invalidRsvp_missingGuestNameFailsValidation() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "rsvp2@example.com", "password123");
        String slug = createInvitationAndGetSlug(user, "Yash Deshmukh", "Priya Patil");
        UUID invitationId = invitationRepository.findBySlugAndStatus(slug, InvitationStatus.DRAFT).orElseThrow().getId();
        publish(user, invitationId.toString());

        Map<String, Object> rsvp = new LinkedHashMap<>();
        rsvp.put("guestName", "");
        rsvp.put("attending", true);
        rsvp.put("guestCount", 0);

        mockMvc.perform(post("/api/invitations/public/" + slug + "/rsvp")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(rsvp)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.guestName").exists())
                .andExpect(jsonPath("$.errors.guestCount").exists());
    }

    @Test
    void rsvpDisabled_returnsBadRequest() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "rsvp3@example.com", "password123");
        String slug = createInvitationAndGetSlug(user, "Yash Deshmukh", "Priya Patil");
        Invitation invitation = invitationRepository.findBySlugAndStatus(slug, InvitationStatus.DRAFT).orElseThrow();
        publish(user, invitation.getId().toString());

        invitation.setRsvpEnabled(false);
        invitationRepository.saveAndFlush(invitation);

        Map<String, Object> rsvp = Map.of("guestName", "Rahul Sharma", "attending", true, "guestCount", 2);

        mockMvc.perform(post("/api/invitations/public/" + slug + "/rsvp")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(rsvp)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void rsvpForUnpublishedInvitation_returnsNotFound() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "rsvp4@example.com", "password123");
        String slug = createInvitationAndGetSlug(user, "Yash Deshmukh", "Priya Patil");

        Map<String, Object> rsvp = Map.of("guestName", "Rahul Sharma", "attending", true, "guestCount", 2);

        mockMvc.perform(post("/api/invitations/public/" + slug + "/rsvp")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(rsvp)))
                .andExpect(status().isNotFound());
    }

    @Test
    void ownerCanViewRsvpSummary() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "rsvp5@example.com", "password123");
        String slug = createInvitationAndGetSlug(user, "Yash Deshmukh", "Priya Patil");
        UUID invitationId = invitationRepository.findBySlugAndStatus(slug, InvitationStatus.DRAFT).orElseThrow().getId();
        publish(user, invitationId.toString());

        Map<String, Object> rsvp = Map.of("guestName", "Rahul Sharma", "attending", true, "guestCount", 2);
        mockMvc.perform(post("/api/invitations/public/" + slug + "/rsvp")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(rsvp)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/invitations/" + invitationId + "/rsvps")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalResponses").value(1))
                .andExpect(jsonPath("$.attending").value(1))
                .andExpect(jsonPath("$.totalGuests").value(2));
    }
}
