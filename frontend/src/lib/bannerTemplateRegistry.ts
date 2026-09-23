import type { ComponentType } from "react";
import type { InvitationBanner } from "@/types/banner";
import type { Invitation } from "@/types/invitation";
import BannerTemplate from "@/components/banner/BannerTemplate";

type BannerTemplateComponent = ComponentType<{
  banner: InvitationBanner;
  invitation: Invitation;
  staticExport?: boolean;
}>;

/**
 * Keyed by invitation templateId (== banner.templateId) - the same id space as
 * lib/templateRegistry.ts. Every id resolves to the shared, format/theme-aware
 * BannerTemplate shell unless a specific template needs a bespoke override here later.
 */
export const bannerTemplateComponents: Record<string, BannerTemplateComponent> = {};

export function getBannerTemplateComponent(templateId: string): BannerTemplateComponent {
  return bannerTemplateComponents[templateId] ?? BannerTemplate;
}
