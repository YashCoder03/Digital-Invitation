package com.shubhinvite.support;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Shared helper for tests that need an authenticated user + JWT. */
public final class AuthTestSupport {

    private AuthTestSupport() {
    }

    public record RegisteredUser(String token, UUID id, String email) {
    }

    public static RegisteredUser registerUser(MockMvc mockMvc, ObjectMapper objectMapper, String name, String email, String password) throws Exception {
        Map<String, String> request = Map.of("name", name, "email", email, "password", password);

        String body = mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        JsonNode json = objectMapper.readTree(body);
        return new RegisteredUser(
                json.get("token").asText(),
                UUID.fromString(json.get("user").get("id").asText()),
                json.get("user").get("email").asText()
        );
    }
}
