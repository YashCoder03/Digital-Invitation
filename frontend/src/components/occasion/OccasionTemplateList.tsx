"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { templateStyles, filterTags, type StyleTag } from "@/content/templateStyles";
import type { AccentName } from "@/content/occasionTemplates";
import type { MotifIconName } from "@/content/occasions";
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

const ACCENT_BORDER: Record<AccentName, string> = {
  gold: "border-gold/40",
  red: "border-red/40",
  sage: "border-sage/40",
  blush: "border-blush/40",
  maroon: "border-maroon/40",
  terracotta: "border-terracotta/40",
};

const ACCENT_BG_SOFT: Record<AccentName, string> = {
  gold: "from-gold/25 to-gold/5",
  red: "from-red/25 to-red/5",
  sage: "from-sage/25 to-sage/5",
  blush: "from-blush/25 to-blush/5",
  maroon: "from-maroon/25 to-maroon/5",
  terracotta: "from-terracotta/25 to-terracotta/5",
};

interface OccasionTemplateListProps {
  route: string;
  icon: MotifIconName;
  heading: Record<"en" | "mr", string>;
  subheading: Record<"en" | "mr", string>;
}

const TAG_LABELS: Record<StyleTag, Record<"en" | "mr", string>> = {
  Traditional: { en: "Traditional", mr: "पारंपरिक" },
  Modern: { en: "Modern", mr: "आधुनिक" },
  Minimal: { en: "Minimal", mr: "मिनिमल" },
  Luxury: { en: "Luxury", mr: "राजेशाही" },
  Floral: { en: "Floral", mr: "फुलोरा" },
  Marathi: { en: "Marathi", mr: "मराठी" },
};

export default function OccasionTemplateList({
  route,
  icon,
  heading,
  subheading,
}: OccasionTemplateListProps) {
  const { language } = useLanguage();
  const [activeTag, setActiveTag] = useState<StyleTag | "All">("All");

  const visibleStyles =
    activeTag === "All" ? templateStyles : templateStyles.filter((s) => s.tag === activeTag);

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <OccasionNavbar backHref="/" />

      <section className="px-6 pb-6 pt-28 text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-terracotta">
          {heading[language]}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-wine sm:text-5xl">
          {language === "mr" ? "आपले आमंत्रण निवडा" : "Choose Your Invitation"}
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-foreground/60">
          {subheading[language]}
        </p>
        <p className="mx-auto mt-1 max-w-md font-body text-sm text-foreground/50">
          {language === "mr"
            ? "आपल्याला आवडणारी रचना निवडा. नंतर सर्वकाही सानुकूलित करता येईल."
            : "Pick a design you love. You can customize everything later."}
        </p>
      </section>

      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 px-6 pb-10">
        {(["All", ...filterTags] as const).map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-4 py-2 font-body text-xs uppercase tracking-widest transition-colors ${
              activeTag === tag
                ? "border-wine bg-wine text-cream"
                : "border-gold/30 text-foreground/60 hover:border-wine/50"
            }`}
          >
            {tag === "All" ? (language === "mr" ? "सर्व" : "All") : TAG_LABELS[tag][language]}
          </button>
        ))}
      </div>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {visibleStyles.map((style) => (
          <div
            key={style.id}
            className={`flex flex-col overflow-hidden rounded-2xl border ${ACCENT_BORDER[style.id]} bg-cream shadow-sm transition-transform hover:-translate-y-1`}
          >
            <div
              className={`flex h-40 items-center justify-center bg-linear-to-br ${ACCENT_BG_SOFT[style.id]}`}
            >
              <MotifIcon name={icon} className={`h-14 w-14 ${ACCENT_TEXT[style.id]}`} />
            </div>
            <div className="flex flex-1 flex-col px-6 py-6 text-center">
              <span
                className={`mx-auto rounded-full border ${ACCENT_BORDER[style.id]} px-3 py-1 font-body text-[0.65rem] uppercase tracking-widest ${ACCENT_TEXT[style.id]}`}
              >
                {TAG_LABELS[style.tag][language]}
              </span>
              <h2 className="mt-4 font-serif text-xl text-wine">{style.label[language]}</h2>
              <p className="mt-2 flex-1 font-body text-sm text-foreground/70">
                {style.description[language]}
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href={`${route}/${style.id}`}
                  className="flex-1 rounded-full border border-wine/40 px-4 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine hover:text-cream"
                >
                  {language === "mr" ? "पूर्वावलोकन" : "Preview"}
                </Link>
                <Link
                  href={`/customize?occasion=${encodeURIComponent(route.slice(1))}&style=${style.id}`}
                  className="flex-1 rounded-full bg-wine px-4 py-2 font-body text-xs uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
                >
                  {language === "mr" ? "हे वापरा" : "Use This"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

