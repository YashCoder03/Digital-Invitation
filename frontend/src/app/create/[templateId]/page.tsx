import CustomizerShell from "@/components/customize/CustomizerShell";
import { getTemplateById } from "@/lib/templateUtils";
import { getOccasionSlug } from "@/data/occasionPages";

export async function generateMetadata(props: PageProps<"/create/[templateId]">) {
  const { templateId } = await props.params;
  const template = getTemplateById(templateId);
  return { title: template ? `${template.name} | ShubhInvite` : "Customize | ShubhInvite" };
}

export default async function CreateFromTemplatePage(props: PageProps<"/create/[templateId]">) {
  const { templateId } = await props.params;
  const searchParams = await props.searchParams;
  const invitationId = typeof searchParams.id === "string" ? searchParams.id : undefined;
  const template = getTemplateById(templateId);
  const occasion = template ? getOccasionSlug(template.occasion) : "wedding";

  return (
    <CustomizerShell
      occasion={occasion}
      style={templateId}
      badgeLabel={template?.name ?? "Your Invitation"}
      invitationId={invitationId}
    />
  );
}
