import { apiClient } from "./client";
import type { EventRequestDto, EventResponseDto } from "./types";

export function createEvent(invitationId: string, body: EventRequestDto) {
  return apiClient.post<EventResponseDto>(`/invitations/${invitationId}/events`, body);
}

export function listEvents(invitationId: string) {
  return apiClient.get<EventResponseDto[]>(`/invitations/${invitationId}/events`);
}

export function updateEvent(eventId: string, body: EventRequestDto) {
  return apiClient.put<EventResponseDto>(`/events/${eventId}`, body);
}

export function deleteEvent(eventId: string) {
  return apiClient.delete<void>(`/events/${eventId}`);
}

export function reorderEvents(invitationId: string, eventIds: string[]) {
  return apiClient.patch<void>(`/invitations/${invitationId}/events/reorder`, { eventIds });
}
