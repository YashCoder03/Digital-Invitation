"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function OurStory() {
  const { t } = useLanguage();
  const milestones = t.story.milestones;

  return (
    <section id="story" className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-red">
          {t.story.pretitle}
        </p>
        <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
          {t.story.title}
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-2xl">
        {milestones.map((milestone, index) => (
          <div key={milestone.year} className="relative flex gap-6 pb-12 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold text-sm font-body text-maroon">
                {milestone.year}
              </span>
              {index !== milestones.length - 1 && (
                <span className="mt-2 w-px flex-1 bg-gold/30" />
              )}
            </div>
            <div className="pt-2">
              <h3 className="font-serif text-xl text-maroon">
                {milestone.title}
              </h3>
              <p className="mt-2 font-body text-foreground/70">{milestone.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
