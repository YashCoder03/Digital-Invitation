import type { Invitation } from "@/types/invitation";
import { invitationThemes } from "@/components/invitation/theme";
import Countdown from "@/components/invitation/Countdown";
import WeddingMessage from "@/components/invitation/WeddingMessage";
import EventTimeline from "@/components/invitation/EventTimeline";
import VenueSection from "@/components/invitation/VenueSection";
import PhotoGallery from "@/components/invitation/PhotoGallery";
import RSVPSection from "@/components/invitation/RSVPSection";
import ContactSection from "@/components/invitation/ContactSection";
import InvitationFooter from "@/components/invitation/InvitationFooter";
import MusicControl from "@/components/invitation/MusicControl";
import FadeIn from "@/components/animations/FadeIn";
import Diya from "@/components/wedding/motifs/Diya";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

const theme = invitationThemes["wedding-deepmala"];
const DIYA_COUNT = 5;

function DiyaColumn({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute top-6 bottom-6 hidden flex-col justify-between sm:flex ${
        side === "left" ? "left-3" : "right-3"
      }`}
      aria-hidden
    >
      {Array.from({ length: DIYA_COUNT }).map((_, i) => (
        <Diya key={i} className="h-8 w-8 text-gold drop-shadow-[0_0_6px_rgba(184,144,63,0.55)]" />
      ))}
    </div>
  );
}

function DeepmalaHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className="relative overflow-hidden bg-ivory px-14 pb-16 pt-14 text-center">
      <DiyaColumn side="left" />
      <DiyaColumn side="right" />

      <FadeIn>
        <p className="font-body text-xs uppercase tracking-[0.4em] text-terracotta">शुभविवाह</p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="mt-6 font-serif text-4xl text-maroon sm:text-5xl">{invitation.groomName}</p>
        <p className="my-2 font-serif text-lg italic text-foreground/40">&amp;</p>
        <p className="font-serif text-4xl text-maroon sm:text-5xl">{invitation.brideName}</p>
      </FadeIn>

      <OrnamentalDivider />

      <FadeIn delay={0.3}>
        <p className="font-body text-sm text-foreground/70">
          {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
        </p>
        {invitation.location && <p className="mt-1 font-body text-sm text-foreground/50">{invitation.location}</p>}
      </FadeIn>
    </section>
  );
}

/** Diyas lit along both margins around a warm ivory center + the shared invitation sections. */
export default function Deepmala({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <DeepmalaHero invitation={invitation} />
      <Countdown invitation={invitation} theme={theme} />
      <WeddingMessage invitation={invitation} theme={theme} />
      <EventTimeline invitation={invitation} theme={theme} />
      <VenueSection invitation={invitation} theme={theme} />
      <PhotoGallery invitation={invitation} theme={theme} />
      <RSVPSection invitation={invitation} theme={theme} />
      <ContactSection invitation={invitation} theme={theme} />
      <InvitationFooter invitation={invitation} theme={theme} />
      <MusicControl invitation={invitation} />
    </div>
  );
}
