export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < 24 || lat > 46 || lon < 122 || lon > 146) {
    return Response.json({ error: "japan_coordinates_required" }, { status: 400 });
  }
  // Rounding also prevents one cache entry per GPS reading; MET asks for no more than four decimals.
  const point = `${lat.toFixed(2)},${lon.toFixed(2)}`;
  const cacheKey = new Request(`${url.origin}/api/weather?point=${encodeURIComponent(point)}`);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;
  const upstream = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`, {
    headers: { "User-Agent": "HeitunJapanTravelToolbox/1.0 (https://heitun.pages.dev/)", Accept: "application/json" }
  });
  if (!upstream.ok) return Response.json({ error: "weather_upstream_unavailable" }, { status: 502 });
  const expires = Date.parse(upstream.headers.get("Expires") || "");
  const maxAge = Number.isFinite(expires) ? Math.max(60, Math.min(3600, Math.floor((expires - Date.now()) / 1000))) : 600;
  const response = new Response(upstream.body, {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": `public, max-age=${maxAge}`, "X-Weather-Source": "MET Norway" }
  });
  await cache.put(cacheKey, response.clone());
  return response;
}
