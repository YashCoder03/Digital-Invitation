"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";
import { submitRsvp, hasSubmittedRsvp } from "@/lib/rsvpStorage";
import { submitPublicRsvp } from "@/lib/api/rsvp";
import { ApiError } from "@/lib/api/client";

export default function RSVPSection({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    // Hydrates from localStorage, which isn't available during server rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSubmitted(hasSubmittedRsvp(invitation.slug));
  }, [invitation.slug]);

  if (!invitation.rsvp?.enabled) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitPublicRsvp(invitation.slug, { guestName: name, attending: attending === "yes", guestCount: guests });
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        // Not a backend-tracked invitation — fall back to the local prototype storage.
        submitRsvp(invitation.slug, { name, attending: attending === "yes", guests });
      } else {
        setSubmitting(false);
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        return;
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section className="bg-ivory px-6 py-12 text-center">
      <h2 className={`font-serif text-2xl ${theme.accentText} sm:text-3xl`}>आपली उपस्थिती कळवा</h2>
      <p className="mx-auto mt-3 max-w-sm font-body text-sm text-foreground/60">
        आपली उपस्थिती आमच्यासाठी खूप खास आहे.
      </p>
      {invitation.rsvp.deadline && (
        <p className="mt-1 font-body text-xs text-foreground/45">
          कृपया {invitation.rsvp.deadline} पर्यंत कळवा.
        </p>
      )}

      <div className="mx-auto mt-8 max-w-sm">
        {submitted ? (
          <p className="rounded-2xl border border-gold/30 bg-cream px-6 py-8 font-serif text-lg text-wine">
            धन्यवाद! आपली उपस्थिती नोंदवली आहे. ❤️
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <label className="block">
              <span className="mb-1.5 block font-body text-sm text-foreground/70">आपले नाव</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-3 font-body text-foreground focus:border-wine focus:outline-none"
              />
            </label>

            <div>
              <span className="mb-1.5 block font-body text-sm text-foreground/70">आपण उपस्थित राहणार का?</span>
              <div className="flex flex-col gap-2">
                {(
                  [
                    { id: "yes", label: "होय, नक्की येईन" },
                    { id: "no", label: "क्षमस्व, येता येणार नाही" },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 font-body text-sm transition-colors ${
                      attending === option.id ? "border-wine bg-wine/5" : "border-gold/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === option.id}
                      onChange={() => setAttending(option.id)}
                      className="accent-wine"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-1.5 block font-body text-sm text-foreground/70">पाहुण्यांची संख्या</span>
              <input
                type="number"
                min={1}
                max={10}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value) || 1)}
                className="w-full rounded-xl border border-gold/30 bg-cream px-4 py-3 font-body text-foreground focus:border-wine focus:outline-none"
              />
            </label>

            {error && <p className="font-body text-sm text-red">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90 disabled:opacity-70"
            >
              {submitting ? "पाठवत आहे…" : "RSVP पाठवा"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

