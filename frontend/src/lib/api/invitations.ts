import { apiClient } from "./client";
import type { InvitationRequestDto, InvitationResponseDto, PublicInvitationResponseDto, PublishInvitationResponseDto } from "./types";

export function createInvitation(body: InvitationRequestDto) {
  return apiClient.post<InvitationResponseDto>("/invitations", body);
}

export function listInvitations() {
  return apiClient.get<InvitationResponseDto[]>("/invitations");
}

export function getInvitationById(id: string) {
  return apiClient.get<InvitationResponseDto>(`/invitations/${id}`);
}

export function updateInvitationById(id: string, body: InvitationRequestDto) {
  return apiClient.put<InvitationResponseDto>(`/invitations/${id}`, body);
}

export function deleteInvitationById(id: string) {
  return apiClient.delete<void>(`/invitations/${id}`);
}

export function publishInvitationById(id: string) {
  return apiClient.post<PublishInvitationResponseDto>(`/invitations/${id}/publish`);
}

export function getPublicInvitationBySlug(slug: string) {
  return apiClient.get<PublicInvitationResponseDto>(`/invitations/public/${encodeURIComponent(slug)}`, { auth: false });
}
