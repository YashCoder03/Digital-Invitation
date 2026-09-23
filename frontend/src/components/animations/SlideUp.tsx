"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Slide up from below + fade - slightly more pronounced than FadeIn, for hero-level content. */
export default function SlideUp({
  children,
  delay = 0,
  distance = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
