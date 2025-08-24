
export function formatLocalTime(isoUtc: string, tz?: string) {
  const d = new Date(isoUtc);
  const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short', timeZone: tz });
  return fmt.format(d);
}
export function leagueSlugToName(slug: string) {
  const map: Record<string,string> = { epl: "English Premier League", nba: "NBA", ufc: "UFC", f1: "Formula 1" };
  return map[slug] || slug.toUpperCase();
}
