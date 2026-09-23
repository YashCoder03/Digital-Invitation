"use client";

import { motion, useReducedMotion } from "framer-motion";

const PIECE_COLORS = ["bg-gold", "bg-terracotta", "bg-sage", "bg-blush", "bg-wine"];

/**
 * A brief, one-time confetti burst (not a continuous animation) - a dozen small pieces that
 * fall and fade over ~1.2s, then stay gone. Skipped entirely under prefers-reduced-motion.
 */
export default function Confetti({ pieceCount = 14 }: { pieceCount?: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const pieces = Array.from({ length: pieceCount }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((i) => {
        const left = (i * 97) % 100;
        const rotate = (i * 53) % 360;
        const delay = (i % 6) * 0.08;
        return (
          <motion.span
            key={i}
            className={`absolute top-0 h-2.5 w-2.5 rounded-sm ${PIECE_COLORS[i % PIECE_COLORS.length]}`}
            style={{ left: `${left}%` }}
            initial={{ opacity: 0, y: -20, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: 220, rotate }}
            transition={{ duration: 1.4, delay, ease: "easeIn" }}
          />
        );
      })}
    </div>
  );
}
