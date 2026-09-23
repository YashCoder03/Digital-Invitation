package com.shubhinvite.invitation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class InvitationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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

    @Test
    void createInvitation_returnsDraftWithGeneratedSlug() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "yash1@example.com", "password123");

        mockMvc.perform(post("/api/invitations")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleInvitationRequest("Yash Deshmukh", "Priya Patil"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value("DRAFT"))
                .andExpect(jsonPath("$.slug").value("yash-priya"))
                .andExpect(jsonPath("$.publicUrl").doesNotExist());
    }

    @Test
    void slugUniqueness_appendsSuffixForDuplicateNames() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "yash2@example.com", "password123");

        mockMvc.perform(post("/api/invitations")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleInvitationRequest("Yash Deshmukh", "Priya Patil"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("yash-priya"));

        mockMvc.perform(post("/api/invitations")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleInvitationRequest("Yash Deshmukh", "Priya Patil"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slug").value("yash-priya-2"));
    }

    @Test
    void updateInvitation_changesFields() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "yash3@example.com", "password123");
        String invitationId = createInvitationAndGetId(user, "Yash Deshmukh", "Priya Patil");

        Map<String, Object> update = sampleInvitationRequest("Yash Deshmukh", "Priya Patil");
        update.put("location", "Mumbai, Maharashtra");

        mockMvc.perform(put("/api/invitations/" + invitationId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(update)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.location").value("Mumbai, Maharashtra"));
    }

    @Test
    void deleteInvitation_removesIt() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "yash4@example.com", "password123");
        String invitationId = createInvitationAndGetId(user, "Yash Deshmukh", "Priya Patil");

        mockMvc.perform(delete("/api/invitations/" + invitationId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/invitations/" + invitationId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isNotFound());
    }

    @Test
    void publishInvitation_changesStatusAndReturnsPublicUrl() throws Exception {
        RegisteredUser user = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "yash5@example.com", "password123");
        String invitationId = createInvitationAndGetId(user, "Yash Deshmukh", "Priya Patil");

        mockMvc.perform(post("/api/invitations/" + invitationId + "/publish")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PUBLISHED"))
                .andExpect(jsonPath("$.publicUrl").value("/invite/yash-priya"));
    }

    @Test
    void userCannotAccessAnotherUsersInvitation() throws Exception {
        RegisteredUser owner = AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", "owner@example.com", "password123");
        RegisteredUser intruder = AuthTestSupport.registerUser(mockMvc, objectMapper, "Someone Else", "intruder@example.com", "password123");

        String invitationId = createInvitationAndGetId(owner, "Yash Deshmukh", "Priya Patil");

        mockMvc.perform(get("/api/invitations/" + invitationId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + intruder.token()))
                .andExpect(status().isNotFound());
    }

    @Test
    void unauthenticatedRequestIsRejected() throws Exception {
        mockMvc.perform(get("/api/invitations"))
                .andExpect(status().isUnauthorized());
    }

    private String createInvitationAndGetId(RegisteredUser user, String groom, String bride) throws Exception {
        String body = mockMvc.perform(post("/api/invitations")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleInvitationRequest(groom, bride))))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        JsonNode json = objectMapper.readTree(body);
        return json.get("id").asText();
    }
}
