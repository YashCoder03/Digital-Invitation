const ROTATION: Record<string, string> = {
  "top-left": "rotate-0",
  "top-right": "rotate-90",
  "bottom-right": "rotate-180",
  "bottom-left": "-rotate-90",
};

const POSITION: Record<string, string> = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-right": "bottom-2 right-2",
  "bottom-left": "bottom-2 left-2",
};

/** A marigold + mango-leaf cluster, anchored to one corner of its relatively-positioned parent. */
export default function FloralCorner({
  corner,
  className = "h-14 w-14",
}: {
  corner: "top-left" | "top-right" | "bottom-right" | "bottom-left";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={`absolute ${POSITION[corner]} ${ROTATION[corner]} ${className}`}
      aria-hidden
    >
      <path d="M2 2c10 0 16 6 16 16M2 2c0 10 6 16 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <g fill="currentColor">
        <circle cx="10" cy="10" r="5" opacity="0.85" />
        <circle cx="18" cy="6" r="3" opacity="0.7" />
        <circle cx="6" cy="18" r="3" opacity="0.7" />
      </g>
      <path d="M22 4c4 4 4 10 0 14" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M4 22c4 4 10 4 14 0" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}
