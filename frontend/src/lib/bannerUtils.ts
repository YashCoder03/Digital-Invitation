import type { Invitation } from "@/types/invitation";
import type { BannerContent, BannerField, BannerFormat, InvitationBanner } from "@/types/banner";

function inheritedField(value: string): BannerField {
  return { value, source: "INVITATION" };
}

function namesFromInvitation(invitation: Invitation): { primary: string; secondary: string } {
  return { primary: invitation.groomName ?? "", secondary: invitation.brideName ?? "" };
}

/** Seeds a brand-new banner's content directly from the invitation - every field starts as "inherited". */
export function buildContentFromInvitation(invitation: Invitation): BannerContent {
  const { primary, secondary } = namesFromInvitation(invitation);

  return {
    title: invitation.title,
    primaryText: inheritedField(primary),
    secondaryText: inheritedField(secondary),
    date: inheritedField(invitation.weddingDate ?? ""),
    location: inheritedField(invitation.location ?? ""),
    time: invitation.weddingTime,
    customMessage: invitation.message,
    showCoupleNames: true,
    showDate: true,
    showLocation: true,
    showMessage: Boolean(invitation.message),
  };
}

export function createBannerFromInvitation(
  invitation: Invitation,
  format: BannerFormat = "STORY",
  source: "INVITATION" | "STANDALONE" = "INVITATION"
): InvitationBanner {
  const now = new Date().toISOString();
  return {
    id: `banner-${invitation.id}-${Date.now()}`,
    invitationId: invitation.id,
    templateId: invitation.templateId,
    source,
    format,
    layout: "classic",
    textAlign: "center",
    content: buildContentFromInvitation(invitation),
    createdAt: now,
    updatedAt: now,
  };
}

/** Backfills source for banners saved before that field existed, using the standalone id convention. */
export function getBannerSource(banner: InvitationBanner): "INVITATION" | "STANDALONE" {
  if (banner.source) return banner.source;
  return banner.invitationId.startsWith("standalone-") ? "STANDALONE" : "INVITATION";
}

/** True if a field the user never customized has drifted from the invitation's current value. */
export function hasPendingInvitationChanges(banner: InvitationBanner, invitation: Invitation): boolean {
  const { primary, secondary } = namesFromInvitation(invitation);
  const { content } = banner;

  return (
    (content.primaryText.source === "INVITATION" && content.primaryText.value !== primary) ||
    (content.secondaryText.source === "INVITATION" && content.secondaryText.value !== secondary) ||
    (content.date.source === "INVITATION" && content.date.value !== (invitation.weddingDate ?? "")) ||
    (content.location.source === "INVITATION" && content.location.value !== (invitation.location ?? ""))
  );
}

/** Refreshes only the still-inherited fields from the invitation; anything the user customized is left alone. */
export function applyInvitationUpdates(banner: InvitationBanner, invitation: Invitation): InvitationBanner {
  const { primary, secondary } = namesFromInvitation(invitation);
  const { content } = banner;

  return {
    ...banner,
    templateId: invitation.templateId,
    updatedAt: new Date().toISOString(),
    content: {
      ...content,
      primaryText: content.primaryText.source === "INVITATION" ? inheritedField(primary) : content.primaryText,
      secondaryText: content.secondaryText.source === "INVITATION" ? inheritedField(secondary) : content.secondaryText,
      date: content.date.source === "INVITATION" ? inheritedField(invitation.weddingDate ?? "") : content.date,
      location: content.location.source === "INVITATION" ? inheritedField(invitation.location ?? "") : content.location,
    },
  };
}

/** Marks a field as manually customized, so future invitation edits no longer overwrite it silently. */
export function customizeField(value: string): BannerField {
  return { value, source: "CUSTOM" };
}
