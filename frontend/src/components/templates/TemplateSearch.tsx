"use client";

export default function TemplateSearch({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <div className="mx-auto w-full max-w-sm">
      <label htmlFor="template-search" className="sr-only">
        Search templates
      </label>
      <input
        id="template-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search templates…"
        className="w-full rounded-full border border-gold/30 bg-cream px-5 py-2.5 font-body text-sm text-foreground focus:border-wine focus:outline-none"
      />
    </div>
  );
}
