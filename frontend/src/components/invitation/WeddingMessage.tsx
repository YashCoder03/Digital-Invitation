import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";

export default function WeddingMessage({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  const message =
    invitation.message ||
    "आमच्या आयुष्यातील या सुंदर सोहळ्यास\nआपण आवर्जून उपस्थित राहावे.";

  return (
    <section className={`px-6 py-10 text-center ${theme.dark ? "bg-ivory" : "bg-cream"}`}>
      <p className="mx-auto max-w-md whitespace-pre-line font-serif text-lg leading-relaxed text-foreground/80 sm:text-xl">
        {message}
      </p>
    </section>
  );
}
