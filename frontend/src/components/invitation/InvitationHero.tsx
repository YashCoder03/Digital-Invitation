import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";
import Kalash from "@/components/wedding/motifs/Kalash";
import ToranStrip from "@/components/wedding/motifs/ToranStrip";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

export default function InvitationHero({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  return (
    <section
      className={`relative flex flex-col items-center overflow-hidden px-6 pb-10 pt-12 text-center ${
        theme.dark ? `${theme.panelBg} text-cream` : "bg-ivory"
      }`}
    >
      {theme.motifs && <ToranStrip className={theme.dark ? "text-cream/80" : "text-maroon/60"} />}

      <div className="motion-safe:animate-invite-fade-up flex flex-col items-center">
        {theme.motifs ? (
          <Kalash className={`mt-4 h-14 w-14 ${theme.dark ? "text-gold" : theme.accentText}`} />
        ) : (
          <span className={`mt-2 text-3xl ${theme.accentText}`}>ॐ</span>
        )}

        <p className={`mt-4 font-serif text-lg tracking-wide ${theme.dark ? "text-gold" : theme.accentText}`}>
          ॥ श्री गणेशाय नमः ॥
        </p>

        {invitation.photos.couple && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={invitation.photos.couple.url}
            alt=""
            className={`mt-6 h-24 w-24 rounded-full border-2 object-cover ${
              theme.dark ? "border-gold" : "border-current " + theme.accentText
            }`}
          />
        )}

        <p className={`mt-6 font-body text-sm uppercase tracking-[0.4em] ${theme.dark ? "text-cream/70" : "text-foreground/50"}`}>
          शुभविवाह
        </p>

        <div className="mt-5 flex flex-col items-center gap-1">
          <p className={`font-body text-xs uppercase tracking-widest ${theme.dark ? "text-cream/60" : "text-foreground/50"}`}>
            {invitation.groomTitle}
          </p>
          <h1 className={`font-script text-5xl leading-tight sm:text-6xl ${theme.dark ? "text-cream" : "text-wine"}`}>
            {invitation.groomName}
          </h1>
          <span className={`font-serif text-base italic ${theme.dark ? "text-cream/50" : "text-foreground/40"}`}>
            &amp;
          </span>
          <p className={`font-body text-xs uppercase tracking-widest ${theme.dark ? "text-cream/60" : "text-foreground/50"}`}>
            {invitation.brideTitle}
          </p>
          <h1 className={`font-script text-5xl leading-tight sm:text-6xl ${theme.dark ? "text-cream" : "text-wine"}`}>
            {invitation.brideName}
          </h1>
        </div>

        <div className="mt-6 w-full max-w-48">
          <OrnamentalDivider />
        </div>

        <p className={`mt-1 font-serif text-lg ${theme.dark ? "text-cream/90" : "text-foreground/80"}`}>
          {invitation.weddingDate}
        </p>
        <p className={`mt-1 font-body text-sm ${theme.dark ? "text-cream/60" : "text-foreground/60"}`}>
          {invitation.location}
        </p>
      </div>
    </section>
  );
}
