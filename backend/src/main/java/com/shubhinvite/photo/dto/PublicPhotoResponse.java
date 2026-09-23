package com.shubhinvite.photo.dto;

import com.shubhinvite.photo.entity.PhotoType;

/** Photo shape exposed on the public invitation endpoint - no id, no owner info. */
public record PublicPhotoResponse(String url, PhotoType type, int displayOrder) {
}
