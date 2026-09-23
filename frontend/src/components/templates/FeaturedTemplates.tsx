import Link from "next/link";
import { getFeaturedTemplates } from "@/lib/templateUtils";
import TemplateCard from "./TemplateCard";

/** Homepage section - shows templates where featured === true, dynamically from the registry. */
export default function FeaturedTemplates() {
  const featured = getFeaturedTemplates("WEDDING");
  if (featured.length === 0) return null;

  return (
    <section className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-terracotta">Free Templates</p>
        <h2 className="mt-3 font-serif text-3xl text-wine sm:text-4xl">Featured Wedding Invitations</h2>
        <p className="mx-auto mt-3 max-w-md font-body text-foreground/60">
          Beautiful invitations, completely free.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/templates/wedding"
          className="rounded-full border border-wine/30 px-6 py-3 font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5"
        >
          View All Templates
        </Link>
      </div>
    </section>
  );
}
