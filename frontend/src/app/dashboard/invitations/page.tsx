"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ConfirmDeleteModal from "@/components/dashboard/ConfirmDeleteModal";
import Toast from "@/components/dashboard/Toast";
import { useAuth } from "@/context/AuthContext";
import { deleteInvitationById, listInvitations } from "@/lib/api/invitations";
import type { InvitationResponseDto } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";
import { getTemplateById } from "@/lib/templateUtils";
import { buildSampleInvitation } from "@/lib/templateSampleInvitation";
import { deleteBanner, getBannersForInvitation } from "@/lib/bannerStorage";
import { getDisplayUrl, getShareableUrl, buildWhatsAppShareUrl } from "@/lib/invitationUtils";
import TemplateThumbnail from "@/components/templates/TemplateThumbnail";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; invitations: InvitationResponseDto[] }
  | { status: "error"; message: string };

type StatusFilter = "ALL" | "DRAFT" | "PUBLISHED";

const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "DRAFT", label: "Draft" },
  { id: "PUBLISHED", label: "Published" },
];

function occasionLabel(templateId: string): string {
  const occasion = getTemplateById(templateId)?.occasion ?? "WEDDING";
  return occasion.charAt(0) + occasion.slice(1).toLowerCase().replaceAll("_", " ");
}

