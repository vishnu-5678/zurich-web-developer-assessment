# Zurich Web Developer Assessment

A secure Next.js implementation of the Zurich Web Developer take-home assessment.

## Architecture

```text
Browser
  │
  ├── Google OAuth ──> Auth.js session
  │
  └── /users ──> Next.js server
                    │
                    ├── authenticated API route
                    ├── fetch every ReqRes page
                    ├── filter first name G OR last name W
                    └── return only matching users

Email reveal
  Browser ──> authenticated /api/users/:id/email
                    │
                    └── server fetches upstream email
```

The browser never calls ReqRes directly and never performs the assessment's business filtering. Upstream access and filtering live on the server boundary.

## Requirements covered

- Next.js App Router
- Google OAuth authentication
- Protected users route and APIs
- Redux Toolkit application state
- Reusable, configurable Header and Footer
- Complete traversal of ReqRes pagination
- Case-insensitive first-name `G` / last-name `W` filter on the server
- Privacy-first masked email display with authenticated reveal request
- Unit tests for filtering and Redux state transitions

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, and `AUTH_URL`.
4. Set `REQRES_API_KEY` when required by the current ReqRes environment. ReqRes currently documents `x-api-key` as required for requests; leaving it unset lets the application remain compatible with the original assignment fixture if that environment permits it.
5. Register the Google OAuth redirect URI as:
   `http://localhost:3000/api/auth/callback/google`
6. Run `npm run dev`.

## Test and build

```bash
npm test
npm run build
```

## Security decisions

- OAuth credentials and upstream API keys are environment variables and are never committed.
- `/users` is checked server-side with the authenticated session. The API routes repeat the authorization check so they are not dependent on the route proxy alone.
- The assessment filter is implemented in server-only service code.
- Email values are not revealed in the UI until the user explicitly requests them; the reveal is served by an authenticated server endpoint.
- `poweredBy` is disabled to avoid unnecessary framework fingerprinting.

## Assessment-specific trade-off

The assignment explicitly requires retrieving the complete paginated dataset. The service therefore retrieves all ReqRes pages before filtering. For a production customer system, pagination, search, filtering, caching, rate limiting, and an upstream service designed for the expected data volume would be preferable.
