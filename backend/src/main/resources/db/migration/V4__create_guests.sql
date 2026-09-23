CREATE TABLE guests (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id   UUID                NOT NULL,

    name            VARCHAR(150)        NOT NULL,
    phone           VARCHAR(20),
    email           VARCHAR(255),

    created_at      TIMESTAMP           NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP           NOT NULL DEFAULT now(),

    CONSTRAINT fk_guests_invitation FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE
);

CREATE INDEX idx_guests_invitation_id ON guests (invitation_id);
