"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Invitation } from "@/types/invitation";
import type { BannerFormat, BannerLayout, BannerTextAlign, InvitationBanner } from "@/types/banner";
import { BANNER_FORMATS } from "@/types/banner";
import { loadInvitationById } from "@/lib/loadInvitation";
import { getBannersForInvitation, saveBanner } from "@/lib/bannerStorage";
import {
  applyInvitationUpdates,
  createBannerFromInvitation,
  customizeField,
  hasPendingInvitationChanges,
} from "@/lib/bannerUtils";
import { downloadDataUrl, exportBannerToPng, shareBannerImage } from "@/lib/bannerExport";
import BannerRenderer from "@/components/banner/BannerRenderer";
import InvitationNotFound from "@/components/invitation/InvitationNotFound";
import Logo from "@/components/site/Logo";

const LAYOUT_OPTIONS: { id: BannerLayout; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "centered", label: "Centered" },
  { id: "modern", label: "Modern" },
];

const ALIGN_OPTIONS: { id: BannerTextAlign; label: string }[] = [
  { id: "left", label: "Left" },
  { id: "center", label: "Center" },
  { id: "right", label: "Right" },
];

const FORMAT_OPTIONS: BannerFormat[] = ["STORY", "SQUARE", "LANDSCAPE"];

