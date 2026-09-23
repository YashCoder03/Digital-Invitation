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
import GoldOrnamentBorder from "@/components/wedding/motifs/GoldOrnamentBorder";
import CoupleSilhouette from "@/components/wedding/motifs/CoupleSilhouette";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";

const theme = invitationThemes["wedding-royal-couple"];

function RoyalCoupleHero({ invitation }: { invitation: Invitation }) {
  return (
    <section className={`relative overflow-hidden px-6 pb-16 pt-14 text-center ${theme.panelBg} text-cream`}>
      <div className="mx-auto max-w-sm">
        <GoldOrnamentBorder className="bg-cream/5 px-6 py-10 backdrop-blur-sm">
          <ScaleIn>
            <CoupleSilhouette className="mx-auto h-28 w-36 text-gold" />
          </ScaleIn>

          <FadeIn delay={0.15}>
            <p className="mt-4 font-body text-xs uppercase tracking-[0.4em] text-gold">शुभविवाह</p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="mt-5 font-serif text-4xl text-cream sm:text-5xl">{invitation.groomName}</p>
            <p className="my-2 font-serif text-lg italic text-cream/50">&amp;</p>
            <p className="font-serif text-4xl text-cream sm:text-5xl">{invitation.brideName}</p>
          </FadeIn>

          <OrnamentalDivider />

          <FadeIn delay={0.35}>
            <p className="font-body text-sm text-cream/80">
              {[invitation.weddingDate, invitation.weddingTime].filter(Boolean).join(" \u00B7 ")}
            </p>
            {invitation.location && <p className="mt-1 font-body text-sm text-cream/60">{invitation.location}</p>}
          </FadeIn>
        </GoldOrnamentBorder>
      </div>
    </section>
  );
}

/** A regal hero with stylized bride/groom silhouettes inside a gold ornamental frame + shared sections. */
export default function RoyalCouple({ invitation }: { invitation: Invitation }) {
  return (
    <div>
      <RoyalCoupleHero invitation={invitation} />
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
