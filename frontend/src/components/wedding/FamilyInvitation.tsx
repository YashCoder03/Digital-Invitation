"use client";

import { useLanguage } from "@/context/LanguageContext";
import LotusIcon from "./motifs/LotusIcon";

export default function FamilyInvitation() {
  const { t } = useLanguage();

  return (
    <section className="bg-ivory px-6 py-20 text-center">
      <LotusIcon className="mx-auto h-12 w-12 text-red" />
      <p className="mt-4 font-body text-sm uppercase tracking-[0.4em] text-red">
        {t.family.pretitle}
      </p>
      <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
        {t.family.title}
      </h2>

      <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-foreground/80">
        {t.family.message}
      </p>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-2 font-serif text-lg text-maroon sm:flex-row sm:justify-center sm:gap-8">
        <span>{t.family.groomFamily}</span>
        <span className="hidden text-gold sm:inline">&amp;</span>
        <span>{t.family.brideFamily}</span>
      </div>
    </section>
  );
}
