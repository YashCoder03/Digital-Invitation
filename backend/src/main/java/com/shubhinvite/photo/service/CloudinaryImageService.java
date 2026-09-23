package com.shubhinvite.photo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.shubhinvite.common.exception.PhotoStorageException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

/** Thin wrapper around the Cloudinary SDK: upload, delete, and build optimized delivery URLs. */
@Service
public class CloudinaryImageService {

    private final Cloudinary cloudinary;

    public CloudinaryImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public UploadResult upload(MultipartFile file, String folder) {
        try {
            Map<String, Object> options = ObjectUtils.asMap(
                    "folder", folder,
                    "public_id", UUID.randomUUID().toString(),
                    "resource_type", "image",
                    "overwrite", false
            );
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().upload(file.getBytes(), options);
            return new UploadResult((String) result.get("secure_url"), (String) result.get("public_id"));
        } catch (IOException e) {
            throw new PhotoStorageException("We couldn't upload your image. Please try again.");
        }
    }

    public void deleteAsset(String publicId) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            String status = String.valueOf(result.get("result"));
            if (!"ok".equals(status) && !"not found".equals(status)) {
                throw new PhotoStorageException("We couldn't delete this image. Please try again.");
            }
        } catch (IOException e) {
            throw new PhotoStorageException("We couldn't delete this image. Please try again.");
        }
    }

    /** Web-optimized delivery URL: capped size, automatic format/quality for mobile-friendly loading. */
    public String buildDeliveryUrl(String publicId) {
        return cloudinary.url()
                .secure(true)
                .transformation(new Transformation<>()
                        .width(1600)
                        .crop("limit")
                        .quality("auto")
                        .fetchFormat("auto"))
                .generate(publicId);
    }
}
