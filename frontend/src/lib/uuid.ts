const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Distinguishes a real backend invitation id (UUID) from the local "occasion-style" composite key. */
export function isBackendId(id: string): boolean {
  return UUID_PATTERN.test(id);
}
