# ShubhInvite — Project State (read this first after any chat compaction)

Digital invitation SaaS (frontend-only prototype), focused initially on Maharashtrian Marathi
weddings. Next.js 16 App Router, TypeScript, Tailwind CSS v4. No backend, no auth, no database,
no payments — everything is mock/local state or `localStorage`, structured so a real backend
(e.g. Spring Boot) can replace the storage layer later without touching UI code.

## Golden rules for this project
- **Bride name is always "Vaishnavi Patil" (वैष्णवी पाटील)** — groom is "Yash Deshmukh" (यश देशमुख).
  Never reintroduce "Priya" anywhere (grep for `प्रिया|Priya` before adding new sample content).
- Marathi (मर) is the **default language** everywhere (`LanguageContext` defaults to `"mr"`).
- Never put `\uXXXX` escapes as raw JSX text — only valid inside quoted strings. Type the literal
  Devanagari/emoji character directly in JSX.
- Never apply `uppercase` or wide `tracking-*` to Devanagari text directly — it breaks
  conjuncts/matras. The `.lang-mr` class in `globals.css` already neutralizes this automatically.
- `get_errors` can show a stale "Cannot find module" false positive for a just-created file.
  Verify with `npx tsc --noEmit` before treating it as real.

## Full user flow (all working, browser-tested)
```
Homepage (/)
  → "What's the Occasion?" grid (8 cards, Wedding highlighted "Marathi Wedding")
  → /{occasion}  — template browse/list page (filters: All/Traditional/Modern/Minimal/Luxury/Floral/Marathi)
  → /{occasion}/[style]  — full-page live sample preview + sticky "Use This Template" bar
  → /customize?occasion=X&style=Y  — 5-step editor (Couple/Events/Photos/Style/Details) + live preview
  → /publish/[invitationId]  — summary + "Ready to share?" → Publish → success state
  → /invite/[slug]  — public guest-facing invitation (zero SaaS chrome)
       → RSVP (stored in localStorage), photo lightbox, WhatsApp share, Copy Link, Maps link
```

## Route map
| Route | Purpose |
|---|---|
| `/` | Marketing homepage (Hero, Occasion grid, How It Works, Trust, Final CTA) |
| `/wedding`, `/birthday`, `/engagement`, `/housewarming`, `/baby-shower`, `/anniversary`, `/religious`, `/celebration` | Template browse/list page per occasion |
| `/wedding/traditional` | The one fully-built wedding sample (rich 17-section design). Other 5 wedding "named templates" (Royal Marathi, Paithani Elegance, Modern Marathi, Floral Marathi, Minimal Maharashtrian) show as disabled "Coming Soon" cards on `/wedding`. |
| `/{other-occasion}/[style]` | Generic `OccasionTemplate` renderer, `style` = one of `gold\|red\|sage\|blush\|maroon\|terracotta` |
| `/customize` | The real 5-step invitation editor (`?occasion=&style=`) |
| `/publish/[invitationId]` | Pre-publish summary + publish action + success state |
| `/invite/[slug]` | Public guest-facing invitation page |
| `/pricing`, `/login` | Static marketing pages (non-functional forms) |

## Data layer (frontend-only, backend-ready)
- `src/types/invitation.ts` — canonical `Invitation` model (single source of truth for the public
  invitation and publish screen).
- `src/lib/invitationStorage.ts` — localStorage CRUD: `saveInvitation`, `getInvitation`,
  `updateInvitation`, `publishInvitation`, `getInvitationBySlug`, `getPublishedInvitation`,
  `ensureInvitation`. Storage key: `shubhinvite:invitations`.
- `src/lib/rsvpStorage.ts` — separate store for guest RSVP entries + per-invitation
  "already submitted" flag. Storage keys: `shubhinvite:rsvps`, `shubhinvite:rsvp-submitted:*`.
- `src/lib/invitationUtils.ts` — `generateSlug` (falls back to `${occasion}-${style}` for
  Devanagari names; has a tiny known-name lookup so "यश"/"वैष्णवी" still slugify to
  `yash-vaishnavi`), `buildMapsUrl`, `getShareableUrl` (real origin, functional)/`getDisplayUrl`
  (fake `shubhinvite.com` branding text), `buildWhatsAppMessage`/`buildWhatsAppShareUrl`,
  `customizerStateToInvitation`/`invitationToCustomizerState` converters.
- `src/content/customizer.ts` — the customizer's editing-friendly `CustomizerState` shape +
  `defaultCustomizerState` (this is what seeds a brand-new invitation).
- Invitation id convention: `${occasion}-${style}` (e.g. `wedding-traditional`) — one draft per
  template instance, no multi-user/auth in this prototype.

## Invitation rendering (one renderer, no duplication)
- `src/components/invitation/InvitationRenderer.tsx` switches on `invitation.templateId`
  (`"traditional" | "paithani" | "modern"`) to `TraditionalMarathi` / `PaithaniElegance` /
  `ModernMarathi` — each is a thin wrapper that wires a `theme` (see `theme.ts`) into the SAME
  shared section components: `InvitationHero`, `Countdown`, `WeddingMessage`, `EventTimeline`,
  `VenueSection`, `PhotoGallery` (with lightbox), `RSVPSection`, `ContactSection`,
  `InvitationFooter`, `MusicControl`.
- `InvitationPreviewFrame.tsx` = the rounded phone-ish frame wrapper, reused by both the
  customizer's `LivePreview` and the publish screen's preview panel.
- **This InvitationRenderer is used in three places**: customizer live preview, publish screen
  preview, and the public `/invite/[slug]` page. Do not create a second/duplicate invitation UI.

## Design system
- Colors (Tailwind tokens in `globals.css` under `@theme inline`): `ivory`, `cream`, `saffron`,
  `red`, `maroon`, `gold`, `sage`, `blush`, `wine`, `terracotta`.
- Fonts: `--font-serif`/`--font-script` (Latin), `--font-devanagari` (Noto Sans Devanagari, body),
  `--font-devanagari-serif` (Noto Serif Devanagari, headings) — switched via `.lang-mr` class.
- Motifs (`src/components/wedding/motifs/`): `Kalash`, `Diya`, `LotusIcon`, `ToranStrip`,
  `PeacockFeather`, `OrnamentalDivider`, `PaithaniFrame` — reused across wedding components,
  occasion templates, and invitation sections.
- Entrance animation: `@utility animate-invite-fade-up` in `globals.css`, applied via
  `motion-safe:` variant (auto-respects `prefers-reduced-motion`).
- ShubhInvite brand: `src/content/brand.ts`, logo `src/components/site/Logo.tsx`,
  `SiteHeader`/`SiteFooter` used only on marketing pages (home, pricing, login, publish).

## Explicitly out of scope (do not add unless asked)
Spring Boot / Node / NestJS backend, PostgreSQL/MongoDB, authentication, real REST APIs,
Cloudinary, Razorpay/payments, real email/SMS. The "Publishing"/"Customization" placeholder
pages that used to exist have been replaced by the real flow above — there is no more
`ComingSoonNotice` component or `/publish` (bare) route.

## Known cosmetic limitations (acceptable for this mock)
- Uploaded photos use `URL.createObjectURL` — they do NOT survive a full page reload (blob URLs
  die on unload). This is expected without real file storage/Cloudinary.
- `generateSlug` only romanizes a handful of known names; anything else falls back to the
  `occasion-style` id as the slug.
- Music control renders only if `invitation.music?.enabled`, but there's no real audio file
  wired up by default (mock toggle only).
