// Converts between the display-friendly strings the customizer UI already uses
// ("18 January 2027", "11:30 AM") and the ISO formats the backend requires
// (weddingDate: yyyy-MM-dd, weddingTime: HH:mm). Keeping this in one place means
// none of the existing UI components need to change their input format.

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Best-effort parse of a free-text date into "yyyy-MM-dd"; null if unparseable. */
export function parseDisplayDateToIso(display: string): string | null {
  const trimmed = display.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;

  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Best-effort parse of a free-text time (e.g. "11:30 AM", "7:00 PM", "14:00") into "HH:mm"; null if unparseable. */
export function parseDisplayTimeToIso(display: string): string | null {
  const trimmed = display.trim();
  if (/^\d{2}:\d{2}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?$/);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();

  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) return null;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** "yyyy-MM-dd" -> "18 January 2027", matching the app's existing display convention. */
export function formatIsoDateToDisplay(iso: string): string {
  const [yyyy, mm, dd] = iso.split("-").map(Number);
  if (!yyyy || !mm || !dd) return iso;
  return `${dd} ${MONTH_NAMES[mm - 1]} ${yyyy}`;
}

/** "HH:mm" -> "11:30 AM", matching the app's existing display convention. */
export function formatIsoTimeToDisplay(iso: string): string {
  const [hh, mm] = iso.split(":").map(Number);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return iso;
  const meridiem = hh >= 12 ? "PM" : "AM";
  const hours12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${hours12}:${String(mm).padStart(2, "0")} ${meridiem}`;
}
