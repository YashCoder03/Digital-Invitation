"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { occasionCards } from "@/content/occasions";
import type { AccentName } from "@/content/occasionTemplates";

const ACCENT_BORDER: Record<AccentName, string> = {
  gold: "border-gold/40",
  red: "border-red/40",
  sage: "border-sage/40",
  blush: "border-blush/40",
  maroon: "border-wine/40",
  terracotta: "border-terracotta/40",
};

const ACCENT_TEXT: Record<AccentName, string> = {
  gold: "text-gold",
  red: "text-red",
  sage: "text-sage",
  blush: "text-blush",
  maroon: "text-wine",
  terracotta: "text-terracotta",
};

// content/occasions.ts's `route` points at the older static demo pages; the homepage should
// send people to the real, dynamic template galleries instead.
const GALLERY_SLUG_BY_CARD_ID: Record<string, string> = {
  wedding: "wedding",
  engagement: "engagement",
  birthday: "birthday",
  babyshower: "baby-shower",
  housewarming: "housewarming",
  anniversary: "anniversary",
  religious: "puja",
  celebration: "celebration",
};

export default function OccasionGrid() {
  const { language } = useLanguage();

  return (
    <section id="occasions" className="bg-ivory px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-terracotta">
          {language === "mr" ? "सोहळा निवडा" : "Get Started"}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-wine sm:text-4xl">
          {language === "mr" ? "आपला प्रसंग कोणता आहे?" : "What's the Occasion?"}
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {occasionCards.map((card) => (
          <Link
            key={card.id}
            href={`/templates/${GALLERY_SLUG_BY_CARD_ID[card.id] ?? card.route}`}
            className={`group relative flex flex-col items-center rounded-2xl border bg-cream px-6 py-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
              card.highlighted
                ? `${ACCENT_BORDER[card.accent]} sm:col-span-2 sm:row-span-1 lg:col-span-2`
                : ACCENT_BORDER[card.accent]
            }`}
          >
            {card.badge && (
              <span className="absolute -top-3 rounded-full bg-wine px-3 py-1 font-body text-[0.6rem] uppercase tracking-widest text-cream">
                {card.badge[language]}
              </span>
            )}
            <span className="text-4xl">{card.emoji}</span>
            <h3 className={`mt-4 font-serif text-xl ${ACCENT_TEXT[card.accent]}`}>
              {card.title[language]}
            </h3>
            <p className="mt-2 font-body text-sm text-foreground/60">
              {card.description[language]}
            </p>
            <span className="mt-5 font-body text-xs uppercase tracking-widest text-foreground/40 transition-colors group-hover:text-wine">
              {language === "mr" ? "टेम्प्लेट्स पहा →" : "Browse Templates →"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
