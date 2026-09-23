import type { ReactNode } from "react";

/** Wraps content in a subtle Paithani-inspired corner ornament frame. */
export default function PaithaniFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const corner = (rotate: string) => (
    <svg
      viewBox="0 0 40 40"
      className={`absolute h-8 w-8 text-gold/70 ${rotate}`}
      aria-hidden
    >
      <path
        d="M2 2h14M2 2v14M2 2 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
    </svg>
  );

  return (
    <div className={`relative border border-gold/30 ${className}`}>
      {corner("top-1 left-1")}
      {corner("top-1 right-1 rotate-90")}
      {corner("bottom-1 right-1 rotate-180")}
      {corner("bottom-1 left-1 -rotate-90")}
      {children}
    </div>
  );
}
