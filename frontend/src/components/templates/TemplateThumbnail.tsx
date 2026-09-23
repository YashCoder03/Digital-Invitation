import type { Invitation } from "@/types/invitation";
import InvitationRenderer from "@/components/invitation/InvitationRenderer";

/**
 * A real (not static-screenshot) miniature preview: renders the actual template component
 * at full size, then scales it down and crops it to fit the given container height.
 * Purely decorative - the surrounding UI (heading/buttons) carries the accessible name.
 */
export default function TemplateThumbnail({
  invitation,
  scale = 0.32,
  className = "",
}: {
  invitation: Invitation;
  scale?: number;
  className?: string;
}) {
  const inversePercent = `${100 / scale}%`;

  return (
    <div className={`relative overflow-hidden bg-cream ${className}`} aria-hidden="true">
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left font-devanagari-serif"
        style={{ width: inversePercent, transform: `scale(${scale})` }}
      >
        <InvitationRenderer invitation={invitation} />
      </div>
    </div>
  );
}
