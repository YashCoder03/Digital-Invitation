/** Occasions a template can be designed for. */
export type Occasion =
  | "WEDDING"
  | "ENGAGEMENT"
  | "BIRTHDAY"
  | "BABY_SHOWER"
  | "HOUSEWARMING"
  | "ANNIVERSARY"
  | "PUJA"
  | "OTHER";

/** Kept meaningful per-occasion (e.g. only Birthday uses KIDS/FUN) rather than one global list. */
export type TemplateCategory =
  | "TRADITIONAL"
  | "PAITHANI"
  | "MODERN"
  | "MINIMAL"
  | "FLORAL"
  | "ROYAL"
  | "ELEGANT"
  | "KIDS"
  | "FUN"
  | "SOFT"
  | "CUTE"
  | "ROMANTIC"
  | "RANGOLI"
  | "FESTIVE";

/** Never exposed to end users directly - only used to pick which animation primitives a template uses. */
export type AnimationStyle = "NONE" | "SUBTLE" | "ELEGANT" | "PLAYFUL" | "FESTIVE" | "ROMANTIC";

/**
 * Metadata for a selectable invitation template. This is presentation/catalog data only -
 * the actual visual component lives in the template component registry (lib/templateRegistry.ts).
 * All templates are free; there are intentionally no pricing/plan fields.
 */
export interface InvitationTemplate {
  id: string;
  name: string;
  description: string;

  occasion: Occasion;
  category: TemplateCategory;

  thumbnail: string;
  previewImage?: string;

  tags: string[];

  featured: boolean;
  animationStyle?: AnimationStyle;
  isActive: boolean;
}
