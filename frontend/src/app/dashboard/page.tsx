"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { useAuth } from "@/context/AuthContext";
import { listInvitations } from "@/lib/api/invitations";
import { getAllBanners } from "@/lib/bannerStorage";
import { getBannerSource } from "@/lib/bannerUtils";

interface Stats {
  invitationsTotal: number;
  invitationsPublished: number;
  invitationsDraft: number;
  bannersTotal: number;
  bannersFromInvitations: number;
  bannersStandalone: number;
}

export default function DashboardHomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function load() {
      const invitations = await listInvitations().catch(() => []);
      const banners = getAllBanners();
      if (cancelled) return;
      setStats({
        invitationsTotal: invitations.length,
        invitationsPublished: invitations.filter((inv) => inv.status === "PUBLISHED").length,
        invitationsDraft: invitations.filter((inv) => inv.status === "DRAFT").length,
        bannersTotal: banners.length,
        bannersFromInvitations: banners.filter((b) => getBannerSource(b) === "INVITATION").length,
        bannersStandalone: banners.filter((b) => getBannerSource(b) === "STANDALONE").length,
      });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:flex-row">
        <DashboardNav />

        <section className="flex-1">
          <h1 className="font-serif text-3xl text-wine">Welcome back{user.name ? `, ${user.name}` : ""}</h1>
          <p className="mt-1 font-body text-sm text-foreground/60">
            Manage your invitations and banners - two separate things you can create with ShubhInvite.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-wine/20 bg-cream p-6">
              <p className="font-body text-xs uppercase tracking-widest text-terracotta">Invitations</p>
              <p className="mt-2 font-serif text-2xl text-wine">Digital invitation websites</p>
              {stats ? (
                <ul className="mt-4 flex flex-col gap-1 font-body text-sm text-foreground/70">
                  <li>{stats.invitationsTotal} total</li>
                  <li>{stats.invitationsPublished} published</li>
                  <li>{stats.invitationsDraft} draft</li>
                </ul>
              ) : (
                <p className="mt-4 font-body text-sm text-foreground/50">Loading…</p>
              )}
              <Link
                href="/dashboard/invitations"
                className="mt-5 inline-block rounded-full border border-wine/30 px-4 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/10"
              >
                View Invitations
              </Link>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-cream p-6">
              <p className="font-body text-xs uppercase tracking-widest text-terracotta">Banners</p>
              <p className="mt-2 font-serif text-2xl text-wine">Shareable visual graphics</p>
              {stats ? (
                <ul className="mt-4 flex flex-col gap-1 font-body text-sm text-foreground/70">
                  <li>{stats.bannersTotal} total</li>
                  <li>{stats.bannersFromInvitations} from invitations</li>
                  <li>{stats.bannersStandalone} standalone</li>
                </ul>
              ) : (
                <p className="mt-4 font-body text-sm text-foreground/50">Loading…</p>
              )}
              <Link
                href="/dashboard/banners"
                className="mt-5 inline-block rounded-full border border-wine/30 px-4 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/10"
              >
                View Banners
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-serif text-xl text-wine">What would you like to create?</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Link
                href="/templates/wedding"
                className="flex flex-col gap-2 rounded-2xl border border-gold/20 bg-cream p-6 transition-colors hover:border-wine/30"
              >
                <span className="text-3xl">💌</span>
                <span className="font-serif text-lg text-wine">Invitation</span>
                <span className="font-body text-sm text-foreground/60">Create a complete digital invitation.</span>
              </Link>
              <Link
                href="/banner/create"
                className="flex flex-col gap-2 rounded-2xl border border-gold/20 bg-cream p-6 transition-colors hover:border-wine/30"
              >
                <span className="text-3xl">🎨</span>
                <span className="font-serif text-lg text-wine">Banner</span>
                <span className="font-body text-sm text-foreground/60">Create a shareable banner.</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
