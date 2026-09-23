"use client";

import { useLanguage } from "@/context/LanguageContext";

const checklist = [
  { en: "WhatsApp sharing", mr: "व्हॉट्सअ‍ॅपवर शेअर करा" },
  { en: "Mobile-friendly invitations", mr: "मोबाईल-अनुकूल आमंत्रणे" },
  { en: "Easy RSVP", mr: "सोपी उपस्थिती नोंदणी" },
  { en: "Beautiful templates", mr: "सुंदर टेम्प्लेट्स" },
  { en: "Personalized designs", mr: "सानुकूलित रचना" },
];

export default function TrustSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-ivory px-6 py-20 text-center">
      <p className="font-body text-sm uppercase tracking-[0.3em] text-terracotta">
        {language === "mr" ? "आमच्यावर विश्वास ठेवा" : "Trusted &amp; Loved"}
      </p>
      <h2 className="mt-3 font-serif text-3xl text-wine sm:text-4xl">
        {language === "mr"
          ? "महत्त्वाच्या सोहळ्यांसाठी बनवलेले."
          : "Made for celebrations that matter."}
      </h2>

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-4">
        {checklist.map((item) => (
          <span
            key={item.en}
            className="flex items-center gap-2 rounded-full border border-sage/30 bg-cream px-4 py-2 font-body text-sm text-foreground/70"
          >
            <span className="text-sage">✓</span>
            {item[language]}
          </span>
        ))}
      </div>
    </section>
  );
}
