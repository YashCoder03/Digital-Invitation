"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { occasionTemplates, type OccasionId, type AccentName } from "@/content/occasionTemplates";
import MotifIcon from "./MotifIcon";
import type { MotifIconName } from "@/content/occasions";
import OrnamentalDivider from "@/components/wedding/motifs/OrnamentalDivider";
import PaithaniFrame from "@/components/wedding/motifs/PaithaniFrame";
import ToranStrip from "@/components/wedding/motifs/ToranStrip";

const ACCENTS: Record<AccentName, { text: string; bg: string; border: string; hoverBg: string; softFrom: string }> = {
  gold: { text: "text-gold", bg: "bg-gold", border: "border-gold", hoverBg: "hover:bg-gold/90", softFrom: "from-gold/15" },
  red: { text: "text-red", bg: "bg-red", border: "border-red", hoverBg: "hover:bg-red/90", softFrom: "from-red/15" },
  sage: { text: "text-sage", bg: "bg-sage", border: "border-sage", hoverBg: "hover:bg-sage/90", softFrom: "from-sage/15" },
  blush: { text: "text-blush", bg: "bg-blush", border: "border-blush", hoverBg: "hover:bg-blush/90", softFrom: "from-blush/15" },
  maroon: { text: "text-maroon", bg: "bg-maroon", border: "border-maroon", hoverBg: "hover:bg-maroon/90", softFrom: "from-maroon/15" },
  terracotta: { text: "text-terracotta", bg: "bg-terracotta", border: "border-terracotta", hoverBg: "hover:bg-terracotta/90", softFrom: "from-terracotta/15" },
};

const galleryTones = [
  "from-saffron/30 to-gold/30",
  "from-maroon/20 to-red/20",
  "from-gold/30 to-saffron/20",
  "from-red/20 to-maroon/20",
  "from-saffron/20 to-red/20",
  "from-gold/20 to-maroon/20",
];

interface OccasionTemplateProps {
  occasionId: OccasionId;
  accent: AccentName;
  icon: MotifIconName;
}

