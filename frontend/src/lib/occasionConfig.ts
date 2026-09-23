/**
 * Single source of truth for what the Create Invitation editor looks like per occasion:
 * the label for the editor's first section, and the event-type presets offered in the
 * Events step. Keyed by the same lowercase occasion slug used throughout the app's routes
 * (see data/occasionPages.ts) - NOT the backend's uppercase Occasion enum.
 */

export interface EventTypePreset {
  id: string;
  emoji: string;
  name: string;
}

export interface OccasionConfig {
  label: string;
  /** Step label shown for the editor's first section (replaces "Couple" for non-wedding occasions). */
  firstStepLabel: string;
  /** Event type presets offered in the Events step "+ Add Event" list. */
  eventTypes: EventTypePreset[];
  /** id (from eventTypes) seeded once on a brand-new invitation. */
  defaultEventTypeId: string;
}

export const occasionConfigs: Record<string, OccasionConfig> = {
  wedding: {
    label: "Wedding",
    firstStepLabel: "Couple",
    eventTypes: [
      { id: "haldi", emoji: "\u{1F33C}", name: "\u0939\u0933\u0926" },
      { id: "mehendi", emoji: "\u{1F33F}", name: "\u092e\u0947\u0939\u0902\u0926\u0940" },
      { id: "sangeet", emoji: "\u{1F3B5}", name: "\u0938\u0902\u0917\u0940\u0924" },
      { id: "vivah", emoji: "\u{1F48D}", name: "\u0935\u093f\u0935\u093e\u0939 \u0938\u094b\u0939\u0933\u093e" },
      { id: "reception", emoji: "\u{1F38A}", name: "\u0930\u093f\u0938\u0947\u092a\u094d\u0936\u0928" },
    ],
    defaultEventTypeId: "vivah",
  },
  engagement: {
    label: "Engagement",
    firstStepLabel: "Couple",
    eventTypes: [
      { id: "engagement", emoji: "\u{1F48D}", name: "Engagement" },
      { id: "ring-ceremony", emoji: "\u{1F48E}", name: "Ring Ceremony" },
      { id: "celebration", emoji: "\u{1F389}", name: "Celebration" },
    ],
    defaultEventTypeId: "engagement",
  },
  birthday: {
    label: "Birthday",
    firstStepLabel: "Birthday",
    eventTypes: [
      { id: "birthday-party", emoji: "\u{1F382}", name: "Birthday Party" },
      { id: "celebration", emoji: "\u{1F389}", name: "Celebration" },
    ],
    defaultEventTypeId: "birthday-party",
  },
  "baby-shower": {
    label: "Baby Shower",
    firstStepLabel: "Parents",
    eventTypes: [
      { id: "baby-shower", emoji: "\u{1F476}", name: "Baby Shower" },
      { id: "ceremony", emoji: "\u{1F64F}", name: "Ceremony" },
      { id: "celebration", emoji: "\u{1F389}", name: "Celebration" },
    ],
    defaultEventTypeId: "baby-shower",
  },
  housewarming: {
    label: "Housewarming",
    firstStepLabel: "Family",
    eventTypes: [
      { id: "gruhapravesh", emoji: "\u{1F3E0}", name: "Griha Pravesh" },
      { id: "puja", emoji: "\u{1FA94}", name: "Puja" },
      { id: "housewarming", emoji: "\u{1F3E1}", name: "Housewarming" },
      { id: "celebration", emoji: "\u{1F389}", name: "Celebration" },
    ],
    defaultEventTypeId: "gruhapravesh",
  },
  anniversary: {
    label: "Anniversary",
    firstStepLabel: "Couple",
    eventTypes: [
      { id: "anniversary", emoji: "\u2764\uFE0F", name: "Anniversary" },
      { id: "celebration", emoji: "\u{1F389}", name: "Celebration" },
      { id: "party", emoji: "\u{1F942}", name: "Party" },
    ],
    defaultEventTypeId: "anniversary",
  },
  puja: {
    label: "Puja",
    firstStepLabel: "Puja",
    eventTypes: [
      { id: "puja", emoji: "\u{1FA94}", name: "Puja" },
      { id: "ceremony", emoji: "\u{1F64F}", name: "Ceremony" },
      { id: "prasad", emoji: "\u{1F35A}", name: "Prasad" },
    ],
    defaultEventTypeId: "puja",
  },
  celebration: {
    label: "Celebration",
    firstStepLabel: "Celebration",
    eventTypes: [
      { id: "celebration", emoji: "\u{1F389}", name: "Celebration" },
      { id: "party", emoji: "\u{1F942}", name: "Party" },
    ],
    defaultEventTypeId: "celebration",
  },
};

export function getOccasionConfig(occasion: string): OccasionConfig {
  return occasionConfigs[occasion] ?? occasionConfigs.wedding;
}
