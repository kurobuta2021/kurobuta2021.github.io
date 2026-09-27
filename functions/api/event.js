const EVENTS = new Set([
  "page_view",
  "session_start",
  "country_session",
  "tool_impression",
  "tool_click",
  "contact_path",
  "contact_form_complete",
  "contact_channel_click"
]);

function tokyoDay() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function onRequestPost({ request, env }) {
  const sameSite = request.headers.get("sec-fetch-site");
  if (sameSite && !["same-origin", "same-site"].includes(sameSite)) {
    return new Response(null, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const event = String(body.event || "");
  const tool = String(body.tool || "site");
  if (!EVENTS.has(event) || !/^[a-z0-9-]{1,48}$/.test(tool)) {
    return Response.json({ error: "invalid_event" }, { status: 400 });
  }

  if (!env.ANALYTICS_DB) {
    return Response.json({ error: "analytics_not_configured" }, { status: 503 });
  }

  await env.ANALYTICS_DB.prepare(`
    INSERT INTO daily_metrics (day, event, tool, count)
    VALUES (?, ?, ?, 1)
    ON CONFLICT(day, event, tool)
    DO UPDATE SET count = count + 1
  `).bind(tokyoDay(), event, tool).run();

  if (event === "session_start") {
    const country = String(request.cf?.country || "xx").toLowerCase();
    const countryCode = /^[a-z]{2}$/.test(country) ? country : "xx";
    await env.ANALYTICS_DB.prepare(`
      INSERT INTO daily_metrics (day, event, tool, count)
      VALUES (?, 'country_session', ?, 1)
      ON CONFLICT(day, event, tool)
      DO UPDATE SET count = count + 1
    `).bind(tokyoDay(), countryCode).run();
  }

  return new Response(null, { status: 204 });
}
