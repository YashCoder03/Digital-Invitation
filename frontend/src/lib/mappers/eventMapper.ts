import type { WeddingEventItem } from "@/content/customizer";
import type { EventRequestDto, EventResponseDto, EventTypeDto, PublicEventDto } from "@/lib/api/types";
import { formatIsoDateToDisplay, formatIsoTimeToDisplay, parseDisplayDateToIso, parseDisplayTimeToIso } from "./dateTimeUtils";

const TYPE_BY_PRESET_ID: Record<string, EventTypeDto> = {
  haldi: "HALDI",
  mehendi: "MEHENDI",
  sangeet: "SANGEET",
  vivah: "WEDDING",
  reception: "RECEPTION",
  grihapravesh: "GRUHPAVESH",
};

const EMOJI_BY_TYPE: Record<EventTypeDto, string> = {
  HALDI: "\u{1F33C}",
  MEHENDI: "\u{1F33F}",
  SANGEET: "\u{1F3B5}",
  WEDDING: "\u{1F48D}",
  RECEPTION: "\u{1F38A}",
  GRUHPAVESH: "\u{1F3E0}",
  CUSTOM: "\u2728",
};

function inferEventType(item: WeddingEventItem): EventTypeDto {
  const presetId = item.id.split("-")[0];
  return TYPE_BY_PRESET_ID[presetId] ?? "CUSTOM";
}

/** Throws with a user-facing message if the event's date/time can't be sent to the backend yet. */
export function buildEventRequest(item: WeddingEventItem, displayOrder: number): EventRequestDto {
  const isoDate = parseDisplayDateToIso(item.date);
  const isoTime = parseDisplayTimeToIso(item.time);
  if (!isoDate || !isoTime) {
    throw new Error(`Please enter a valid date and time for "${item.name || "this event"}".`);
  }

  return {
    name: item.name || "Untitled Event",
    type: inferEventType(item),
    date: isoDate,
    time: isoTime,
    venue: item.venue || undefined,
    address: item.address || undefined,
    displayOrder,
  };
}

export function mapEventResponseToItem(dto: EventResponseDto): WeddingEventItem {
  return {
    id: dto.id,
    emoji: EMOJI_BY_TYPE[dto.type] ?? "\u2728",
    name: dto.name,
    date: formatIsoDateToDisplay(dto.date),
    time: formatIsoTimeToDisplay(dto.time),
    venue: dto.venue ?? "",
    address: dto.address ?? "",
  };
}

export function mapPublicEventToItem(dto: PublicEventDto, index: number): WeddingEventItem {
  return {
    id: `event-${index}`,
    emoji: EMOJI_BY_TYPE[dto.type] ?? "\u2728",
    name: dto.name,
    date: formatIsoDateToDisplay(dto.date),
    time: formatIsoTimeToDisplay(dto.time),
    venue: dto.venue ?? "",
    address: dto.address ?? "",
  };
}
