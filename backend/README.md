# ShubhInvite Backend

Phase 1 backend for **ShubhInvite** - a digital invitation platform. This is a clean, modular
Spring Boot monolith that exposes a REST API for the existing Next.js frontend.

Scope of this phase: **Authentication + Invitation CRUD + Events + Publishing + Public
Invitation + RSVP + Photo Uploads (Cloudinary)**.

## Tech stack

- Java 21
- Spring Boot 3.3 (Web, Data JPA, Security, Validation)
- PostgreSQL + Flyway migrations
- JWT authentication (`jjwt`), BCrypt password hashing
- Cloudinary (image storage/CDN/transformations) - PostgreSQL stores only URLs + metadata, never binaries
- springdoc-openapi (Swagger UI)
- Lombok
- JUnit 5 + MockMvc + H2 (tests only)

No microservices, Kafka, Redis, Docker/Kubernetes, GraphQL, MongoDB, or Node.js backend code
are used - this is intentionally a single deployable Spring Boot application.

## Project layout

```
src/main/java/com/shubhinvite/
  config/          Security, CORS, OpenAPI configuration
  security/        JWT issuing/parsing, auth filter, SecurityUtils
  auth/            Register/login controller, service, DTOs
  user/            User entity + repository
  invitation/       Invitation CRUD, publish, slug generation, public lookup
  event/           Wedding event schedule (Haldi, Sangeet, ...) CRUD + reorder
  photo/           Photo upload/list/delete/reorder via Cloudinary
  guest/           Guest entity/repository (reserved for a future guest-list API)
  rsvp/            Public RSVP submission + owner-only RSVP summary
  common/
    exception/     Domain exceptions + @RestControllerAdvice
    response/      Shared error response shapes
src/main/resources/
  application.yml, application-local.yml
  db/migration/    Flyway scripts V1..V6
```

## Requirements

