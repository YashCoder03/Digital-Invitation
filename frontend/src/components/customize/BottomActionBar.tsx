export default function BottomActionBar({
  onPreview,
  onPublish,
}: {
  onPreview: () => void;
  onPublish: () => void;
}) {
  return (
    <div className="border-t border-gold/20 bg-cream px-6 py-8 text-center">
      <p className="font-serif text-lg text-wine">Your invitation is looking beautiful!</p>
      <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPreview}
          className="w-full rounded-full border border-wine/30 px-6 py-3 font-body text-sm uppercase tracking-widest text-wine transition-colors hover:bg-wine/5 sm:w-auto"
        >
          Preview Invitation
        </button>
        <button
          type="button"
          onClick={onPublish}
          className="w-full rounded-full bg-wine px-8 py-3 font-body text-sm uppercase tracking-widest text-cream shadow-sm transition-colors hover:bg-wine/90 sm:w-auto"
        >
          Continue to Publish
        </button>
      </div>
    </div>
  );
}
