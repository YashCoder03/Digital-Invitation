import type { InvitationBanner } from "@/types/banner";
import type { Invitation } from "@/types/invitation";
import { getBannerTemplateComponent } from "@/lib/bannerTemplateRegistry";

/**
 * Resolves banner.templateId -> the right banner template component, mirroring
 * InvitationRenderer. `staticExport` renders without animation wrappers, for PNG capture.
 */
export default function BannerRenderer({
  banner,
  invitation,
  staticExport = false,
}: {
  banner: InvitationBanner;
  invitation: Invitation;
  staticExport?: boolean;
}) {
  const Template = getBannerTemplateComponent(banner.templateId);
  // Not a component defined during render - getBannerTemplateComponent returns a stable
  // reference from the module-level registry, same as InvitationRenderer's template lookup.
  // eslint-disable-next-line react-hooks/static-components
  return <Template banner={banner} invitation={invitation} staticExport={staticExport} />;
}
