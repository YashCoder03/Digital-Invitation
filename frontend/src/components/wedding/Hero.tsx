"use client";

import { useLanguage } from "@/context/LanguageContext";
import PeacockFeather from "./motifs/PeacockFeather";
import OrnamentalDivider from "./motifs/OrnamentalDivider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-b from-cream via-ivory to-ivory px-6 text-center"
    >
      <PeacockFeather className="pointer-events-none absolute -left-10 top-10 h-56 w-56 text-maroon/10" />
      <PeacockFeather className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rotate-180 text-maroon/10" />

      <p className="font-body text-sm uppercase tracking-[0.4em] text-red">
        {t.hero.pretitle}
      </p>

      <div className="mt-8 flex flex-col items-center gap-2">
        <span className="font-body text-xs uppercase tracking-[0.3em] text-gold">
          {t.hero.groomLabel}
        </span>
        <h1 className="font-script text-6xl leading-tight text-maroon sm:text-7xl">
          {t.hero.groom}
        </h1>
        <span className="font-serif text-lg italic text-gold">{t.hero.connector}</span>
        <span className="font-body text-xs uppercase tracking-[0.3em] text-gold">
          {t.hero.brideLabel}
        </span>
        <h1 className="font-script text-6xl leading-tight text-maroon sm:text-7xl">
          {t.hero.bride}
        </h1>
      </div>

      <p className="mt-6 max-w-md font-body text-base text-foreground/70">
        {t.hero.subtitle}
      </p>

      <div className="mt-8 w-full max-w-xs">
        <OrnamentalDivider />
      </div>

      <p className="mt-2 font-serif text-lg tracking-wide text-foreground/80">
        {t.hero.date}
      </p>

      <p className="mt-2 max-w-md font-body text-base text-foreground/70">
        {t.hero.venue}
      </p>

      <a
        href="#rsvp"
        className="mt-10 rounded-full border border-gold bg-maroon px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-red"
      >
        {t.hero.cta}
      </a>
    </section>
  );
}
