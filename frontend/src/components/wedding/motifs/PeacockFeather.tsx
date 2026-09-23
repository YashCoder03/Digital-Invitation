/** A single peacock-feather watermark, meant to sit faint and oversized behind content. */
export default function PeacockFeather({ className = "h-40 w-40" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 160" className={className} aria-hidden>
      <path
        d="M50 6c14 20 22 44 22 70 0 22-9 42-22 70-13-28-22-48-22-70 0-26 8-50 22-70Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />
      <ellipse cx="50" cy="46" rx="14" ry="18" fill="currentColor" opacity="0.35" />
      <ellipse cx="50" cy="46" rx="8" ry="11" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="46" r="3.5" fill="currentColor" />
      <path d="M50 64v82" stroke="currentColor" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}
