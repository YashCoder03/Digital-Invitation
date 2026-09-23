"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Invitation } from "@/types/invitation";
import PublishSummary from "@/components/publish/PublishSummary";
import PublishSuccess from "@/components/publish/PublishSuccess";
import InvitationPreviewFrame from "@/components/invitation/InvitationPreviewFrame";
import InvitationNotFound from "@/components/invitation/InvitationNotFound";
import { isBackendId } from "@/lib/uuid";
import { ApiError } from "@/lib/api/client";
import { getInvitation, publishInvitation } from "@/lib/invitationStorage";
import { getInvitationById, publishInvitationById } from "@/lib/api/invitations";
import { listEvents } from "@/lib/api/events";
import { mapInvitationResponseToInvitation } from "@/lib/mappers/invitationMapper";
import { mapEventResponseToItem } from "@/lib/mappers/eventMapper";

type Device = "desktop" | "mobile";

/** The owner's final review before publishing - not the public invitation page. */
export default function PreviewScreen({ invitationId }: { invitationId: string }) {
  const isBackend = isBackendId(invitationId);

  const [invitation, setInvitation] = useState<Invitation | null | undefined>(undefined);
  const [loadError, setLoadError] = useState(false);
  const [device, setDevice] = useState<Device>("desktop");
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  useEffect(() => {
    if (!isBackend) {
      // Local invitations are read synchronously from localStorage on mount; there is no
      // async fetch to await, so this is a one-time hydration, not a reactive sync loop.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInvitation(getInvitation(invitationId) ?? null);
      return;
    }

    let cancelled = false;
    async function load() {
      try {
        const [dto, eventDtos] = await Promise.all([getInvitationById(invitationId), listEvents(invitationId)]);
        if (cancelled) return;
        const events = eventDtos.map(mapEventResponseToItem);
        setInvitation(mapInvitationResponseToInvitation(dto, { occasion: "wedding", style: dto.templateId, events }));
      } catch (err) {
        if (cancelled) return;
        setInvitation(null);
        if (!(err instanceof ApiError && err.status === 404)) setLoadError(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [invitationId, isBackend]);

  if (invitation === undefined) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-ivory px-6 py-24 text-center">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-wine/30 border-t-wine" aria-hidden="true" />
        <p className="font-body text-sm text-foreground/60">Loading your invitation…</p>
      </div>
    );
  }

  if (invitation === null) {
    if (loadError) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-ivory px-6 py-24 text-center">
          <h1 className="font-serif text-3xl text-wine sm:text-4xl">Something went wrong</h1>
          <p className="mx-auto max-w-sm font-body text-foreground/60">Please try again.</p>
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
    return <InvitationNotFound />;
  }

  const editHref = isBackend
    ? `/create/${invitation.templateId}?id=${invitation.id}`
    : `/customize?occasion=${invitation.occasion}&style=${invitation.style}`;

  const photoCount =
    (invitation.photos?.gallery?.length ?? 0) +
    (invitation.photos?.family?.length ?? 0) +
    (invitation.photos?.couple ? 1 : 0);
  const eventCount = invitation.events?.length ?? 0;

  const readyChecks = [
    { label: "Invitation details", done: Boolean(invitation.groomName || invitation.title) },
    { label: "Events", done: eventCount > 0 },
    { label: "Photos", done: photoCount > 0 },
    { label: "Template", done: Boolean(invitation.templateId) },
  ];

  async function handlePublish() {
    setPublishing(true);
    setPublishError(null);

    if (!isBackend) {
      setTimeout(() => {
        const updated = publishInvitation(invitationId);
        if (updated) setInvitation(updated);
        setPublishing(false);
      }, 1000);
      return;
    }

    try {
      const result = await publishInvitationById(invitationId);
      setInvitation((current) => (current ? { ...current, status: "published", slug: result.slug } : current));
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : "Unable to publish. Please try again.");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/95 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href={editHref} className="font-body text-sm text-foreground/60 transition-colors hover:text-wine">
            ← Edit Invitation
          </Link>

          {invitation.status !== "published" && (
            <div className="flex items-center gap-1 rounded-full border border-gold/30 p-1" role="group" aria-label="Preview device">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                aria-pressed={device === "desktop"}
                className={`rounded-full px-3 py-1 font-body text-xs uppercase tracking-widest transition-colors ${
                  device === "desktop" ? "bg-wine text-cream" : "text-foreground/60"
                }`}
              >
                Desktop
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                aria-pressed={device === "mobile"}
                className={`rounded-full px-3 py-1 font-body text-xs uppercase tracking-widest transition-colors ${
                  device === "mobile" ? "bg-wine text-cream" : "text-foreground/60"
                }`}
              >
                Mobile
              </button>
            </div>
          )}

          {invitation.status !== "published" ? (
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing}
              className="rounded-full bg-wine px-5 py-2 font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90 disabled:opacity-70"
            >
              {publishing ? "Publishing…" : "Publish"}
            </button>
          ) : (
            <span className="font-body text-xs uppercase tracking-widest text-sage">Published</span>
          )}
        </div>
      </header>

      <section className="px-6 pb-4 pt-10 text-center">
        <h1 className="font-serif text-3xl text-wine sm:text-4xl">Your Invitation</h1>
        <p className="mx-auto mt-2 max-w-md font-body text-sm text-foreground/60">
          This is exactly how your guests will see it.
        </p>
      </section>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="order-1 flex flex-col items-center">
          <div
            className="w-full transition-all"
            style={device === "mobile" ? { maxWidth: 390 } : { maxWidth: 480 }}
          >
            <InvitationPreviewFrame invitation={invitation} />
          </div>
        </div>

        <div className="order-2 flex flex-col gap-6">
          <PublishSummary invitation={invitation} editHref={editHref} />

          {invitation.status === "published" ? (
            <PublishSuccess invitation={invitation} editHref={editHref} />
          ) : (
            <div className="rounded-2xl border border-gold/20 bg-cream p-6 text-center">
              <p className="font-serif text-lg text-wine">You&apos;re ready to publish!</p>
              <ul className="mx-auto mt-4 flex max-w-[220px] flex-col gap-2 text-left font-body text-sm text-foreground/70">
                {readyChecks.map((check) => (
                  <li key={check.label} className="flex items-center gap-2">
                    <span className={check.done ? "text-sage" : "text-foreground/30"} aria-hidden="true">
                      {check.done ? "✓" : "○"}
                    </span>
                    {check.label}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-xs text-foreground/50">
                Your invitation will receive a unique shareable link.
              </p>
              <button
                type="button"
                onClick={handlePublish}
                disabled={publishing}
                className="mt-5 w-full rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90 disabled:opacity-70"
              >
                {publishing ? "Publishing…" : "Publish Invitation"}
              </button>
              {publishError && <p className="mt-3 font-body text-sm text-red">{publishError}</p>}

              <Link
                href={`/banner/create/${invitation.id}`}
                className="mt-3 block w-full rounded-full border border-wine/30 px-6 py-2.5 text-center font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
              >
                Create Banner
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
