# Indian (Maharashtrian) Wedding Invitation Template

A premium, mobile-first digital wedding invitation styled as a modern Marathi "Lagna Patrika" — with Marathi (Devanagari) as the primary language, a saffron/maroon/gold palette, and traditional motifs (kalash, toran, diya, lotus, peacock feather, Paithani-inspired borders).

## Sections (in order)

1. **Mangalacharan** — `॥ श्री गणेशाय नमः ॥` opening with kalash + toran
2. **Hero** — groom & bride names, date, venue
3. **Countdown** — live countdown to the muhurat
4. **Couple Intro** — groom/bride profile cards with parents' names
5. **Our Story** — relationship milestones timeline
6. **Ceremony Timeline** — quick stepper overview of all events
7. **Haldi / Mehendi / Sangeet / Wedding Ceremony / Reception** — one dedicated section each, alternating layout
8. **Venue** — address + "Get Directions" (opens Google Maps)
9. **Gallery** — photo placeholders in Paithani-style frames
10. **RSVP** — interactive form
11. **Family Invitation** — formal invitation message from both families
12. **Blessing** — closing shloka and farewell

## File map

| File | Purpose |
|---|---|
| [src/content/translations.ts](src/content/translations.ts) | All English + Marathi copy for every section. Edit this to change wording. |
| [src/content/config.ts](src/content/config.ts) | `WEDDING_DATE_ISO` (countdown target) and `VENUE_MAP_QUERY` (used to build the Google Maps directions link). |
| [src/context/LanguageContext.tsx](src/context/LanguageContext.tsx) | Language state (`en`/`mr`, defaults to `mr`), persisted in `localStorage`. |
| [src/components/wedding/motifs/](src/components/wedding/motifs) | Decorative SVG components: `Kalash`, `Diya`, `LotusIcon`, `PeacockFeather`, `ToranStrip`, `OrnamentalDivider`, `PaithaniFrame`. |
| [src/components/wedding/](src/components/wedding) | Page sections: `Navbar`, `Mangalacharan`, `Hero`, `Countdown`, `CoupleIntro`, `OurStory`, `CeremonyTimeline`, `CeremonySection` (reusable, driven by a `ceremonyKey`), `Venue`, `Gallery`, `RSVP`, `FamilyInvitation`, `Blessing`. |

## Customizing

- **Names, dates, venues, ceremony details:** edit [translations.ts](src/content/translations.ts) for both `en` and `mr`.
- **Wedding date/time (countdown):** update `WEDDING_DATE_ISO` in [config.ts](src/content/config.ts).
- **Venue / map:** update `VENUE_MAP_QUERY` in [config.ts](src/content/config.ts) and the `venue` fields in translations.
- **Add/remove a ceremony:** `CeremonySection` is data-driven — add a new key to `ceremonies` in translations, then render `<CeremonySection ceremonyKey="..." index={n} />` in [page.tsx](src/app/page.tsx).
- **Photos:** replace the gradient placeholders in [Gallery.tsx](src/components/wedding/Gallery.tsx) with `next/image`.
- **Colors:** palette tokens (`saffron`, `red`, `maroon`, `gold`, `ivory`, `cream`) live in [globals.css](src/app/globals.css).
- **RSVP submissions:** currently client-side only (see the `TODO` in [RSVP.tsx](src/components/wedding/RSVP.tsx)) — wire it to an API route or email service to actually collect responses.

## Marathi typography notes

- Marathi text uses **Noto Sans Devanagari** (body) and **Noto Serif Devanagari** (headings/script), applied automatically via the `.lang-mr` class when the language is set to Marathi.
- Wide letter-spacing (`tracking-*`) and `uppercase` are neutralized for Marathi text in [globals.css](src/app/globals.css) — these break Devanagari conjuncts/matras and should never be applied to Devanagari copy.

## Adding another language

1. Add a new key (e.g. `"hi"`) to the `Language` type and `translations` object in [translations.ts](src/content/translations.ts).
2. Add a matching button in `LanguageToggle` inside [Navbar.tsx](src/components/wedding/Navbar.tsx).
3. Reuse `--font-devanagari` / `--font-devanagari-serif` for other Devanagari-script languages, or add a new Google Font in [layout.tsx](src/app/layout.tsx) plus a `.lang-xx` override in [globals.css](src/app/globals.css).

