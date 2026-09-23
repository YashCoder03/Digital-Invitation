"use client";

import type { Invitation } from "@/types/invitation";
import type { OccasionTemplateConfig } from "@/data/occasionTemplateConfigs";
import { useCountdown } from "@/lib/useCountdown";

/** Generic (non-wedding-worded) countdown, reusing the same useCountdown hook as the wedding templates. */
export default function OccasionCountdown({
  invitation,
  config,
}: {
  invitation: Invitation;
  config: OccasionTemplateConfig;
}) {
  const { timeLeft, hasPassed } = useCountdown(invitation.weddingDate, invitation.weddingTime);
  if (!timeLeft && !hasPassed) return null;

  const units: { label: string; value: number | undefined }[] = [
    { label: "Days", value: timeLeft?.d },
    { label: "Hours", value: timeLeft?.h },
    { label: "Min", value: timeLeft?.m },
    { label: "Sec", value: timeLeft?.s },
  ];

  return (
    <section className="bg-cream px-6 py-10 text-center">
      <h2 className={`font-serif text-xl ${config.accentText} sm:text-2xl`}>
        Counting down to {config.defaultTitle}
      </h2>

      {hasPassed ? (
        <p className="mx-auto mt-4 max-w-xs font-body text-sm text-foreground/70">
          This celebration is complete - thank you for being part of it.
        </p>
      ) : (
        <div className="mx-auto mt-5 flex max-w-sm justify-center gap-3">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex w-16 flex-col items-center rounded-xl border border-gold/30 bg-ivory py-3"
            >
              <span className="font-serif text-2xl text-wine">{unit.value ?? "--"}</span>
              <span className="mt-1 font-body text-[0.65rem] uppercase text-foreground/50">{unit.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
