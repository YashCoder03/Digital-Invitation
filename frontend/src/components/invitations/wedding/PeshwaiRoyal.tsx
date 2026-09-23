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
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";
import Diya from "@/components/wedding/motifs/Diya";

const theme = invitationThemes["wedding-peshwai-royal"];

function PeshwaiRoyalHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className="relative overflow-hidden bg-ivory px-6 pb-16 pt-28 text-center">
      <TempleArch className="mx-auto max-w-lg">
        <div className="mx-auto flex max-w-sm flex-col items-center border-x-2 border-saffron/30 px-6 pb-10 pt-6">
          <div className="flex gap-6 text-maroon/70">
            <Diya className="h-8 w-8" />
            <Diya className="h-8 w-8" />
          </div>

          <FadeIn delay={0.1}>
            <p className="mt-4 font-body text-xs uppercase tracking-[0.4em] text-saffron">Peshwai Wedding</p>
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

/** Royal, architectural Peshwai-style hero (SVG arch + pillars) + the shared invitation sections. */
export default function PeshwaiRoyal({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <PeshwaiRoyalHero invitation={invitation} />
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
