import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";

export default function EventTimeline({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  if (!invitation.events?.length) return null;

  return (
    <section className="bg-ivory px-6 py-12">
      <h2 className={`text-center font-serif text-2xl ${theme.accentText} sm:text-3xl`}>
        विवाह सोहळ्याचे कार्यक्रम
      </h2>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-4">
        {invitation.events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-cream px-5 py-4"
          >
            <span className="text-2xl">{event.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg text-wine">{event.name}</p>
              <p className="font-body text-sm text-foreground/60">
                {[event.date, event.time].filter(Boolean).join(" \u00B7 ")}
              </p>
              {(event.venue || event.address) && (
                <p className="mt-0.5 font-body text-xs text-foreground/45">
                  {[event.venue, event.address].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
