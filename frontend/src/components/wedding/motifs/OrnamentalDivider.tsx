export default function OrnamentalDivider() {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-3 py-2" aria-hidden>
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold/70" />
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 2c2 4 2 7 0 9-2-2-2-5 0-9Z"
          fill="currentColor"
          className="text-maroon"
        />
        <path
          d="M14 26c-6-3-10-8-10-13 3 0 7 2 10 6 3-4 7-6 10-6 0 5-4 10-10 13Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gold"
        />
        <circle cx="14" cy="14" r="1.6" className="fill-red" />
      </svg>
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold/70" />
    </div>
  );
}
