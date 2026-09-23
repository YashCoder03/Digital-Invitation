"use client";

import { useEffect } from "react";

/** Minimal auto-dismissing toast for delete-success/failure feedback across the dashboard. */
export default function Toast({ message, onDismiss }: { message: string | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-wine px-5 py-3 font-body text-sm text-cream shadow-lg">
      {message}
    </div>
  );
}
