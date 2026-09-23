import Link from "next/link";
import Logo from "@/components/site/Logo";

interface TopBarProps {
  backHref: string;
  badgeLabel: string;
  saveStatus: "saving" | "saved" | "error";
  saveError?: string | null;
  onSaveDraft: () => void;
  onRetry?: () => void;
  onPreview: () => void;
  onContinue: () => void;
  continueLabel: string;
}

export default function TopBar({
  backHref,
  badgeLabel,
  saveStatus,
  saveError,
  onSaveDraft,
  onRetry,
  onPreview,
  onContinue,
  continueLabel,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/95 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
          </Link>
          <Link
            href={backHref}
            className="font-body text-sm text-foreground/60 transition-colors hover:text-wine"
          >
            ← Back to Templates
          </Link>
          <span className="hidden font-serif text-base text-wine md:inline-block">Create Invitation</span>
          <span className="hidden rounded-full border border-gold/30 px-3 py-1 font-body text-xs uppercase tracking-widest text-terracotta sm:inline-block">
            {badgeLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 font-body text-xs text-foreground/50 sm:flex">
            {saveStatus === "saved" && (
              <>
                <span className="text-sage">✓</span> Saved
              </>
            )}
            {saveStatus === "saving" && "Saving…"}
            {saveStatus === "error" && (
              <span className="flex items-center gap-1.5 text-red" title={saveError ?? undefined}>
                Unable to save
                {onRetry && (
                  <button type="button" onClick={onRetry} className="underline hover:no-underline">
                    Retry
                  </button>
                )}
              </span>
            )}
          </span>
          <button
            type="button"
            onClick={onSaveDraft}
            className="rounded-full border border-gold/30 px-3 py-2 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/40 hover:text-wine sm:px-4"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={onPreview}
            className="rounded-full border border-wine/30 px-3 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5 sm:px-4"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="rounded-full bg-wine px-4 py-2 font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90 sm:px-5"
          >
            {continueLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
