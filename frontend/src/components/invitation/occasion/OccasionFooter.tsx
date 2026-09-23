import Link from "next/link";
import type { Invitation } from "@/types/invitation";
import type { OccasionTemplateConfig } from "@/data/occasionTemplateConfigs";

/** Same structure as InvitationFooter, without assuming every occasion has a "couple". */
export default function OccasionFooter({
  invitation,
  config,
}: {
  invitation: Invitation;
  config: OccasionTemplateConfig;
}) {
  const signoff =
    config.namesMode === "couple"
      ? [invitation.groomName, invitation.brideName].filter(Boolean).join(" & ")
      : invitation.groomName;

  return (
    <footer className={`${config.panelBg} px-6 py-10 text-center ${config.dark ? "text-cream" : ""}`}>
      {signoff && (
        <>
          <p className={`font-script text-2xl ${config.dark ? "text-gold" : config.accentText}`}>With love,</p>
          <p className={`mt-1 font-body text-sm ${config.dark ? "text-cream/70" : "text-foreground/60"}`}>{signoff}</p>
        </>
      )}
      <Link
        href="/"
        className={`mt-6 inline-block font-body text-xs uppercase tracking-widest ${
          config.dark ? "text-cream/40" : "text-foreground/35"
        }`}
      >
        Made with ❤️ using ShubhInvite
      </Link>
    </footer>
  );
}
