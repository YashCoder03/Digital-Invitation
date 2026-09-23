import type { Invitation } from "@/types/invitation";
import { getTemplateById } from "@/lib/templateUtils";
import { getSampleSeed } from "@/data/sampleInvitations";
import { ensureInvitation } from "@/lib/invitationStorage";

/** Builds occasion-appropriate sample data so a template can render a real (not static) preview. */
export function buildSampleInvitation(templateId: string): Invitation {
  const template = getTemplateById(templateId);
  const occasion = template?.occasion ?? "WEDDING";
  const seed = getSampleSeed(occasion);
  const now = new Date().toISOString();

  return {
    id: `sample-${templateId}`,
    slug: `sample-${templateId}`,
    templateId,
    status: "draft",
    occasion: occasion.toLowerCase(),
    style: templateId,

    groomName: seed.groomName,
    brideName: seed.brideName,
    title: seed.title,
    age: seed.age,

    weddingDate: seed.weddingDate,
    weddingTime: seed.weddingTime,
    location: seed.location,

    events: seed.events ?? [],
    photos: { couple: null, gallery: [], family: [] },

    message: seed.message,
    rsvp: { enabled: true },
    music: { enabled: false },
    animation: "subtle",

    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Data source for the standalone "/banner/create?template=" flow - a real (locally persisted)
 * invitation seeded from the template's sample data, so BannerEditor can work unmodified
 * without routing the user through the full invitation-creation wizard.
 */
export function ensureStandaloneBannerSource(templateId: string): Invitation {
  const id = `standalone-${templateId}`;
  return ensureInvitation(id, () => ({ ...buildSampleInvitation(templateId), id, slug: id }));
}
