import type { ReactNode } from "react";

/** A temple-gopuram style arch outline with tapering pillars, wrapping its children. */
export default function TempleArch({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-gold"
        aria-hidden
      >
        <path
          d="M4 118V70c0-34 26-58 58-58h176c32 0 58 24 58 58v48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20 118V74c0-26 20-46 46-46h168c26 0 46 20 46 46v44"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="150" cy="14" r="5" fill="currentColor" />
        <path d="M150 4v10M145 7h10" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
