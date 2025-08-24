
# SportsTime — Local Time Sports Schedule

A tiny, fast, ad-friendly micro-app that shows EPL/NBA/UFC/F1 fixtures **in the user's local timezone**.

## Tech
- Next.js (App Router), TypeScript
- TailwindCSS (clean, minimal UI)
- Static JSON per league/day under `/data`
- API reads from local JSON (CDN-cached). No third-party calls per user request.

## Local Dev
```bash
npm i   # or pnpm i / yarn
npm run dev
```

Visit http://localhost:3000

## Deployment (GitHub + Vercel)
1. Create a new GitHub repo and push this project.
2. Import the repo into Vercel → New Project → Next.js defaults.
3. (Optional) Add env vars for your ingestion (e.g., THE_SPORTS_DB_API_KEY).
4. Deploy. The included `vercel.json` sets an hourly cron to GET `/api/cron/refresh`.
5. Replace the cron route to run your ingestion (or call a Worker/Action that writes `/data` JSON).

## Data Strategy
- Separate scheduled job (Vercel Cron / Cloudflare Worker / GitHub Actions) fetches fixtures from free sources,
  normalizes timestamps to UTC, and writes JSON files to `/data/{league}/{YYYY-MM-DD}.json` + `/data/{league}/index.json`.
- The frontend converts UTC → local time in the browser.

## Ad Slots
There are two "Ad space" blocks in `app/page.tsx`. Replace with your AdSense code.

## Where to implement fetching
- `scripts/ingest.ts` — put your actual data collection and writing logic here.
- You can also ship a static-only version by committing generated JSON under `/data`.


---

## Deploy on Render
1. Push this repo to GitHub.
2. Go to Render → New + → Blueprint → pick this repo.
3. Render will use `render.yaml` to set up the web service and cron job.
4. Web service runs Next.js app (`npm run start`).
5. Cron job runs `npm run ingest` hourly.
