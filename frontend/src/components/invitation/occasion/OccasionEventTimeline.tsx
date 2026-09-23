import type { Invitation } from "@/types/invitation";
import type { OccasionTemplateConfig } from "@/data/occasionTemplateConfigs";
import FadeIn from "@/components/animations/FadeIn";

/** Same structure as EventTimeline, with a configurable (non-wedding-specific) heading. */
export default function OccasionEventTimeline({
  invitation,
  config,
}: {
  invitation: Invitation;
  config: OccasionTemplateConfig;
}) {
  if (!invitation.events?.length) return null;

  return (
    <section className="bg-ivory px-6 py-12">
      <h2 className={`text-center font-serif text-2xl ${config.accentText} sm:text-3xl`}>{config.scheduleLabel}</h2>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-4">
        {invitation.events.map((event, index) => (
          <FadeIn key={event.id} delay={Math.min(index * 0.08, 0.4)}>
            <div className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-cream px-5 py-4">
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
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
