"use client";

import { motion, useReducedMotion } from "framer-motion";

/** One or more flower/petal glyphs that bloom into view (scale + slight rotate), staggered. Entrance-only. */
export default function FloralReveal({
  glyphs,
  className,
}: {
  glyphs: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center justify-center gap-3 ${className ?? ""}`} aria-hidden="true">
      {glyphs.map((glyph, index) => (
        <motion.span
          key={`${glyph}-${index}`}
          className="text-2xl"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        >
          {glyph}
        </motion.span>
      ))}
    </div>
  );
}
