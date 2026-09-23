package com.shubhinvite.photo.entity;

import com.shubhinvite.invitation.entity.Invitation;
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
import java.util.UUID;

@Entity
@Table(name = "invitation_photos")
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class InvitationPhoto {

    @Id
    @UuidGenerator
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "invitation_id", nullable = false)
    private Invitation invitation;

    /** The plain (non-transformed) secure_url Cloudinary returned at upload time. */
    @Column(nullable = false, length = 500)
    private String url;

    /** Cloudinary's full public id (including folder path) - required to transform/delete the asset. */
    @Column(name = "public_id", nullable = false, length = 255)
    private String publicId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PhotoType type;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
