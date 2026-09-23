import type { Invitation } from "@/types/invitation";

/** Generic message section - no hardcoded fallback text, so it hides cleanly when unset. */
export default function OccasionMessage({ invitation }: { invitation: Invitation }) {
  if (!invitation.message) return null;

  return (
    <section className="bg-cream px-6 py-10 text-center">
      <p className="mx-auto max-w-md whitespace-pre-line font-serif text-lg leading-relaxed text-foreground/80 sm:text-xl">
        {invitation.message}
      </p>
    </section>
  );
}