export default function OccasionTemplate({ occasionId, accent, icon }: OccasionTemplateProps) {
  const { language } = useLanguage();
  const content = occasionTemplates[occasionId][language];
  const tone = ACCENTS[accent];

  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState("yes");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire this up to a real backend/email service
    setSubmitted(true);
  }

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      {/* Opening */}
      <section className={`relative flex flex-col items-center bg-maroon px-6 pb-10 pt-24 text-center text-cream`}>
        <ToranStrip className="text-cream/80" />
        <MotifIcon name={icon} className="mt-4 h-16 w-16 text-gold" />
        <p className="mt-4 font-serif text-2xl tracking-wide text-gold">{content.invocation}</p>
      </section>

      {/* Hero */}
      <section className={`relative flex flex-col items-center overflow-hidden bg-linear-to-b ${tone.softFrom} via-ivory to-ivory px-6 py-20 text-center`}>
        <p className={`font-body text-sm uppercase tracking-[0.4em] ${tone.text}`}>
          {content.hero.pretitle}
        </p>
        <h1 className="mt-6 font-script text-5xl leading-tight text-maroon sm:text-6xl">
          {content.hero.title}
        </h1>
        <p className="mt-6 max-w-md font-body text-base text-foreground/70">
          {content.hero.subtitle}
        </p>
        <div className="mt-8 w-full max-w-xs">
          <OrnamentalDivider />
        </div>
        <p className="mt-2 font-serif text-lg tracking-wide text-foreground/80">
          {content.hero.date}
        </p>
        <p className="mt-2 max-w-md font-body text-base text-foreground/70">
          {content.hero.venue}
        </p>
        <a
          href="#rsvp"
          className={`mt-10 rounded-full border ${tone.border} bg-maroon px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors ${tone.hoverBg}`}
        >
          {content.hero.cta}
        </a>
      </section>

      {/* Highlights */}
      <section id="highlights" className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className={`font-body text-sm uppercase tracking-[0.4em] ${tone.text}`}>
            {content.highlights.pretitle}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
            {content.highlights.title}
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.highlights.events.map((event) => (
            <div
              key={event.title}
              className={`rounded-lg border ${tone.border}/30 border-t-4 ${tone.border} bg-ivory px-6 py-8 text-center shadow-sm`}
            >
              <h3 className="font-serif text-2xl text-maroon">{event.title}</h3>
              <p className="mt-2 font-body text-xs uppercase tracking-widest text-foreground/50">
                {event.date} &middot; {event.time}
              </p>
              <p className="mt-3 font-body text-sm text-foreground/70">{event.venue}</p>
              <p className={`mt-3 font-body text-sm italic ${tone.text}`}>{event.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-ivory px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className={`font-body text-sm uppercase tracking-[0.4em] ${tone.text}`}>
            {content.gallery.pretitle}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
            {content.gallery.title}
          </h2>
          <p className="mt-4 font-body text-foreground/60">{content.gallery.subtitle}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryTones.map((gradient, index) => (
            <PaithaniFrame key={index} className="aspect-square">
              <div className={`flex h-full w-full items-center justify-center bg-linear-to-br ${gradient}`}>
                <span className="font-script text-3xl text-maroon/50">ॐ</span>
              </div>
            </PaithaniFrame>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className={`font-body text-sm uppercase tracking-[0.4em] ${tone.text}`}>
            {content.rsvp.pretitle}
          </p>
          <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">{content.rsvp.title}</h2>
          <p className="mt-4 font-body text-foreground/60">{content.rsvp.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          {submitted ? (
            <p className="rounded-lg border border-gold/30 bg-ivory px-6 py-8 text-center font-serif text-xl text-maroon">
              {content.rsvp.thankYou}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="mb-1 block font-body text-sm text-foreground/70">
                  {content.rsvp.nameLabel}
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded-md border border-gold/30 bg-ivory px-4 py-2 font-body text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-body text-sm text-foreground/70">
                  {content.rsvp.emailLabel}
                </label>
                <input
                  required
                  type="email"
                  className="w-full rounded-md border border-gold/30 bg-ivory px-4 py-2 font-body text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-body text-sm text-foreground/70">
                  {content.rsvp.attendingLabel}
                </label>
                <div className="flex gap-4">
                  {(["yes", "no"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAttending(option)}
                      className={`flex-1 rounded-md border px-4 py-2 font-body text-sm uppercase tracking-widest transition-colors ${
                        attending === option
                          ? `${tone.border} ${tone.bg} text-cream`
                          : "border-gold/30 text-foreground/70"
                      }`}
                    >
                      {option === "yes" ? content.rsvp.yes : content.rsvp.no}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block font-body text-sm text-foreground/70">
                  {content.rsvp.guestsLabel}
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  defaultValue={1}
                  className="w-full rounded-md border border-gold/30 bg-ivory px-4 py-2 font-body text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block font-body text-sm text-foreground/70">
                  {content.rsvp.messageLabel}
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gold/30 bg-ivory px-4 py-2 font-body text-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className={`mt-2 rounded-full ${tone.bg} px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors ${tone.hoverBg}`}
              >
                {content.rsvp.submit}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Closing */}
      <footer className="bg-maroon px-6 pb-10 pt-16 text-center text-cream">
        <MotifIcon name={icon} className="mx-auto h-12 w-12 text-gold" />
        <h2 className="mt-3 font-script text-4xl text-cream">{content.closing.title}</h2>
        <p className="mx-auto mt-3 max-w-sm font-body text-cream/70">{content.closing.note}</p>
        <p className="mt-8 font-script text-3xl text-gold">{content.hero.title}</p>
        <p className="mt-2 font-body text-cream/60">{content.closing.tagline}</p>
        <p className="mt-8 font-body text-xs uppercase tracking-widest text-cream/40">
          {content.closing.copyright}
        </p>
        <ToranStrip className="mt-6 rotate-180 text-cream/60" />
      </footer>
    </div>
  );
}
