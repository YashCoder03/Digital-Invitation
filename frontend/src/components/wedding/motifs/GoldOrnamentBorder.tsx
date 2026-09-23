import type { ReactNode } from "react";

/** A repeating diamond-and-dot ornamental frame along all four edges, wrapping its children. */
export default function GoldOrnamentBorder({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const unit = (key: string) => (
    <g key={key}>
      <path d="M0 4 4 0 8 4 4 8Z" fill="currentColor" opacity="0.75" />
    </g>
  );
  const units = Array.from({ length: 16 });

  return (
    <div className={`relative border border-gold/40 p-3 ${className}`}>
      <svg viewBox="0 0 160 8" preserveAspectRatio="none" className="absolute -top-2 left-0 h-2 w-full text-gold" aria-hidden>
        {units.map((_, i) => (
          <g key={i} transform={`translate(${i * 10} 0)`}>
            {unit(String(i))}
          </g>
        ))}
      </svg>
      <svg viewBox="0 0 160 8" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-2 w-full text-gold" aria-hidden>
        {units.map((_, i) => (
          <g key={i} transform={`translate(${i * 10} 0)`}>
            {unit(String(i))}
          </g>
        ))}
      </svg>
      {children}
    </div>
  );
}
