"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { brand, navLinks, nav } from "@/content/brand";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const visibleNavLinks = navLinks.filter((link) => !(user && link.href === "/login"));

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-cream/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-serif text-xl text-wine">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-foreground/70 transition-colors hover:text-wine"
            >
              {link.label[language]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex overflow-hidden rounded-full border border-gold/40 text-xs font-body">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 uppercase tracking-widest transition-colors ${
                language === "en" ? "bg-wine text-cream" : "text-foreground/60"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("mr")}
              className={`px-3 py-1 uppercase tracking-widest transition-colors ${
                language === "mr" ? "bg-wine text-cream" : "text-foreground/60"
              }`}
            >
              मर
            </button>
          </div>
          {user && (
            <Link
              href="/dashboard"
              className="font-body text-sm text-foreground/70 transition-colors hover:text-wine"
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/#occasions"
            className="rounded-full bg-wine px-5 py-2.5 font-body text-sm text-cream shadow-sm transition-colors hover:bg-wine/90"
          >
            {nav.cta[language]}
          </Link>
          {user && (
            <button
              type="button"
              onClick={logout}
              className="font-body text-sm text-foreground/50 transition-colors hover:text-wine"
            >
              Logout
            </button>
          )}
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-gold/20 px-6 py-5 md:hidden">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm text-foreground/70"
            >
              {link.label[language]}
            </Link>
          ))}
          {user && (
            <Link href="/dashboard" onClick={() => setOpen(false)} className="font-body text-sm text-foreground/70">
              Dashboard
            </Link>
          )}
          <div className="flex overflow-hidden rounded-full border border-gold/40 text-xs font-body w-fit">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 uppercase tracking-widest transition-colors ${
                language === "en" ? "bg-wine text-cream" : "text-foreground/60"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("mr")}
              className={`px-3 py-1 uppercase tracking-widest transition-colors ${
                language === "mr" ? "bg-wine text-cream" : "text-foreground/60"
              }`}
            >
              मर
            </button>
          </div>
          <Link
            href="/#occasions"
            onClick={() => setOpen(false)}
            className="rounded-full bg-wine px-5 py-2.5 text-center font-body text-sm text-cream"
          >
            {nav.cta[language]}
          </Link>
          {user && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="text-left font-body text-sm text-foreground/50"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
