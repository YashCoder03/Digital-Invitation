"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { href: "#story", label: t.nav.story },
    { href: "#timeline", label: t.nav.timeline },
    { href: "#venue", label: t.nav.venue },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#rsvp", label: t.nav.rsvp },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gold/20 bg-ivory/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/wedding" className="font-script text-2xl text-maroon" title="Back to templates">
          ॐ
        </Link>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-sm uppercase tracking-widest text-foreground/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
      </div>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-gold/20 px-6 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm uppercase tracking-widest text-foreground/80"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

function LanguageToggle({
  language,
  setLanguage,
}: {
  language: "en" | "mr";
  setLanguage: (lang: "en" | "mr") => void;
}) {
  return (
    <div className="flex overflow-hidden rounded-full border border-gold/40 text-xs font-body">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 uppercase tracking-widest transition-colors ${
          language === "en" ? "bg-maroon text-cream" : "text-foreground/70"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("mr")}
        className={`px-3 py-1 uppercase tracking-widest transition-colors ${
          language === "mr" ? "bg-maroon text-cream" : "text-foreground/70"
        }`}
      >
        मर
      </button>
    </div>
  );
}
