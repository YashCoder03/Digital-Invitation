import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import TemplateGallery from "@/components/templates/TemplateGallery";
import { getOccasionPageBySlug, occasionPages } from "@/data/occasionPages";

export async function generateStaticParams() {
  return occasionPages.map((page) => ({ occasion: page.slug }));
}

export async function generateMetadata(props: PageProps<"/templates/[occasion]">) {
  const { occasion } = await props.params;
  const page = getOccasionPageBySlug(occasion);
  return { title: page ? `${page.heading} | ShubhInvite` : "Templates | ShubhInvite" };
}

export default async function OccasionTemplateGalleryPage(props: PageProps<"/templates/[occasion]">) {
  const { occasion } = await props.params;
  const page = getOccasionPageBySlug(occasion);
  if (!page) notFound();

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <section className="px-6 pb-4 pt-16 text-center">
        <span className="text-4xl" aria-hidden="true">
          {page.emoji}
        </span>
        <h1 className="mt-3 font-serif text-4xl text-wine sm:text-5xl">{page.heading}</h1>
        <p className="mx-auto mt-3 max-w-md font-body text-foreground/60">{page.subheading}</p>
      </section>

      <section className="px-6 pb-20 pt-10">
        <TemplateGallery occasion={page.occasion} />
      </section>

      <SiteFooter />
    </div>
  );
}
