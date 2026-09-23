import type { Metadata } from "next";
import { translations } from "@/content/translations";
import WeddingTemplateGrid from "@/components/occasion/WeddingTemplateGrid";

export const metadata: Metadata = { title: translations.mr.meta.title };

export default function WeddingListPage() {
  return <WeddingTemplateGrid />;
}

