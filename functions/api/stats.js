export async function onRequestGet({ request, env }) {
  if (!env.STATS_KEY || !env.ANALYTICS_DB) {
    return Response.json({ error: "analytics_not_configured" }, { status: 503 });
  }
  const key = request.headers.get("x-stats-key");
  if (!key || key !== env.STATS_KEY) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const days = Math.min(90, Math.max(1, Number(url.searchParams.get("days")) || 30));
  const startDate = new Date(Date.now() - (days - 1) * 86400000);
  const start = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(startDate);
  const { results } = await env.ANALYTICS_DB.prepare(`
    SELECT day, event, tool, count
    FROM daily_metrics
    WHERE day >= ?
    ORDER BY day ASC, event ASC, tool ASC
  `).bind(start).all();

  return Response.json({ days, generatedAt: new Date().toISOString(), rows: results }, {
    headers: { "cache-control": "no-store" }
  });
}
