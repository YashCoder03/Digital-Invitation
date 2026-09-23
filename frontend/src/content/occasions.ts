import type { Language } from "./translations";
import type { OccasionId, AccentName } from "./occasionTemplates";

export type MotifIconName = "kalash" | "diya" | "lotus" | "toran" | "peacock";

export interface OccasionCard {
  id: OccasionId | "wedding";
  route: string;
  accent: AccentName;
  icon: MotifIconName;
  emoji: string;
  highlighted?: boolean;
  badge?: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export const occasionCards: OccasionCard[] = [
  {
    id: "wedding",
    route: "/wedding",
    accent: "maroon",
    icon: "kalash",
    emoji: "\u{1F48D}",
    highlighted: true,
    badge: { en: "Marathi Wedding", mr: "मराठी लग्न" },
    title: { en: "Wedding", mr: "लग्न सोहळा" },
    description: {
      en: "A complete Maharashtrian wedding invitation — Haldi to Reception.",
      mr: "हळदीपासून स्वागत समारंभापर्यंत संपूर्ण मराठी लग्न आमंत्रण.",
    },
  },
  {
    id: "engagement",
    route: "/engagement",
    accent: "red",
    icon: "lotus",
    emoji: "\u{1F491}",
    title: { en: "Engagement", mr: "साखरपुडा" },
    description: {
      en: "A Sakhar Puda invitation for the start of a new bond.",
      mr: "नव्या नात्याच्या सुरुवातीसाठी साखरपुडा आमंत्रण.",
    },
  },
  {
    id: "birthday",
    route: "/birthday",
    accent: "gold",
    icon: "diya",
    emoji: "\u{1F382}",
    title: { en: "Birthday", mr: "वाढदिवस" },
    description: {
      en: "A joyful birthday invitation for your little one's big day.",
      mr: "आपल्या लाडक्या बाळाच्या खास दिवसासाठी वाढदिवस आमंत्रण.",
    },
  },
  {
    id: "babyshower",
    route: "/baby-shower",
    accent: "blush",
    icon: "lotus",
    emoji: "\u{1F37C}",
    title: { en: "Baby Shower", mr: "डोहाळे जेवण" },
    description: {
      en: "A Dohale Jevan invitation to shower the mother-to-be with love.",
      mr: "होणाऱ्या आईवर प्रेमाचा वर्षाव करणारे डोहाळे जेवण आमंत्रण.",
    },
  },
  {
    id: "housewarming",
    route: "/housewarming",
    accent: "sage",
    icon: "toran",
    emoji: "\u{1F3E0}",
    title: { en: "Housewarming", mr: "गृहप्रवेश" },
    description: {
      en: "A Griha Pravesh invitation to bless a brand new home.",
      mr: "नवीन घराच्या आशीर्वादासाठी गृहप्रवेश आमंत्रण.",
    },
  },
  {
    id: "anniversary",
    route: "/anniversary",
    accent: "gold",
    icon: "peacock",
    emoji: "\u{1F389}",
    title: { en: "Anniversary", mr: "लग्नवाढदिवस" },
    description: {
      en: "An invitation to celebrate years of togetherness.",
      mr: "एकत्र आयुष्याच्या वर्षांचा उत्सव साजरा करणारे आमंत्रण.",
    },
  },
  {
    id: "religious",
    route: "/religious",
    accent: "terracotta",
    icon: "diya",
    emoji: "\u{1FAD4}",
    title: { en: "Religious / Puja", mr: "धार्मिक / पूजा" },
    description: {
      en: "A Satyanarayan Puja invitation to gather for blessings.",
      mr: "आशीर्वादासाठी एकत्र येण्यासाठी सत्यनारायण पूजा आमंत्रण.",
    },
  },
  {
    id: "celebration",
    route: "/celebration",
    accent: "sage",
    icon: "lotus",
    emoji: "\u{1F38A}",
    title: { en: "Other Celebrations", mr: "इतर सोहळे" },
    description: {
      en: "A flexible invitation for any celebration you're hosting.",
      mr: "आपण आयोजित करत असलेल्या कोणत्याही सोहळ्यासाठी लवचिक आमंत्रण.",
    },
  },
];
