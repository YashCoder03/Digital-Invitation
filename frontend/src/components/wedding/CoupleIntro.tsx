"use client";

import { useLanguage } from "@/context/LanguageContext";
import OrnamentalDivider from "./motifs/OrnamentalDivider";
import LotusIcon from "./motifs/LotusIcon";

export default function CoupleIntro() {
  const { t } = useLanguage();
  const { groom, bride } = t.coupleIntro;

  return (
    <section className="bg-ivory px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-red">
          {t.coupleIntro.pretitle}
        </p>
        <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
          {t.coupleIntro.title}
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl gap-10 sm:grid-cols-2">
        {[groom, bride].map((person) => (
          <div key={person.name} className="text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-gold bg-linear-to-br from-saffron/20 to-maroon/10">
              <LotusIcon className="h-12 w-12 text-maroon" />
            </div>
            <p className="mt-5 font-body text-xs uppercase tracking-[0.3em] text-gold">
              {person.label}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-maroon">{person.name}</h3>
            <p className="mt-2 font-body text-sm text-foreground/60">{person.parents}</p>
            <p className="mt-4 font-body text-foreground/75">{person.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <OrnamentalDivider />
      </div>
    </section>
  );
}
