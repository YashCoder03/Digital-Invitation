/** Symmetric rangoli-style mandala, built from one repeated petal rotated into an 8-fold ring. */
export default function Rangoli({ className = "h-40 w-40" }: { className?: string }) {
  const petals = Array.from({ length: 8 });

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals.length) * i} 50 50)`}>
          <path
            d="M50 8c4 8 4 16 0 22-4-6-4-14 0-22Z"
            fill="currentColor"
            opacity="0.8"
          />
          <circle cx="50" cy="16" r="1.6" fill="currentColor" />
        </g>
      ))}
      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}
