import { templates } from "@/data/templates";
import type { InvitationTemplate, Occasion, TemplateCategory } from "@/types/template";

export function getTemplateById(id: string): InvitationTemplate | undefined {
  return templates.find((t) => t.id === id);
}

/** Templates visible in the public gallery - inactive templates are excluded here only. */
export function getActiveTemplates(occasion?: Occasion): InvitationTemplate[] {
  return templates.filter((t) => t.isActive && (!occasion || t.occasion === occasion));
}

export function getFeaturedTemplates(occasion?: Occasion): InvitationTemplate[] {
  return getActiveTemplates(occasion).filter((t) => t.featured);
}

export function getTemplatesByCategory(
  category: TemplateCategory | "ALL",
  occasion?: Occasion
): InvitationTemplate[] {
  const active = getActiveTemplates(occasion);
  return category === "ALL" ? active : active.filter((t) => t.category === category);
}

export function searchTemplates(items: InvitationTemplate[], query: string): InvitationTemplate[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
