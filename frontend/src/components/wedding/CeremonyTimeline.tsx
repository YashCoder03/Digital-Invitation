"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function CeremonyTimeline() {
  const { t } = useLanguage();
  const steps = t.timelineOverview.steps;

  return (
    <section id="timeline" className="paithani-pattern bg-ivory px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-red">
          {t.timelineOverview.pretitle}
        </p>
        <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
          {t.timelineOverview.title}
        </h2>
      </div>

      <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-start justify-center gap-x-2 gap-y-8">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-start">
            <div className="flex w-28 flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon font-serif text-sm text-gold">
                {index + 1}
              </span>
              <p className="mt-3 font-serif text-lg text-maroon">{step.label}</p>
              <p className="mt-1 font-body text-xs text-foreground/60">{step.date}</p>
            </div>
            {index !== steps.length - 1 && (
              <span className="mt-5 hidden h-px w-8 flex-none bg-gold/50 sm:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
