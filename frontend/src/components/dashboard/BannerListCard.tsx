"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Invitation } from "@/types/invitation";
import type { InvitationBanner } from "@/types/banner";
import { BANNER_FORMATS } from "@/types/banner";
import { deleteBanner } from "@/lib/bannerStorage";
import { getBannerSource } from "@/lib/bannerUtils";
import { downloadDataUrl, exportBannerToPng, shareBannerImage } from "@/lib/bannerExport";
import BannerRenderer from "@/components/banner/BannerRenderer";
import ConfirmDeleteModal from "@/components/dashboard/ConfirmDeleteModal";

export default function BannerListCard({
  banner,
  invitation,
  onDeleted,
}: {
  banner: InvitationBanner;
  invitation: Invitation;
  onDeleted: (bannerId: string) => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "working" | "unsupported">("idle");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const staticRef = useRef<HTMLDivElement>(null);

  const source = getBannerSource(banner);
  const title =
    banner.content.title ||
    [invitation.groomName, invitation.brideName].filter(Boolean).join(" & ") ||
    invitation.title ||
    "Untitled Banner";
  const occasionLabel = invitation.occasion
    ? invitation.occasion.charAt(0).toUpperCase() + invitation.occasion.slice(1)
    : "";

  async function handleDownload() {
    if (!staticRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await exportBannerToPng(staticRef.current, banner.format);
      downloadDataUrl(dataUrl, `shubhinvite-banner-${banner.format.toLowerCase()}.png`);
    } finally {
      setDownloading(false);
    }
  }

  async function handleShare() {
    if (!staticRef.current) return;
    setShareState("working");
    try {
      const dataUrl = await exportBannerToPng(staticRef.current, banner.format);
      const result = await shareBannerImage(dataUrl, "shubhinvite-banner.png", title);
      setShareState(result === "shared" ? "idle" : "unsupported");
    } catch {
      setShareState("unsupported");
    }
  }

  function handleDelete() {
    setDeleting(true);
    setDeleteError(null);
    try {
      deleteBanner(banner.id);
      setConfirmOpen(false);
      onDeleted(banner.id);
    } catch {
      setDeleteError("Couldn't delete banner. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-cream">
      <div className="max-h-56 w-full overflow-hidden">
        <BannerRenderer banner={banner} invitation={invitation} />
      </div>
      <div aria-hidden="true" className="pointer-events-none fixed left-[-9999px] top-0 w-[1080px]">
        <div ref={staticRef}>
          <BannerRenderer banner={banner} invitation={invitation} staticExport />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="font-serif text-base text-wine">{title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-xs uppercase tracking-widest text-terracotta">
          {occasionLabel && <span>{occasionLabel}</span>}
          <span className="text-foreground/30">•</span>
          <span>{BANNER_FORMATS[banner.format].label}</span>
          <span className="text-foreground/30">•</span>
          <span className={source === "STANDALONE" ? "text-foreground/50" : "text-sage"}>
            {source === "STANDALONE" ? "Standalone" : "From Invitation"}
          </span>
        </div>
        <p className="mt-1 font-body text-xs text-foreground/45">
          Updated {new Date(banner.updatedAt).toLocaleDateString()}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/banner/create/${invitation.id}`}
            className="rounded-full border border-wine/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/10"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="rounded-full border border-sage/40 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-sage transition-colors hover:bg-sage/10 disabled:opacity-60"
          >
            {downloading ? "Preparing…" : "Download"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={shareState === "working"}
            className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine disabled:opacity-60"
          >
            {shareState === "working" ? "Preparing…" : "Share"}
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-full border border-gold/30 px-3 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-red/40 hover:text-red"
          >
            Delete
          </button>
        </div>
        {shareState === "unsupported" && (
          <p className="mt-2 font-body text-xs text-foreground/50">
            Sharing isn&apos;t supported here - try downloading instead.
          </p>
        )}
      </div>

      <ConfirmDeleteModal
        open={confirmOpen}
        title="Delete banner?"
        confirmLabel="Delete Banner"
        busy={deleting}
        errorMessage={deleteError}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        description={<p>&quot;{title}&quot; will be permanently deleted.</p>}
      />
    </div>
  );
}
