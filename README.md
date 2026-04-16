# Travel Agency API

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your environment values
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Required environment variables

- `MONGO_URL` — MongoDB connection string
- `SESSION_SECRET` — secret for session cookies (required in production)
- `GITHUB_CLIENT_ID` — GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` — GitHub OAuth client secret
- `CALLBACK_URL` — GitHub OAuth callback URL
- `CORS_ORIGINS` — comma-separated list of allowed origins for CORS

## Optional environment variables

- `PORT` — server port (default: `8080`)
- `HOST` — server host (default: `localhost`)

## Notes

- `SESSION_SECRET` must be set when `NODE_ENV=production`.
- `CORS_ORIGINS` defaults to `http://localhost:3000` if not provided.
- Do not commit `.env` to version control.
