import { apiClient } from "./client";
import type { PhotoResponseDto, PhotoTypeDto } from "./types";

export function uploadPhoto(invitationId: string, file: File, type: PhotoTypeDto) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  return apiClient.upload<PhotoResponseDto>(`/invitations/${invitationId}/photos`, formData);
}

export function getPhotos(invitationId: string) {
  return apiClient.get<PhotoResponseDto[]>(`/invitations/${invitationId}/photos`);
}

export function deletePhoto(photoId: string) {
  return apiClient.delete<void>(`/photos/${photoId}`);
}

export function reorderPhotos(invitationId: string, photoIds: string[]) {
  return apiClient.patch<void>(`/invitations/${invitationId}/photos/reorder`, { photoIds });
}
