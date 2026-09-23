import PreviewScreen from "@/components/preview/PreviewScreen";

export const metadata = { title: "Preview | ShubhInvite" };

export default async function PreviewInvitationPage(props: PageProps<"/preview/[invitationId]">) {
  const { invitationId } = await props.params;
  return <PreviewScreen invitationId={invitationId} />;
}
