package com.shubhinvite.photo.controller;

import com.shubhinvite.photo.dto.PhotoResponse;
import com.shubhinvite.photo.dto.ReorderPhotosRequest;
import com.shubhinvite.photo.entity.PhotoType;
import com.shubhinvite.photo.service.PhotoService;
import com.shubhinvite.security.SecurityUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@Tag(name = "Photos", description = "Invitation photo upload/management (requires authentication)")
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping(value = "/api/invitations/{invitationId}/photos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload a photo (COUPLE, GALLERY, or FAMILY) to an invitation")
    public ResponseEntity<PhotoResponse> upload(@PathVariable UUID invitationId,
                                                 @RequestParam("file") MultipartFile file,
                                                 @RequestParam("type") PhotoType type) {
        PhotoResponse response = photoService.upload(invitationId, SecurityUtils.getCurrentUserId(), type, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/api/invitations/{invitationId}/photos")
    @Operation(summary = "List photos for an invitation you own")
    public ResponseEntity<List<PhotoResponse>> list(@PathVariable UUID invitationId) {
        return ResponseEntity.ok(photoService.list(invitationId, SecurityUtils.getCurrentUserId()));
    }

    @DeleteMapping("/api/photos/{photoId}")
    @Operation(summary = "Delete a photo you own")
    public ResponseEntity<Void> delete(@PathVariable UUID photoId) {
        photoService.delete(photoId, SecurityUtils.getCurrentUserId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/api/invitations/{invitationId}/photos/reorder")
    @Operation(summary = "Reorder photos within an invitation")
    public ResponseEntity<Void> reorder(@PathVariable UUID invitationId,
                                         @Valid @RequestBody ReorderPhotosRequest request) {
        photoService.reorder(invitationId, SecurityUtils.getCurrentUserId(), request.photoIds());
        return ResponseEntity.noContent().build();
    }
}
