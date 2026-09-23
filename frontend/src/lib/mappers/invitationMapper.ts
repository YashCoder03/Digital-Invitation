import type { CustomizerState } from "@/content/customizer";
import type { Invitation, InvitationContact, InvitationEvent, InvitationPhoto } from "@/types/invitation";
import type { InvitationRequestDto, InvitationResponseDto, PublicInvitationResponseDto } from "@/lib/api/types";
import { formatIsoDateToDisplay, formatIsoTimeToDisplay, parseDisplayDateToIso, parseDisplayTimeToIso } from "./dateTimeUtils";

/** Throws with a user-facing message if required fields can't be sent to the backend yet. */
export function buildInvitationRequest(state: CustomizerState): InvitationRequestDto {
  const isoDate = parseDisplayDateToIso(state.couple.weddingDate);
  const isoTime = parseDisplayTimeToIso(state.couple.weddingTime);
  if (!isoDate || !isoTime) {
    throw new Error("Please enter a valid wedding date and time before saving.");
  }
  if (!state.couple.groomName.trim() || !state.couple.brideName.trim()) {
    throw new Error("Groom and bride names are required before saving.");
  }

  return {
    templateId: state.style.theme,
    groomName: state.couple.groomName.trim(),
    brideName: state.couple.brideName.trim(),
    weddingDate: isoDate,
    weddingTime: isoTime,
    location: state.couple.weddingLocation || "TBD",
    message: state.details.message || undefined,
  };
}

/** Converts a backend invitation (+ its events, fetched separately) into the app's canonical Invitation model. */
export function mapInvitationResponseToInvitation(
  dto: InvitationResponseDto,
  meta: { occasion: string; style: string; events?: InvitationEvent[]; photos?: Invitation["photos"] }
): Invitation {
  return {
    id: dto.id,
    slug: dto.slug,
    templateId: (dto.templateId as Invitation["templateId"]) || "traditional",
    status: dto.status === "PUBLISHED" ? "published" : "draft",
    occasion: meta.occasion,
    style: meta.style,

    groomName: dto.groomName,
    brideName: dto.brideName,

    weddingDate: formatIsoDateToDisplay(dto.weddingDate),
    weddingTime: formatIsoTimeToDisplay(dto.weddingTime),
    location: dto.location,

    events: meta.events ?? [],
    photos: meta.photos ?? { couple: null, gallery: [], family: [] },

    message: dto.message ?? undefined,
    rsvp: { enabled: dto.rsvpEnabled },

    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

/** Converts the public (unauthenticated) invitation payload into the canonical Invitation model. */
export function mapPublicInvitationToInvitation(
  dto: PublicInvitationResponseDto,
  slug: string,
  events: InvitationEvent[]
): Invitation {
  const contacts: InvitationContact[] = (dto.contacts ?? []).map((phone, index) => ({
    label: index === 0 ? `${dto.groomName || "Groom"}'s Family` : `${dto.brideName || "Bride"}'s Family`,
    phone,
  }));

  const toPhoto = (url: string, index: number): InvitationPhoto => ({ id: `photo-${index}`, url });
  const couplePhotoDto = dto.photos.find((p) => p.type === "COUPLE");
  const galleryPhotos = dto.photos.filter((p) => p.type === "GALLERY").map((p, i) => toPhoto(p.url, i));
  const familyPhotos = dto.photos.filter((p) => p.type === "FAMILY").map((p, i) => toPhoto(p.url, i));

  return {
    id: slug,
    slug,
    templateId: (dto.templateId as Invitation["templateId"]) || "traditional",
    status: "published",
    occasion: "wedding",
    style: dto.templateId,

    groomName: dto.groomName,
    brideName: dto.brideName,

    weddingDate: formatIsoDateToDisplay(dto.weddingDate),
    weddingTime: formatIsoTimeToDisplay(dto.weddingTime),
    location: dto.location,

    events,
    photos: {
      couple: couplePhotoDto ? toPhoto(couplePhotoDto.url, 0) : null,
      gallery: galleryPhotos,
      family: familyPhotos,
    },

    message: dto.message ?? undefined,
    venue: dto.venue ? { name: dto.venue, address: dto.location } : undefined,
    contacts,
    rsvp: { enabled: dto.rsvp?.enabled ?? true },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
