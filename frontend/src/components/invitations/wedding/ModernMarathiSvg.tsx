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
import LotusIcon from "@/components/wedding/motifs/LotusIcon";

const theme = invitationThemes["wedding-modern-marathi"];

function ModernMarathiSvgHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className="relative bg-ivory px-6 py-24 text-center">
      <div className="mx-auto max-w-md border border-gold/40 px-8 py-14">
        <LotusIcon className="mx-auto h-8 w-8 text-sage" />

        <FadeIn delay={0.1}>
          <p className="mt-6 font-body text-[0.65rem] uppercase tracking-[0.5em] text-foreground/40">Wedding</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-8 font-serif text-5xl text-wine sm:text-6xl">{invitation.groomName}</p>
          <p className="my-3 font-serif text-base italic text-foreground/30">&amp;</p>
          <p className="font-serif text-5xl text-wine sm:text-6xl">{invitation.brideName}</p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="mt-10 font-body text-sm tracking-wide text-foreground/60">
            {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
          </p>
          {invitation.location && <p className="mt-1 font-body text-sm text-foreground/45">{invitation.location}</p>}
        </FadeIn>
      </div>
    </section>
  );
}

/** A contemporary, whitespace-forward hero with a thin gold line frame + the shared invitation sections. */
export default function ModernMarathiSvg({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <ModernMarathiSvgHero invitation={invitation} />
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
