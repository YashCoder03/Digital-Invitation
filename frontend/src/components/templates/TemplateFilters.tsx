"use client";

import type { TemplateCategory } from "@/types/template";

const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  TRADITIONAL: "Traditional",
  PAITHANI: "Paithani",
  MODERN: "Modern",
  MINIMAL: "Minimal",
  FLORAL: "Floral",
  ROYAL: "Royal",
  ELEGANT: "Elegant",
  KIDS: "Kids",
  FUN: "Fun",
  SOFT: "Soft",
  CUTE: "Cute",
  ROMANTIC: "Romantic",
  RANGOLI: "Rangoli",
  FESTIVE: "Festive",
};

export default function TemplateFilters({
  categories,
  active,
  onChange,
}: {
  categories: TemplateCategory[];
  active: TemplateCategory | "ALL";
  onChange: (category: TemplateCategory | "ALL") => void;
}) {
  const options: (TemplateCategory | "ALL")[] = ["ALL", ...categories];

  return (
    <div role="group" aria-label="Filter templates by style" className="flex flex-wrap justify-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={`rounded-full border px-4 py-2 font-body text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-wine ${
            active === option
              ? "border-wine bg-wine text-cream"
              : "border-gold/30 text-foreground/60 hover:border-wine/40 hover:text-wine"
          }`}
        >
          {option === "ALL" ? "All" : CATEGORY_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
