export default function Kalash({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {/* mango leaves */}
      <path d="M32 6 20 18c-2 4 2 8 6 6l6-8Z" fill="currentColor" opacity="0.85" />
      <path d="M32 6 44 18c2 4-2 8-6 6l-6-8Z" fill="currentColor" opacity="0.85" />
      <path d="M32 4v16" stroke="currentColor" strokeWidth="1.5" />
      {/* coconut */}
      <circle cx="32" cy="20" r="7" fill="currentColor" opacity="0.6" />
      {/* pot */}
      <path
        d="M18 30c0-3 6-4 14-4s14 1 14 4l-4 20c-1 4-6 7-10 7s-9-3-10-7Z"
        fill="currentColor"
      />
      <path
        d="M18 30c0-3 6-4 14-4s14 1 14 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path
        d="M20 40h24M21 46h22"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.7"
      />
    </svg>
  );
}
