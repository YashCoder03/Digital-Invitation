"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { occasionCards } from "@/content/occasions";
import { templateStyles } from "@/content/templateStyles";
import type { AccentName } from "@/content/occasionTemplates";
import MotifIcon from "./MotifIcon";
import OccasionNavbar from "./OccasionNavbar";

const ACCENT_TEXT: Record<AccentName, string> = {
  gold: "text-gold",
  red: "text-red",
  sage: "text-sage",
  blush: "text-blush",
  maroon: "text-maroon",
  terracotta: "text-terracotta",
};

const ACCENT_BG_SOFT: Record<AccentName, string> = {
  gold: "from-gold/25 to-gold/5",
  red: "from-red/25 to-red/5",
  sage: "from-sage/25 to-sage/5",
  blush: "from-blush/25 to-blush/5",
  maroon: "from-maroon/25 to-maroon/5",
  terracotta: "from-terracotta/25 to-terracotta/5",
};

// Only the Traditional Lagna Patrika template is live today; the rest are coming soon.
const LIVE_TEMPLATE_ID: AccentName = "maroon";

const card = occasionCards.find((c) => c.id === "wedding")!;

export default function WeddingTemplateGrid() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <OccasionNavbar backHref="/" />

      <section className="px-6 pb-6 pt-28 text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-terracotta">
          {card.title[language]}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-wine sm:text-5xl">
          {language === "mr" ? "आपले आमंत्रण निवडा" : "Choose Your Invitation"}
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-foreground/60">
          {card.description[language]}
        </p>
        <p className="mx-auto mt-1 max-w-md font-body text-sm text-foreground/50">
          {language === "mr"
            ? "आपल्याला आवडणारी रचना निवडा. नंतर सर्वकाही सानुकूलित करता येईल."
            : "Pick a design you love. You can customize everything later."}
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {templateStyles.map((style) => {
          const isLive = style.id === LIVE_TEMPLATE_ID;
          const preview = (
            <>
              <div
                className={`flex h-40 items-center justify-center bg-linear-to-br ${ACCENT_BG_SOFT[style.id]}`}
              >
                <MotifIcon name="kalash" className={`h-14 w-14 ${ACCENT_TEXT[style.id]}`} />
              </div>
              <div className="flex flex-1 flex-col px-6 py-6 text-center">
                <h2 className="font-serif text-xl text-wine">{style.label[language]}</h2>
                <p className="mt-2 flex-1 font-body text-sm text-foreground/70">
                  {style.description[language]}
                </p>
                {isLive ? (
                  <span className="mt-6 rounded-full border border-wine/40 px-4 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors group-hover:bg-wine group-hover:text-cream">
                    {language === "mr" ? "पूर्वावलोकन" : "Preview"}
                  </span>
                ) : (
                  <span className="mt-6 rounded-full border border-foreground/20 px-4 py-2 font-body text-xs uppercase tracking-widest text-foreground/40">
                    {language === "mr" ? "लवकरच येत आहे" : "Coming Soon"}
                  </span>
                )}
              </div>
            </>
          );

          return isLive ? (
            <Link
              key={style.id}
              href="/wedding/traditional"
              className="group flex flex-col overflow-hidden rounded-2xl border border-wine/30 bg-cream shadow-sm transition-transform hover:-translate-y-1"
            >
              {preview}
            </Link>
          ) : (
            <div
              key={style.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-cream opacity-60"
            >
              {preview}
            </div>
          );
        })}
      </section>
    </div>
  );
}
