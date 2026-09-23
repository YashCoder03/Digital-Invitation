export type InvitationStatus = "draft" | "published";
/** Matches a template registry id (lib/templateRegistry.ts) - kept as `string` so new templates never require a type change here. */
export type InvitationTemplateId = string;
export type InvitationAnimationLevel = "none" | "subtle" | "elegant";

export interface InvitationEvent {
  id: string;
  emoji: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address?: string;
}

export interface InvitationPhoto {
  id: string;
  url: string;
}

export interface InvitationPhotos {
  couple: InvitationPhoto | null;
  gallery: InvitationPhoto[];
  family: InvitationPhoto[];
}

export interface InvitationVenue {
  name: string;
  address: string;
  mapUrl?: string;
}

export interface InvitationContact {
  label: string;
  phone: string;
}

export interface InvitationRsvpSettings {
  enabled: boolean;
  deadline?: string;
}

export interface InvitationMusicSettings {
  enabled: boolean;
  title?: string;
  url?: string;
}

/**
 * Canonical invitation data model. This is the single source of truth consumed by
 * InvitationRenderer (customizer preview, publish preview, and the public /invite page).
 * A real backend can later replace lib/invitationStorage.ts without touching this shape.
 */
export interface Invitation {
  id: string;
  slug: string;
  templateId: InvitationTemplateId;
  status: InvitationStatus;

  // Internal bookkeeping so the app can route back to the right editor screen.
  occasion: string;
  style: string;

  groomTitle?: string;
  groomName: string;
  brideTitle?: string;
  brideName: string;

  weddingDate: string;
  weddingTime: string;
  location: string;

  // Generic fields used by non-wedding occasion templates (birthday/housewarming/puja/...)
  // so they don't have to repurpose wedding-specific fields. Optional and additive only -
  // existing wedding invitations are unaffected.
  /** Headline override, e.g. "Happy Birthday, Riya" or "The Deshmukh Family". Falls back to a per-template default. */
  title?: string;
  /** e.g. the birthday person's age. */
  age?: number;

  events: InvitationEvent[];
  photos: InvitationPhotos;

  message?: string;
  venue?: InvitationVenue;
  contacts?: InvitationContact[];
  rsvp?: InvitationRsvpSettings;
  music?: InvitationMusicSettings;
  animation?: InvitationAnimationLevel;

  createdAt: string;
  updatedAt: string;
}
