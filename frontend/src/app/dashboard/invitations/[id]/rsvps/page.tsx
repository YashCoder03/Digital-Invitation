import RsvpDashboard from "@/components/dashboard/RsvpDashboard";

export const metadata = { title: "RSVP Responses | ShubhInvite" };

export default async function InvitationRsvpsPage(props: PageProps<"/dashboard/invitations/[id]/rsvps">) {
  const { id } = await props.params;
  return <RsvpDashboard invitationId={id} />;
}
