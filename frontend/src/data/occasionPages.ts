import type { Occasion } from "@/types/template";

export interface OccasionPageMeta {
  slug: string;
  occasion: Occasion;
  emoji: string;
  heading: string;
  subheading: string;
}

/** Single source of truth for occasion gallery routes (/templates/{slug}) and their copy. */
export const occasionPages: OccasionPageMeta[] = [
  {
    slug: "wedding",
    occasion: "WEDDING",
    emoji: "\u{1F48D}",
    heading: "Choose Your Wedding Invitation",
    subheading: "Beautiful Marathi wedding designs, completely free.",
  },
  {
    slug: "engagement",
    occasion: "ENGAGEMENT",
    emoji: "\u{1F491}",
    heading: "Engagement Invitations",
    subheading: "Celebrate the start of forever, completely free.",
  },
  {
    slug: "birthday",
    occasion: "BIRTHDAY",
    emoji: "\u{1F382}",
    heading: "Birthday Invitations",
    subheading: "Create a beautiful invitation for your special day.",
  },
  {
    slug: "baby-shower",
    occasion: "BABY_SHOWER",
    emoji: "\u{1F476}",
    heading: "Baby Shower Invitations",
    subheading: "Welcome your little one with a beautiful invitation.",
  },
  {
    slug: "housewarming",
    occasion: "HOUSEWARMING",
    emoji: "\u{1F3E0}",
    heading: "Housewarming Invitations",
    subheading: "Invite loved ones to bless your new home.",
  },
  {
    slug: "anniversary",
    occasion: "ANNIVERSARY",
    emoji: "\u2764\uFE0F",
    heading: "Anniversary Invitations",
    subheading: "Celebrate every beautiful year, together.",
  },
  {
    slug: "puja",
    occasion: "PUJA",
    emoji: "\u{1FA94}",
    heading: "Puja Invitations",
    subheading: "Invite family and friends to your puja with devotion.",
  },
  {
    slug: "celebration",
    occasion: "OTHER",
    emoji: "\u{1F389}",
    heading: "Celebration Invitations",
    subheading: "Beautiful invitations for every celebration, completely free.",
  },
];

export function getOccasionPageBySlug(slug: string): OccasionPageMeta | undefined {
  return occasionPages.find((page) => page.slug === slug);
}

export function getOccasionSlug(occasion: Occasion): string {
  return occasionPages.find((page) => page.occasion === occasion)?.slug ?? occasion.toLowerCase();
}
