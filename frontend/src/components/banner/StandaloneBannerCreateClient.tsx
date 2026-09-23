"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BannerEditor from "@/components/banner/BannerEditor";
import { getTemplateById } from "@/lib/templateUtils";
import { ensureStandaloneBannerSource } from "@/lib/templateSampleInvitation";

/** Standalone banner creation ("/banner/create?template=...") - no invitation required. */
export default function StandaloneBannerCreateClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get("template");
  const [invitationId, setInvitationId] = useState<string | null>(null);

  useEffect(() => {
    if (!templateId || !getTemplateById(templateId)) {
      router.replace("/banners");
      return;
    }
    const invitation = ensureStandaloneBannerSource(templateId);
    // Seeds a real (locally persisted) invitation from the template so BannerEditor - which
    // is keyed off invitationId - can run completely unmodified for the standalone flow.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInvitationId(invitation.id);
  }, [templateId, router]);

  if (!invitationId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-ivory px-6 py-24 text-center">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-wine/30 border-t-wine" aria-hidden="true" />
        <p className="font-body text-sm text-foreground/60">Preparing your banner…</p>
      </div>
    );
  }

  return <BannerEditor invitationId={invitationId} source="STANDALONE" />;
}
