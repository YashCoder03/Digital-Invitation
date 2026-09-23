"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState("yes");
  const { t } = useLanguage();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire this up to a real backend/email service
    setSubmitted(true);
  }

  return (
    <section id="rsvp" className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.4em] text-red">
          {t.rsvp.pretitle}
        </p>
        <h2 className="mt-3 font-serif text-4xl text-maroon sm:text-5xl">
          {t.rsvp.title}
        </h2>
        <p className="mt-4 font-body text-foreground/60">{t.rsvp.subtitle}</p>
      </div>

      <div className="mx-auto mt-12 max-w-md">
        {submitted ? (
          <p className="rounded-lg border border-gold/30 bg-ivory px-6 py-8 text-center font-serif text-xl text-maroon">
            {t.rsvp.thankYou}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="mb-1 block font-body text-sm text-foreground/70">
                {t.rsvp.nameLabel}
              </label>
              <input
                required
                type="text"
                className="w-full rounded-md border border-gold/30 bg-ivory px-4 py-2 font-body text-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-foreground/70">
                {t.rsvp.emailLabel}
              </label>
              <input
                required
                type="email"
                className="w-full rounded-md border border-gold/30 bg-ivory px-4 py-2 font-body text-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-foreground/70">
                {t.rsvp.attendingLabel}
              </label>
              <div className="flex gap-4">
                {(["yes", "no"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAttending(option)}
                    className={`flex-1 rounded-md border px-4 py-2 font-body text-sm uppercase tracking-widest transition-colors ${
                      attending === option
                        ? "border-gold bg-maroon text-cream"
                        : "border-gold/30 text-foreground/70"
                    }`}
                  >
                    {option === "yes" ? t.rsvp.yes : t.rsvp.no}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block font-body text-sm text-foreground/70">
                {t.rsvp.guestsLabel}
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
                {t.rsvp.messageLabel}
              </label>
              <textarea
                rows={3}
                className="w-full rounded-md border border-gold/30 bg-ivory px-4 py-2 font-body text-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-maroon px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-red"
            >
              {t.rsvp.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
