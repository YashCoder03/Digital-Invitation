/** A simple, elegant, ornamental Ganpati silhouette - not a literal/religious-accurate depiction. */
export default function GanpatiMotif({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {/* crown */}
      <path d="M22 14c4-6 16-6 20 0" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.8" />
      <circle cx="32" cy="10" r="2.4" fill="currentColor" />
      {/* ears */}
      <circle cx="16" cy="24" r="8" fill="currentColor" opacity="0.7" />
      <circle cx="48" cy="24" r="8" fill="currentColor" opacity="0.7" />
      {/* head */}
      <circle cx="32" cy="26" r="13" fill="currentColor" />
      {/* trunk */}
      <path
        d="M32 34c-3 4-3 9 0 13-3 2-6 2-8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* modak/hand rest */}
      <circle cx="32" cy="50" r="4" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
