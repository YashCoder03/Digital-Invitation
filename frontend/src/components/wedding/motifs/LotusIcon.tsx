export default function LotusIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <g fill="currentColor" opacity="0.85">
        <path d="M24 42c-6-4-9-10-9-16 4 2 7 6 9 11 2-5 5-9 9-11 0 6-3 12-9 16Z" />
        <path d="M24 42c-9-2-15-8-17-15 5 0 10 3 14 8 1-6 0-12-3-17 6 2 10 8 11 15" />
        <path d="M24 42c9-2 15-8 17-15-5 0-10 3-14 8-1-6 0-12 3-17-6 2-10 8-11 15" />
      </g>
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}
