import { getDisplayUrl } from "@/lib/invitationUtils";

export default function PublishActions({
  slug,
  publishing,
  onPublish,
}: {
  slug: string;
  publishing: boolean;
  onPublish: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-cream p-6 text-center sm:p-8">
      <h2 className="font-serif text-2xl text-wine">Ready to share?</h2>
      <p className="mx-auto mt-2 max-w-sm font-body text-sm text-foreground/60">
        Publish your invitation and get a unique link that you can share with family and friends.
      </p>

      <p className="mx-auto mt-5 w-fit rounded-full border border-gold/30 bg-ivory px-5 py-2.5 font-body text-sm text-wine">
        {getDisplayUrl(slug)}
      </p>

      <button
        type="button"
        onClick={onPublish}
        disabled={publishing}
        className="mt-6 w-full rounded-full bg-wine px-8 py-3.5 font-body text-sm uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90 disabled:opacity-70"
      >
        {publishing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cream" />
            Creating your invitation…
          </span>
        ) : (
          "Publish Invitation"
        )}
      </button>
    </div>
  );
}
