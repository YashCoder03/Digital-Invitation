CREATE TABLE invitations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID                NOT NULL,
    template_id     VARCHAR(100)        NOT NULL,
    slug            VARCHAR(160)        NOT NULL,
    status          VARCHAR(20)         NOT NULL DEFAULT 'DRAFT',

    groom_name      VARCHAR(150)        NOT NULL,
    bride_name      VARCHAR(150)        NOT NULL,

    wedding_date    DATE                NOT NULL,
    wedding_time    TIME                NOT NULL,
    location        VARCHAR(255)        NOT NULL,

    message         TEXT,

    rsvp_enabled    BOOLEAN             NOT NULL DEFAULT TRUE,

    created_at      TIMESTAMP           NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP           NOT NULL DEFAULT now(),

    CONSTRAINT uq_invitations_slug UNIQUE (slug),
    CONSTRAINT fk_invitations_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT chk_invitations_status CHECK (status IN ('DRAFT', 'PUBLISHED'))
);

CREATE INDEX idx_invitations_slug ON invitations (slug);
CREATE INDEX idx_invitations_user_id ON invitations (user_id);
