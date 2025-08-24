
import { NextRequest } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const revalidate = 60;

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

async function readJson(p: string): Promise<any | null> {
  try {
    const buf = await fs.readFile(p, "utf-8");
    return JSON.parse(buf);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const league = (url.searchParams.get("league") || "epl").toLowerCase();
  const date = url.searchParams.get("date") || new Date().toISOString().slice(0,10);

  const base = path.join(process.cwd(), "data", league);
  const file = path.join(base, `${date}.json`);
  let payload = await readJson(file);

  if (!payload) {
    const idx = await readJson(path.join(base, "index.json"));
    if (idx && idx.fixtures) {
      const day = new Date(date + "T00:00:00Z");
      const next = idx.fixtures
        .filter((f: Fixture) => new Date(f.start_time_utc) >= day)
        .slice(0, 10);
      payload = { fixtures: next };
    } else {
      payload = { fixtures: [] };
    }
  }

  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json", "cache-control": "public, max-age=60, s-maxage=60" }
  });
}
