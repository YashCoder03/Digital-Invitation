"use client";

import { useMemo, useState } from "react";
import type { Occasion, TemplateCategory } from "@/types/template";
import { getActiveTemplates, getFeaturedTemplates, searchTemplates } from "@/lib/templateUtils";
import TemplateCard from "./TemplateCard";
import TemplateFilters from "./TemplateFilters";
import TemplateSearch from "./TemplateSearch";

type SortOption = "FEATURED" | "AZ";

export default function TemplateGallery({ occasion }: { occasion: Occasion }) {
  const [category, setCategory] = useState<TemplateCategory | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("FEATURED");

  const availableCategories = useMemo(
    () => Array.from(new Set(getActiveTemplates(occasion).map((t) => t.category))),
    [occasion]
  );

  const featured = useMemo(() => getFeaturedTemplates(occasion), [occasion]);
  const showFeaturedShelf = category === "ALL" && !query && featured.length > 0;

  const templates = useMemo(() => {
    const active = getActiveTemplates(occasion);
    const byCategory = category === "ALL" ? active : active.filter((t) => t.category === category);
    const matched = searchTemplates(byCategory, query);

    const sorted = [...matched];
    if (sort === "FEATURED") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    else sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
    // "Newest" isn't offered below - there's no createdAt field yet, and faking recency would be misleading.
  }, [occasion, category, query, sort]);

  return (
    <div>
      {showFeaturedShelf && (
        <div className="mb-14">
          <h2 className="text-center font-serif text-2xl text-wine">Featured Designs</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <TemplateSearch value={query} onChange={setQuery} />
        {availableCategories.length > 1 && (
          <TemplateFilters categories={availableCategories} active={category} onChange={setCategory} />
        )}
        <div className="flex items-center gap-2 font-body text-sm text-foreground/60">
          <label htmlFor="template-sort">Sort by</label>
          <select
            id="template-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-full border border-gold/30 bg-cream px-3 py-1.5 text-sm focus:border-wine focus:outline-none"
          >
            <option value="FEATURED">Featured</option>
            <option value="AZ">A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-center font-serif text-2xl text-wine">All Templates</h2>
        {templates.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="mt-6 font-body text-foreground/60">
              {query ? "No templates found." : "More designs are coming soon."}
            </p>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-full border border-wine/30 px-4 py-2 font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
