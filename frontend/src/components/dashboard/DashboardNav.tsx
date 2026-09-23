"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS = [
  { heading: "Invitations", href: "/dashboard/invitations", label: "All Invitations" },
  { heading: "Banners", href: "/dashboard/banners", label: "All Banners" },
];

/** Shared Invitations/Banners section nav for the dashboard - sidebar on desktop, tabs on mobile. */
export default function DashboardNav() {
  const pathname = usePathname();
  const isDashboardHome = pathname === "/dashboard";

  return (
    <nav aria-label="Dashboard" className="lg:w-52 lg:shrink-0">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
        <Link
          href="/dashboard"
          className={`shrink-0 rounded-full px-4 py-2 font-body text-xs uppercase tracking-widest transition-colors ${
            isDashboardHome ? "bg-wine text-cream" : "border border-gold/30 text-foreground/60"
          }`}
        >
          Dashboard
        </Link>
        {NAV_SECTIONS.map((section) => {
          const active = pathname.startsWith(section.href);
          return (
            <Link
              key={section.href}
              href={section.href}
              className={`shrink-0 rounded-full px-4 py-2 font-body text-xs uppercase tracking-widest transition-colors ${
                active ? "bg-wine text-cream" : "border border-gold/30 text-foreground/60"
              }`}
            >
              {section.heading}
            </Link>
          );
        })}
      </div>

      <div className="hidden flex-col gap-6 lg:flex">
        <Link
          href="/dashboard"
          className={`font-body text-sm transition-colors ${
            isDashboardHome ? "font-semibold text-wine" : "text-foreground/70 hover:text-wine"
          }`}
        >
          Dashboard
        </Link>
        {NAV_SECTIONS.map((section) => {
          const active = pathname.startsWith(section.href);
          return (
            <div key={section.href}>
              <p className="font-body text-xs uppercase tracking-widest text-foreground/40">{section.heading}</p>
              <Link
                href={section.href}
                className={`mt-2 block rounded-lg px-3 py-2 font-body text-sm transition-colors ${
                  active ? "bg-wine text-cream" : "text-foreground/70 hover:bg-wine/5"
                }`}
              >
                {section.label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
