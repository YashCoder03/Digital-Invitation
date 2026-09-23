import Link from "next/link";
import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";

function lastWord(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1] || name;
}

export default function InvitationFooter({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  return (
    <footer className={`${theme.panelBg} px-6 py-10 text-center ${theme.dark ? "text-cream" : ""}`}>
      <p className={`font-script text-2xl ${theme.dark ? "text-gold" : "text-wine"}`}>
        With love,
      </p>
      <p className={`mt-1 font-body text-sm ${theme.dark ? "text-cream/70" : "text-foreground/60"}`}>
        The {lastWord(invitation.groomName)} &amp; {lastWord(invitation.brideName)} Family
      </p>
      <Link
        href="/"
        className={`mt-6 inline-block font-body text-xs uppercase tracking-widest ${
          theme.dark ? "text-cream/40" : "text-foreground/35"
        }`}
      >
        Made with ❤️ using ShubhInvite
      </Link>
    </footer>
  );
}
