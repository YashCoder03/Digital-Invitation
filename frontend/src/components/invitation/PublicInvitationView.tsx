"use client";

import { useEffect, useState } from "react";
import { getPublishedInvitation } from "@/lib/invitationStorage";
import type { Invitation } from "@/types/invitation";
import InvitationRenderer from "./InvitationRenderer";
import InvitationNotFound from "./InvitationNotFound";
import { getPublicInvitationBySlug } from "@/lib/api/invitations";
import { ApiError } from "@/lib/api/client";
import { mapPublicInvitationToInvitation } from "@/lib/mappers/invitationMapper";
import { mapPublicEventToItem } from "@/lib/mappers/eventMapper";

type ViewState =
  | { status: "loading" }
  | { status: "ready"; invitation: Invitation }
  | { status: "not-found" }
  | { status: "error" };

export default function PublicInvitationView({ slug }: { slug: string }) {
  const [view, setView] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const dto = await getPublicInvitationBySlug(slug);
        if (cancelled) return;
        const events = dto.events.map(mapPublicEventToItem);
        setView({ status: "ready", invitation: mapPublicInvitationToInvitation(dto, slug, events) });
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          // Not a backend-tracked invitation (e.g. a non-wedding occasion) — fall back to the local prototype.
          const local = getPublishedInvitation(slug);
          setView(local ? { status: "ready", invitation: local } : { status: "not-found" });
        } else {
          setView({ status: "error" });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (view.status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-wine/30 border-t-wine" />
        <p className="mt-4 font-body text-sm text-foreground/60">Loading your invitation…</p>
      </div>
    );
  }

  if (view.status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <h1 className="font-serif text-3xl text-wine">Something went wrong</h1>
        <p className="max-w-sm font-body text-foreground/60">Please try again.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (view.status === "not-found") return <InvitationNotFound />;

  return (
    <div className="min-h-screen bg-cream">
      <div className="font-devanagari-serif mx-auto w-full max-w-2xl bg-ivory lg:my-10 lg:shadow-2xl">
        <InvitationRenderer invitation={view.invitation} />
      </div>
    </div>
  );
}

