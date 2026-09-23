"use client";

import { useLanguage } from "@/context/LanguageContext";
import { VENUE_MAP_QUERY } from "@/content/config";

export default function Venue() {
  const { t } = useLanguage();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    VENUE_MAP_QUERY
  )}`;

  return (
    <section id="venue" className="bg-maroon px-6 py-20 text-cream">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-gold">
          {t.venue.pretitle}
        </p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{t.venue.title}</h2>
      </div>

      <div className="mx-auto mt-12 max-w-lg overflow-hidden rounded-lg border border-gold/30">
        <div className="paithani-pattern flex h-48 items-center justify-center bg-cream/10">
          <svg viewBox="0 0 48 48" className="h-14 w-14 text-gold" aria-hidden>
            <path
              d="M24 4c-8 0-14 6-14 14 0 10 14 26 14 26s14-16 14-26c0-8-6-14-14-14Z"
              fill="currentColor"
              opacity="0.85"
            />
            <circle cx="24" cy="18" r="5" className="fill-maroon" />
          </svg>
        </div>
        <div className="bg-cream/5 px-6 py-8 text-center">
          <h3 className="font-serif text-2xl text-gold">{t.venue.name}</h3>
          <p className="mt-2 font-body text-sm text-cream/70">{t.venue.address}</p>
          <p className="mt-4 font-body text-cream/80">{t.venue.description}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-gold px-6 py-2 font-body text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-maroon"
          >
            {t.venue.directionsCta}
          </a>
        </div>
      </div>
    </section>
  );
}
