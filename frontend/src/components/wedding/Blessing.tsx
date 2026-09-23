"use client";

import { useLanguage } from "@/context/LanguageContext";
import Diya from "./motifs/Diya";
import ToranStrip from "./motifs/ToranStrip";

export default function Blessing() {
  const { t } = useLanguage();

  return (
    <footer className="bg-maroon px-6 pb-10 pt-16 text-center text-cream">
      <Diya className="mx-auto h-12 w-12 text-gold" />
      <p className="mt-4 font-serif text-2xl text-gold">{t.blessing.verse}</p>
      <h2 className="mt-3 font-script text-4xl text-cream">{t.blessing.title}</h2>
      <p className="mx-auto mt-3 max-w-sm font-body text-cream/70">{t.blessing.note}</p>

      <p className="mt-8 font-script text-3xl text-gold">{t.hero.groom} &amp; {t.hero.bride}</p>
      <p className="mt-2 font-body text-cream/60">{t.blessing.tagline}</p>

      <p className="mt-8 font-body text-xs uppercase tracking-widest text-cream/40">
        {t.blessing.copyright}
      </p>

      <ToranStrip className="mt-6 rotate-180 text-cream/60" />
    </footer>
  );
}
