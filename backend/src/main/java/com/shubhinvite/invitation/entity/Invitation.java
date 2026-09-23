package com.shubhinvite.invitation.entity;

import com.shubhinvite.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "invitations")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Invitation {

    @Id
    @UuidGenerator
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "template_id", nullable = false, length = 100)
    private String templateId;

    @Column(nullable = false, unique = true, length = 160)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private InvitationStatus status = InvitationStatus.DRAFT;

    @Column(name = "groom_name", nullable = false, length = 150)
    private String groomName;

    @Column(name = "bride_name", nullable = false, length = 150)
    private String brideName;

    @Column(name = "wedding_date", nullable = false)
    private LocalDate weddingDate;

    @Column(name = "wedding_time", nullable = false)
    private LocalTime weddingTime;

    @Column(nullable = false, length = 255)
    private String location;

    @Column(columnDefinition = "text")
    private String message;

    @Column(name = "rsvp_enabled", nullable = false)
    private boolean rsvpEnabled = true;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public boolean isOwnedBy(UUID userId) {
        return this.user.getId().equals(userId);
    }
}
