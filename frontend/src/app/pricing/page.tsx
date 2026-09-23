"use client";

import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";

const tiers = [
  {
    id: "starter",
    price: "\u20B9499",
    en: { name: "Starter", tagline: "For a single celebration", features: ["1 invitation", "1 template style", "Unlimited RSVPs", "WhatsApp sharing link"] },
    mr: { name: "स्टार्टर", tagline: "एका सोहळ्यासाठी", features: ["१ आमंत्रण", "१ टेम्प्लेट शैली", "अमर्यादित RSVP", "व्हॉट्सअ‍ॅप शेअर लिंक"] },
  },
  {
    id: "celebration",
    price: "\u20B91,499",
    highlighted: true,
    en: { name: "Celebration", tagline: "Our most popular plan", features: ["Everything in Starter", "All template styles", "Custom colors & photos", "Guest gallery uploads"] },
    mr: { name: "सेलिब्रेशन", tagline: "सर्वाधिक लोकप्रिय योजना", features: ["स्टार्टरमधील सर्व काही", "सर्व टेम्प्लेट शैली", "सानुकूल रंग व फोटो", "पाहुण्यांचे फोटो अपलोड"] },
  },
  {
    id: "family",
    price: "\u20B92,999",
    en: { name: "Family", tagline: "For multi-event weddings", features: ["Everything in Celebration", "Up to 5 event pages", "Priority support", "Custom domain"] },
    mr: { name: "फॅमिली", tagline: "बहु-कार्यक्रम लग्नांसाठी", features: ["सेलिब्रेशनमधील सर्व काही", "५ कार्यक्रम पानांपर्यंत", "प्राधान्य सहाय्य", "सानुकूल डोमेन"] },
  },
];

export default function PricingPage() {
  const { language } = useLanguage();

  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <section className="px-6 pb-6 pt-16 text-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-terracotta">
          {language === "mr" ? "किंमत" : "Pricing"}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-wine sm:text-5xl">
          {language === "mr" ? "आपल्या सोहळ्यासाठी योग्य योजना" : "A plan for every celebration"}
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-6 px-6 py-14 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col rounded-2xl border px-6 py-8 text-center shadow-sm ${
              tier.highlighted ? "border-wine bg-cream shadow-lg" : "border-gold/30 bg-cream"
            }`}
          >
            <h2 className="font-serif text-xl text-wine">{tier[language].name}</h2>
            <p className="mt-1 font-body text-sm text-foreground/60">{tier[language].tagline}</p>
            <p className="mt-6 font-serif text-4xl text-wine">{tier.price}</p>
            <ul className="mt-6 flex-1 space-y-3 text-left">
              {tier[language].features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 font-body text-sm text-foreground/70">
                  <span className="text-sage">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="#occasions"
              className={`mt-8 rounded-full px-6 py-3 font-body text-sm uppercase tracking-widest transition-colors ${
                tier.highlighted
                  ? "bg-wine text-cream hover:bg-wine/90"
                  : "border border-wine/30 text-wine hover:bg-wine/5"
              }`}
            >
              {language === "mr" ? "निवडा" : "Choose Plan"}
            </Link>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
