"use client";

import type { CustomizerState } from "@/content/customizer";
import { customizerStateToInvitation } from "@/lib/invitationUtils";
import InvitationPreviewFrame from "@/components/invitation/InvitationPreviewFrame";

export default function LivePreview({ occasion, state }: { occasion: string; state: CustomizerState }) {
  const fontClass = state.style.font === "serif" ? "font-devanagari-serif" : "font-devanagari";
  const invitation = customizerStateToInvitation(state, {
    id: "preview",
    slug: "preview",
    occasion,
    style: state.style.theme,
  });

  return <InvitationPreviewFrame invitation={invitation} fontClass={fontClass} />;
}
