package com.shubhinvite.photo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shubhinvite.photo.service.CloudinaryImageService;
import com.shubhinvite.photo.service.UploadResult;
import com.shubhinvite.support.AuthTestSupport;
import com.shubhinvite.support.AuthTestSupport.RegisteredUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class PhotoControllerTest {

    private static final byte[] JPEG_BYTES = {(byte) 0xFF, (byte) 0xD8, (byte) 0xFF, 0, 0, 0, 0, 0, 0, 0, 0, 0};

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CloudinaryImageService cloudinaryImageService;

    private RegisteredUser registerAndStubCloudinary(String email) throws Exception {
        when(cloudinaryImageService.upload(any(), anyString()))
                .thenAnswer(invocation -> new UploadResult(
                        "https://res.cloudinary.com/demo/image/upload/test.jpg",
                        "shubhinvite/invitations/test/" + java.util.UUID.randomUUID()));
        when(cloudinaryImageService.buildDeliveryUrl(anyString()))
                .thenAnswer(invocation -> "https://res.cloudinary.com/demo/image/upload/q_auto,f_auto/" + invocation.getArgument(0));
        doNothing().when(cloudinaryImageService).deleteAsset(anyString());

        return AuthTestSupport.registerUser(mockMvc, objectMapper, "Yash Deshmukh", email, "password123");
    }

    private Map<String, Object> sampleInvitationRequest() {
        Map<String, Object> request = new LinkedHashMap<>();
        request.put("templateId", "paithani-elegance");
        request.put("groomName", "Yash Deshmukh");
        request.put("brideName", "Priya Patil");
        request.put("weddingDate", "2027-01-18");
        request.put("weddingTime", "11:30");
        request.put("location", "Pune, Maharashtra");
        request.put("message", "You are invited");
        return request;
    }

    private String createInvitation(RegisteredUser user) throws Exception {
        String body = mockMvc.perform(post("/api/invitations")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(sampleInvitationRequest())))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).get("id").asText();
    }

    @Test
    void uploadPhoto_succeedsForValidJpeg() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo1@example.com");
        String invitationId = createInvitation(user);

        MockMultipartFile file = new MockMultipartFile("file", "couple.jpg", "image/jpeg", JPEG_BYTES);

        mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "COUPLE")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value("COUPLE"))
                .andExpect(jsonPath("$.url").exists());
    }

    @Test
    void uploadPhoto_rejectsUnrecognizedFileContent() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo2@example.com");
        String invitationId = createInvitation(user);

        MockMultipartFile file = new MockMultipartFile("file", "fake.jpg", "image/jpeg", "%PDF-1.4 not really an image".getBytes());

        mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "GALLERY")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isBadRequest());
    }

    @Test
    void uploadPhoto_rejectsFilesLargerThan10Mb() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo3@example.com");
        String invitationId = createInvitation(user);

        byte[] oversized = new byte[11 * 1024 * 1024];
        oversized[0] = (byte) 0xFF;
        oversized[1] = (byte) 0xD8;
        oversized[2] = (byte) 0xFF;
        MockMultipartFile file = new MockMultipartFile("file", "big.jpg", "image/jpeg", oversized);

        mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "GALLERY")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Image must be smaller than 10 MB"));
    }

    @Test
    void uploadPhoto_requiresAuthentication() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo4@example.com");
        String invitationId = createInvitation(user);

        MockMultipartFile file = new MockMultipartFile("file", "couple.jpg", "image/jpeg", JPEG_BYTES);

        mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "COUPLE"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void uploadPhoto_ownerOnly() throws Exception {
        RegisteredUser owner = registerAndStubCloudinary("photo5@example.com");
        RegisteredUser intruder = registerAndStubCloudinary("photo6@example.com");
        String invitationId = createInvitation(owner);

        MockMultipartFile file = new MockMultipartFile("file", "couple.jpg", "image/jpeg", JPEG_BYTES);

        mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "COUPLE")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + intruder.token()))
                .andExpect(status().isNotFound());
    }

    @Test
    void listPhotos_returnsUploadedPhotos() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo7@example.com");
        String invitationId = createInvitation(user);

        MockMultipartFile file = new MockMultipartFile("file", "g1.jpg", "image/jpeg", JPEG_BYTES);
        mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "GALLERY")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/invitations/" + invitationId + "/photos")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].type").value("GALLERY"));
    }

    @Test
    void deletePhoto_removesIt() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo8@example.com");
        String invitationId = createInvitation(user);

        MockMultipartFile file = new MockMultipartFile("file", "g1.jpg", "image/jpeg", JPEG_BYTES);
        String body = mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "GALLERY")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        String photoId = objectMapper.readTree(body).get("id").asText();

        mockMvc.perform(delete("/api/photos/" + photoId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/invitations/" + invitationId + "/photos")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void reorderPhotos_updatesDisplayOrder() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo9@example.com");
        String invitationId = createInvitation(user);

        String firstId = uploadGalleryPhoto(invitationId, user, "g1.jpg");
        String secondId = uploadGalleryPhoto(invitationId, user, "g2.jpg");

        Map<String, Object> reorderRequest = Map.of("photoIds", java.util.List.of(secondId, firstId));

        mockMvc.perform(patch("/api/invitations/" + invitationId + "/photos/reorder")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token())
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(reorderRequest)))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/invitations/" + invitationId + "/photos")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(secondId))
                .andExpect(jsonPath("$[1].id").value(firstId));
    }

    @Test
    void publishedInvitation_exposesPhotosPublicly() throws Exception {
        RegisteredUser user = registerAndStubCloudinary("photo10@example.com");
        String invitationId = createInvitation(user);
        uploadGalleryPhoto(invitationId, user, "g1.jpg");

        String slug = objectMapper.readTree(
                mockMvc.perform(post("/api/invitations/" + invitationId + "/publish")
                                .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                        .andExpect(status().isOk())
                        .andReturn().getResponse().getContentAsString()
        ).get("slug").asText();

        mockMvc.perform(get("/api/invitations/public/" + slug))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.photos.length()").value(1))
                .andExpect(jsonPath("$.photos[0].type").value("GALLERY"));
    }

    private String uploadGalleryPhoto(String invitationId, RegisteredUser user, String filename) throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", filename, "image/jpeg", JPEG_BYTES);
        String body = mockMvc.perform(multipart("/api/invitations/" + invitationId + "/photos")
                        .file(file)
                        .param("type", "GALLERY")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + user.token()))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).get("id").asText();
    }
}
