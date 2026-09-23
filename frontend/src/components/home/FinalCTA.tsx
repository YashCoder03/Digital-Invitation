"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function FinalCTA() {
  const { language } = useLanguage();

  return (
    <section className="bg-wine px-6 py-20 text-center text-cream">
      <h2 className="font-serif text-3xl sm:text-4xl">
        {language === "mr"
          ? "आपल्या प्रियजनांना निमंत्रण देण्यास तयार आहात?"
          : "Ready to invite your loved ones?"}
      </h2>
      <p className="mx-auto mt-4 max-w-sm font-body text-cream/70">
        {language === "mr"
          ? "सुंदर आमंत्रणे. एक साधी लिंक."
          : "Beautiful invitations. One simple link."}
      </p>
      <Link
        href="#occasions"
        className="mt-8 inline-block rounded-full bg-gold px-8 py-3.5 font-body text-sm uppercase tracking-widest text-wine shadow-md transition-colors hover:bg-gold/90"
      >
        {language === "mr" ? "आमंत्रण तयार करा" : "Create Your Invitation"}
      </Link>
    </section>
  );
}
