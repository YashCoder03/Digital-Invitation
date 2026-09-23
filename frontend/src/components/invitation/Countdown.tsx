"use client";

import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";
import { useCountdown } from "@/lib/useCountdown";

export default function Countdown({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  const { timeLeft, hasPassed } = useCountdown(invitation.weddingDate, invitation.weddingTime);

  const units: { label: string; value: number | undefined }[] = [
    { label: "दिवस", value: timeLeft?.d },
    { label: "तास", value: timeLeft?.h },
    { label: "मिनिट", value: timeLeft?.m },
    { label: "सेकंद", value: timeLeft?.s },
  ];

  return (
    <section className="bg-cream px-6 py-10 text-center">
      <h2 className={`font-serif text-xl ${theme.accentText} sm:text-2xl`}>
        आमच्या शुभविवाहास आता...
      </h2>

      {hasPassed ? (
        <p className="mx-auto mt-4 max-w-xs font-body text-sm text-foreground/70">
          आमच्या सुंदर आठवणींचा एक नवा अध्याय सुरू झाला आहे.
        </p>
      ) : (
        <div className="mx-auto mt-5 flex max-w-sm justify-center gap-3">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="flex w-16 flex-col items-center rounded-xl border border-gold/30 bg-ivory py-3"
            >
              <span className="font-serif text-2xl text-wine">{unit.value ?? "--"}</span>
              <span className="mt-1 font-body text-[0.65rem] text-foreground/50">{unit.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
