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
import GanpatiMotif from "@/components/wedding/motifs/GanpatiMotif";
import LotusIcon from "@/components/wedding/motifs/LotusIcon";
import Diya from "@/components/wedding/motifs/Diya";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

const theme = invitationThemes["wedding-ganpati-blessings"];

function GanpatiBlessingsHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className="relative overflow-hidden bg-saffron/10 px-6 pb-16 pt-14 text-center">
      <ScaleIn>
        <GanpatiMotif className="mx-auto h-16 w-16 text-maroon" />
      </ScaleIn>

      <FadeIn delay={0.1}>
        <p className="mt-4 font-body text-sm uppercase tracking-[0.4em] text-maroon/70">शुभविवाह</p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mt-6 font-serif text-4xl text-maroon sm:text-5xl">{invitation.groomName}</p>
        <p className="my-2 font-serif text-lg italic text-foreground/40">&amp;</p>
        <p className="font-serif text-4xl text-maroon sm:text-5xl">{invitation.brideName}</p>
      </FadeIn>

      <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-6 text-gold">
        <LotusIcon className="h-8 w-8" />
        <Diya className="h-8 w-8" />
        <LotusIcon className="h-8 w-8 -scale-x-100" />
      </div>

      <OrnamentalDivider />

      <FadeIn delay={0.35}>
        <p className="font-body text-sm text-foreground/70">
          {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
        </p>
        {invitation.location && <p className="mt-1 font-body text-sm text-foreground/50">{invitation.location}</p>}
      </FadeIn>
    </section>
  );
}

/** A hero centered on a stylized Ganpati ornament, with lotus and diya accents, + the shared sections. */
export default function GanpatiBlessings({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <GanpatiBlessingsHero invitation={invitation} />
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
