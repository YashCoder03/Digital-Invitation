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
import ToranStrip from "@/components/wedding/motifs/ToranStrip";
import FloralCorner from "@/components/wedding/motifs/FloralCorner";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

const theme = invitationThemes["wedding-toran"];

function ToranWeddingHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className={`relative overflow-hidden px-6 pb-16 pt-6 text-center ${theme.panelBg} text-cream`}>
      <ToranStrip className="h-16 text-gold" />

      <div className="relative mx-auto mt-6 max-w-sm">
        <FloralCorner corner="top-left" className="h-9 w-9 text-gold/70" />
        <FloralCorner corner="top-right" className="h-9 w-9 text-gold/70" />

        <FadeIn>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-gold">शुभविवाह</p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 font-serif text-4xl text-cream sm:text-5xl">{invitation.groomName}</p>
          <p className="my-2 font-serif text-lg italic text-cream/50">&amp;</p>
          <p className="font-serif text-4xl text-cream sm:text-5xl">{invitation.brideName}</p>
        </FadeIn>

        <OrnamentalDivider />

        <FadeIn delay={0.3}>
          <p className="font-body text-sm text-cream/80">
            {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
          </p>
          {invitation.location && <p className="mt-1 font-body text-sm text-cream/60">{invitation.location}</p>}
        </FadeIn>
      </div>
    </section>
  );
}

/** A hero led by a large decorative toran, with matching side ornaments + the shared invitation sections. */
export default function ToranWedding({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <ToranWeddingHero invitation={invitation} />
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
