"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { useAuth } from "@/context/AuthContext";
import { getAllBanners } from "@/lib/bannerStorage";
import { getBannerSource } from "@/lib/bannerUtils";
import { loadInvitationById } from "@/lib/loadInvitation";
import BannerListCard from "@/components/dashboard/BannerListCard";
import type { InvitationBanner } from "@/types/banner";
import type { Invitation } from "@/types/invitation";

type Entry = { banner: InvitationBanner; invitation: Invitation };
type Tab = "ALL" | "INVITATION" | "STANDALONE";

const TABS: { id: Tab; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "INVITATION", label: "From Invitations" },
  { id: "STANDALONE", label: "Standalone" },
];

export default function DashboardBannersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [tab, setTab] = useState<Tab>("ALL");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function load() {
      const banners = getAllBanners();
      const results = await Promise.all(
        banners.map(async (banner) => {
          const invitation = await loadInvitationById(banner.invitationId);
          return invitation ? { banner, invitation } : null;
        })
      );
      if (!cancelled) setEntries(results.filter((entry): entry is Entry => entry !== null));
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const visibleEntries = useMemo(() => {
    if (!entries) return null;
    if (tab === "ALL") return entries;
    return entries.filter((entry) => getBannerSource(entry.banner) === tab);
  }, [entries, tab]);

  if (loading || !user) return null;

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:flex-row">
        <DashboardNav />

        <section className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-wine">My Banners</h1>
              <p className="mt-1 font-body text-sm text-foreground/60">
                Shareable graphics for WhatsApp, Instagram, and more.
              </p>
            </div>
            <Link
              href="/banner/create"
              className="rounded-full bg-wine px-5 py-2.5 font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90"
            >
              + Create Banner
            </Link>
          </div>

          <div className="mt-6 flex gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`rounded-full px-4 py-2 font-body text-xs uppercase tracking-widest transition-colors ${
                  tab === t.id ? "bg-wine text-cream" : "border border-gold/30 text-foreground/60"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {entries === null && <p className="mt-10 font-body text-sm text-foreground/60">Loading your banners…</p>}

          {visibleEntries !== null && visibleEntries.length === 0 && (
            <div className="mt-16 flex flex-col items-center gap-3 text-center">
              <p className="font-serif text-xl text-wine">No banners yet</p>
              <p className="max-w-sm font-body text-sm text-foreground/50">
                Create a beautiful banner for WhatsApp, Instagram, or your next celebration.
              </p>
              <Link
                href="/banner/create"
                className="mt-2 rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
              >
                Create Banner
              </Link>
            </div>
          )}

          {visibleEntries !== null && visibleEntries.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleEntries.map(({ banner, invitation }) => (
                <BannerListCard
                  key={banner.id}
                  banner={banner}
                  invitation={invitation}
                  onDeleted={(id) => setEntries((prev) => prev?.filter((entry) => entry.banner.id !== id) ?? null)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
