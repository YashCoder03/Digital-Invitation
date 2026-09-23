"use client";

import { useEffect, useState } from "react";

export interface CountdownParts {
  d: number;
  h: number;
  m: number;
  s: number;
}

/** Ticks down to `${dateText} ${timeText}`. Returns null while unparseable, clamps at zero. */
export function useCountdown(dateText: string, timeText: string) {
  const [timeLeft, setTimeLeft] = useState<CountdownParts | null>(null);
  const [hasPassed, setHasPassed] = useState(false);

  useEffect(() => {
    const target = new Date(`${dateText} ${timeText}`).getTime();

    function tick() {
      if (Number.isNaN(target)) {
        setTimeLeft(null);
        setHasPassed(false);
        return;
      }
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        setHasPassed(true);
        return;
      }
      setHasPassed(false);
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [dateText, timeText]);

  return { timeLeft, hasPassed };
}
