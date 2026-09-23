CREATE TABLE events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id   UUID                NOT NULL,

    name            VARCHAR(150)        NOT NULL,
    type            VARCHAR(30)         NOT NULL,
    date            DATE                NOT NULL,
    time            TIME                NOT NULL,
    venue           VARCHAR(255),
    address         VARCHAR(255),

    display_order   INTEGER             NOT NULL DEFAULT 0,

    created_at      TIMESTAMP           NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP           NOT NULL DEFAULT now(),

    CONSTRAINT fk_events_invitation FOREIGN KEY (invitation_id) REFERENCES invitations (id) ON DELETE CASCADE,
    CONSTRAINT chk_events_type CHECK (type IN ('HALDI', 'MEHENDI', 'SANGEET', 'WEDDING', 'RECEPTION', 'GRUHPAVESH', 'CUSTOM'))
);

CREATE INDEX idx_events_invitation_id ON events (invitation_id);
