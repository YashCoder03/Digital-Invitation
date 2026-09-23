# Copilot Instructions — ShubhInvite (Digital Invitation SaaS)

**Read [`PROJECT_STATE.md`](../PROJECT_STATE.md) at the repo root FIRST, before doing anything else.**
It is the single source of truth for architecture, routes, data layer, and decisions made so far.
Keep it up to date: whenever you make a non-trivial change (new route, new data field, new
component convention, new naming decision), update `PROJECT_STATE.md` in the same turn.

## What this project is
A frontend-only (no backend) Next.js prototype for a premium digital wedding invitation SaaS
called "ShubhInvite", focused on Maharashtrian Marathi weddings. TypeScript + Tailwind CSS v4,
App Router, `localStorage` for all persistence. See `PROJECT_STATE.md` for the full route map,
data layer (`src/lib/invitationStorage.ts`, `src/lib/rsvpStorage.ts`, `src/lib/invitationUtils.ts`),
and the `InvitationRenderer` architecture.

## Non-negotiable rules
- The bride is always **"Vaishnavi Patil" (वैष्णवी पाटील)**, groom is **"Yash Deshmukh" (यश देशमुख)**.
  Never introduce "Priya" or other placeholder bride names anywhere in this repo.
- Marathi (`mr`) is the default language app-wide (`src/context/LanguageContext.tsx`).
- Never write `\uXXXX` / `\u{XXXXX}` escapes as raw JSX text (e.g. `<p>\u0950</p>`) — that only
  works inside a quoted JS string. Type the literal Devanagari/emoji character directly in JSX.
- Never apply `uppercase` or wide `tracking-*` classes directly to Devanagari text — it breaks
  conjuncts/matras. The `.lang-mr` rule in `src/app/globals.css` already neutralizes this globally.
- Do NOT create a second/duplicate invitation rendering UI. Any wedding/occasion invitation
  preview (customizer, publish screen, public page) must go through
  `src/components/invitation/InvitationRenderer.tsx` and its shared section components.
- Do NOT add a real backend, database, auth, payments, or external APIs (Cloudinary, Razorpay,
  etc.) unless explicitly asked. Keep all persistence in the isolated `src/lib/*Storage.ts` files
  so a real backend can swap in later without touching components.

## Before you start any task
1. Read `PROJECT_STATE.md`.
2. Check `/memories/repo/frontend-notes.md` (agent memory) for additional working notes.
3. Grep for relevant existing components/content before creating new files — this codebase reuses
   a small set of design-token colors, motif SVGs, and shared invitation section components
   extensively; avoid re-implementing what already exists.

## Verifying changes
- `get_errors` can report a stale "Cannot find module" false positive right after creating a new
  file. Confirm with `npx tsc --noEmit -p tsconfig.json` before treating it as a real error.
- After any non-trivial UI change, prefer a quick browser check (the dev server usually runs on
  `http://localhost:3000`) over assuming the change looks correct.
