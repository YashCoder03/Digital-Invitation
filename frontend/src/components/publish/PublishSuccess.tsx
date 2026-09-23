"use client";

import { useState } from "react";
import Link from "next/link";
import type { Invitation } from "@/types/invitation";
import { getShareableUrl, getDisplayUrl, buildWhatsAppMessage, buildWhatsAppShareUrl } from "@/lib/invitationUtils";

export default function PublishSuccess({ invitation, editHref }: { invitation: Invitation; editHref: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = getShareableUrl(invitation.slug);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard permissions can be denied — fail silently rather than throwing
    }
  }

  function handleWhatsApp() {
    const message = buildWhatsAppMessage(invitation, shareUrl);
    window.open(buildWhatsAppShareUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="motion-safe:animate-invite-fade-up rounded-2xl border border-gold/20 bg-cream p-6 text-center sm:p-10">
      <span className="text-4xl">🎉</span>
      <h2 className="mt-3 font-serif text-2xl text-wine sm:text-3xl">Your invitation is ready!</h2>
      <p className="mx-auto mt-2 max-w-sm font-body text-sm text-foreground/60">
        Your beautiful wedding invitation is now ready to share.
      </p>

      <p className="mx-auto mt-5 w-fit rounded-full border border-gold/30 bg-ivory px-5 py-2.5 font-body text-sm text-wine">
        {getDisplayUrl(invitation.slug)}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/invite/${invitation.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-wine px-5 py-3 text-center font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
        >
          View Invitation
        </Link>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="rounded-full border border-sage/40 px-5 py-3 font-body text-sm uppercase tracking-widest text-sage transition-colors hover:bg-sage/10"
        >
          Share on WhatsApp
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-wine/30 px-5 py-3 font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
        >
          {copied ? "✓ Copied!" : "Copy Link"}
        </button>
        <Link
          href={editHref}
          className="rounded-full border border-gold/30 px-5 py-3 text-center font-body text-sm uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine"
        >
          Edit Invitation
        </Link>
      </div>

      <ul className="mx-auto mt-8 flex max-w-xs flex-col gap-2 text-left font-body text-sm text-foreground/60">
        <li className="flex items-center gap-2">
          <span className="text-sage">✓</span> Invitation published
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sage">✓</span> Shareable link created
        </li>
        <li className="flex items-center gap-2">
          <span className="text-sage">✓</span> Mobile-friendly invitation
        </li>
      </ul>

      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-gold/20 bg-ivory px-6 py-5">
        <p className="font-serif text-lg text-wine">Create a matching banner</p>
        <p className="mt-1 font-body text-sm text-foreground/60">
          Share your special moments everywhere with a banner designed to match your invitation.
        </p>
        <Link
          href={`/banner/create/${invitation.id}`}
          className="mt-4 inline-block rounded-full bg-wine px-6 py-2.5 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
        >
          Create Banner
        </Link>
      </div>

      <Link
        href="/dashboard"
        className="mt-6 inline-block font-body text-xs uppercase tracking-widest text-foreground/40 hover:text-wine"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
