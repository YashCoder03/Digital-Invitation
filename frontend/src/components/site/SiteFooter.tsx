"use client";

import Link from "next/link";
import Logo from "./Logo";
import { brand } from "@/content/brand";
import { useLanguage } from "@/context/LanguageContext";

export default function SiteFooter() {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-gold/20 bg-cream px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <span className="font-serif text-lg text-wine">{brand.name}</span>
        </Link>
        <p className="max-w-sm font-body text-sm text-foreground/60">
          {brand.tagline[language]}
        </p>
        <p className="font-body text-xs uppercase tracking-widest text-foreground/40">
          {language === "mr"
            ? "\u00A9 २०२६ · ShubhInvite · प्रेमाने बनवलेले"
            : "\u00A9 2026 · ShubhInvite · Made with love"}
        </p>
      </div>
    </footer>
  );
}
