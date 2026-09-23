# ShubhInvite Frontend

Next.js (App Router) frontend for **ShubhInvite**, connected to the Spring Boot + PostgreSQL +
Cloudinary backend in [`../backend`](../backend).

## Requirements

- Node.js 20+
- The backend running locally (see [`../backend/README.md`](../backend/README.md)) with
  PostgreSQL and Cloudinary configured

## Configuration

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

This is the only environment variable the frontend needs. Never put backend secrets
(JWT secret, Cloudinary API secret, database credentials) behind a `NEXT_PUBLIC_*` variable -
those stay server-side in the Spring Boot app.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build       # production build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
```

## End-to-end flow to verify everything works

1. Start PostgreSQL, then the Spring Boot backend (`cd ../backend && mvn spring-boot:run -Dspring-boot.run.profiles=local`).
2. Start this frontend (`npm run dev`).
3. Open `http://localhost:3000`, click **Register**, create an account, and log in.
4. Choose **Marathi Wedding** → pick a template → the customizer opens and creates a draft
   invitation on the backend automatically.
5. Edit the Couple/Events/Style/Details steps - changes autosave (debounced) with a
   "Saving… / ✓ Saved" indicator.
6. On the **Photos** step, upload a couple photo, several gallery photos, and family photos.
   Uploads happen immediately (not part of autosave) and show per-image progress; try
   **Replace**, **Remove**, and reordering with the ↑/↓ buttons.
7. Add wedding events, then click **Continue to Publish** and **Publish Invitation**.
8. Open the returned `/invite/{slug}` link - verify photos, events, and the RSVP form render,
   then submit an RSVP.
9. Go to **Dashboard → My Invitations**, open the invitation's **RSVPs** page, and confirm the
   response appears with correct totals.
10. Refresh the browser at every step above - everything (invitation data, events, photos,
    RSVPs) should reload from the backend, not disappear.

## Project structure (API integration)

```
src/lib/
  config.ts            NEXT_PUBLIC_API_URL - the only place the backend URL is read from
  api/
    client.ts           Centralized fetch wrapper: JWT header, JSON parsing, error handling
    auth.ts             register/login/logout/getCurrentUser
    invitations.ts       Invitation CRUD + publish + public lookup
    events.ts           Event CRUD + reorder
    photos.ts           Photo upload/list/delete/reorder (multipart)
    rsvp.ts             Public RSVP submit + owner RSVP summary
    types.ts            TypeScript mirrors of backend DTOs
  auth/tokenStorage.ts   Isolates JWT storage (no scattered localStorage calls)
  mappers/
    invitationMapper.ts  Backend DTO <-> canonical Invitation model (incl. date/time formats)
    eventMapper.ts       Backend DTO <-> WeddingEventItem
src/context/
  AuthContext.tsx        Current user, login/register/logout, centralized 401 handling
```

The Spring Boot backend is Phase 1 **wedding-only**. Other occasions (birthday, engagement,
etc.) keep using the original localStorage prototype untouched - `CustomizerShell` and the
public invitation page detect which occasion/id they're dealing with and route to the right
storage automatically.

