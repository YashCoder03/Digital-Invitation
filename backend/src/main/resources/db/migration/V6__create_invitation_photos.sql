CREATE TABLE invitation_photos (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id   UUID                NOT NULL,

    url             VARCHAR(500)        NOT NULL,
    public_id       VARCHAR(255)        NOT NULL,
    type            VARCHAR(20)         NOT NULL,
    display_order   INTEGER             NOT NULL DEFAULT 0,

    created_at      TIMESTAMP           NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP           NOT NULL DEFAULT now(),

    CONSTRAINT fk_invitation_photos_invitation FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE,
    CONSTRAINT chk_invitation_photos_type CHECK (type IN ('COUPLE', 'GALLERY', 'FAMILY'))
);

CREATE INDEX idx_invitation_photos_invitation_id ON invitation_photos (invitation_id);
CREATE INDEX idx_invitation_photos_invitation_id_type ON invitation_photos (invitation_id, type);
