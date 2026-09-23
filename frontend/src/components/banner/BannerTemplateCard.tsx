import type { InvitationTemplate } from "@/types/template";
import { buildSampleInvitation } from "@/lib/templateSampleInvitation";
import { createBannerFromInvitation } from "@/lib/bannerUtils";
import BannerRenderer from "./BannerRenderer";

/** A real (rendered, not static-screenshot) banner preview card for the /banners discovery pages. */
export default function BannerTemplateCard({ template }: { template: InvitationTemplate }) {
  const invitation = buildSampleInvitation(template.id);
  const banner = createBannerFromInvitation(invitation, "SQUARE");

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-cream shadow-sm">
      <div className="pointer-events-none aspect-square w-full overflow-hidden" aria-hidden="true">
        <BannerRenderer banner={banner} invitation={invitation} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg text-wine">{template.name} Banner</h3>
        <p className="mt-1 font-body text-xs uppercase tracking-widest text-terracotta">{template.category}</p>
        <p className="mt-2 flex-1 font-body text-sm text-foreground/60">{template.description}</p>
        <p className="mt-3 font-body text-xs text-foreground/45">
          Customize this banner design instantly - no invitation required.
        </p>
        <a
          href={`/banner/create?template=${template.id}`}
          className="mt-5 rounded-full bg-wine px-4 py-2.5 text-center font-body text-xs uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90"
        >
          Customize
        </a>
      </div>
    </div>
  );
}
