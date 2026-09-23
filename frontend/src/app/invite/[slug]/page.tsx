import PublicInvitationView from "@/components/invitation/PublicInvitationView";

export const metadata = { title: "You're Invited | ShubhInvite" };

export default async function InvitePage(props: PageProps<"/invite/[slug]">) {
  const { slug } = await props.params;
  return <PublicInvitationView slug={slug} />;
}
