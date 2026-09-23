import BannerEditor from "@/components/banner/BannerEditor";

export const metadata = { title: "Banner Creator | ShubhInvite" };

export default async function CreateBannerPage(props: PageProps<"/banner/create/[invitationId]">) {
  const { invitationId } = await props.params;
  return <BannerEditor invitationId={invitationId} />;
}
