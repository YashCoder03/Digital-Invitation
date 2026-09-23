import type { CoupleDetails } from "@/content/customizer";
import { titleOptions } from "@/content/customizer";
import FormField from "../FormField";

interface CoupleStepProps {
  occasion: string;
  value: CoupleDetails;
  onChange: (next: CoupleDetails) => void;
}

export default function CoupleStep({ occasion, value, onChange }: CoupleStepProps) {
  function set<K extends keyof CoupleDetails>(key: K, val: CoupleDetails[K]) {
    onChange({ ...value, [key]: val });
  }

  if (occasion === "puja") {
    return (
      <div>
        <h2 className="font-serif text-2xl text-wine">About the puja</h2>
        <p className="mt-1 font-body text-sm text-foreground/60">These details will appear on your invitation.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField label="Puja Name" value={value.title ?? ""} onChange={(v) => set("title", v)} />
          <FormField label="Date" value={value.weddingDate} onChange={(v) => set("weddingDate", v)} />
          <FormField label="Time" value={value.weddingTime} onChange={(v) => set("weddingTime", v)} />
          <FormField label="Venue" value={value.weddingLocation} onChange={(v) => set("weddingLocation", v)} />
        </div>
      </div>
    );
  }

  if (occasion === "birthday") {
    return (
      <div>
        <h2 className="font-serif text-2xl text-wine">About the birthday</h2>
        <p className="mt-1 font-body text-sm text-foreground/60">These details will appear on your invitation.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField label="Person's Name" value={value.groomName} onChange={(v) => set("groomName", v)} />
          <FormField label="Age" value={value.age ?? ""} onChange={(v) => set("age", v)} />
          <FormField label="Date" value={value.weddingDate} onChange={(v) => set("weddingDate", v)} />
          <FormField label="Time" value={value.weddingTime} onChange={(v) => set("weddingTime", v)} />
          <FormField label="Venue" value={value.weddingLocation} onChange={(v) => set("weddingLocation", v)} />
        </div>
      </div>
    );
  }

  if (occasion === "baby-shower" || occasion === "housewarming" || occasion === "celebration") {
    const nameLabel =
      occasion === "baby-shower" ? "Parents' Names" : occasion === "housewarming" ? "Family Name" : "Host Name";

    return (
      <div>
        <h2 className="font-serif text-2xl text-wine">Main details</h2>
        <p className="mt-1 font-body text-sm text-foreground/60">These details will appear on your invitation.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField label={nameLabel} value={value.groomName} onChange={(v) => set("groomName", v)} />
          <FormField label="Date" value={value.weddingDate} onChange={(v) => set("weddingDate", v)} />
          <FormField label="Time" value={value.weddingTime} onChange={(v) => set("weddingTime", v)} />
          <FormField label="Venue" value={value.weddingLocation} onChange={(v) => set("weddingLocation", v)} />
        </div>
      </div>
    );
  }

  // wedding, engagement, anniversary - couple-style fields
  const dateLabel = occasion === "wedding" ? "Wedding Date" : "Date";
  const timeLabel = occasion === "wedding" ? "Wedding Time" : "Time";
  const locationLabel = occasion === "wedding" ? "Wedding Location" : "Location";

  return (
    <div>
      <h2 className="font-serif text-2xl text-wine">Tell us about the couple</h2>
      <p className="mt-1 font-body text-sm text-foreground/60">
        These details will appear on your invitation.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <span className="mb-1.5 block font-body text-sm font-medium text-foreground/70">
            Groom's Title
          </span>
          <div className="flex gap-2">
            {titleOptions.map((title) => (
              <button
                key={title}
                type="button"
                onClick={() => set("groomTitle", title)}
                className={`rounded-full border px-3 py-1.5 font-body text-xs transition-colors ${
                  value.groomTitle === title
                    ? "border-wine bg-wine text-cream"
                    : "border-gold/30 text-foreground/60"
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-1.5 block font-body text-sm font-medium text-foreground/70">
            Bride's Title
          </span>
          <div className="flex gap-2">
            {titleOptions.map((title) => (
              <button
                key={title}
                type="button"
                onClick={() => set("brideTitle", title)}
                className={`rounded-full border px-3 py-1.5 font-body text-xs transition-colors ${
                  value.brideTitle === title
                    ? "border-wine bg-wine text-cream"
                    : "border-gold/30 text-foreground/60"
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        <FormField label="Groom's Name" value={value.groomName} onChange={(v) => set("groomName", v)} />
        <FormField label="Bride's Name" value={value.brideName} onChange={(v) => set("brideName", v)} />
        <FormField label={dateLabel} value={value.weddingDate} onChange={(v) => set("weddingDate", v)} />
        <FormField label={timeLabel} value={value.weddingTime} onChange={(v) => set("weddingTime", v)} />
        <FormField
          label={locationLabel}
          value={value.weddingLocation}
          onChange={(v) => set("weddingLocation", v)}
        />
        {occasion === "anniversary" && (
          <FormField label="Years Together" value={value.age ?? ""} onChange={(v) => set("age", v)} />
        )}
      </div>

      <p className="mt-8 font-body text-xs uppercase tracking-widest text-foreground/40">
        Family Names (optional)
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <FormField
          label="Groom's Father"
          value={value.groomFather}
          onChange={(v) => set("groomFather", v)}
          placeholder="Shri. ______"
        />
        <FormField
          label="Groom's Mother"
          value={value.groomMother}
          onChange={(v) => set("groomMother", v)}
          placeholder="Smt. ______"
        />
        <FormField
          label="Bride's Father"
          value={value.brideFather}
          onChange={(v) => set("brideFather", v)}
          placeholder="Shri. ______"
        />
        <FormField
          label="Bride's Mother"
          value={value.brideMother}
          onChange={(v) => set("brideMother", v)}
          placeholder="Smt. ______"
        />
      </div>
    </div>
  );
}
