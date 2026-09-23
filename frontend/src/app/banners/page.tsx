import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { occasionPages } from "@/data/occasionPages";

export const metadata = { title: "Banners | ShubhInvite" };

export default function BannersLandingPage() {
  return (
    <div className="flex flex-1 flex-col bg-ivory">
      <SiteHeader />

      <section className="px-6 pb-4 pt-16 text-center">
        <h1 className="font-serif text-4xl text-wine sm:text-5xl">Create a banner for every occasion</h1>
        <p className="mx-auto mt-3 max-w-md font-body text-foreground/60">
          Share your special moments everywhere with a banner designed to match your invitation.
        </p>
      </section>

      <section className="mx-auto mt-10 grid w-full max-w-5xl gap-5 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {occasionPages.map((page) => (
          <Link
            key={page.slug}
            href={`/banners/${page.slug}`}
            className="group flex flex-col items-center rounded-2xl border border-gold/20 bg-cream px-6 py-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <span className="text-4xl" aria-hidden="true">
              {page.emoji}
            </span>
            <h3 className="mt-4 font-serif text-xl text-wine">{page.heading.replace(" Invitations", "")}</h3>
            <span className="mt-4 font-body text-xs uppercase tracking-widest text-foreground/40 transition-colors group-hover:text-wine">
              Browse Banners →
            </span>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
