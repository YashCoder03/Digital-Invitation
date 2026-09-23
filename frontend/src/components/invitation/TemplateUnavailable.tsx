export default function TemplateUnavailable() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-ivory px-6 py-24 text-center">
      <span className="text-4xl">🌸</span>
      <h1 className="font-serif text-3xl text-wine sm:text-4xl">Template unavailable</h1>
      <p className="mx-auto max-w-sm font-body text-foreground/60">
        Sorry, this invitation template is currently unavailable.
      </p>
      <a
        href="mailto:hello@shubhinvite.com"
        className="rounded-full bg-wine px-6 py-3 font-body text-sm uppercase tracking-widest text-cream transition-colors hover:bg-wine/90"
      >
        Contact ShubhInvite
      </a>
    </div>
  );
}
