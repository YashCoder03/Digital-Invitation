"use client";

import type { ChangeEvent } from "react";
import type { PhotoSlot } from "@/content/customizer";

interface PhotosValue {
  couple: PhotoSlot | null;
  gallery: PhotoSlot[];
  family: PhotoSlot[];
}

function filesToSlots(files: FileList): PhotoSlot[] {
  return Array.from(files).map((file) => ({
    id: `${file.name}-${Date.now()}-${Math.random()}`,
    url: URL.createObjectURL(file),
  }));
}

export default function PhotosStep({
  value,
  onChange,
}: {
  value: PhotosValue;
  onChange: (next: PhotosValue) => void;
}) {
  function handleCoupleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    onChange({ ...value, couple: { id: `couple-${Date.now()}`, url: URL.createObjectURL(file) } });
  }

  function handleMultiUpload(key: "gallery" | "family", event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) return;
    onChange({ ...value, [key]: [...value[key], ...filesToSlots(event.target.files)] });
  }

  function removeMulti(key: "gallery" | "family", id: string) {
    onChange({ ...value, [key]: value[key].filter((slot) => slot.id !== id) });
  }

  function moveMulti(key: "gallery" | "family", index: number, direction: -1 | 1) {
    const list = [...value[key]];
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    onChange({ ...value, [key]: list });
  }

  function renderThumbnailGroup(key: "gallery" | "family") {
    return (
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value[key].map((slot, index) => (
          <div key={slot.id} className="group relative aspect-square overflow-hidden rounded-lg border border-gold/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slot.url} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-wine/0 opacity-0 transition-opacity group-hover:bg-wine/40 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => moveMulti(key, index, -1)}
                className="rounded-full bg-cream/90 px-1.5 py-0.5 text-xs"
                aria-label="Move earlier"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveMulti(key, index, 1)}
                className="rounded-full bg-cream/90 px-1.5 py-0.5 text-xs"
                aria-label="Move later"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeMulti(key, slot.id)}
                className="rounded-full bg-cream/90 px-1.5 py-0.5 text-xs text-red"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-wine">Add your memories</h2>
      <p className="mt-1 font-body text-sm text-foreground/60">
        Beautiful photos make your invitation personal.
      </p>

      <div className="mt-6 flex flex-col gap-8">
        <div>
          <p className="font-body text-sm font-medium text-foreground/70">❤️ Couple Photo</p>
          <div className="mt-3 flex items-center gap-4">
            {value.couple ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value.couple.url}
                alt=""
                className="h-24 w-24 rounded-full border border-gold/30 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-gold/40 text-2xl">
                ❤️
              </div>
            )}
            <label className="cursor-pointer rounded-full border border-wine/30 px-4 py-2 font-body text-sm text-wine transition-colors hover:bg-wine/5">
              {value.couple ? "Replace Photo" : "Upload Photo"}
              <input type="file" accept="image/*" className="hidden" onChange={handleCoupleUpload} />
            </label>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="font-body text-sm font-medium text-foreground/70">📸 Gallery</p>
            <label className="cursor-pointer rounded-full border border-wine/30 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5">
              Upload
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleMultiUpload("gallery", e)}
              />
            </label>
          </div>
          {renderThumbnailGroup("gallery")}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="font-body text-sm font-medium text-foreground/70">👨‍👩‍👧 Family Photos</p>
            <label className="cursor-pointer rounded-full border border-wine/30 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5">
              Upload
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleMultiUpload("family", e)}
              />
            </label>
          </div>
          {renderThumbnailGroup("family")}
        </div>
      </div>
    </div>
  );
}
