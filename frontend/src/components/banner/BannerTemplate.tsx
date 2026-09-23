import type { ReactNode } from "react";
import type { InvitationBanner } from "@/types/banner";
import type { Invitation } from "@/types/invitation";
import { getInvitationTheme } from "@/components/invitation/theme";
import { occasionTemplateConfigs } from "@/data/occasionTemplateConfigs";
import FadeIn from "@/components/animations/FadeIn";
import RevealText from "@/components/animations/RevealText";

const WEDDING_MOTIF_BY_TEMPLATE: Record<string, string> = {
  traditional: "\u{1FA94}",
  paithani: "\u{1F99A}",
  modern: "\u{1F33F}",
};

function getBannerMotif(templateId: string): string {
  return occasionTemplateConfigs[templateId]?.motifEmoji ?? WEDDING_MOTIF_BY_TEMPLATE[templateId] ?? "\u2726";
}

function StaticBlock({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function StaticText({ text, as: Tag = "span", className }: { text: string; as?: "span" | "h1" | "h2"; className?: string }) {
  return <Tag className={className}>{text}</Tag>;
}

/**
 * Shared banner shell for every occasion/template - inherits its visual theme from
 * getInvitationTheme(banner.templateId) (same source the invitation page uses), and adapts
 * its composition to the chosen format (Story/Square/Landscape) and layout/alignment options.
 */
export default function BannerTemplate({
  banner,
  staticExport = false,
}: {
  banner: InvitationBanner;
  invitation: Invitation;
  staticExport?: boolean;
}) {
  const theme = getInvitationTheme(banner.templateId);
  const motif = getBannerMotif(banner.templateId);
  const { content, layout, textAlign, format } = banner;

  const Reveal = staticExport ? StaticBlock : FadeIn;
  const Headline = staticExport
    ? (props: { text: string; as?: "span" | "h1" | "h2"; className?: string }) => <StaticText {...props} />
    : RevealText;

  const alignClass = textAlign === "left" ? "text-left" : textAlign === "right" ? "text-right" : "text-center";
  const itemsClass = textAlign === "left" ? "items-start" : textAlign === "right" ? "items-end" : "items-center";

  const eyebrow = content.title || theme.label;
  const names = [
    content.showCoupleNames && content.primaryText.value,
    content.showCoupleNames && content.secondaryText.value,
  ].filter(Boolean) as string[];

  const dateLine = content.showDate ? [content.date.value, content.time].filter(Boolean).join(" \u00B7 ") : "";
  const locationLine = content.showLocation ? content.location.value : "";
  const messageLine = content.showMessage ? content.customMessage : "";

  const motifNode = (
    <span
      className={`select-none ${format === "LANDSCAPE" ? "text-5xl" : "text-6xl"} ${layout === "modern" ? "opacity-80" : ""}`}
      aria-hidden="true"
    >
      {motif}
    </span>
  );

  const namesBlock = names.length > 0 && (
    <Reveal className={alignClass}>
      {names.map((name, index) => (
        <Headline
          key={`${name}-${index}`}
          as="h1"
          text={name}
          className={`font-serif text-3xl leading-tight sm:text-4xl ${theme.dark ? "text-cream" : "text-wine"}`}
        />
      ))}
    </Reveal>
  );

  const detailsBlock = (dateLine || locationLine) && (
    <Reveal className={alignClass} delay={0.15}>
      {dateLine && (
        <p className={`font-body text-base ${theme.dark ? "text-cream/80" : "text-foreground/70"}`}>{dateLine}</p>
      )}
      {locationLine && (
        <p className={`mt-1 font-body text-sm ${theme.dark ? "text-cream/60" : "text-foreground/50"}`}>
          {locationLine}
        </p>
      )}
    </Reveal>
  );

  const messageBlock = messageLine && (
    <Reveal className={alignClass} delay={0.25}>
      <p className={`max-w-xs font-serif text-sm italic ${theme.dark ? "text-cream/70" : "text-foreground/60"}`}>
        {messageLine}
      </p>
    </Reveal>
  );

  const frameClass = layout === "classic" ? `rounded-3xl border-2 ${theme.accentBorder}` : "";

  const containerBg = theme.dark ? theme.panelBg : "bg-ivory";
  const aspectClass = format === "STORY" ? "aspect-[9/16]" : format === "SQUARE" ? "aspect-square" : "aspect-[1200/628]";

  if (format === "LANDSCAPE") {
    return (
      <div
        className={`flex w-full ${aspectClass} flex-row items-center justify-between gap-6 overflow-hidden ${containerBg} px-10 py-8 ${theme.dark ? "text-cream" : ""}`}
      >
        <div className={`flex flex-col items-center gap-3 ${layout === "classic" ? frameClass + " px-6 py-6" : ""}`}>
          {motifNode}
          <p className={`font-body text-xs uppercase tracking-[0.25em] ${theme.dark ? "text-cream/70" : theme.accentText}`}>
            {eyebrow}
          </p>
        </div>
        <div className={`flex flex-1 flex-col gap-3 ${itemsClass}`}>
          {namesBlock}
          {detailsBlock}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full ${aspectClass} flex-col items-center justify-center gap-5 overflow-hidden ${containerBg} px-8 py-10 text-center ${theme.dark ? "text-cream" : ""}`}
    >
      <div className={layout === "classic" ? `${frameClass} flex flex-col items-center gap-5 px-8 py-10` : "flex flex-col items-center gap-5"}>
        {motifNode}
        <p className={`font-body text-xs uppercase tracking-[0.3em] ${theme.dark ? "text-cream/70" : theme.accentText}`}>
          {eyebrow}
        </p>
        {namesBlock}
        {detailsBlock}
        {messageBlock}
      </div>
    </div>
  );
}
