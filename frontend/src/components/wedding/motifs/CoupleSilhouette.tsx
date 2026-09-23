/** Generic decorative bride+groom silhouette pair - stylized, not a depiction of real people. */
export default function CoupleSilhouette({ className = "h-32 w-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 128" className={className} aria-hidden>
      {/* bride: saree drape silhouette + nath detail */}
      <g transform="translate(30 0)">
        <circle cx="20" cy="18" r="10" fill="currentColor" />
        <path d="M20 8c6-4 12-2 12 4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <path d="M2 118c-2-34 6-58 18-64 12 6 20 30 18 64Z" fill="currentColor" opacity="0.9" />
        <path d="M8 60c8-4 24-4 24 0" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M12 22c-2 3-2 6 0 8" fill="none" stroke="currentColor" strokeWidth="1" />
      </g>
      {/* groom: pagdi silhouette */}
      <g transform="translate(90 0)">
        <path d="M8 20c0-10 8-16 16-16s16 6 16 16c2 2 2 6-2 6H10c-4 0-4-4-2-6Z" fill="currentColor" opacity="0.9" />
        <circle cx="24" cy="26" r="9" fill="currentColor" />
        <path d="M4 118c-2-32 6-56 20-62 14 6 22 30 20 62Z" fill="currentColor" opacity="0.85" />
      </g>
    </svg>
  );
}
