
export async function GET() {
  // Placeholder: trigger ingestion or rebuild static JSON.
  return new Response(JSON.stringify({ ok: true, message: "Cron refresh placeholder" }), {
    headers: { "content-type": "application/json" }
  });
}
