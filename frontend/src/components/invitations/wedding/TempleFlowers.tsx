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
import TempleArch from "@/components/wedding/motifs/TempleArch";
import FloralCorner from "@/components/wedding/motifs/FloralCorner";
import LotusIcon from "@/components/wedding/motifs/LotusIcon";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

const theme = invitationThemes["wedding-temple-flowers"];

function TempleFlowersHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className="relative overflow-hidden bg-cream px-6 pb-16 pt-28 text-center">
      <TempleArch className="mx-auto max-w-lg">
        <div className="relative mx-auto max-w-sm border border-sage/25 px-6 pb-10 pt-6">
          <FloralCorner corner="top-left" className="h-10 w-10 text-terracotta" />
          <FloralCorner corner="top-right" className="h-10 w-10 text-terracotta" />
          <FloralCorner corner="bottom-left" className="h-10 w-10 text-sage" />
          <FloralCorner corner="bottom-right" className="h-10 w-10 text-sage" />

          <LotusIcon className="mx-auto h-9 w-9 text-sage" />

          <FadeIn delay={0.1}>
            <p className="mt-4 font-body text-xs uppercase tracking-[0.4em] text-sage">शुभविवाह</p>
          </FadeIn>

          <FadeIn delay={0.2}>
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
        </div>
      </TempleArch>
    </section>
  );
}

/** A temple-arch hero framed by marigold/lotus corner ornaments + the shared invitation sections. */
export default function TempleFlowers({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <TempleFlowersHero invitation={invitation} />
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
