import Link from "next/link";
import Kalash from "@/components/wedding/motifs/Kalash";

export default function InvitationNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-ivory px-6 py-24 text-center">
      <Kalash className="h-14 w-14 text-maroon/60" />
      <h1 className="mt-6 font-serif text-3xl text-wine sm:text-4xl">Invitation not found</h1>
      <p className="mx-auto mt-3 max-w-sm font-body text-foreground/60">
        Sorry, this invitation may have been removed or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
      >
        Go to ShubhInvite
      </Link>
    </div>
  );
}
