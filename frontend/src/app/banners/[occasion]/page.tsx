import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import BannerTemplateCard from "@/components/banner/BannerTemplateCard";
import { getOccasionPageBySlug, occasionPages } from "@/data/occasionPages";
import { getActiveTemplates } from "@/lib/templateUtils";

export async function generateStaticParams() {
  return occasionPages.map((page) => ({ occasion: page.slug }));
}

export async function generateMetadata(props: PageProps<"/banners/[occasion]">) {
  const { occasion } = await props.params;
  const page = getOccasionPageBySlug(occasion);
  return { title: page ? `${page.heading.replace("Invitations", "Banners")} | ShubhInvite` : "Banners | ShubhInvite" };
}

export default async function OccasionBannerGalleryPage(props: PageProps<"/banners/[occasion]">) {
  const { occasion } = await props.params;
  const page = getOccasionPageBySlug(occasion);
  if (!page) notFound();

  const templates = getActiveTemplates(page.occasion);

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <section className="px-6 pb-4 pt-16 text-center">
        <span className="text-4xl" aria-hidden="true">
          {page.emoji}
        </span>
        <h1 className="mt-3 font-serif text-4xl text-wine sm:text-5xl">
          {page.heading.replace("Invitations", "Banners")}
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-foreground/60">
          Create a beautiful banner that matches your invitation - completely free.
        </p>
      </section>

      <section className="px-6 pb-20 pt-10">
        {templates.length === 0 ? (
          <p className="text-center font-body text-foreground/60">More designs are coming soon.</p>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <BannerTemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
