export default function Diya({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M6 30c6 6 12 8 18 8s12-2 18-8c-2 8-9 14-18 14S8 38 6 30Z"
        fill="currentColor"
      />
      <path
        d="M6 30c4-2 10-3 18-3s14 1 18 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.7"
      />
      <path
        d="M24 22c-3-4-2-8 1-11 1 4 3 5 3 8 0 2-2 3-4 3Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}
