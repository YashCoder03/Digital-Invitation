"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** A soft, subtle pulsing glow behind a diya/candle glyph. Static (no pulse) under reduced motion. */
export default function DiyaGlow({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative inline-flex items-center justify-center ${className ?? ""}`}>
      <motion.span
        className="absolute inset-0 rounded-full bg-gold/40 blur-xl"
        animate={reduceMotion ? { opacity: 0.3 } : { opacity: [0.25, 0.55, 0.25], scale: [0.9, 1.1, 0.9] }}
        transition={reduceMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative">{children}</span>
    </div>
  );
}
