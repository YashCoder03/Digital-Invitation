import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import InvitationPreviewFrame from "@/components/invitation/InvitationPreviewFrame";
import { getOccasionPageBySlug } from "@/data/occasionPages";
import { getTemplateById } from "@/lib/templateUtils";
import { buildSampleInvitation } from "@/lib/templateSampleInvitation";

export async function generateMetadata(props: PageProps<"/templates/[occasion]/[templateId]">) {
  const { templateId } = await props.params;
  const template = getTemplateById(templateId);
  return { title: template ? `${template.name} | ShubhInvite` : "Template | ShubhInvite" };
}

export default async function TemplatePreviewPage(props: PageProps<"/templates/[occasion]/[templateId]">) {
  const { occasion, templateId } = await props.params;
  const page = getOccasionPageBySlug(occasion);
  const template = getTemplateById(templateId);
  if (!page || !template || template.occasion !== page.occasion) notFound();

  const invitation = buildSampleInvitation(template.id);

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <section className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-6 py-16 lg:grid-cols-[1fr_420px]">
        <div className="order-2 lg:order-1">
          <Link href={`/templates/${page.slug}`} className="font-body text-sm text-foreground/60 hover:text-wine">
            ← {page.heading}
          </Link>

          <p className="mt-4 font-body text-sm uppercase tracking-[0.3em] text-terracotta">{template.category}</p>
          <h1 className="mt-3 font-serif text-4xl text-wine">{template.name}</h1>
          <p className="mt-4 max-w-md font-body text-foreground/60">{template.description}</p>

          {template.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
              {template.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-cream px-3 py-1 font-body text-xs text-foreground/50">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-6 font-body text-sm text-foreground/50">Beautiful invitations, completely free.</p>

          <Link
            href={`/create/${template.id}`}
            className="mt-4 inline-block rounded-full bg-wine px-8 py-3.5 font-body text-sm uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90"
          >
            Use This Template
          </Link>
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <InvitationPreviewFrame invitation={invitation} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
