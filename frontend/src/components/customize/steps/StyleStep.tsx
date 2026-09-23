import type { StyleSettings } from "@/content/customizer";
import { animationOptions } from "@/content/customizer";
import { getActiveTemplates } from "@/lib/templateUtils";
import { buildSampleInvitation } from "@/lib/templateSampleInvitation";
import TemplateThumbnail from "@/components/templates/TemplateThumbnail";

const weddingTemplates = getActiveTemplates("WEDDING");

export default function StyleStep({
  occasion,
  value,
  onChange,
}: {
  occasion: string;
  value: StyleSettings;
  onChange: (next: StyleSettings) => void;
}) {
  function set<K extends keyof StyleSettings>(key: K, val: StyleSettings[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-wine">Make it yours</h2>
      <p className="mt-1 font-body text-sm text-foreground/60">
        {occasion === "wedding"
          ? "Pick a template — each one comes with its own curated design, free to use."
          : "Customize the typography, music, and animation for your invitation."}
      </p>

      {occasion === "wedding" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {weddingTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => set("theme", template.id)}
              aria-pressed={value.theme === template.id}
              aria-label={`Use ${template.name} template`}
              className={`overflow-hidden rounded-2xl border text-left transition-all ${
                value.theme === template.id
                  ? "border-wine ring-2 ring-wine/20"
                  : "border-gold/30 hover:border-wine/40"
              }`}
            >
              <TemplateThumbnail invitation={buildSampleInvitation(template.id)} className="h-20 w-full" />
              <div className="bg-cream px-4 py-3">
                <p className="font-serif text-base text-wine">{template.name}</p>
                <p className="font-body text-xs text-foreground/50">{template.category}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8">
        <p className="font-body text-sm font-medium text-foreground/70">Devanagari Typography</p>
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => set("font", "serif")}
            className={`rounded-xl border px-4 py-3 font-devanagari-serif text-lg transition-colors ${
              value.font === "serif" ? "border-wine bg-wine text-cream" : "border-gold/30 text-foreground/70"
            }`}
          >
            शुभविवाह
          </button>
          <button
            type="button"
            onClick={() => set("font", "sans")}
            className={`rounded-xl border px-4 py-3 font-devanagari text-lg transition-colors ${
              value.font === "sans" ? "border-wine bg-wine text-cream" : "border-gold/30 text-foreground/70"
            }`}
          >
            शुभविवाह
          </button>
        </div>
      </div>

      <div className="mt-8">
        <p className="font-body text-sm font-medium text-foreground/70">Music</p>
        <button
          type="button"
          onClick={() => set("musicEnabled", !value.musicEnabled)}
          className={`mt-3 rounded-full border px-5 py-2.5 font-body text-sm transition-colors ${
            value.musicEnabled ? "border-wine bg-wine text-cream" : "border-gold/30 text-foreground/70"
          }`}
        >
          {value.musicEnabled ? "\u{1F3B5} Music Added \u00B7 Remove" : "+ Add Background Music"}
        </button>
      </div>

      <div className="mt-8">
        <p className="font-body text-sm font-medium text-foreground/70">Animation</p>
        <div className="mt-3 flex gap-3">
          {animationOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => set("animation", option.id)}
              className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                value.animation === option.id
                  ? "border-wine bg-wine text-cream"
                  : "border-gold/30 text-foreground/70"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
