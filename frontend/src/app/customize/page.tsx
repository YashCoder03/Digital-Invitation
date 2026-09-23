import CustomizerShell from "@/components/customize/CustomizerShell";
import { occasionCards } from "@/content/occasions";

export const metadata = { title: "Customize | ShubhInvite" };

export default async function CustomizePage(props: PageProps<"/customize">) {
  const searchParams = await props.searchParams;
  const occasion = typeof searchParams.occasion === "string" ? searchParams.occasion : "wedding";
  const style = typeof searchParams.style === "string" ? searchParams.style : "traditional";
  const invitationId = typeof searchParams.id === "string" ? searchParams.id : undefined;

  const card = occasionCards.find((c) => c.route === `/${occasion}`);
  const badgeLabel = card?.badge?.en ?? card?.title.en ?? "Your Invitation";

  return <CustomizerShell occasion={occasion} style={style} badgeLabel={badgeLabel} invitationId={invitationId} />;
}
