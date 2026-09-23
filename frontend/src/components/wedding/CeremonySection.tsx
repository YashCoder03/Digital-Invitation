"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Translation } from "@/content/translations";
import Diya from "./motifs/Diya";

interface CeremonySectionProps {
  id?: string;
  ceremonyKey: keyof Translation["ceremonies"];
  index: number;
}

const tones = ["bg-ivory", "bg-cream"];

export default function CeremonySection({ id, ceremonyKey, index }: CeremonySectionProps) {
  const { t } = useLanguage();
  const ceremony = t.ceremonies[ceremonyKey];
  const reverse = index % 2 === 1;
  const tone = tones[index % tones.length];

  return (
    <section id={id} className={`${tone} px-6 py-20`}>
      <div
        className={`mx-auto flex max-w-4xl flex-col items-center gap-10 sm:flex-row ${
          reverse ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div className="flex aspect-square w-full max-w-64 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-linear-to-br from-saffron/15 to-maroon/10">
          <Diya className="h-20 w-20 text-maroon" />
        </div>

        <div className="text-center sm:text-left">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-red">
            {ceremony.date} &middot; {ceremony.time}
          </p>
          <h3 className="mt-2 font-serif text-3xl text-maroon sm:text-4xl">
            {ceremony.title}
          </h3>
          <p className="mt-3 font-body text-foreground/75">{ceremony.subtitle}</p>
          <p className="mt-4 font-body text-sm text-foreground/70">
            {ceremony.venue} &middot; {ceremony.address}
          </p>
          <p className="mt-3 font-body text-sm italic text-gold">{ceremony.note}</p>
        </div>
      </div>
    </section>
  );
}
