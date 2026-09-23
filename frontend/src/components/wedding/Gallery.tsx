"use client";

import { useLanguage } from "@/context/LanguageContext";
import PaithaniFrame from "./motifs/PaithaniFrame";

const placeholders = [
  "from-saffron/30 to-gold/30",
  "from-maroon/20 to-red/20",
  "from-gold/30 to-saffron/20",
  "from-red/20 to-maroon/20",
  "from-saffron/20 to-red/20",
  "from-gold/20 to-maroon/20",
];

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="bg-ivory px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-red">
          {t.gallery.pretitle}
        </p>
        <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
          {t.gallery.title}
        </h2>
        <p className="mt-4 font-body text-foreground/60">{t.gallery.subtitle}</p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {placeholders.map((gradient, index) => (
          <PaithaniFrame key={index} className="aspect-square">
            <div
              className={`flex h-full w-full items-center justify-center bg-linear-to-br ${gradient}`}
            >
              <span className="font-script text-3xl text-maroon/50">ॐ</span>
            </div>
          </PaithaniFrame>
        ))}
      </div>
    </section>
  );
}
