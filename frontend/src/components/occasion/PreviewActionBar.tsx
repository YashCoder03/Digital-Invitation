"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PreviewActionBar({
  backHref,
  occasion,
  style,
}: {
  backHref: string;
  occasion: string;
  style: string;
}) {
  const { language } = useLanguage();

  return (
    <div className="sticky bottom-0 z-40 flex items-center justify-between gap-3 border-t border-gold/20 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:px-8">
      <Link
        href={backHref}
        className="rounded-full border border-wine/30 px-4 py-2.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/10 sm:px-6 sm:text-sm"
      >
        {language === "mr" ? "← टेम्प्लेट्सकडे परत" : "← Back to Templates"}
      </Link>
      <Link
        href={`/customize?occasion=${encodeURIComponent(occasion)}&style=${encodeURIComponent(style)}`}
        className="rounded-full bg-wine px-5 py-2.5 font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90 sm:px-8 sm:text-sm"
      >
        {language === "mr" ? "हे टेम्प्लेट वापरा" : "Use This Template"}
      </Link>
    </div>
  );
}
