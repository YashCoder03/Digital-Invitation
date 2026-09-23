import type { DetailsSettings } from "@/content/customizer";
import FormField from "../FormField";

const MESSAGE_LABEL_BY_OCCASION: Record<string, string> = {
  wedding: "💌 Wedding Message",
  birthday: "🎂 Birthday Message",
  babyshower: "👶 Message",
  "baby-shower": "👶 Message",
  engagement: "💍 Message",
  anniversary: "💐 Message",
  housewarming: "🏠 Message",
  puja: "🙏 Message",
  celebration: "🎉 Message",
};

export default function DetailsStep({
  occasion,
  value,
  onChange,
}: {
  occasion: string;
  value: DetailsSettings;
  onChange: (next: DetailsSettings) => void;
}) {
  function set<K extends keyof DetailsSettings>(key: K, val: DetailsSettings[K]) {
    onChange({ ...value, [key]: val });
  }

  function setContact(index: number, val: string) {
    const next = [...value.contactNumbers];
    next[index] = val;
    set("contactNumbers", next);
  }

  function addContact() {
    set("contactNumbers", [...value.contactNumbers, ""]);
  }

  function removeContact(index: number) {
    set("contactNumbers", value.contactNumbers.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-body text-sm font-medium text-foreground/70">
          {MESSAGE_LABEL_BY_OCCASION[occasion] ?? "💌 Message"}
        </p>
        <textarea
          rows={3}
          value={value.message}
          onChange={(e) => set("message", e.target.value)}
          className="mt-2 w-full rounded-xl border border-gold/30 bg-cream px-4 py-3 font-body text-foreground focus:border-wine focus:outline-none focus:ring-2 focus:ring-wine/10"
        />
      </div>

      <div>
        <p className="font-body text-sm font-medium text-foreground/70">📍 Venue</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <FormField label="Venue Name" value={value.venueName} onChange={(v) => set("venueName", v)} />
          <FormField label="Venue Address" value={value.venueAddress} onChange={(v) => set("venueAddress", v)} />
        </div>
      </div>

      {occasion === "wedding" && (
        <div>
          <p className="font-body text-sm font-medium text-foreground/70">🗺️ Map</p>
          <div className="mt-2">
            <FormField
              label="Google Maps Link"
              value={value.mapUrl}
              onChange={(v) => set("mapUrl", v)}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>
      )}

      <div>
        <p className="font-body text-sm font-medium text-foreground/70">📞 Contact</p>
        <div className="mt-2 flex flex-col gap-2">
          {value.contactNumbers.map((number, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="tel"
                value={number}
                onChange={(e) => setContact(index, e.target.value)}
                placeholder="+91 98xxxxxxx0"
                className="flex-1 rounded-xl border border-gold/30 bg-cream px-4 py-2.5 font-body text-foreground focus:border-wine focus:outline-none"
              />
              {value.contactNumbers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeContact(index)}
                  className="rounded-full px-3 text-foreground/40 hover:text-red"
                  aria-label="Remove contact"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addContact}
            className="mt-1 self-start rounded-full border border-gold/30 px-4 py-1.5 font-body text-xs uppercase tracking-widest text-foreground/60 hover:border-wine hover:text-wine"
          >
            + Add Number
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="font-body text-sm font-medium text-foreground/70">💌 RSVP</p>
          <button
            type="button"
            onClick={() => set("rsvpEnabled", !value.rsvpEnabled)}
            className={`rounded-full px-4 py-1.5 font-body text-xs uppercase tracking-widest transition-colors ${
              value.rsvpEnabled ? "bg-wine text-cream" : "bg-foreground/10 text-foreground/50"
            }`}
          >
            {value.rsvpEnabled ? "ON" : "OFF"}
          </button>
        </div>
        {value.rsvpEnabled && (
          <div className="mt-3">
            <FormField
              label="RSVP Deadline"
              value={value.rsvpDeadline}
              onChange={(v) => set("rsvpDeadline", v)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
