package com.shubhinvite.photo.dto;

import com.shubhinvite.photo.entity.PhotoType;

import java.util.UUID;

public record PhotoResponse(UUID id, String url, PhotoType type, int displayOrder) {
}
