// TypeScript mirrors of the Spring Boot backend DTOs. Keep in sync with backend/src/main/java/com/shubhinvite.

export interface UserSummary {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserSummary;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type InvitationStatusDto = "DRAFT" | "PUBLISHED";

export interface InvitationResponseDto {
  id: string;
  templateId: string;
  slug: string;
  status: InvitationStatusDto;
  groomName: string;
  brideName: string;
  weddingDate: string; // ISO yyyy-MM-dd
  weddingTime: string; // HH:mm
  location: string;
  message: string | null;
  rsvpEnabled: boolean;
  publicUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationRequestDto {
  templateId: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  location: string;
  message?: string;
}

export interface PublishInvitationResponseDto {
  id: string;
  slug: string;
  status: InvitationStatusDto;
  publicUrl: string;
}

export type EventTypeDto = "HALDI" | "MEHENDI" | "SANGEET" | "WEDDING" | "RECEPTION" | "GRUHPAVESH" | "CUSTOM";

export interface EventResponseDto {
  id: string;
  invitationId: string;
  name: string;
  type: EventTypeDto;
  date: string;
  time: string;
  venue: string | null;
  address: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventRequestDto {
  name: string;
  type: EventTypeDto;
  date: string;
  time: string;
  venue?: string;
  address?: string;
  displayOrder?: number;
}

export interface ReorderEventsRequestDto {
  eventIds: string[];
}

export interface PublicEventDto {
  name: string;
  type: EventTypeDto;
  date: string;
  time: string;
  venue: string | null;
  address: string | null;
  displayOrder: number;
}

export interface PublicInvitationResponseDto {
  templateId: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  location: string;
  message: string | null;
  events: PublicEventDto[];
  venue: string | null;
  contacts: string[];
  photos: PublicPhotoDto[];
  rsvp: { enabled: boolean };
}

export interface SubmitRsvpRequestDto {
  guestName: string;
  attending: boolean;
  guestCount: number;
}

export interface SubmitRsvpResponseDto {
  success: boolean;
  message: string;
}

export interface RsvpResponseItemDto {
  id: string;
  guestName: string;
  attending: boolean;
  guestCount: number;
  createdAt: string;
}

export interface RsvpSummaryResponseDto {
  totalResponses: number;
  attending: number;
  notAttending: number;
  totalGuests: number;
  responses: RsvpResponseItemDto[];
}

export type PhotoTypeDto = "COUPLE" | "GALLERY" | "FAMILY";

export interface PhotoResponseDto {
  id: string;
  url: string;
  type: PhotoTypeDto;
  displayOrder: number;
}

export interface PublicPhotoDto {
  url: string;
  type: PhotoTypeDto;
  displayOrder: number;
}
