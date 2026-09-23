export type BannerFormat = "STORY" | "SQUARE" | "LANDSCAPE";

export interface BannerFormatSpec {
  width: number;
  height: number;
  label: string;
  description: string;
}

/** Export/target pixel dimensions per format - also drives the editor preview's aspect ratio. */
export const BANNER_FORMATS: Record<BannerFormat, BannerFormatSpec> = {
  STORY: { width: 1080, height: 1920, label: "Story", description: "Instagram Story / WhatsApp Status" },
  SQUARE: { width: 1080, height: 1080, label: "Square", description: "Instagram Post" },
  LANDSCAPE: { width: 1200, height: 628, label: "Landscape", description: "Wide banner for links & posts" },
};

export type BannerLayout = "classic" | "centered" | "modern";
export type BannerTextAlign = "left" | "center" | "right";

/** Tracks whether a field still mirrors the invitation, or was manually customized on the banner. */
export interface BannerField {
  value: string;
  source: "INVITATION" | "CUSTOM";
}

export interface BannerContent {
  title?: string;
  subtitle?: string;

  primaryText: BannerField;
  secondaryText: BannerField;
  date: BannerField;
  location: BannerField;

  time?: string;
  customMessage?: string;

  showCoupleNames: boolean;
  showDate: boolean;
  showLocation: boolean;
  showMessage: boolean;
}

export interface InvitationBanner {
  id: string;
  invitationId: string;
  /** Same id space as Invitation.templateId - the banner always inherits that template's visual theme. */
  templateId: string;
  /** Missing on banners saved before this field existed - see getBannerSource() for the safe read. */
  source?: "INVITATION" | "STANDALONE";

  format: BannerFormat;
  layout: BannerLayout;
  textAlign: BannerTextAlign;

  content: BannerContent;

  createdAt: string;
  updatedAt: string;
}
