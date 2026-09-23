package com.shubhinvite.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void registerReturnsTokenAndUser() throws Exception {
        Map<String, String> request = Map.of(
                "name", "Yash Deshmukh",
                "email", "Yash@Example.com",
                "password", "password123"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.email").value("yash@example.com"))
                .andExpect(jsonPath("$.user.name").value("Yash Deshmukh"));
    }

    @Test
    void registerDuplicateEmailFails() throws Exception {
        Map<String, String> request = Map.of(
                "name", "Yash Deshmukh",
                "email", "duplicate@example.com",
                "password", "password123"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    void registerRejectsInvalidPayload() throws Exception {
        Map<String, String> request = Map.of(
                "name", "",
                "email", "not-an-email",
                "password", "short"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.password").exists());
    }

    @Test
    void loginReturnsTokenForValidCredentials() throws Exception {
        Map<String, String> registerRequest = Map.of(
                "name", "Priya Patil",
                "email", "priya@example.com",
                "password", "password123"
        );
        mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated());

        Map<String, String> loginRequest = Map.of(
                "email", "priya@example.com",
                "password", "password123"
        );

        mockMvc.perform(post("/api/auth/login")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void loginFailsForInvalidPassword() throws Exception {
        Map<String, String> registerRequest = Map.of(
                "name", "Rahul Sharma",
                "email", "rahul@example.com",
                "password", "password123"
        );
        mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isCreated());

        Map<String, String> loginRequest = Map.of(
                "email", "rahul@example.com",
                "password", "wrong-password"
        );

        mockMvc.perform(post("/api/auth/login")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false));
    }
}
