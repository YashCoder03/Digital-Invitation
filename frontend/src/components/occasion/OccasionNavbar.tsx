"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function OccasionNavbar({ backHref = "/" }: { backHref?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gold/20 bg-ivory/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href={backHref} className="font-script text-2xl text-maroon" title="Back">
          ॐ
        </Link>
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
      </div>
    </nav>
  );
}
