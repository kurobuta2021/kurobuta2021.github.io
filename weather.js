(() => {
  "use strict";
  const cities = {
    tokyo: ["东京", 35.68, 139.69], osaka: ["大阪", 34.69, 135.50], kyoto: ["京都", 35.01, 135.77],
    sapporo: ["札幌", 43.06, 141.35], hakodate: ["函馆", 41.77, 140.73], nagoya: ["名古屋", 35.18, 136.91],
    yokohama: ["横滨", 35.44, 139.64], kobe: ["神户", 34.69, 135.20], nara: ["奈良", 34.69, 135.80],
    kanazawa: ["金泽", 36.56, 136.66], nagano: ["长野", 36.65, 138.19], sendai: ["仙台", 38.27, 140.87],
    hiroshima: ["广岛", 34.39, 132.46], fukuoka: ["福冈", 33.59, 130.40], nagasaki: ["长崎", 32.75, 129.88],
    naha: ["冲绳·那霸", 26.21, 127.68]
  };
  const $ = id => document.getElementById(id);
  const description = code => {
    if (!code) return ["天气变化", "🌤️"];
    if (code.includes("thunder")) return ["雷雨", "⛈️"];
    if (code.includes("snow")) return ["下雪", "🌨️"];
    if (code.includes("rain") || code.includes("sleet")) return ["下雨", "🌧️"];
    if (code.includes("fog")) return ["有雾", "🌫️"];
    if (code.includes("cloudy")) return ["多云", "☁️"];
    if (code.includes("partlycloudy")) return ["晴间多云", "⛅"];
    return ["晴朗", "☀️"];
  };
  const time = iso => new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso));
  const day = iso => new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", weekday: "short" }).format(new Date(iso));
  const japanDate = iso => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
  const metric = value => Number.isFinite(value) ? Math.round(value) : "—";
  let activeRequest = null;

  async function loadWeather(name, lat, lon) {
    activeRequest?.abort();
    const controller = new AbortController();
    activeRequest = controller;
    $("weatherResult").hidden = true;
    $("weatherStatus").textContent = `正在查询${name}的天气预报…`;
    try {
      // The local static preview has no Pages Functions. Production always uses our caching proxy.
      const localPreview = /^(localhost|127\.0\.0\.1|192\.168\.)/.test(location.hostname);
      const endpoint = localPreview
        ? `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`
        : `/api/weather?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`;
      const response = await fetch(endpoint, { signal: controller.signal });
      if (!response.ok) throw new Error("weather_fetch_failed");
      const payload = await response.json();
      const entries = payload?.properties?.timeseries;
      if (!Array.isArray(entries) || !entries.length) throw new Error("weather_empty");
      if (activeRequest !== controller) return;
      renderWeather(name, entries, payload.properties.meta?.updated_at);
    } catch (error) {
      if (error.name === "AbortError") return;
      $("weatherStatus").textContent = "暂时取不到天气，请稍后重试；遇到恶劣天气请以日本气象厅警报为准。";
    }
  }

  function renderWeather(name, entries, updatedAt) {
    const now = Date.now();
    const current = entries.find(item => new Date(item.time).getTime() >= now - 3600000) || entries[0];
    const details = current.data.instant.details;
    const rain = current.data.next_1_hours?.details?.precipitation_amount;
    const [summary, icon] = description(current.data.next_1_hours?.summary?.symbol_code || current.data.next_6_hours?.summary?.symbol_code);
    $("weatherPlace").textContent = `${name} · ${time(current.time)} 预报`;
    $("weatherTemp").textContent = `${metric(details.air_temperature)}°`;
    $("weatherSummary").textContent = summary;
    $("weatherIcon").textContent = icon;
    $("weatherFeels").textContent = `气温 ${metric(details.air_temperature)}°C`;
    $("weatherRain").textContent = `接下来 1 小时降水 ${Number.isFinite(rain) ? rain.toFixed(1) : "—"} mm`;
    $("weatherWind").textContent = `风速 ${Number.isFinite(details.wind_speed) ? details.wind_speed.toFixed(1) : "—"} m/s`;
    $("weatherHumidity").textContent = `湿度 ${metric(details.relative_humidity)}%`;
    const hourly = entries.filter(item => new Date(item.time).getTime() >= now).slice(0, 24).filter((_, index) => index % 3 === 0);
    $("weatherHourly").replaceChildren(...hourly.map(item => {
      const cell = document.createElement("div");
      const [label, mark] = description(item.data.next_1_hours?.summary?.symbol_code || item.data.next_6_hours?.summary?.symbol_code);
      cell.innerHTML = `<small>${time(item.time)}</small><span aria-label="${label}">${mark}</span><strong>${metric(item.data.instant.details.air_temperature)}°</strong>`;
      return cell;
    }));
    const byDay = new Map();
    entries.filter(item => new Date(item.time).getTime() >= now).forEach(item => {
      const key = japanDate(item.time);
      if (!byDay.has(key)) byDay.set(key, []);
      byDay.get(key).push(item);
    });
    // The first group is only the remaining hours today, not a full-day high/low.
    $("weatherDaily").replaceChildren(...Array.from(byDay.values()).slice(1, 6).map(items => {
      const temps = items.map(item => item.data.instant.details.air_temperature).filter(Number.isFinite);
      const midpoint = items[Math.floor(items.length / 2)];
      const [label, mark] = description(midpoint.data.next_6_hours?.summary?.symbol_code || midpoint.data.next_1_hours?.summary?.symbol_code);
      const row = document.createElement("div");
      row.innerHTML = `<strong>${day(items[0].time)}</strong><span>${mark} ${label}</span><b>${temps.length ? `${Math.round(Math.min(...temps))}°～${Math.round(Math.max(...temps))}°` : "—"}</b>`;
      return row;
    }));
    $("weatherUpdated").textContent = updatedAt ? `数据更新时间：${day(updatedAt)} ${time(updatedAt)}（日本时间）` : "数据更新时间以天气服务为准";
    $("weatherStatus").textContent = "";
    $("weatherResult").hidden = false;
  }

  $("weatherCity").addEventListener("change", event => {
    const city = cities[event.target.value];
    if (city) loadWeather(...city);
    else { activeRequest?.abort(); $("weatherResult").hidden = true; $("weatherStatus").textContent = "选择城市后就能看到未来几天的预报。"; }
  });
  $("weatherLocate").addEventListener("click", () => {
    if (!navigator.geolocation) { $("weatherStatus").textContent = "此浏览器不支持定位，请选城市查询。"; return; }
    $("weatherResult").hidden = true;
    $("weatherStatus").textContent = "正在获取你的位置…";
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      if (latitude < 24 || latitude > 46 || longitude < 122 || longitude > 146) {
        $("weatherStatus").textContent = "当前位置不在日本范围内，请选城市查询。";
        return;
      }
      $("weatherCity").value = "";
      loadWeather("当前位置", latitude, longitude);
    }, () => { $("weatherStatus").textContent = "没有取得定位，请允许定位，或直接选城市查询。"; }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  });
})();
