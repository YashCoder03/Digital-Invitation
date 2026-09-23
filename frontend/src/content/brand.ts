import type { Language } from "./translations";

export const brand = {
  name: "ShubhInvite",
  tagline: {
    en: "Your Special Moments, Beautifully Invited.",
    mr: "\u0906\u092a\u0932\u094d\u092f\u093e \u0916\u093e\u0938 \u0915\u094d\u0937\u0923\u093e\u0902\u0938\u093e\u0920\u0940, \u0938\u0941\u0902\u0926\u0930 \u0906\u092e\u0902\u0924\u094d\u0930\u0923.",
  },
} satisfies { name: string; tagline: Record<Language, string> };

export const navLinks: { href: string; label: Record<Language, string> }[] = [
  { href: "/#templates", label: { en: "Templates", mr: "टेम्प्लेट्स" } },
  { href: "/#occasions", label: { en: "Occasions", mr: "प्रसंग" } },
  { href: "/banners", label: { en: "Banners", mr: "बॅनर्स" } },
  { href: "/#how-it-works", label: { en: "How It Works", mr: "कसे कार्य करते" } },
  // { href: "/pricing", label: { en: "Pricing", mr: "किंमत" } },
  { href: "/login", label: { en: "Login", mr: "लॉगिन" } },
];

export const nav = {
  cta: { en: "Create Invitation", mr: "आमंत्रण तयार करा" },
};
