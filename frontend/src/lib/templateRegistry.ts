import type { ComponentType } from "react";
import type { Invitation } from "@/types/invitation";
import TraditionalMarathi from "@/components/invitation/TraditionalMarathi";
import PaithaniElegance from "@/components/invitation/PaithaniElegance";
import ModernMarathi from "@/components/invitation/ModernMarathi";
import OccasionTemplate from "@/components/invitation/occasion/OccasionTemplate";
import PaithaniPeacock from "@/components/invitations/wedding/PaithaniPeacock";
import PeshwaiRoyal from "@/components/invitations/wedding/PeshwaiRoyal";
import GanpatiBlessings from "@/components/invitations/wedding/GanpatiBlessings";
import RangoliVivah from "@/components/invitations/wedding/RangoliVivah";
import Deepmala from "@/components/invitations/wedding/Deepmala";
import TempleFlowers from "@/components/invitations/wedding/TempleFlowers";
import ModernMarathiSvg from "@/components/invitations/wedding/ModernMarathiSvg";
import ToranWedding from "@/components/invitations/wedding/ToranWedding";
import RoyalCouple from "@/components/invitations/wedding/RoyalCouple";
import MarathiMinimalGold from "@/components/invitations/wedding/MarathiMinimalGold";

type TemplateComponent = ComponentType<{ invitation: Invitation }>;

const NON_WEDDING_TEMPLATE_IDS = [
  "engagement-elegant",
  "engagement-floral",
  "engagement-modern",
  "birthday-celebration",
  "birthday-elegant",
  "birthday-kids",
  "babyshower-soft",
  "babyshower-floral",
  "babyshower-teddy",
  "housewarming-traditional",
  "housewarming-modern",
  "housewarming-rangoli",
  "anniversary-romantic",
  "anniversary-elegant",
  "anniversary-floral",
  "puja-traditional",
  "puja-minimal",
  "puja-floral",
  "celebration-elegant",
  "celebration-festive",
  "celebration-modern",
] as const;

/**
 * Single source of truth mapping a templateId to its React component.
 * To add a new template: create/extend a component, then add one line here.
 * Independent from data/templates.ts's `isActive` flag - a template stays renderable
 * here even after being retired from the gallery, so published invitations don't break.
 */
export const templateComponents: Record<string, TemplateComponent> = {
  traditional: TraditionalMarathi,
  paithani: PaithaniElegance,
  modern: ModernMarathi,
  "wedding-paithani-peacock": PaithaniPeacock,
  "wedding-peshwai-royal": PeshwaiRoyal,
  "wedding-ganpati-blessings": GanpatiBlessings,
  "wedding-rangoli-vivah": RangoliVivah,
  "wedding-deepmala": Deepmala,
  "wedding-temple-flowers": TempleFlowers,
  "wedding-modern-marathi": ModernMarathiSvg,
  "wedding-toran": ToranWedding,
  "wedding-royal-couple": RoyalCouple,
  "wedding-marathi-minimal-gold": MarathiMinimalGold,
  ...Object.fromEntries(NON_WEDDING_TEMPLATE_IDS.map((id) => [id, OccasionTemplate])),
};

export function getTemplateComponent(templateId: string): TemplateComponent | undefined {
  return templateComponents[templateId];
}

