import type { Metadata } from "next";
import Navbar from "@/components/wedding/Navbar";
import Mangalacharan from "@/components/wedding/Mangalacharan";
import Hero from "@/components/wedding/Hero";
import Countdown from "@/components/wedding/Countdown";
import CoupleIntro from "@/components/wedding/CoupleIntro";
import OurStory from "@/components/wedding/OurStory";
import CeremonyTimeline from "@/components/wedding/CeremonyTimeline";
import CeremonySection from "@/components/wedding/CeremonySection";
import Venue from "@/components/wedding/Venue";
import Gallery from "@/components/wedding/Gallery";
import RSVP from "@/components/wedding/RSVP";
import FamilyInvitation from "@/components/wedding/FamilyInvitation";
import Blessing from "@/components/wedding/Blessing";
import PreviewActionBar from "@/components/occasion/PreviewActionBar";
import { translations } from "@/content/translations";

export const metadata: Metadata = { title: translations.mr.meta.title };

export default function WeddingTraditionalPage() {
  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <Navbar />
      <Mangalacharan />
      <Hero />
      <Countdown />
      <CoupleIntro />
      <OurStory />
      <CeremonyTimeline />
      <CeremonySection id="haldi" ceremonyKey="haldi" index={0} />
      <CeremonySection id="mehendi" ceremonyKey="mehendi" index={1} />
      <CeremonySection id="sangeet" ceremonyKey="sangeet" index={2} />
      <CeremonySection id="vivah" ceremonyKey="vivah" index={3} />
      <CeremonySection id="reception" ceremonyKey="reception" index={4} />
      <Venue />
      <Gallery />
      <RSVP />
      <FamilyInvitation />
      <Blessing />
      <PreviewActionBar backHref="/wedding" occasion="wedding" style="traditional" />
    </div>
  );
}