export default function DashboardInvitationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [reloadToken, setReloadToken] = useState(0);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [pendingDelete, setPendingDelete] = useState<InvitationResponseDto | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    listInvitations()
      .then((invitations) => {
        if (!cancelled) setState({ status: "ready", invitations });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            status: "error",
            message: err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user, reloadToken]);

  const counts = useMemo(() => {
    const invitations = state.status === "ready" ? state.invitations : [];
    return {
      total: invitations.length,
      published: invitations.filter((inv) => inv.status === "PUBLISHED").length,
      draft: invitations.filter((inv) => inv.status === "DRAFT").length,
    };
  }, [state]);

  const filteredInvitations = useMemo(() => {
    if (state.status !== "ready") return [];
    if (statusFilter === "ALL") return state.invitations;
    return state.invitations.filter((inv) => inv.status === statusFilter);
  }, [state, statusFilter]);

  if (loading || !user) return null;

  const bannerCount = pendingDelete ? getBannersForInvitation(pendingDelete.id).length : 0;

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteInvitationById(pendingDelete.id);
      getBannersForInvitation(pendingDelete.id).forEach((banner) => deleteBanner(banner.id));
      setState((prev) =>
        prev.status === "ready"
          ? { status: "ready", invitations: prev.invitations.filter((inv) => inv.id !== pendingDelete.id) }
          : prev
      );
      setToast("Invitation deleted");
      setPendingDelete(null);
    } catch (err) {
      setDeleteError(err instanceof ApiError ? err.message : "Couldn't delete invitation. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  async function handleCopyLink(invitation: InvitationResponseDto) {
    try {
      await navigator.clipboard.writeText(getShareableUrl(invitation.slug));
      setCopiedId(invitation.id);
      setTimeout(() => setCopiedId((current) => (current === invitation.id ? null : current)), 2000);
    } catch {
      // clipboard permissions can be denied - fail silently rather than throwing
    }
  }

  function handleWhatsApp(invitation: InvitationResponseDto) {
    const url = getShareableUrl(invitation.slug);
    const message = [
      "\u{1F48C} You're invited!",
      `Join us as we celebrate the wedding of ${invitation.groomName} & ${invitation.brideName}`,
      invitation.weddingDate,
      "",
      "View the invitation:",
      url,
    ].join("\n");
    window.open(buildWhatsAppShareUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:flex-row">
        <DashboardNav />

        <section className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-wine">My Invitations</h1>
              <p className="mt-1 font-body text-sm text-foreground/60">
                Complete digital invitation websites you&apos;ve created with ShubhInvite.
              </p>
            </div>
            <Link
              href="/templates/wedding"
              className="rounded-full bg-wine px-5 py-2.5 font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90"
            >
              + Create Invitation
            </Link>
          </div>

          {state.status === "ready" && counts.total > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setStatusFilter(filter.id)}
                    aria-pressed={statusFilter === filter.id}
                    className={`rounded-full px-4 py-2 font-body text-xs uppercase tracking-widest transition-colors ${
                      statusFilter === filter.id ? "bg-wine text-cream" : "border border-gold/30 text-foreground/60"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <p className="font-body text-xs text-foreground/45">
                {counts.total} total &middot; {counts.published} published &middot; {counts.draft} draft
              </p>
            </div>
          )}

          {state.status === "loading" && (
            <p className="mt-10 font-body text-sm text-foreground/60">Loading your invitations…</p>
          )}

          {state.status === "error" && (
            <div className="mt-10 flex flex-col items-start gap-3">
              <p className="font-body text-sm text-red">{state.message}</p>
              <button
                type="button"
                onClick={() => {
                  setState({ status: "loading" });
                  setReloadToken((n) => n + 1);
                }}
                className="rounded-full border border-wine/30 px-4 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
              >
                Try Again
              </button>
            </div>
          )}

          {state.status === "ready" && counts.total === 0 && (
            <div className="mt-16 flex flex-col items-center gap-4 text-center">
              <p className="font-serif text-xl text-wine">No invitations yet</p>
              <p className="max-w-sm font-body text-sm text-foreground/60">
                Create your first digital invitation and share it with your guests.
              </p>
              <Link
                href="/templates/wedding"
                className="rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
              >
                Create Invitation
              </Link>
            </div>
          )}

          {state.status === "ready" && counts.total > 0 && filteredInvitations.length === 0 && (
            <p className="mt-16 text-center font-body text-sm text-foreground/50">
              No {statusFilter.toLowerCase()} invitations.
            </p>
          )}

          {state.status === "ready" && filteredInvitations.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredInvitations.map((invitation) => {
                const editHref = `/customize?occasion=wedding&style=${invitation.templateId}&id=${invitation.id}`;
                const template = getTemplateById(invitation.templateId);
                const isPublished = invitation.status === "PUBLISHED";
                return (
                  <div key={invitation.id} className="flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-cream">
                    <TemplateThumbnail invitation={buildSampleInvitation(invitation.templateId)} className="h-32 w-full border-b border-gold/20" />
                    <div className="flex flex-1 flex-col p-5">
                    <p className="font-serif text-lg text-wine">
                      {invitation.groomName} &amp; {invitation.brideName}
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground/70">{occasionLabel(invitation.templateId)}</p>
                    <p className="mt-0.5 font-body text-xs uppercase tracking-widest text-terracotta">
                      {template?.name ?? invitation.templateId}
                    </p>
                    <span
                      className={`mt-3 w-fit rounded-full px-3 py-1 font-body text-xs uppercase tracking-widest ${
                        isPublished ? "bg-sage/15 text-sage" : "bg-gold/15 text-terracotta"
                      }`}
                    >
                      {isPublished ? "Published" : "Draft"}
                    </span>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {!isPublished ? (
                        <>
                          <Link
                            href={editHref}
                            className="rounded-full border border-wine/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/10"
                          >
                            Continue Editing
                          </Link>
                          <Link
                            href={`/preview/${invitation.id}`}
                            className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine"
                          >
                            Preview
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href={editHref}
                            className="rounded-full border border-wine/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/10"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/invite/${invitation.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-sage/40 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-sage transition-colors hover:bg-sage/10"
                          >
                            View
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleCopyLink(invitation)}
                            className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine"
                            title={getDisplayUrl(invitation.slug)}
                          >
                            {copiedId === invitation.id ? "✓ Copied" : "Copy Link"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWhatsApp(invitation)}
                            className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine"
                          >
                            Share
                          </button>
                          <Link
                            href={`/banner/create/${invitation.id}`}
                            className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine"
                          >
                            Create Banner
                          </Link>
                        </>
                      )}
                      <Link
                        href={`/dashboard/invitations/${invitation.id}/rsvps`}
                        className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine"
                      >
                        RSVPs
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteError(null);
                          setPendingDelete(invitation);
                        }}
                        className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-red/40 hover:text-red"
                      >
                        Delete
                      </button>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <ConfirmDeleteModal
        open={pendingDelete !== null}
        title="Delete invitation?"
        confirmLabel="Delete Invitation"
        busy={deleting}
        errorMessage={deleteError}
        onCancel={() => {
          setPendingDelete(null);
          setDeleteError(null);
        }}
        onConfirm={confirmDelete}
        description={
          pendingDelete && (
            <>
              <p>
                This will permanently delete <strong>{pendingDelete.groomName} &amp; {pendingDelete.brideName}</strong>.
              </p>
              <p className="mt-2">The invitation, events, photos, and RSVP responses will be deleted.</p>
              {bannerCount > 0 && (
                <p className="mt-2">
                  This will also delete {bannerCount} banner{bannerCount > 1 ? "s" : ""} associated with this invitation.
                </p>
              )}
            </>
          )
        }
      />

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
