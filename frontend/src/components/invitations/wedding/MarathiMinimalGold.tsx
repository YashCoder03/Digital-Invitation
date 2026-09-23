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
import GanpatiMotif from "@/components/wedding/motifs/GanpatiMotif";

const theme = invitationThemes["wedding-marathi-minimal-gold"];

function MarathiMinimalGoldHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className="relative bg-ivory px-6 py-28 text-center">
      <div className="mx-auto max-w-md border border-gold/25 px-10 py-16">
        <GanpatiMotif className="mx-auto h-10 w-10 text-gold" />

        <FadeIn delay={0.1}>
          <p className="mt-8 font-body text-[0.65rem] uppercase tracking-[0.55em] text-foreground/40">
            Shubh Vivah
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-10 font-serif text-5xl text-maroon sm:text-6xl">{invitation.groomName}</p>
          <p className="my-4 font-serif text-base italic text-foreground/30">&amp;</p>
          <p className="font-serif text-5xl text-maroon sm:text-6xl">{invitation.brideName}</p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="mt-12 font-body text-sm tracking-wide text-foreground/60">
            {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
          </p>
          {invitation.location && <p className="mt-1 font-body text-sm text-foreground/45">{invitation.location}</p>}
        </FadeIn>
      </div>
    </section>
  );
}

/** An extremely minimal, generous-whitespace luxury hero with a thin gold border + shared sections. */
export default function MarathiMinimalGold({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <MarathiMinimalGoldHero invitation={invitation} />
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
