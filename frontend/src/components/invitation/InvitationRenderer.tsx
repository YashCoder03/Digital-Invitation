import type { Invitation } from "@/types/invitation";
import { getTemplateComponent } from "@/lib/templateRegistry";
import TemplateUnavailable from "./TemplateUnavailable";

/** Looks up `invitation.templateId` in the template component registry and renders it. */
export default function InvitationRenderer({ invitation }: { invitation: Invitation }) {
  const Template = getTemplateComponent(invitation.templateId);
  if (!Template) return <TemplateUnavailable />;
  // Not a component defined during render - `getTemplateComponent` returns a stable reference
  // from the module-level registry, the same as any other dynamic-component-by-key lookup.
  // eslint-disable-next-line react-hooks/static-components
  return <Template invitation={invitation} />;
}
