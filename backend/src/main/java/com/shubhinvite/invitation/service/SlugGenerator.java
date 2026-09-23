package com.shubhinvite.invitation.service;

import com.shubhinvite.invitation.repository.InvitationRepository;
import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.regex.Pattern;

/** Builds a human-readable, unique slug such as "yash-priya", "yash-priya-2", ... */
@Component
public class SlugGenerator {

    private static final Pattern DIACRITICS = Pattern.compile("\\p{M}");
    private static final Pattern NON_ALPHANUMERIC = Pattern.compile("[^a-z0-9]+");

    private final InvitationRepository invitationRepository;

    public SlugGenerator(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }

    public String generate(String groomName, String brideName) {
        String base = slugify(firstName(groomName)) + "-" + slugify(firstName(brideName));
        String candidate = base;
        int suffix = 2;

        while (invitationRepository.existsBySlug(candidate)) {
            candidate = base + "-" + suffix;
            suffix++;
        }

        return candidate;
    }

    private String firstName(String fullName) {
        String trimmed = fullName.trim();
        int spaceIndex = trimmed.indexOf(' ');
        return spaceIndex > 0 ? trimmed.substring(0, spaceIndex) : trimmed;
    }

    private String slugify(String value) {
        String normalized = Normalizer.normalize(value, Normalizer.Form.NFD);
        String withoutDiacritics = DIACRITICS.matcher(normalized).replaceAll("");
        String slug = NON_ALPHANUMERIC.matcher(withoutDiacritics.toLowerCase()).replaceAll("-");
        slug = slug.replaceAll("^-+|-+$", "");
        return slug.isEmpty() ? "invite" : slug;
    }
}
