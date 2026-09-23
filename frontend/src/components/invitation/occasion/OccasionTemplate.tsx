import type { Invitation } from "@/types/invitation";
import { occasionTemplateConfigs } from "@/data/occasionTemplateConfigs";
import VenueSection from "../VenueSection";
import PhotoGallery from "../PhotoGallery";
import RSVPSection from "../RSVPSection";
import ContactSection from "../ContactSection";
import MusicControl from "../MusicControl";
import TemplateUnavailable from "../TemplateUnavailable";
import OccasionInvitationHero from "./OccasionInvitationHero";
import OccasionCountdown from "./OccasionCountdown";
import OccasionMessage from "./OccasionMessage";
import OccasionEventTimeline from "./OccasionEventTimeline";
import OccasionFooter from "./OccasionFooter";

/**
 * Shared renderer for every non-wedding occasion template (engagement/birthday/baby shower/
 * housewarming/anniversary/puja/celebration). Each templateId only differs by its entry in
 * occasionTemplateConfigs (colors, motif, layout, animation, copy) - not by a separate
 * component - so adding a new occasion template is a config + registry entry, not new code.
 */
export default function OccasionTemplate({ invitation }: { invitation: Invitation }) {
  const config = occasionTemplateConfigs[invitation.templateId];
  if (!config) return <TemplateUnavailable />;

  return (
    <div>
      <OccasionInvitationHero invitation={invitation} config={config} />
      <OccasionCountdown invitation={invitation} config={config} />
      <OccasionMessage invitation={invitation} />
      <OccasionEventTimeline invitation={invitation} config={config} />
      <VenueSection invitation={invitation} theme={config} />
      <PhotoGallery invitation={invitation} theme={config} />
      <RSVPSection invitation={invitation} theme={config} />
      <ContactSection invitation={invitation} theme={config} />
      <OccasionFooter invitation={invitation} config={config} />
      <MusicControl invitation={invitation} />
    </div>
  );
}
