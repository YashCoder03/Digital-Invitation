package com.shubhinvite.photo.service;

/** Result of a successful Cloudinary upload. */
public record UploadResult(String url, String publicId) {
}
