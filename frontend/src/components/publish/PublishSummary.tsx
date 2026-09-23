import Link from "next/link";
import type { Invitation } from "@/types/invitation";
import { getInvitationTheme } from "@/components/invitation/theme";

export default function PublishSummary({ invitation, editHref }: { invitation: Invitation; editHref: string }) {
  const theme = getInvitationTheme(invitation.templateId);
  const heading = invitation.title || [invitation.groomName, invitation.brideName].filter(Boolean).join(" & ");

  return (
    <div className="rounded-2xl border border-gold/20 bg-cream p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg text-wine">Invitation Summary</h2>
        <span
          className={`rounded-full px-3 py-1 font-body text-xs uppercase tracking-widest ${
            invitation.status === "published" ? "bg-sage/20 text-sage" : "bg-gold/20 text-terracotta"
          }`}
        >
          {invitation.status === "published" ? "Published" : "Draft"}
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        {invitation.groomName && invitation.brideName ? (
          <>
            <p className="font-body text-xs uppercase tracking-widest text-foreground/50">
              {invitation.groomTitle} {invitation.groomName}
            </p>
            <span className="my-1 font-serif text-sm italic text-foreground/40">&amp;</span>
            <p className="font-body text-xs uppercase tracking-widest text-foreground/50">
              {invitation.brideTitle} {invitation.brideName}
            </p>
          </>
        ) : (
          <p className="font-body text-xs uppercase tracking-widest text-foreground/50">{heading}</p>
        )}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-gold/20 pt-6 text-sm">
        <div>
          <dt className="font-body text-xs uppercase tracking-widest text-foreground/40">Date</dt>
          <dd className="mt-1 font-body text-foreground/80">{invitation.weddingDate}</dd>
        </div>
        <div>
          <dt className="font-body text-xs uppercase tracking-widest text-foreground/40">Location</dt>
          <dd className="mt-1 font-body text-foreground/80">{invitation.location}</dd>
        </div>
        <div>
          <dt className="font-body text-xs uppercase tracking-widest text-foreground/40">Events</dt>
          <dd className="mt-1 font-body text-foreground/80">{invitation.events?.length ?? 0}</dd>
        </div>
        <div>
          <dt className="font-body text-xs uppercase tracking-widest text-foreground/40">Photos</dt>
          <dd className="mt-1 font-body text-foreground/80">
            {(invitation.photos?.gallery?.length ?? 0) +
              (invitation.photos?.family?.length ?? 0) +
              (invitation.photos?.couple ? 1 : 0)}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="font-body text-xs uppercase tracking-widest text-foreground/40">Template</dt>
          <dd className="mt-1 font-body text-foreground/80">{theme.label}</dd>
        </div>
      </dl>

      <Link
        href={editHref}
        className="mt-6 block w-full rounded-full border border-wine/30 px-6 py-3 text-center font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
      >
        Edit Invitation
      </Link>
    </div>
  );
}
