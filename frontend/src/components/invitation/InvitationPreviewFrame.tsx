import type { Invitation } from "@/types/invitation";
import InvitationRenderer from "./InvitationRenderer";

export default function InvitationPreviewFrame({
  invitation,
  fontClass = "font-devanagari-serif",
}: {
  invitation: Invitation;
  fontClass?: string;
}) {
  return (
    <div
      className={`${fontClass} mx-auto w-full max-w-sm overflow-hidden rounded-4xl border border-gold/30 bg-ivory shadow-xl`}
    >
      <div className="max-h-[75vh] overflow-y-auto">
        <InvitationRenderer invitation={invitation} />
      </div>
    </div>
  );
}