export default function BannerEditor({
  invitationId,
  source = "INVITATION",
}: {
  invitationId: string;
  source?: "INVITATION" | "STANDALONE";
}) {
  const [invitation, setInvitation] = useState<Invitation | null | undefined>(undefined);
  const [banner, setBanner] = useState<InvitationBanner | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved">("saved");
  const [showSyncNotice, setShowSyncNotice] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [shareState, setShareState] = useState<"idle" | "working" | "unsupported" | "done">("idle");

  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadInvitationById(invitationId).then((inv) => {
      if (cancelled) return;
      setInvitation(inv);
      if (inv) {
        const existing = getBannersForInvitation(invitationId)[0] ?? null;
        const next = existing ?? createBannerFromInvitation(inv, "STORY", source);
        setBanner(next);
        if (existing && hasPendingInvitationChanges(existing, inv)) setShowSyncNotice(true);
      }
      hydrated.current = true;
    });
    return () => {
      cancelled = true;
    };
  }, [invitationId, source]);

  useEffect(() => {
    if (!hydrated.current || !banner) return;
    setSaveStatus("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveBanner(banner);
      setSaveStatus("saved");
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [banner]);

  if (invitation === undefined || (invitation && !banner)) return null;
  if (invitation === null) return <InvitationNotFound />;
  if (!banner) return null;

  function updateContent(patch: Partial<InvitationBanner["content"]>) {
    setBanner((prev) => (prev ? { ...prev, content: { ...prev.content, ...patch }, updatedAt: new Date().toISOString() } : prev));
  }

  function updateBanner(patch: Partial<InvitationBanner>) {
    setBanner((prev) => (prev ? { ...prev, ...patch, updatedAt: new Date().toISOString() } : prev));
  }

  function acceptInvitationUpdates() {
    if (!invitation) return;
    setBanner((prev) => (prev ? applyInvitationUpdates(prev, invitation) : prev));
    setShowSyncNotice(false);
  }

  async function handleDownload() {
    if (!previewRef.current || !banner) return;
    setDownloadState("working");
    try {
      const dataUrl = await exportBannerToPng(previewRef.current, banner.format);
      downloadDataUrl(dataUrl, `shubhinvite-banner-${banner.format.toLowerCase()}.png`);
      setDownloadState("done");
    } catch {
      setDownloadState("error");
    }
  }

  async function handleShare() {
    if (!previewRef.current || !banner) return;
    setShareState("working");
    try {
      const dataUrl = await exportBannerToPng(previewRef.current, banner.format);
      const result = await shareBannerImage(dataUrl, "shubhinvite-banner.png", "Check out our invitation!");
      setShareState(result === "shared" ? "done" : "unsupported");
    } catch {
      setShareState("unsupported");
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/95 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
            </Link>
            <Link
              href={source === "STANDALONE" ? "/dashboard/banners" : "/dashboard/invitations"}
              className="font-body text-sm text-foreground/60 transition-colors hover:text-wine"
            >
              {source === "STANDALONE" ? "← Back to Banners" : "← Back to Invitation"}
            </Link>
            <span className="hidden rounded-full border border-gold/30 px-3 py-1 font-body text-xs uppercase tracking-widest text-terracotta sm:inline-block">
              Banner Creator
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-body text-xs text-foreground/50">
            {saveStatus === "saved" ? (
              <>
                <span className="text-sage">✓</span> Saved
              </>
            ) : (
              "Saving…"
            )}
          </span>
        </div>
      </header>

      {showSyncNotice && (
        <div className="flex flex-wrap items-center justify-center gap-3 bg-gold/10 px-6 py-3 text-center">
          <p className="font-body text-sm text-foreground/70">Invitation details have changed.</p>
          <button
            type="button"
            onClick={acceptInvitationUpdates}
            className="rounded-full bg-wine px-4 py-1.5 font-body text-xs uppercase tracking-widest text-cream hover:bg-wine/90"
          >
            Update Banner
          </button>
          <button
            type="button"
            onClick={() => setShowSyncNotice(false)}
            className="rounded-full border border-wine/30 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-wine hover:bg-wine/5"
          >
            Keep Current Banner
          </button>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="order-2 flex flex-col gap-8 lg:order-1">
          <section>
            <h2 className="font-serif text-xl text-wine">Customize your banner</h2>
            <div className="mt-4 flex flex-col gap-4">
              <label className="block">
                <span className="mb-1.5 block font-body text-sm text-foreground/70">Title</span>
                <input
                  value={banner.content.title ?? ""}
                  onChange={(e) => updateContent({ title: e.target.value })}
                  className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-body text-sm text-foreground/70">Primary Name</span>
                <input
                  value={banner.content.primaryText.value}
                  onChange={(e) => updateContent({ primaryText: customizeField(e.target.value) })}
                  className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-body text-sm text-foreground/70">Secondary Name</span>
                <input
                  value={banner.content.secondaryText.value}
                  onChange={(e) => updateContent({ secondaryText: customizeField(e.target.value) })}
                  className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-body text-sm text-foreground/70">Date</span>
                <input
                  value={banner.content.date.value}
                  onChange={(e) => updateContent({ date: customizeField(e.target.value) })}
                  className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-body text-sm text-foreground/70">Location</span>
                <input
                  value={banner.content.location.value}
                  onChange={(e) => updateContent({ location: customizeField(e.target.value) })}
                  className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-body text-sm text-foreground/70">Message</span>
                <textarea
                  value={banner.content.customMessage ?? ""}
                  onChange={(e) => updateContent({ customMessage: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {(
                [
                  { key: "showCoupleNames", label: "Show names" },
                  { key: "showDate", label: "Show date" },
                  { key: "showLocation", label: "Show location" },
                  { key: "showMessage", label: "Show message" },
                ] as const
              ).map((toggle) => (
                <label key={toggle.key} className="flex items-center justify-between gap-3">
                  <span className="font-body text-sm text-foreground/70">{toggle.label}</span>
                  <input
                    type="checkbox"
                    checked={banner.content[toggle.key]}
                    onChange={(e) => updateContent({ [toggle.key]: e.target.checked })}
                    className="h-5 w-5 accent-wine"
                  />
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-wine">Style</h2>
            <p className="mt-1 font-body text-xs text-foreground/50">Matches your {invitation?.templateId} invitation design.</p>
            <div className="mt-3">
              <p className="font-body text-sm font-medium text-foreground/70">Layout</p>
              <div className="mt-2 flex gap-2">
                {LAYOUT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateBanner({ layout: option.id })}
                    aria-pressed={banner.layout === option.id}
                    className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                      banner.layout === option.id ? "border-wine bg-wine text-cream" : "border-gold/30 text-foreground/70"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="font-body text-sm font-medium text-foreground/70">Text Alignment</p>
              <div className="mt-2 flex gap-2">
                {ALIGN_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateBanner({ textAlign: option.id })}
                    aria-pressed={banner.textAlign === option.id}
                    className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                      banner.textAlign === option.id ? "border-wine bg-wine text-cream" : "border-gold/30 text-foreground/70"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl text-wine">Format</h2>
            <div className="mt-3 flex gap-3">
              {FORMAT_OPTIONS.map((formatOption) => {
                const spec = BANNER_FORMATS[formatOption];
                const isActive = banner.format === formatOption;
                return (
                  <button
                    key={formatOption}
                    type="button"
                    onClick={() => updateBanner({ format: formatOption })}
                    aria-pressed={isActive}
                    className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl border py-4 font-body text-xs uppercase tracking-widest transition-colors ${
                      isActive ? "border-wine bg-wine text-cream" : "border-gold/30 text-foreground/60"
                    }`}
                  >
                    <span
                      className={`rounded-sm border ${isActive ? "border-cream" : "border-foreground/30"}`}
                      style={{
                        width: formatOption === "LANDSCAPE" ? 28 : formatOption === "STORY" ? 14 : 20,
                        height: formatOption === "STORY" ? 24 : 20,
                      }}
                    />
                    {spec.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-serif text-xl text-wine">Share</h2>
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloadState === "working"}
              className="rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90 disabled:opacity-70"
            >
              {downloadState === "working" ? "Preparing…" : "Download Banner"}
            </button>
            <button
              type="button"
              onClick={handleShare}
              disabled={shareState === "working"}
              className="rounded-full border border-wine/30 px-6 py-3 font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5 disabled:opacity-70"
            >
              {shareState === "working" ? "Preparing…" : "Share"}
            </button>
            {shareState === "unsupported" && (
              <p className="font-body text-xs text-foreground/50">
                Sharing isn&apos;t supported on this browser - download the banner and share it on WhatsApp instead.
              </p>
            )}
            {downloadState === "error" && (
              <p className="font-body text-xs text-red">Something went wrong preparing the image. Please try again.</p>
            )}
          </section>
        </div>

        <div className="order-1 flex flex-col items-center gap-4 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <p className="font-body text-xs uppercase tracking-widest text-foreground/40">Live Preview</p>
          <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-xl">
            {invitation && <BannerRenderer banner={banner} invitation={invitation} />}
          </div>
          {/* Hidden, unanimated twin used only for PNG export - guarantees the exported image is fully static. */}
          <div aria-hidden="true" className="pointer-events-none fixed left-[-9999px] top-0 w-[1080px]">
            <div ref={previewRef}>{invitation && <BannerRenderer banner={banner} invitation={invitation} staticExport />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
