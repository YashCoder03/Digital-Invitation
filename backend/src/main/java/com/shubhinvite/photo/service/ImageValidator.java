package com.shubhinvite.photo.service;

import com.shubhinvite.common.exception.BadRequestException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Set;

/** Validates uploaded images by both declared content-type and actual file signature (magic bytes). */
final class ImageValidator {

    static final long MAX_SIZE_BYTES = 10L * 1024 * 1024;
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of("image/jpeg", "image/png", "image/webp");

    private ImageValidator() {
    }

    static void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Please choose an image to upload.");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new BadRequestException("Image must be smaller than 10 MB");
        }

        String declaredType = file.getContentType();
        if (declaredType == null || !ALLOWED_CONTENT_TYPES.contains(declaredType)) {
            throw new BadRequestException("Only JPEG, PNG, or WEBP images are supported.");
        }

        String sniffedType = sniff(file);
        if (sniffedType == null || !ALLOWED_CONTENT_TYPES.contains(sniffedType)) {
            throw new BadRequestException("Only JPEG, PNG, or WEBP images are supported.");
        }
    }

    /** Reads the file's magic bytes so a renamed/mislabeled file can't slip past the declared content type. */
    private static String sniff(MultipartFile file) {
        try (InputStream in = file.getInputStream()) {
            byte[] header = in.readNBytes(12);
            return detect(header);
        } catch (IOException e) {
            return null;
        }
    }

    private static String detect(byte[] b) {
        if (b.length >= 3 && (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 && (b[2] & 0xFF) == 0xFF) {
            return "image/jpeg";
        }
        if (b.length >= 8 && (b[0] & 0xFF) == 0x89 && b[1] == 'P' && b[2] == 'N' && b[3] == 'G') {
            return "image/png";
        }
        if (b.length >= 12 && b[0] == 'R' && b[1] == 'I' && b[2] == 'F' && b[3] == 'F'
                && b[8] == 'W' && b[9] == 'E' && b[10] == 'B' && b[11] == 'P') {
            return "image/webp";
        }
        return null;
    }
}
