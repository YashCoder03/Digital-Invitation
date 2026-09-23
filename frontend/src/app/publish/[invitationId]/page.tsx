import { redirect } from "next/navigation";

export default async function PublishInvitationPage(props: PageProps<"/publish/[invitationId]">) {
  const { invitationId } = await props.params;
  // /preview/[invitationId] is now the canonical review-before-publish page; keep this
  // path working for old links/bookmarks.
  redirect(`/preview/${invitationId}`);
}
