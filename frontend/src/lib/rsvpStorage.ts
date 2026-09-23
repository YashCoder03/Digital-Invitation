const RSVPS_KEY = "shubhinvite:rsvps";
const SUBMITTED_KEY_PREFIX = "shubhinvite:rsvp-submitted:";

export interface RsvpEntry {
  id: string;
  invitationId: string;
  name: string;
  attending: boolean;
  guests: number;
  submittedAt: string;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readAll(): RsvpEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(RSVPS_KEY);
    return raw ? (JSON.parse(raw) as RsvpEntry[]) : [];
  } catch {
    return [];
  }
}

function writeAll(entries: RsvpEntry[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(RSVPS_KEY, JSON.stringify(entries));
}

/** Stores an RSVP response locally. A real backend can later replace this with an API call. */
export function submitRsvp(
  invitationId: string,
  entry: { name: string; attending: boolean; guests: number }
): RsvpEntry {
  const record: RsvpEntry = {
    id: `rsvp-${Date.now()}`,
    invitationId,
    ...entry,
    submittedAt: new Date().toISOString(),
  };
  writeAll([...readAll(), record]);
  if (isBrowser()) {
    window.localStorage.setItem(`${SUBMITTED_KEY_PREFIX}${invitationId}`, "true");
  }
  return record;
}

export function getRsvps(invitationId: string): RsvpEntry[] {
  return readAll().filter((entry) => entry.invitationId === invitationId);
}

/** Lets the public invitation page remember (on this device) that the guest already responded. */
export function hasSubmittedRsvp(invitationId: string): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(`${SUBMITTED_KEY_PREFIX}${invitationId}`) === "true";
}
