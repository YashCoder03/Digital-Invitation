import type { Invitation } from "@/types/invitation";
import { invitationThemes } from "./theme";
import InvitationHero from "./InvitationHero";
import Countdown from "./Countdown";
import WeddingMessage from "./WeddingMessage";
import EventTimeline from "./EventTimeline";
import VenueSection from "./VenueSection";
import PhotoGallery from "./PhotoGallery";
import RSVPSection from "./RSVPSection";
import ContactSection from "./ContactSection";
import InvitationFooter from "./InvitationFooter";
import MusicControl from "./MusicControl";

export default function ModernMarathi({ invitation }: { invitation: Invitation }) {
  const theme = invitationThemes.modern;

  return (
    <div>
      <InvitationHero invitation={invitation} theme={theme} />
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