- JDK 21
- PostgreSQL 14+ running locally (or reachable via `DATABASE_URL`)
- Maven 3.9+ (or use your IDE's bundled Maven)

## Database setup

Create a local database:

```sql
CREATE DATABASE shubhinvite;
```

Flyway runs automatically on application startup and creates all tables
(`users`, `invitations`, `events`, `guests`, `rsvp_responses`, `invitation_photos`) from
`src/main/resources/db/migration`. No manual migration step is required beyond having
an empty database and correct credentials.

## Cloudinary setup

Create a free account at [cloudinary.com](https://cloudinary.com) and copy the **Cloud name**,
**API Key**, and **API Secret** from your dashboard into `CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. No bucket/folder setup is required - the
app creates folders like `shubhinvite/invitations/{invitationId}/{couple|gallery|family}/`
automatically on first upload. `CLOUDINARY_API_SECRET` must never be sent to the frontend or
prefixed with `NEXT_PUBLIC_`.

## Environment variables

Copy `.env.example` to `.env` (or export the same variables in your shell) before running
locally. Spring Boot does not read `.env` files automatically - either export the variables,
or run with `SPRING_PROFILES_ACTIVE=local`, which supplies safe **development-only** defaults
via `application-local.yml`.

| Variable                | Purpose                                   | Example                                        |
|--------------------------|--------------------------------------------|-------------------------------------------------|
| `DATABASE_URL`          | JDBC URL                                  | `jdbc:postgresql://localhost:5432/shubhinvite`   |
| `DATABASE_USERNAME`     | DB user                                   | `postgres`                                       |
| `DATABASE_PASSWORD`     | DB password                               | `postgres`                                       |
| `JWT_SECRET`            | HMAC secret used to sign JWTs (32+ chars) | *(generate a long random string)*                |
| `JWT_EXPIRATION`        | Token lifetime in milliseconds            | `86400000` (24h)                                 |
| `CORS_ALLOWED_ORIGINS`  | Comma-separated allowed origins           | `http://localhost:3000`                          |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                     | `your-cloud-name`                                |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                        | `123456789012345`                                |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (server-only, never sent to the frontend) | *(from your Cloudinary dashboard)* |
| `SERVER_PORT`           | HTTP port                                 | `8080`                                           |

Never commit real secrets. `JWT_SECRET` in particular must be changed for any non-local
environment.

## Running the backend

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

Or, with environment variables exported yourself (no profile needed):

```bash
mvn spring-boot:run
```

The API starts on `http://localhost:8080`.

## API documentation (Swagger)

Once running:

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

Protected endpoints require an `Authorization: Bearer <token>` header - use the "Authorize"
button in Swagger UI after logging in.

## Running tests

```bash
cd backend
mvn test
```

Tests run against an in-memory H2 database (PostgreSQL-compatibility mode) with a separate
`test` Spring profile - no real PostgreSQL instance is required to run the test suite.

## API quick reference

All request/response bodies are JSON. Timestamps are ISO-8601 UTC.

### Auth (public)

```
POST /api/auth/register
{ "name": "Yash Deshmukh", "email": "yash@example.com", "password": "password123" }
→ 201 { "token": "...", "user": { "id": "...", "name": "...", "email": "..." } }

POST /api/auth/login
{ "email": "yash@example.com", "password": "password123" }
→ 200 { "token": "...", "user": { ... } }
```

### Invitations (require `Authorization: Bearer <token>`)

```
POST   /api/invitations                 create a draft invitation
GET    /api/invitations                 list your invitations
GET    /api/invitations/{id}            get one of your invitations
PUT    /api/invitations/{id}            update your invitation
DELETE /api/invitations/{id}            delete your invitation
POST   /api/invitations/{id}/publish    DRAFT -> PUBLISHED, returns slug + publicUrl
```

Create example:

```json
{
  "templateId": "paithani-elegance",
  "groomName": "Yash Deshmukh",
  "brideName": "Priya Patil",
  "weddingDate": "2027-01-18",
  "weddingTime": "11:30",
  "location": "Pune, Maharashtra",
  "message": "आमच्या आयुष्यातील या सुंदर सोहळ्यास आपण आवर्जून उपस्थित राहावे."
}
```

Slugs are generated server-side from the groom/bride first names (e.g. `yash-priya`, then
`yash-priya-2`, `yash-priya-3`, ...) and are unique at the database level. The frontend
cannot set or override a slug.

### Events (require auth; invitation ownership is always verified)

```
POST   /api/invitations/{invitationId}/events            add an event
GET    /api/invitations/{invitationId}/events             list events
PUT    /api/events/{eventId}                              update an event
DELETE /api/events/{eventId}                               delete an event
PATCH  /api/invitations/{invitationId}/events/reorder      { "eventIds": ["uuid-1", "uuid-2"] }
```

Event `type` is one of: `HALDI`, `MEHENDI`, `SANGEET`, `WEDDING`, `RECEPTION`,
`GRUHPAVESH`, `CUSTOM`.

### Photos (require auth; invitation ownership is always verified)

```
POST   /api/invitations/{invitationId}/photos            multipart/form-data: file, type
GET    /api/invitations/{invitationId}/photos             list photos
DELETE /api/photos/{photoId}                               delete a photo (and its Cloudinary asset)
PATCH  /api/invitations/{invitationId}/photos/reorder      { "photoIds": ["uuid-1", "uuid-2"] }
```

Photo `type` is one of `COUPLE` (max 1, uploading again replaces it), `GALLERY` (max 20),
`FAMILY` (max 5) - limits are configurable via `app.photos.limits.*`. Only `image/jpeg`,
`image/png`, and `image/webp` are accepted (validated by both declared content-type and the
file's actual magic bytes), up to 10 MB. Returned URLs are Cloudinary-transformed
(`w_1600,c_limit,q_auto,f_auto`) for fast mobile loading - PostgreSQL only stores the Cloudinary
`publicId` and the original `secure_url`, never image bytes.

### Public invitation + RSVP (no authentication)

```
GET  /api/invitations/public/{slug}
→ 200 { templateId, groomName, brideName, weddingDate, weddingTime, location,
        message, events: [...], venue, contacts: [],
        photos: [{ url, type, displayOrder }, ...], rsvp: { enabled } }
→ 404 if the slug doesn't exist or the invitation isn't published

POST /api/invitations/public/{slug}/rsvp
{ "guestName": "Rahul Sharma", "attending": true, "guestCount": 2 }
→ 200 { "success": true, "message": "RSVP submitted successfully" }
```

### Owner RSVP summary (requires auth + ownership)

```
GET /api/invitations/{invitationId}/rsvps
→ 200 { totalResponses, attending, notAttending, totalGuests, responses: [...] }
```

## Error format

Validation errors (HTTP 400):

```json
{ "status": 400, "message": "Validation failed", "errors": { "brideName": "Bride name is required" } }
```

All other errors (404 / 401 / 403 / 409 / 500):

```json
{ "success": false, "message": "Invitation not found" }
```

Stack traces are never returned to clients; unexpected errors are logged server-side and
returned as a generic 500 message.

## Connecting the Next.js frontend

The frontend currently persists everything through `localStorage`
(`src/lib/invitationStorage.ts`, `src/lib/rsvpStorage.ts`). To move to this backend, replace
the bodies of those functions with `fetch` calls - the public component APIs (`Invitation`
type, function names) can stay the same so the UI components don't need to change.

| Current frontend function                          | Future API call                                   |
|-------------------------------------------------------|-------------------------------------------------------|
| `saveInvitation()`                                  | `POST /api/invitations`                              |
| `getInvitation(id)`                                 | `GET /api/invitations/{id}`                          |
| `updateInvitation(id, patch)`                       | `PUT /api/invitations/{id}`                          |
| `publishInvitation(id)`                              | `POST /api/invitations/{id}/publish`                  |
| (public invitation page data load)                  | `GET /api/invitations/public/{slug}`                  |
| `submitRsvp(invitationId, entry)`                    | `POST /api/invitations/public/{slug}/rsvp`            |
| `getRsvps(invitationId)`                             | `GET /api/invitations/{invitationId}/rsvps` (owner)   |
| register/login forms                                 | `POST /api/auth/register`, `POST /api/auth/login`     |

Store the JWT returned by register/login (e.g. in memory + an httpOnly-friendly storage
strategy of your choice) and send it as `Authorization: Bearer <token>` on every request to
a protected endpoint. Never send a user id from the client - the backend always derives the
authenticated user from the JWT.

CORS is centralized in `config/CorsConfig.java` and controlled by `CORS_ALLOWED_ORIGINS`;
it already allows `http://localhost:3000` for local development.
