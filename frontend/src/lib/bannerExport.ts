import { toPng } from "html-to-image";
import type { BannerFormat } from "@/types/banner";
import { BANNER_FORMATS } from "@/types/banner";

/** Renders a DOM node (the hidden static-mode banner) to a PNG at the format's exact target pixel size. */
export async function exportBannerToPng(node: HTMLElement, format: BannerFormat): Promise<string> {
  if (typeof document !== "undefined" && "fonts" in document) {
    // Guarantees Devanagari (and other custom) webfonts are loaded before the DOM is rasterized.
    await document.fonts.ready;
  }

  const spec = BANNER_FORMATS[format];
  const rect = node.getBoundingClientRect();
  const pixelRatio = rect.width > 0 ? spec.width / rect.width : 2;

  return toPng(node, {
    pixelRatio,
    cacheBust: true,
    backgroundColor: "#ffffff",
  });
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export type ShareResult = "shared" | "cancelled" | "unsupported";

/** Tries the Web Share API with the actual image file; never claims success it didn't achieve. */
export async function shareBannerImage(dataUrl: string, filename: string, text: string): Promise<ShareResult> {
  if (typeof navigator === "undefined" || !navigator.share) return "unsupported";

  try {
    const file = await dataUrlToFile(dataUrl, filename);
    if (navigator.canShare && !navigator.canShare({ files: [file] })) return "unsupported";
    await navigator.share({ files: [file], text });
    return "shared";
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
    return "unsupported";
  }
}
