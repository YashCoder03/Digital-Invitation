"use client";

import { useEffect, useRef, useState } from "react";
import { getPhotos, uploadPhoto, deletePhoto, reorderPhotos } from "@/lib/api/photos";
import type { PhotoResponseDto, PhotoTypeDto } from "@/lib/api/types";
import { ApiError } from "@/lib/api/client";

// Keep these in sync with the backend's app.photos.limits configuration.
const PHOTO_LIMITS: Record<PhotoTypeDto, number> = {
  COUPLE: 1,
  GALLERY: 20,
  FAMILY: 5,
};

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp";

interface PendingUpload {
  tempId: string;
  type: PhotoTypeDto;
  previewUrl: string;
  file: File;
  status: "uploading" | "success" | "error";
  error?: string;
}

/** Backend-integrated Photos step (wedding occasion only) - uploads are immediate, not part of autosave. */
export default function BackendPhotosStep({
  invitationId,
  onCountChange,
}: {
  invitationId: string | null;
  onCountChange?: (count: number) => void;
}) {
  const [photos, setPhotos] = useState<PhotoResponseDto[]>([]);
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [loaded, setLoaded] = useState(false);
  const objectUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!invitationId) return;
    let cancelled = false;
    getPhotos(invitationId)
      .then((list) => {
        if (!cancelled) setPhotos(list);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [invitationId]);

  useEffect(() => {
    onCountChange?.(photos.length);
  }, [photos, onCountChange]);

  useEffect(() => {
    const urls = objectUrls.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function countFor(type: PhotoTypeDto) {
    return (
      photos.filter((p) => p.type === type).length +
      pending.filter((p) => p.type === type && p.status !== "error").length
    );
  }

  async function uploadOne(invId: string, type: PhotoTypeDto, file: File) {
    const previewUrl = URL.createObjectURL(file);
    objectUrls.current.add(previewUrl);
    const tempId = `pending-${Date.now()}-${Math.random()}`;

    if (type === "COUPLE") {
      setPhotos((prev) => prev.filter((p) => p.type !== "COUPLE"));
      setPending((prev) => prev.filter((p) => p.type !== "COUPLE"));
    }

    setPending((prev) => [...prev, { tempId, type, previewUrl, file, status: "uploading" }]);

    try {
      const uploaded = await uploadPhoto(invId, file, type);
      setPending((prev) => prev.map((p) => (p.tempId === tempId ? { ...p, status: "success" } : p)));
      setTimeout(() => {
        setPending((prev) => prev.filter((p) => p.tempId !== tempId));
        setPhotos((prev) => [...(type === "COUPLE" ? prev.filter((p) => p.type !== "COUPLE") : prev), uploaded]);
        URL.revokeObjectURL(previewUrl);
        objectUrls.current.delete(previewUrl);
      }, 700);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Upload failed";
      setPending((prev) => prev.map((p) => (p.tempId === tempId ? { ...p, status: "error", error: message } : p)));
    }
  }

  function handleUpload(type: PhotoTypeDto, files: FileList | null) {
    if (!invitationId || !files?.length) return;

    const remaining = type === "COUPLE" ? 1 : Math.max(PHOTO_LIMITS[type] - countFor(type), 0);
    if (remaining === 0) {
      window.alert("You've reached the maximum number of photos for this section.");
      return;
    }

    Array.from(files)
      .slice(0, remaining)
      .forEach((file) => uploadOne(invitationId, type, file));
  }

  async function retryUpload(tempId: string) {
    const item = pending.find((p) => p.tempId === tempId);
    if (!item || !invitationId) return;
    setPending((prev) => prev.map((p) => (p.tempId === tempId ? { ...p, status: "uploading", error: undefined } : p)));
    try {
      const uploaded = await uploadPhoto(invitationId, item.file, item.type);
      setPending((prev) => prev.map((p) => (p.tempId === tempId ? { ...p, status: "success" } : p)));
      setTimeout(() => {
        setPending((prev) => prev.filter((p) => p.tempId !== tempId));
        setPhotos((prev) => [...prev, uploaded]);
        URL.revokeObjectURL(item.previewUrl);
        objectUrls.current.delete(item.previewUrl);
      }, 700);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Upload failed";
      setPending((prev) => prev.map((p) => (p.tempId === tempId ? { ...p, status: "error", error: message } : p)));
    }
  }

  function discardPending(tempId: string) {
    const item = pending.find((p) => p.tempId === tempId);
    if (item) {
      URL.revokeObjectURL(item.previewUrl);
      objectUrls.current.delete(item.previewUrl);
    }
    setPending((prev) => prev.filter((p) => p.tempId !== tempId));
  }

  async function handleDelete(photoId: string) {
    const previous = photos;
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    try {
      await deletePhoto(photoId);
    } catch {
      setPhotos(previous);
      window.alert("We couldn't delete this photo. Please try again.");
    }
  }

  async function handleMove(type: PhotoTypeDto, index: number, direction: -1 | 1) {
    if (!invitationId) return;
    const group = photos.filter((p) => p.type === type);
    const target = index + direction;
    if (target < 0 || target >= group.length) return;

    const reordered = [...group];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    const otherPhotos = photos.filter((p) => p.type !== type);
    const previous = photos;
    setPhotos([...otherPhotos, ...reordered]);

    try {
      await reorderPhotos(invitationId, reordered.map((p) => p.id));
    } catch {
      setPhotos(previous);
    }
  }

  if (!invitationId) {
    return (
      <div>
        <h2 className="font-serif text-2xl text-wine">Add your memories</h2>
        <p className="mt-3 font-body text-sm text-foreground/60">Preparing your invitation…</p>
      </div>
    );
  }

  const couplePhoto = photos.find((p) => p.type === "COUPLE");
  const couplePending = pending.find((p) => p.type === "COUPLE");
  const noPhotosYet = loaded && photos.length === 0 && pending.length === 0;

  return (
    <div>
      <h2 className="font-serif text-2xl text-wine">Add your memories</h2>
      <p className="mt-1 font-body text-sm text-foreground/60">Beautiful photos make your invitation personal.</p>
      {noPhotosYet && (
        <p className="mt-1 font-body text-xs text-foreground/45">
          Add your first photo — your memories will appear beautifully in your invitation.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-8">
        <div>
          <p className="font-body text-sm font-medium text-foreground/70">❤️ Couple Photo</p>
          <div className="mt-3 flex items-center gap-4">
            {couplePending ? (
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-gold/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={couplePending.previewUrl} alt="" className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center bg-wine/50 text-center">
                  {couplePending.status === "uploading" && (
                    <span className="font-body text-[10px] text-cream">Uploading…</span>
                  )}
                  {couplePending.status === "success" && <span className="font-body text-xs text-cream">✓ Uploaded</span>}
                  {couplePending.status === "error" && (
                    <button
                      type="button"
                      onClick={() => retryUpload(couplePending.tempId)}
                      className="rounded-full bg-cream/90 px-2 py-0.5 text-[10px] text-wine"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </div>
            ) : couplePhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={couplePhoto.url} alt="" className="h-24 w-24 rounded-full border border-gold/30 object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-gold/40 text-2xl">
                ❤️
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer rounded-full border border-wine/30 px-4 py-2 font-body text-sm text-wine transition-colors hover:bg-wine/5">
                {couplePhoto ? "Replace Photo" : "Upload Couple Photo"}
                <input
                  type="file"
                  accept={ACCEPTED_TYPES}
                  className="hidden"
                  onChange={(e) => handleUpload("COUPLE", e.target.files)}
                />
              </label>
              {couplePhoto && (
                <button
                  type="button"
                  onClick={() => handleDelete(couplePhoto.id)}
                  className="font-body text-xs text-red hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <PhotoSection
          label="📸 Gallery"
          type="GALLERY"
          limit={PHOTO_LIMITS.GALLERY}
          photos={photos.filter((p) => p.type === "GALLERY")}
          pending={pending.filter((p) => p.type === "GALLERY")}
          onUpload={handleUpload}
          onDelete={handleDelete}
          onMove={handleMove}
          onRetry={retryUpload}
          onDiscard={discardPending}
        />

        <PhotoSection
          label="👨‍👩‍👧 Family Photos"
          type="FAMILY"
          limit={PHOTO_LIMITS.FAMILY}
          photos={photos.filter((p) => p.type === "FAMILY")}
          pending={pending.filter((p) => p.type === "FAMILY")}
          onUpload={handleUpload}
          onDelete={handleDelete}
          onMove={handleMove}
          onRetry={retryUpload}
          onDiscard={discardPending}
        />
      </div>
    </div>
  );
}

function PhotoSection({
  label,
  type,
  limit,
  photos,
  pending,
  onUpload,
  onDelete,
  onMove,
  onRetry,
  onDiscard,
}: {
  label: string;
  type: PhotoTypeDto;
  limit: number;
  photos: PhotoResponseDto[];
  pending: PendingUpload[];
  onUpload: (type: PhotoTypeDto, files: FileList | null) => void;
  onDelete: (photoId: string) => void;
  onMove: (type: PhotoTypeDto, index: number, direction: -1 | 1) => void;
  onRetry: (tempId: string) => void;
  onDiscard: (tempId: string) => void;
}) {
  const atLimit = photos.length + pending.filter((p) => p.status !== "error").length >= limit;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-body text-sm font-medium text-foreground/70">{label}</p>
        <label
          className={`cursor-pointer rounded-full border border-wine/30 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5 ${
            atLimit ? "pointer-events-none opacity-40" : ""
          }`}
        >
          + Add Photos
          <input
            type="file"
            accept={ACCEPTED_TYPES}
            multiple
            disabled={atLimit}
            className="hidden"
            onChange={(e) => onUpload(type, e.target.files)}
          />
        </label>
      </div>
      {atLimit && (
        <p className="mt-1 font-body text-xs text-foreground/45">
          You&apos;ve reached the maximum number of photos for this section.
        </p>
      )}

      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((photo, index) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg border border-gold/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center gap-1 bg-wine/0 opacity-0 transition-opacity group-hover:bg-wine/40 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onMove(type, index, -1)}
                disabled={index === 0}
                className="rounded-full bg-cream/90 px-1.5 py-0.5 text-xs disabled:opacity-30"
                aria-label="Move earlier"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => onMove(type, index, 1)}
                disabled={index === photos.length - 1}
                className="rounded-full bg-cream/90 px-1.5 py-0.5 text-xs disabled:opacity-30"
                aria-label="Move later"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => onDelete(photo.id)}
                className="rounded-full bg-cream/90 px-1.5 py-0.5 text-xs text-red"
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {pending.map((item) => (
          <div key={item.tempId} className="relative aspect-square overflow-hidden rounded-lg border border-gold/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.previewUrl} alt="" className="h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-wine/50 px-1 text-center">
              {item.status === "uploading" && <span className="font-body text-xs text-cream">Uploading…</span>}
              {item.status === "success" && <span className="font-body text-xs text-cream">✓ Uploaded</span>}
              {item.status === "error" && (
                <>
                  <span className="font-body text-xs text-cream">Upload failed</span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => onRetry(item.tempId)}
                      className="rounded-full bg-cream/90 px-2 py-0.5 text-xs text-wine"
                    >
                      Try again
                    </button>
                    <button
                      type="button"
                      onClick={() => onDiscard(item.tempId)}
                      className="rounded-full bg-cream/90 px-2 py-0.5 text-xs text-wine"
                      aria-label="Discard"
                    >
                      ✕
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
