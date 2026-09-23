import type { InvitationTemplateId } from "@/types/invitation";
import { occasionTemplateConfigs } from "@/data/occasionTemplateConfigs";

export interface InvitationTheme {
  id: InvitationTemplateId;
  label: string;
  /** Whether hero/countdown/footer panels use a dark (maroon/wine) background. */
  dark: boolean;
  panelBg: string;
  accentText: string;
  accentBorder: string;
  softBg: string;
  /** Whether to render the heavier decorative motifs (toran, kalash, paithani frame). */
  motifs: boolean;
}

export const invitationThemes: Record<InvitationTemplateId, InvitationTheme> = {
  traditional: {
    id: "traditional",
    label: "Traditional Marathi",
    dark: true,
    panelBg: "bg-maroon",
    accentText: "text-gold",
    accentBorder: "border-maroon/30",
    softBg: "from-maroon/20 to-maroon/5",
    motifs: true,
  },
  paithani: {
    id: "paithani",
    label: "Paithani Elegance",
    dark: true,
    panelBg: "bg-wine",
    accentText: "text-terracotta",
    accentBorder: "border-terracotta/30",
    softBg: "from-terracotta/20 to-terracotta/5",
    motifs: true,
  },
  modern: {
    id: "modern",
    label: "Modern Marathi",
    dark: false,
    panelBg: "bg-sage/10",
    accentText: "text-sage",
    accentBorder: "border-sage/30",
    softBg: "from-sage/15 to-sage/5",
    motifs: false,
  },
  "wedding-paithani-peacock": {
    id: "wedding-paithani-peacock",
    label: "Paithani Peacock",
    dark: true,
    panelBg: "bg-peacock",
    accentText: "text-gold",
    accentBorder: "border-gold/30",
    softBg: "from-peacock/20 to-royal-purple/10",
    motifs: true,
  },
  "wedding-peshwai-royal": {
    id: "wedding-peshwai-royal",
    label: "Peshwai Royal",
    dark: false,
    panelBg: "bg-maroon",
    accentText: "text-maroon",
    accentBorder: "border-saffron/40",
    softBg: "from-saffron/15 to-gold/10",
    motifs: true,
  },
  "wedding-ganpati-blessings": {
    id: "wedding-ganpati-blessings",
    label: "Ganpati Blessings",
    dark: false,
    panelBg: "bg-saffron/10",
    accentText: "text-maroon",
    accentBorder: "border-saffron/40",
    softBg: "from-saffron/20 to-gold/10",
    motifs: true,
  },
  "wedding-rangoli-vivah": {
    id: "wedding-rangoli-vivah",
    label: "Rangoli Vivah",
    dark: false,
    panelBg: "bg-gold/10",
    accentText: "text-maroon",
    accentBorder: "border-gold/40",
    softBg: "from-sage/10 to-saffron/10",
    motifs: true,
  },
  "wedding-deepmala": {
    id: "wedding-deepmala",
    label: "Deepmala",
    dark: false,
    panelBg: "bg-ivory",
    accentText: "text-terracotta",
    accentBorder: "border-gold/30",
    softBg: "from-gold/15 to-terracotta/5",
    motifs: true,
  },
  "wedding-temple-flowers": {
    id: "wedding-temple-flowers",
    label: "Temple Flowers",
    dark: false,
    panelBg: "bg-cream",
    accentText: "text-sage",
    accentBorder: "border-sage/30",
    softBg: "from-sage/15 to-saffron/10",
    motifs: true,
  },
  "wedding-modern-marathi": {
    id: "wedding-modern-marathi",
    label: "Modern Marathi (Gold Line)",
    dark: false,
    panelBg: "bg-ivory",
    accentText: "text-wine",
    accentBorder: "border-gold/30",
    softBg: "from-sage/10 to-gold/5",
    motifs: false,
  },
  "wedding-toran": {
    id: "wedding-toran",
    label: "Toran Wedding",
    dark: true,
    panelBg: "bg-wine",
    accentText: "text-gold",
    accentBorder: "border-gold/30",
    softBg: "from-wine/20 to-gold/10",
    motifs: true,
  },
  "wedding-royal-couple": {
    id: "wedding-royal-couple",
    label: "Royal Couple",
    dark: true,
    panelBg: "bg-royal-purple",
    accentText: "text-gold",
    accentBorder: "border-gold/40",
    softBg: "from-royal-purple/20 to-maroon/10",
    motifs: true,
  },
  "wedding-marathi-minimal-gold": {
    id: "wedding-marathi-minimal-gold",
    label: "Marathi Minimal Gold",
    dark: false,
    panelBg: "bg-ivory",
    accentText: "text-maroon",
    accentBorder: "border-gold/30",
    softBg: "from-gold/10 to-ivory",
    motifs: false,
  },
};

export function getInvitationTheme(templateId: string): InvitationTheme {
  if (invitationThemes[templateId]) return invitationThemes[templateId];
  // Non-wedding occasion templates keep their visual tokens in occasionTemplateConfigs, whose
  // shape (OccasionTemplateConfig) is a superset of InvitationTheme.
  return occasionTemplateConfigs[templateId] ?? invitationThemes.traditional;
}
