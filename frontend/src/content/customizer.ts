import { getOccasionConfig } from "@/lib/occasionConfig";

export interface CoupleDetails {
  groomTitle: string;
  groomName: string;
  brideTitle: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  weddingLocation: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  /** Headline override for non-wedding occasions (e.g. puja name) - maps to Invitation.title. */
  title?: string;
  /** Free-text number for non-wedding occasions (birthday age, anniversary years) - maps to Invitation.age. */
  age?: string;
}

export interface WeddingEventItem {
  id: string;
  emoji: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
}

export interface PhotoSlot {
  id: string;
  url: string;
}

export type ThemeId = string;
export type AnimationLevel = "none" | "subtle" | "elegant";

export interface StyleSettings {
  theme: ThemeId;
  font: "serif" | "sans";
  musicEnabled: boolean;
  animation: AnimationLevel;
}

export interface DetailsSettings {
  message: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  contactNumbers: string[];
  rsvpEnabled: boolean;
  rsvpDeadline: string;
}

export interface CustomizerState {
  couple: CoupleDetails;
  events: WeddingEventItem[];
  photos: { couple: PhotoSlot | null; gallery: PhotoSlot[]; family: PhotoSlot[] };
  style: StyleSettings;
  details: DetailsSettings;
}

export const titleOptions = ["चि.", "चि. सौ. कां.", "श्री."];

export const eventPresets: { id: string; emoji: string; name: string }[] = [
  { id: "haldi", emoji: "\u{1F33C}", name: "हळद" },
  { id: "mehendi", emoji: "\u{1F33F}", name: "मेहंदी" },
  { id: "sangeet", emoji: "\u{1F3B5}", name: "संगीत" },
  { id: "vivah", emoji: "\u{1F48D}", name: "विवाह सोहळा" },
  { id: "reception", emoji: "\u{1F38A}", name: "रिसेप्शन" },
  { id: "grihapravesh", emoji: "\u{1F3E0}", name: "गृहप्रवेश" },
];

export const animationOptions: { id: AnimationLevel; label: string; mrLabel: string }[] = [
  { id: "none", label: "None", mrLabel: "काहीही नाही" },
  { id: "subtle", label: "Subtle", mrLabel: "सौम्य" },
  { id: "elegant", label: "Elegant", mrLabel: "रुचिपूर्ण" },
];

export const defaultCustomizerState: CustomizerState = {
  couple: {
    groomTitle: "चि.",
    groomName: "यश देशमुख",
    brideTitle: "चि. सौ. कां.",
    brideName: "वैष्णवी पाटील",
    weddingDate: "18 January 2027",
    weddingTime: "11:30 AM",
    weddingLocation: "Pune, Maharashtra",
    groomFather: "",
    groomMother: "",
    brideFather: "",
    brideMother: "",
  },
  events: [
    { id: "haldi", emoji: "\u{1F33C}", name: "हळदी समारंभ", date: "18 January 2027", time: "10:00 AM", venue: "पुणे", address: "" },
    { id: "mehendi", emoji: "\u{1F33F}", name: "मेहंदी", date: "18 January 2027", time: "4:00 PM", venue: "पुणे", address: "" },
    { id: "sangeet", emoji: "\u{1F3B5}", name: "संगीत", date: "18 January 2027", time: "7:00 PM", venue: "पुणे", address: "" },
    { id: "vivah", emoji: "\u{1F48D}", name: "विवाह सोहळा", date: "19 January 2027", time: "10:30 AM", venue: "पुणे", address: "" },
    { id: "reception", emoji: "\u{1F38A}", name: "रिसेप्शन", date: "19 January 2027", time: "7:00 PM", venue: "पुणे", address: "" },
  ],
  photos: { couple: null, gallery: [], family: [] },
  style: { theme: "traditional", font: "serif", musicEnabled: false, animation: "subtle" },
  details: {
    message: "आमच्या आयुष्यातील या सुंदर क्षणाचा आनंद\nआपल्या उपस्थितीने द्विगुणित करावा.",
    venueName: "श्री मंगल कार्यालय",
    venueAddress: "पुणे, महाराष्ट्र",
    mapUrl: "",
    contactNumbers: [""],
    rsvpEnabled: true,
    rsvpDeadline: "10 January 2027",
  },
};

/**
 * Seeds a brand-new invitation's editor state for the given occasion. Wedding keeps the
 * existing sample-filled experience; every other occasion starts blank with a single
 * occasion-appropriate event, instead of inheriting wedding names/events by accident.
 */
export function createInitialCustomizerState(occasion: string): CustomizerState {
  if (occasion === "wedding") {
    return structuredClone(defaultCustomizerState);
  }

  const config = getOccasionConfig(occasion);
  const preset = config.eventTypes.find((type) => type.id === config.defaultEventTypeId) ?? config.eventTypes[0];

  return {
    couple: {
      groomTitle: "",
      groomName: "",
      brideTitle: "",
      brideName: "",
      weddingDate: "",
      weddingTime: "",
      weddingLocation: "",
      groomFather: "",
      groomMother: "",
      brideFather: "",
      brideMother: "",
      title: "",
      age: "",
    },
    events: preset
      ? [
          {
            id: `${preset.id}-${Date.now()}`,
            emoji: preset.emoji,
            name: preset.name,
            date: "",
            time: "",
            venue: "",
            address: "",
          },
        ]
      : [],
    photos: { couple: null, gallery: [], family: [] },
    style: { theme: defaultCustomizerState.style.theme, font: "serif", musicEnabled: false, animation: "subtle" },
    details: {
      message: "",
      venueName: "",
      venueAddress: "",
      mapUrl: "",
      contactNumbers: [""],
      rsvpEnabled: true,
      rsvpDeadline: "",
    },
  };
}
