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
import ScaleIn from "@/components/animations/ScaleIn";
import PaithaniFrame from "@/components/wedding/motifs/PaithaniFrame";
import ToranStrip from "@/components/wedding/motifs/ToranStrip";
import PeacockFeather from "@/components/wedding/motifs/PeacockFeather";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

const theme = invitationThemes["wedding-paithani-peacock"];

function PaithaniPeacockHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className={`relative overflow-hidden px-6 pb-16 pt-14 text-center ${theme.panelBg} text-cream`}>
      <ToranStrip className="text-gold/80" />

      <PeacockFeather className="pointer-events-none absolute -bottom-6 right-2 h-56 w-56 text-royal-purple/40 sm:right-6" />

      <div className="relative mx-auto max-w-md">
        <PaithaniFrame className="rounded-2xl bg-cream/5 px-6 py-10 backdrop-blur-sm">
          <FadeIn>
            <p className="font-body text-xs uppercase tracking-[0.4em] text-gold">शुभविवाह</p>
          </FadeIn>

          <ScaleIn delay={0.15}>
            <p className="mt-6 font-script text-4xl text-gold sm:text-5xl">{invitation.brideName}</p>
          </ScaleIn>
          <FadeIn delay={0.25}>
            <p className="my-2 font-serif text-lg italic text-cream/70">&amp;</p>
          </FadeIn>
          <ScaleIn delay={0.3}>
            <p className="font-script text-4xl text-gold sm:text-5xl">{invitation.groomName}</p>
          </ScaleIn>

          <OrnamentalDivider />

          <FadeIn delay={0.4}>
            <p className="font-body text-sm text-cream/80">
              {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
            </p>
            {invitation.location && <p className="mt-1 font-body text-sm text-cream/60">{invitation.location}</p>}
          </FadeIn>
        </PaithaniFrame>
      </div>
    </section>
  );
}

/** Luxury Paithani-inspired hero (peacock watermark, toran, ornamental frame) + the shared invitation sections. */
export default function PaithaniPeacock({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <PaithaniPeacockHero invitation={invitation} />
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
