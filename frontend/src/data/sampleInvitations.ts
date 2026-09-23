import type { Invitation } from "@/types/invitation";
import type { Occasion } from "@/types/template";

export interface SampleInvitationSeed {
  groomName: string;
  brideName: string;
  title?: string;
  age?: number;
  weddingDate: string;
  weddingTime: string;
  location: string;
  message: string;
  events?: Invitation["events"];
}

/**
 * Realistic, occasion-appropriate sample data for template previews/thumbnails only.
 * Never used for real invitations - the customizer/backend always own real invitation data.
 */
const sampleByOccasion: Record<Occasion, SampleInvitationSeed> = {
  WEDDING: {
    groomName: "यश देशमुख",
    brideName: "वैष्णवी पाटील",
    weddingDate: "18 January 2027",
    weddingTime: "11:30 AM",
    location: "Pune, Maharashtra",
    message: "आमच्या आयुष्यातील या सुंदर क्षणाचा आनंद आपल्या उपस्थितीने द्विगुणित करावा.",
    events: [
      { id: "haldi", emoji: "\u{1F33C}", name: "हळदी समारंभ", date: "18 January 2027", time: "10:00 AM", venue: "पुणे", address: "" },
      { id: "vivah", emoji: "\u{1F48D}", name: "विवाह सोहळा", date: "19 January 2027", time: "10:30 AM", venue: "पुणे", address: "" },
    ],
  },
  ENGAGEMENT: {
    groomName: "Aarav Kulkarni",
    brideName: "Ananya Joshi",
    weddingDate: "18 January 2027",
    weddingTime: "6:00 PM",
    location: "Pune, Maharashtra",
    message: "Join us as we celebrate the beginning of our forever.",
  },
  BIRTHDAY: {
    groomName: "Riya",
    brideName: "",
    title: "Happy Birthday, Riya!",
    age: 25,
    weddingDate: "14 February 2027",
    weddingTime: "5:00 PM",
    location: "Kothrud, Pune",
    message: "Come celebrate with cake, music, and good company!",
  },
  BABY_SHOWER: {
    groomName: "Yash & Priya",
    brideName: "",
    title: "Celebrating Mom & Baby",
    weddingDate: "2 March 2027",
    weddingTime: "4:00 PM",
    location: "Pune, Maharashtra",
    message: "Shower our growing family with love and blessings.",
  },
  HOUSEWARMING: {
    groomName: "The Deshmukh Family",
    brideName: "",
    title: "The Deshmukh Family",
    weddingDate: "10 April 2027",
    weddingTime: "10:00 AM",
    location: "Baner, Pune",
    message: "With the blessings of our family, we invite you to celebrate our new home.",
  },
  ANNIVERSARY: {
    groomName: "Yash",
    brideName: "Priya",
    title: "Yash & Priya \u2014 5 Years",
    weddingDate: "18 January 2027",
    weddingTime: "7:00 PM",
    location: "Pune, Maharashtra",
    message: "Celebrating five wonderful years together.",
  },
  PUJA: {
    groomName: "",
    brideName: "",
    title: "\u0936\u094d\u0930\u0940 \u0917\u0923\u0947\u0936 \u092a\u0942\u091c\u093e",
    weddingDate: "5 September 2027",
    weddingTime: "9:00 AM",
    location: "Pune, Maharashtra",
    message: "\u0906\u092a\u0932\u094d\u092f\u093e \u0909\u092a\u0938\u094d\u0925\u093f\u0924\u0940\u0928\u0947 \u092a\u0942\u091c\u0947\u091a\u0940 \u0936\u094b\u092d\u093e \u0935\u093e\u0922\u0935\u093e\u0935\u0940.",
  },
  OTHER: {
    groomName: "The Deshmukh Family",
    brideName: "",
    title: "Join The Celebration",
    weddingDate: "20 December 2027",
    weddingTime: "6:00 PM",
    location: "Pune, Maharashtra",
    message: "An evening of joy, food, and togetherness.",
  },
};

export function getSampleSeed(occasion: Occasion): SampleInvitationSeed {
  return sampleByOccasion[occasion];
}
