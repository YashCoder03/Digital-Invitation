package com.shubhinvite.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import com.shubhinvite.photo.entity.PhotoType;

/** MVP per-invitation photo limits, kept in one configurable place instead of scattered constants. */
@Configuration
@ConfigurationProperties(prefix = "app.photos.limits")
public class PhotoLimitsProperties {

    private int couple = 1;
    private int gallery = 20;
    private int family = 5;

    public int getCouple() {
        return couple;
    }

    public void setCouple(int couple) {
        this.couple = couple;
    }

    public int getGallery() {
        return gallery;
    }

    public void setGallery(int gallery) {
        this.gallery = gallery;
    }

    public int getFamily() {
        return family;
    }

    public void setFamily(int family) {
        this.family = family;
    }

    public int limitFor(PhotoType type) {
        return switch (type) {
            case COUPLE -> couple;
            case GALLERY -> gallery;
            case FAMILY -> family;
        };
    }
}
