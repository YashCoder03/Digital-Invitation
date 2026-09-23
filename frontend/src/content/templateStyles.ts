import type { Language } from "./translations";
import type { AccentName } from "./occasionTemplates";

export type StyleTag = "Traditional" | "Modern" | "Minimal" | "Luxury" | "Floral" | "Marathi";

export interface TemplateStyle {
  id: AccentName;
  tag: StyleTag;
  label: Record<Language, string>;
  description: Record<Language, string>;
}

export const filterTags: StyleTag[] = [
  "Traditional",
  "Modern",
  "Minimal",
  "Luxury",
  "Floral",
  "Marathi",
];

/** Named template presets offered for every occasion's template browse page. */
export const templateStyles: TemplateStyle[] = [
  {
    id: "maroon",
    tag: "Traditional",
    label: { en: "Traditional Lagna Patrika", mr: "पारंपरिक लग्न पत्रिका" },
    description: {
      en: "A rich, formal design inspired by the classic Marathi wedding invite.",
      mr: "पारंपरिक मराठी लग्न पत्रिकेपासून प्रेरित समृद्ध, औपचारिक रचना.",
    },
  },
  {
    id: "gold",
    tag: "Luxury",
    label: { en: "Royal Marathi", mr: "राजेशाही मराठी" },
    description: {
      en: "Antique gold accents for a regal, premium celebration.",
      mr: "राजेशाही आणि प्रीमियम सोहळ्यासाठी प्राचीन सोनेरी रंगसंगती.",
    },
  },
  {
    id: "terracotta",
    tag: "Marathi",
    label: { en: "Paithani Elegance", mr: "पैठणी लावण्य" },
    description: {
      en: "Warm terracotta tones inspired by the iconic Paithani weave.",
      mr: "प्रतिष्ठित पैठणी विणकामापासून प्रेरित उबदार टेराकोटा रंगछटा.",
    },
  },
  {
    id: "sage",
    tag: "Modern",
    label: { en: "Modern Marathi", mr: "आधुनिक मराठी" },
    description: {
      en: "A clean, contemporary layout with calm sage green accents.",
      mr: "सौम्य हिरव्या रंगछटांसह स्वच्छ, आधुनिक मांडणी.",
    },
  },
  {
    id: "red",
    tag: "Floral",
    label: { en: "Floral Marathi", mr: "फुलोरा मराठी" },
    description: {
      en: "Festive florals with warm red highlights, soft and celebratory.",
      mr: "उबदार लाल रंगछटांसह उत्सवी फुलांची सजावट.",
    },
  },
  {
    id: "blush",
    tag: "Minimal",
    label: { en: "Minimal Maharashtrian", mr: "मिनिमल महाराष्ट्रीयन" },
    description: {
      en: "A soft, understated design with generous whitespace.",
      mr: "भरपूर मोकळी जागा असलेली सौम्य, साधी रचना.",
    },
  },
];
