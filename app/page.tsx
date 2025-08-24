
"use client";

import { useEffect, useState } from "react";
import { formatLocalTime, leagueSlugToName } from "../lib/time";

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

const LEAGUES = [
  { slug: "epl", name: "EPL" },
  { slug: "nba", name: "NBA" },
  { slug: "ufc", name: "UFC" },
  { slug: "f1",  name: "F1"  },
];

export default function Page() {
  const [league, setLeague] = useState("epl");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [fixtures, setFixtures] = useState<Fixture[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/fixtures?league=${league}&date=${date}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setFixtures(data.fixtures || []);
    } catch (e:any) {
      setError(e.message || "Failed to load");
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [league, date]);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <main className="space-y-6">
      <section className="card space-y-4">
        <h1 className="h1">Matches in your timezone</h1>
        <p className="subtle">Local time: {new Date().toLocaleString()} ({tz})</p>
        <div className="flex flex-col md:flex-row gap-3">
          <select className="select flex-1" value={league} onChange={(e)=>setLeague(e.target.value)}>
            {LEAGUES.map(l => <option key={l.slug} value={l.slug}>{l.name}</option>)}
          </select>
          <input className="input" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
          <button className="btn" onClick={load} disabled={loading}>Refresh</button>
        </div>
        <div className="ad">Ad space</div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{leagueSlugToName(league)} — {new Date(date).toDateString()}</h2>
          <span className="subtle">{fixtures?.length ?? 0} fixtures</span>
        </div>

        {loading && <div className="card">Loading…</div>}
        {error && <div className="card text-red-400">Error: {error}</div>}

        {!loading && fixtures && fixtures.length === 0 && (
          <div className="card subtle">No fixtures found for this date.</div>
        )}

        <ul className="grid gap-3">
          {fixtures?.map((f) => (
            <li key={f.id} className="card flex items-center justify-between">
              <div>
                <div className="text-sm subtle">{f.season} • {f.league.toUpperCase()}</div>
                <div className="text-lg font-medium">{f.home} vs {f.away}</div>
                {f.venue && <div className="subtle">{f.venue}</div>}
              </div>
              <div className="text-right">
                <div className="text-base">{formatLocalTime(f.start_time_utc)}</div>
                <div className="subtle">{(f.status || "scheduled").toUpperCase()}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="ad">Ad space</div>
      </section>
    </main>
  );
}
