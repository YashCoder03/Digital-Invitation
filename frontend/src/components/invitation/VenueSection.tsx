import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";
import { buildMapsUrl } from "@/lib/invitationUtils";

export default function VenueSection({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  const venue = invitation.venue;
  if (!venue?.name && !venue?.address) return null;

  const mapsUrl = venue.mapUrl || buildMapsUrl(`${venue.name} ${venue.address}`.trim() || invitation.location);

  return (
    <section className={`${theme.panelBg} px-6 py-12 text-center ${theme.dark ? "text-cream" : ""}`}>
      <h2 className={`font-serif text-2xl sm:text-3xl ${theme.dark ? "text-gold" : theme.accentText}`}>
        स्थळ
      </h2>
      <p className={`mt-4 font-serif text-xl ${theme.dark ? "text-cream" : "text-wine"}`}>{venue.name}</p>
      <p className={`mt-1 font-body text-sm ${theme.dark ? "text-cream/70" : "text-foreground/60"}`}>
        {venue.address}
      </p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 inline-block rounded-full border px-6 py-2.5 font-body text-sm uppercase tracking-widest transition-colors ${
          theme.dark
            ? "border-gold text-gold hover:bg-gold hover:text-wine"
            : `${theme.accentBorder} ${theme.accentText} hover:bg-wine hover:text-cream hover:border-wine`
        }`}
      >
        नकाशावर पहा
      </a>
    </section>
  );
}
