"use client";

import type { Invitation } from "@/types/invitation";
import type { OccasionTemplateConfig } from "@/data/occasionTemplateConfigs";
import RevealText from "@/components/animations/RevealText";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import FloatingElement from "@/components/animations/FloatingElement";
import FloralReveal from "@/components/animations/FloralReveal";
import DiyaGlow from "@/components/animations/DiyaGlow";
import Confetti from "@/components/animations/Confetti";

export default function OccasionInvitationHero({
  invitation,
  config,
}: {
  invitation: Invitation;
  config: OccasionTemplateConfig;
}) {
  const headline = invitation.title || config.defaultTitle;
  const showNames = config.namesMode !== "none" && Boolean(invitation.groomName);
  const namesLine =
    config.namesMode === "couple"
      ? [invitation.groomName, invitation.brideName].filter(Boolean).join(" & ")
      : invitation.groomName;

  const motifGlyph = (
    <span className="text-4xl" aria-hidden="true">
      {config.motifEmoji}
    </span>
  );

  let motifNode: React.ReactNode;
  if (config.animationStyle === "ROMANTIC") {
    motifNode = <FloralReveal glyphs={[config.motifEmoji, config.motifEmoji, config.motifEmoji]} />;
  } else if (config.animationStyle === "ELEGANT" && config.motifEmoji.includes("\u{1F56F}")) {
    motifNode = <DiyaGlow>{motifGlyph}</DiyaGlow>;
  } else if (config.layout === "minimal") {
    motifNode = <ScaleIn>{motifGlyph}</ScaleIn>;
  } else {
    motifNode = <FloatingElement>{motifGlyph}</FloatingElement>;
  }

  const content = (
    <>
      <RevealText
        as="h1"
        text={headline}
        className={`font-serif text-4xl sm:text-5xl ${config.dark ? "text-cream" : "text-wine"}`}
      />
      {showNames && (
        <FadeIn delay={0.3}>
          <p className={`mt-4 font-script text-2xl ${config.dark ? "text-gold" : config.accentText}`}>{namesLine}</p>
        </FadeIn>
      )}
      {typeof invitation.age === "number" && (
        <FadeIn delay={0.35}>
          <p className={`mt-1 font-body text-sm ${config.dark ? "text-cream/60" : "text-foreground/50"}`}>
            Turning {invitation.age}
          </p>
        </FadeIn>
      )}
      <FadeIn delay={0.4}>
        <p className={`mt-5 font-body text-sm ${config.dark ? "text-cream/70" : "text-foreground/60"}`}>
          {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
        </p>
        {invitation.location && (
          <p className={`mt-1 font-body text-sm ${config.dark ? "text-cream/60" : "text-foreground/50"}`}>
            {invitation.location}
          </p>
        )}
      </FadeIn>
    </>
  );

  return (
    <section
      className={`relative overflow-hidden px-6 pb-12 pt-16 text-center ${
        config.dark ? `${config.panelBg} text-cream` : "bg-ivory"
      }`}
    >
      {config.animationStyle === "FESTIVE" && <Confetti />}

      <FadeIn>
        <p
          className={`font-body text-sm uppercase tracking-[0.3em] ${
            config.dark ? "text-cream/70" : config.accentText
          }`}
        >
          {config.eyebrow}
        </p>
      </FadeIn>

      <div className="mt-6 flex justify-center">{motifNode}</div>

      {config.layout === "framed" ? (
        <div className={`mx-auto mt-8 max-w-md rounded-3xl border-2 ${config.accentBorder} px-6 py-10`}>{content}</div>
      ) : (
        <div className="mt-8">{content}</div>
      )}
    </section>
  );
}
