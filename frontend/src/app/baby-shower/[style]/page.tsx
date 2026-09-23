import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OccasionNavbar from "@/components/occasion/OccasionNavbar";
import OccasionTemplate from "@/components/occasion/OccasionTemplate";
import PreviewActionBar from "@/components/occasion/PreviewActionBar";
import { occasionTemplates } from "@/content/occasionTemplates";
import { templateStyles } from "@/content/templateStyles";

export function generateStaticParams() {
  return templateStyles.map((style) => ({ style: style.id }));
}

export const metadata: Metadata = { title: occasionTemplates.babyshower.mr.meta.title };

export default async function BabyShowerStylePage(props: PageProps<"/baby-shower/[style]">) {
  const { style } = await props.params;
  const match = templateStyles.find((s) => s.id === style);
  if (!match) notFound();

  return (
    <>
      <OccasionNavbar backHref="/baby-shower" />
      <OccasionTemplate occasionId="babyshower" accent={match.id} icon="lotus" />
      <PreviewActionBar backHref="/baby-shower" occasion="baby-shower" style={match.id} />
    </>
  );
}
