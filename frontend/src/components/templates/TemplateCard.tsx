import Link from "next/link";
import type { InvitationTemplate } from "@/types/template";
import { buildSampleInvitation } from "@/lib/templateSampleInvitation";
import { getOccasionSlug } from "@/data/occasionPages";
import TemplateThumbnail from "./TemplateThumbnail";

export default function TemplateCard({ template }: { template: InvitationTemplate }) {
  const previewHref = `/templates/${getOccasionSlug(template.occasion)}/${template.id}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-cream shadow-sm transition-shadow hover:shadow-md">
      <TemplateThumbnail
        invitation={buildSampleInvitation(template.id)}
        className="h-56 w-full border-b border-gold/20"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg text-wine">{template.name}</h3>
          <span className="shrink-0 rounded-full border border-gold/30 px-2.5 py-1 font-body text-[0.65rem] uppercase tracking-widest text-terracotta">
            {template.category}
          </span>
        </div>
        <p className="mt-2 flex-1 font-body text-sm text-foreground/60">{template.description}</p>

        {template.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
            {template.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-ivory px-2.5 py-1 font-body text-xs text-foreground/50">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex gap-2">
          <Link
            href={previewHref}
            className="flex-1 rounded-full border border-wine/30 px-4 py-2.5 text-center font-body text-xs uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
          >
            Preview
          </Link>
          <Link
            href={`/create/${template.id}`}
            className="flex-1 rounded-full bg-wine px-4 py-2.5 text-center font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90"
          >
            Use This Template
          </Link>
        </div>
      </div>
    </div>
  );
}
