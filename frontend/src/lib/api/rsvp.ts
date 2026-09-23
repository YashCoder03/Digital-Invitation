import { apiClient } from "./client";
import type { RsvpSummaryResponseDto, SubmitRsvpRequestDto, SubmitRsvpResponseDto } from "./types";

export function submitPublicRsvp(slug: string, body: SubmitRsvpRequestDto) {
  return apiClient.post<SubmitRsvpResponseDto>(`/invitations/public/${encodeURIComponent(slug)}/rsvp`, body, { auth: false });
}

export function getRsvpSummary(invitationId: string) {
  return apiClient.get<RsvpSummaryResponseDto>(`/invitations/${invitationId}/rsvps`);
}
