import type { InvitationBanner } from "@/types/banner";

// Temporary storage until a backend Banner API exists (see README). Kept behind this module
// so components never touch localStorage directly, and swapping to a real API later only
// means rewriting these functions' bodies, not their call sites.
const STORAGE_KEY = "shubhinvite:banners";

function isBrowser() {
  return typeof window !== "undefined";
}

function readAll(): Record<string, InvitationBanner> {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, InvitationBanner>) : {};
  } catch {
    return {};
  }
}

function writeAll(all: Record<string, InvitationBanner>) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function saveBanner(banner: InvitationBanner): InvitationBanner {
  const all = readAll();
  all[banner.id] = banner;
  writeAll(all);
  return banner;
}

export function getBanner(id: string): InvitationBanner | null {
  return readAll()[id] ?? null;
}

export function getBannersForInvitation(invitationId: string): InvitationBanner[] {
  return Object.values(readAll())
    .filter((banner) => banner.invitationId === invitationId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getAllBanners(): InvitationBanner[] {
  return Object.values(readAll()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function deleteBanner(id: string): void {
  const all = readAll();
  delete all[id];
  writeAll(all);
}
