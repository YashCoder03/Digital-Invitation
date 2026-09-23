import type { Invitation } from "@/types/invitation";

const STORAGE_KEY = "shubhinvite:invitations";

function isBrowser() {
  return typeof window !== "undefined";
}

function readAll(): Record<string, Invitation> {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Invitation>) : {};
  } catch {
    return {};
  }
}

function writeAll(all: Record<string, Invitation>) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/** Upserts a full invitation record. */
export function saveInvitation(invitation: Invitation): Invitation {
  const all = readAll();
  all[invitation.id] = invitation;
  writeAll(all);
  return invitation;
}

export function getInvitation(id: string): Invitation | null {
  return readAll()[id] ?? null;
}

/** Merges a partial update into an existing invitation and persists it. */
export function updateInvitation(id: string, patch: Partial<Invitation>): Invitation | null {
  const all = readAll();
  const existing = all[id];
  if (!existing) return null;
  const updated: Invitation = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  all[id] = updated;
  writeAll(all);
  return updated;
}

/** Marks an invitation as published, assigning a slug if it doesn't have one yet. */
export function publishInvitation(id: string): Invitation | null {
  const all = readAll();
  const existing = all[id];
  if (!existing) return null;
  const updated: Invitation = {
    ...existing,
    status: "published",
    updatedAt: new Date().toISOString(),
  };
  all[id] = updated;
  writeAll(all);
  return updated;
}

export function getInvitationBySlug(slug: string): Invitation | null {
  const all = readAll();
  return Object.values(all).find((inv) => inv.slug === slug) ?? null;
}

/** Only returns the invitation if it has actually been published — used by the public /invite page. */
export function getPublishedInvitation(slug: string): Invitation | null {
  const invitation = getInvitationBySlug(slug);
  return invitation && invitation.status === "published" ? invitation : null;
}

/** Gets an existing invitation by id, or creates and saves one from the factory if missing. */
export function ensureInvitation(id: string, factory: () => Invitation): Invitation {
  const existing = getInvitation(id);
  if (existing) return existing;
  const created = factory();
  return saveInvitation(created);
}
