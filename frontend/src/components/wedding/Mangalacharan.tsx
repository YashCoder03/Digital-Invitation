"use client";

import { useLanguage } from "@/context/LanguageContext";
import Kalash from "./motifs/Kalash";
import ToranStrip from "./motifs/ToranStrip";

export default function Mangalacharan() {
  const { t } = useLanguage();

  return (
    <section className="relative flex flex-col items-center bg-maroon px-6 pb-10 pt-24 text-center text-cream">
      <ToranStrip className="text-cream/80" />
      <Kalash className="mt-4 h-16 w-16 text-gold" />
      <p className="mt-4 font-serif text-2xl tracking-wide text-gold">
        {t.mangalacharan.line1}
      </p>
      <p className="mt-2 font-body text-sm uppercase tracking-[0.5em] text-cream/70">
        {t.mangalacharan.tagline}
      </p>
    </section>
  );
}
