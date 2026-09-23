import type { Metadata } from "next";
import OccasionTemplateList from "@/components/occasion/OccasionTemplateList";
import { occasionCards } from "@/content/occasions";

const card = occasionCards.find((c) => c.id === "religious")!;

export const metadata: Metadata = { title: card.title.mr };

export default function ReligiousListPage() {
  return (
    <OccasionTemplateList
      route={card.route}
      icon={card.icon}
      heading={card.title}
      subheading={card.description}
    />
  );
}
