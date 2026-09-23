"use client";

import { useLanguage } from "@/context/LanguageContext";

const steps = [
  {
    number: "01",
    en: { title: "Choose an Occasion", text: "Pick from weddings, birthdays, and more." },
    mr: { title: "सोहळा निवडा", text: "लग्न, वाढदिवस आणि बरेच काही निवडा." },
  },
  {
    number: "02",
    en: { title: "Pick Your Design", text: "Browse and preview beautiful templates." },
    mr: { title: "आपली रचना निवडा", text: "सुंदर टेम्प्लेट्स पहा आणि निवडा." },
  },
  {
    number: "03",
    en: { title: "Customize & Share", text: "Personalize it and share the link." },
    mr: { title: "सानुकूलित करा व शेअर करा", text: "आपल्या पद्धतीने सजवा आणि लिंक पाठवा." },
  },
];

export default function HowItWorks() {
  const { language } = useLanguage();

  return (
    <section id="how-it-works" className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-terracotta">
          {language === "mr" ? "कसे कार्य करते" : "How It Works"}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-wine sm:text-4xl">
          {language === "mr"
            ? "काही मिनिटांत कल्पनेपासून आमंत्रणापर्यंत."
            : "From idea to invitation in minutes."}
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <span className="font-serif text-5xl text-gold/50">{step.number}</span>
            <h3 className="mt-4 font-serif text-xl text-wine">
              {step[language].title}
            </h3>
            <p className="mt-2 font-body text-sm text-foreground/60">{step[language].text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
