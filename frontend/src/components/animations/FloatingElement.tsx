"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Gentle, continuous vertical float for a single decorative glyph/icon (diya, balloon, cloud...).
 * Disabled under prefers-reduced-motion - renders statically instead of looping forever.
 */
export default function FloatingElement({
  children,
  range = 8,
  duration = 4,
  delay = 0,
  className,
}: {
  children: ReactNode;
  range?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -range, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
