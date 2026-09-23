import type { CustomizerState } from "@/content/customizer";
import type { Invitation, InvitationContact } from "@/types/invitation";

const DISPLAY_DOMAIN = "shubhinvite.com";

// Small known-name lookup so common Devanagari sample names still produce a friendly slug.
// Not a general transliteration engine — falls back to the invitation id otherwise.
const KNOWN_NAME_ROMANIZATIONS: Record<string, string> = {
  "यश": "yash",
  "वैष्णवी": "vaishnavi",
  "प्रिया": "priya",
  "देशमुख": "deshmukh",
  "पाटील": "patil",
};

function toRomanToken(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return null;
  if (/^[A-Za-z0-9\s'-]+$/.test(trimmed)) {
    return trimmed.split(/\s+/)[0].toLowerCase();
  }
  const firstWord = trimmed.split(/\s+/)[0];
  return KNOWN_NAME_ROMANIZATIONS[firstWord] ?? null;
}

/** Best-effort slug from ASCII names; falls back to a stable id-based slug for Devanagari names. */
export function generateSlug(groomName: string, brideName: string, fallback: string): string {
  const groomToken = toRomanToken(groomName);
  const brideToken = toRomanToken(brideName);
  if (groomToken && brideToken) return `${groomToken}-${brideToken}`;
  return fallback;
}

export function buildMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** The real, working link to the public invitation (uses the current origin). */
export function getShareableUrl(slug: string): string {
  if (typeof window === "undefined") return `/invite/${slug}`;
  return `${window.location.origin}/invite/${slug}`;
}

/** The branded, human-friendly URL text shown in the UI. */
export function getDisplayUrl(slug: string): string {
  return `${DISPLAY_DOMAIN}/invite/${slug}`;
}

export function buildWhatsAppMessage(invitation: Invitation, url: string): string {
  const groom = [invitation.groomTitle, invitation.groomName].filter(Boolean).join(" ");
  const bride = [invitation.brideTitle, invitation.brideName].filter(Boolean).join(" ");
  return [
    "\u{1F48C} You're invited!",
    "Join us as we celebrate the wedding of",
    groom,
    "&",
    bride,
    invitation.weddingDate,
    "",
    "View the invitation:",
    url,
  ].join("\n");
}

export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function formatTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

interface InvitationMeta {
  id: string;
  slug: string;
  occasion: string;
  style: string;
  status?: Invitation["status"];
  createdAt?: string;
}

/** Converts the customizer's editing-friendly state into the canonical Invitation model. */
export function customizerStateToInvitation(state: CustomizerState, meta: InvitationMeta): Invitation {
  const { couple, events, photos, style, details } = state;
  const now = new Date().toISOString();

  const contacts: InvitationContact[] = details.contactNumbers
    .filter((phone) => phone.trim())
    .map((phone, index) => ({
      label: index === 0 ? `${couple.groomName || "Groom"}'s Family` : `${couple.brideName || "Bride"}'s Family`,
      phone,
    }));

  return {
    id: meta.id,
    slug: meta.slug,
    templateId: style.theme,
    status: meta.status ?? "draft",
    occasion: meta.occasion,
    style: meta.style,

    groomTitle: couple.groomTitle,
    groomName: couple.groomName,
    brideTitle: couple.brideTitle,
    brideName: couple.brideName,
    title: couple.title || undefined,
    age: couple.age ? Number(couple.age) || undefined : undefined,

    weddingDate: couple.weddingDate,
    weddingTime: couple.weddingTime,
    location: couple.weddingLocation,

    events,
    photos,

    message: details.message,
    venue: {
      name: details.venueName,
      address: details.venueAddress,
      mapUrl: details.mapUrl || buildMapsUrl(`${details.venueName} ${details.venueAddress}`.trim()),
    },
    contacts,
    rsvp: { enabled: details.rsvpEnabled, deadline: details.rsvpDeadline },
    music: { enabled: style.musicEnabled },
    animation: style.animation,

    createdAt: meta.createdAt ?? now,
    updatedAt: now,
  };
}

/** Converts a stored Invitation back into the customizer's editing-friendly state shape. */
export function invitationToCustomizerState(invitation: Invitation): CustomizerState {
  return {
    couple: {
      groomTitle: invitation.groomTitle ?? "\u091a\u093f.",
      groomName: invitation.groomName,
      brideTitle: invitation.brideTitle ?? "\u091a\u093f. \u0938\u094c. \u0915\u093e\u0902.",
      brideName: invitation.brideName,
      title: invitation.title ?? "",
      age: invitation.age !== undefined ? String(invitation.age) : "",
      weddingDate: invitation.weddingDate,
      weddingTime: invitation.weddingTime,
      weddingLocation: invitation.location,
      groomFather: "",
      groomMother: "",
      brideFather: "",
      brideMother: "",
    },
    events: invitation.events.map((event) => ({ ...event, address: event.address ?? "" })),
    photos: invitation.photos,
    style: {
      theme: invitation.templateId,
      font: "serif",
      musicEnabled: invitation.music?.enabled ?? false,
      animation: invitation.animation ?? "subtle",
    },
    details: {
      message: invitation.message ?? "",
      venueName: invitation.venue?.name ?? "",
      venueAddress: invitation.venue?.address ?? "",
      mapUrl: invitation.venue?.mapUrl ?? "",
      contactNumbers: invitation.contacts?.length
        ? invitation.contacts.map((c) => c.phone)
        : [""],
      rsvpEnabled: invitation.rsvp?.enabled ?? true,
      rsvpDeadline: invitation.rsvp?.deadline ?? "",
    },
  };
}
