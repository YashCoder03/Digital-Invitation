import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";
import { formatTelHref } from "@/lib/invitationUtils";

export default function ContactSection({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  if (!invitation.contacts?.length) return null;

  return (
    <section className="bg-cream px-6 py-12 text-center">
      <h2 className={`font-serif text-2xl ${theme.accentText} sm:text-3xl`}>संपर्क</h2>
      <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
        {invitation.contacts.map((contact) => (
          <a
            key={contact.phone}
            href={formatTelHref(contact.phone)}
            className="rounded-xl border border-gold/20 bg-ivory px-5 py-3 font-body text-foreground/80 transition-colors hover:border-wine/40"
          >
            <span className="block font-serif text-base text-wine">{contact.label}</span>
            <span className="mt-0.5 block text-sm">{contact.phone}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
