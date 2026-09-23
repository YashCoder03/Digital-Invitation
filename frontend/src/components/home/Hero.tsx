"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Kalash from "@/components/wedding/motifs/Kalash";
import Diya from "@/components/wedding/motifs/Diya";
import LotusIcon from "@/components/wedding/motifs/LotusIcon";

export default function Hero() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-cream via-ivory to-ivory px-6 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-terracotta">
            ShubhInvite
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-wine sm:text-5xl lg:text-6xl">
            {language === "mr"
              ? "आपले खास क्षण, सुंदर आमंत्रणासह."
              : "Your Special Moments, Beautifully Invited."}
          </h1>
          <p className="mx-auto mt-5 max-w-md font-body text-lg text-foreground/70 lg:mx-0">
            {language === "mr"
              ? "लग्न, वाढदिवस, साखरपुडा आणि प्रत्येक सोहळ्यासाठी सुंदर डिजिटल आमंत्रणे तयार करा."
              : "Create stunning digital invitations for weddings, birthdays, engagements, and every celebration."}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="#occasions"
              className="w-full rounded-full bg-wine px-8 py-3.5 text-center font-body text-sm uppercase tracking-widest text-cream shadow-md transition-colors hover:bg-wine/90 sm:w-auto"
            >
              {language === "mr" ? "आमंत्रण तयार करा" : "Create Your Invitation"}
            </Link>
            <Link
              href="#occasions"
              className="w-full rounded-full border border-wine/30 px-8 py-3.5 text-center font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5 sm:w-auto"
            >
              {language === "mr" ? "टेम्प्लेट्स पहा" : "Explore Templates"}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex h-80 w-full max-w-sm items-center justify-center sm:h-96">
          <div className="absolute left-1/2 top-6 h-64 w-44 translate-x-[-130%] -rotate-6 rounded-2xl border border-gold/30 bg-cream shadow-lg sm:w-48">
            <div className="flex h-24 items-center justify-center rounded-t-2xl bg-linear-to-br from-sage/25 to-sage/5">
              <LotusIcon className="h-9 w-9 text-sage" />
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-script text-lg text-wine">Ananya &amp; Rohan</p>
              <p className="mt-1 font-body text-[0.65rem] uppercase tracking-widest text-foreground/50">
                Engagement
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 top-6 h-64 w-44 translate-x-[30%] rotate-6 rounded-2xl border border-gold/30 bg-cream shadow-lg sm:w-48">
            <div className="flex h-24 items-center justify-center rounded-t-2xl bg-linear-to-br from-gold/25 to-gold/5">
              <Diya className="h-9 w-9 text-gold" />
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-script text-lg text-wine">Ishaan Turns One</p>
              <p className="mt-1 font-body text-[0.65rem] uppercase tracking-widest text-foreground/50">
                Birthday
              </p>
            </div>
          </div>

          <div className="relative z-10 h-72 w-52 rounded-2xl border border-wine/30 bg-cream shadow-xl sm:h-80 sm:w-56">
            <div className="flex h-32 flex-col items-center justify-center gap-1 rounded-t-2xl bg-linear-to-br from-maroon/20 to-maroon/5">
              <Kalash className="h-12 w-12 text-maroon" />
            </div>
            <div className="px-5 py-4 text-center">
              <p className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-terracotta">
                शुभविवाह
              </p>
              <p className="mt-2 font-script text-2xl text-wine">यश &amp; वैष्णवी</p>
              <p className="mt-2 font-body text-[0.65rem] uppercase tracking-widest text-foreground/50">
                Marathi Wedding
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
