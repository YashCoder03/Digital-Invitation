"use client";

import type { ReactNode } from "react";

/** Reusable destructive-action confirmation dialog for delete flows across the dashboard. */
export default function ConfirmDeleteModal({
  open,
  title,
  description,
  confirmLabel,
  busy,
  errorMessage,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  busy: boolean;
  errorMessage?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-wine/40 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-2xl bg-cream p-6 shadow-xl">
        <h2 className="font-serif text-xl text-wine">{title}</h2>
        <div className="mt-3 font-body text-sm text-foreground/70">{description}</div>
        <p className="mt-3 font-body text-xs uppercase tracking-widest text-red/70">This action cannot be undone.</p>

        {errorMessage && <p className="mt-3 font-body text-sm text-red">{errorMessage}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-full border border-gold/30 px-4 py-2 font-body text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-wine/30 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="rounded-full bg-red px-4 py-2 font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-red/90 disabled:opacity-60"
          >
            {busy ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
