"use client";

import { useEffect, useState } from "react";
import type { Invitation } from "@/types/invitation";
import type { InvitationTheme } from "./theme";
import PaithaniFrame from "@/components/wedding/motifs/PaithaniFrame";

export default function PhotoGallery({
  invitation,
  theme,
}: {
  invitation: Invitation;
  theme: InvitationTheme;
}) {
  const photos = [...invitation.photos.gallery, ...invitation.photos.family];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, photos.length]);

  if (!photos.length) return null;

  return (
    <section className="bg-cream px-6 py-12">
      <h2 className={`text-center font-serif text-2xl ${theme.accentText} sm:text-3xl`}>
        आमच्या सुंदर आठवणी
      </h2>

      <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label="Open photo"
            className="aspect-square overflow-hidden rounded-2xl transition-transform hover:-translate-y-0.5"
          >
            <PaithaniFrame className="h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </PaithaniFrame>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-wine/90 px-4 py-8"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-wine"
          >
            ✕
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((openIndex - 1 + photos.length) % photos.length);
              }}
              aria-label="Previous photo"
              className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-wine sm:left-6"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[openIndex].url}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
          />

          {photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((openIndex + 1) % photos.length);
              }}
              aria-label="Next photo"
              className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-wine sm:right-6"
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  );
}
