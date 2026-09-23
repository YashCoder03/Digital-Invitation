/** A repeating strip of mango leaves and bells, like a toran hung above a doorway. */
export default function ToranStrip({ className = "" }: { className?: string }) {
  const leaves = Array.from({ length: 9 });

  return (
    <div className={`relative h-10 w-full overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 360 40"
        preserveAspectRatio="none"
        className="h-full w-full text-maroon"
      >
        <path
          d="M0 4 Q180 26 360 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gold"
        />
        {leaves.map((_, i) => {
          const x = 12 + i * 40;
          const dip = 4 + Math.sin((i / leaves.length) * Math.PI) * 14;
          return (
            <g key={i} transform={`translate(${x}, ${dip})`}>
              <path
                d="M0 0 C 6 4, 6 14, 0 20 C -6 14, -6 4, 0 0 Z"
                fill="currentColor"
              />
              <line x1="0" y1="0" x2="0" y2="-4" stroke="currentColor" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
