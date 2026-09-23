CREATE TABLE rsvp_responses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id   UUID                NOT NULL,

    guest_name      VARCHAR(150)        NOT NULL,
    attending       BOOLEAN             NOT NULL,
    guest_count     INTEGER             NOT NULL DEFAULT 1,

    created_at      TIMESTAMP           NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP           NOT NULL DEFAULT now(),

    CONSTRAINT fk_rsvp_responses_invitation FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE,
    CONSTRAINT chk_rsvp_guest_count CHECK (guest_count >= 1)
);

CREATE INDEX idx_rsvp_responses_invitation_id ON rsvp_responses (invitation_id);
