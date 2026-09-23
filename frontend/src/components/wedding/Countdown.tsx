"use client";

import { useEffect, useState } from "react";
import { WEDDING_DATE_ISO } from "@/content/config";
import { useLanguage } from "@/context/LanguageContext";

function getTimeLeft() {
  const total = new Date(WEDDING_DATE_ISO).getTime() - Date.now();
  return {
    total,
    days: Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((total / (1000 * 60)) % 60), 0),
    seconds: Math.max(Math.floor((total / 1000) % 60), 0),
  };
}

export default function Countdown() {
  // start null so the server-rendered markup matches the client's first render
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: t.countdown.days, value: timeLeft?.days },
    { label: t.countdown.hours, value: timeLeft?.hours },
    { label: t.countdown.minutes, value: timeLeft?.minutes },
    { label: t.countdown.seconds, value: timeLeft?.seconds },
  ];

  return (
    <section className="bg-maroon px-6 py-14 text-cream">
      <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-gold">
        {t.countdown.pretitle}
      </p>
      <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-4 sm:gap-8">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex w-20 flex-col items-center rounded-lg border border-gold/30 bg-cream/5 py-4 sm:w-24"
          >
            <span className="font-serif text-3xl text-gold sm:text-4xl">
              {unit.value ?? "--"}
            </span>
            <span className="mt-2 font-body text-[0.65rem] uppercase tracking-widest text-cream/70">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
