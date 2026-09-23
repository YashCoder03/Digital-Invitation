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
import Rangoli from "@/components/wedding/motifs/Rangoli";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

const theme = invitationThemes["wedding-rangoli-vivah"];

function RangoliVivahHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className="relative overflow-hidden bg-gold/10 px-6 pb-16 pt-14 text-center">
      <ScaleIn>
        <Rangoli className="mx-auto h-44 w-44 text-maroon/70 sm:h-52 sm:w-52" />
      </ScaleIn>

      <div className="relative mx-auto -mt-32 max-w-sm sm:-mt-40">
        <FadeIn delay={0.15}>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-saffron">शुभविवाह</p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="mt-6 font-serif text-4xl text-maroon sm:text-5xl">{invitation.groomName}</p>
          <p className="my-2 font-serif text-lg italic text-foreground/40">&amp;</p>
          <p className="font-serif text-4xl text-maroon sm:text-5xl">{invitation.brideName}</p>
        </FadeIn>

        <OrnamentalDivider />

        <FadeIn delay={0.35}>
          <p className="font-body text-sm text-foreground/70">
            {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
          </p>
          {invitation.location && <p className="mt-1 font-body text-sm text-foreground/50">{invitation.location}</p>}
        </FadeIn>
      </div>
    </section>
  );
}

/** A hero framed by a symmetric SVG rangoli mandala + the shared invitation sections. */
export default function RangoliVivah({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <RangoliVivahHero invitation={invitation} />
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
