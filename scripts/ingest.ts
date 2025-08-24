
/**
 * Minimal ingestion script outline.
 * Fetch fixtures from free sources and write JSON to /data/{league}/{YYYY-MM-DD}.json
 * Use THE_SPORTS_DB_API_KEY env if available.
 */
import fs from "node:fs/promises";
import path from "node:path";

type Fixture = {
  id: string;
  league: string;
  season: string;
  home: string;
  away: string;
  start_time_utc: string;
  venue?: string;
  status?: string;
};

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

async function writeDay(league: string, dateISO: string, fixtures: Fixture[]) {
  const dir = path.join("data", league);
  await ensureDir(dir);
  const file = path.join(dir, `${dateISO}.json`);
  await fs.writeFile(file, JSON.stringify({ fixtures }, null, 2), "utf-8");
}

async function writeIndex(league: string, fixtures: Fixture[]) {
  const dir = path.join("data", league);
  await ensureDir(dir);
  const file = path.join(dir, `index.json`);
  await fs.writeFile(file, JSON.stringify({ fixtures }, null, 2), "utf-8");
}

async function run() {
  // TODO: Replace with real fetching (TheSportsDB, ICS, etc.).
  console.log("Ingest placeholder: add your fetching code here.");
}
run().catch(err => { console.error(err); process.exit(1); });
