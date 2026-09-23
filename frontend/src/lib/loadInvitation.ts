import type { Invitation } from "@/types/invitation";
import { isBackendId } from "@/lib/uuid";
import { getInvitation } from "@/lib/invitationStorage";
import { getInvitationById } from "@/lib/api/invitations";
import { listEvents } from "@/lib/api/events";
import { mapInvitationResponseToInvitation } from "@/lib/mappers/invitationMapper";
import { mapEventResponseToItem } from "@/lib/mappers/eventMapper";

/** Loads an invitation regardless of whether it lives in the backend (wedding) or localStorage (other occasions). */
export async function loadInvitationById(id: string): Promise<Invitation | null> {
  if (!isBackendId(id)) {
    return getInvitation(id) ?? null;
  }

  try {
    const [dto, eventDtos] = await Promise.all([getInvitationById(id), listEvents(id)]);
    const events = eventDtos.map(mapEventResponseToItem);
    return mapInvitationResponseToInvitation(dto, { occasion: "wedding", style: dto.templateId, events });
  } catch {
    return null;
  }
}
