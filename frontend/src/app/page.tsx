import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Hero from "@/components/home/Hero";
import OccasionGrid from "@/components/home/OccasionGrid";
import FeaturedTemplates from "@/components/templates/FeaturedTemplates";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSection from "@/components/home/TrustSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />
      <Hero />
      <OccasionGrid />
      <FeaturedTemplates />
      <HowItWorks />
      <TrustSection />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

