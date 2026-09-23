(function () {
  "use strict";

  const FAVORITES_KEY = "heitu-favorites-v1";
  const CITY_KEY = "heitu-city-v1";
  const SOURCES = {
    smoking: {
      title: "附近合法吸烟点",
      emoji: "⌖",
      intro: "两个入口都直达地图；先看 CLUB JT，再用网友共享地图补充",
      phrase: "smoking",
      items: [
        {
          name: "CLUB JT 吸烟点地图",
          trust: "第一推荐",
          description: "JT 调查、用户投稿及餐厅资料结合；首次使用可能需要确认已满20岁并允许定位。需要当地网络才能打开哦！",
          badges: ["排在第一", "直达地图", "日本全国"],
          url: "https://www.clubjt.jp/map"
        },
        {
          name: "吸烟区信息共享地图君",
          trust: "第二推荐",
          description: "覆盖咖啡店、商场和公共吸烟区等详细信息，直接进入网页版地图。需要当地网络才能打开哦！",
          badges: ["详细补充", "无需登录", "网友共享"],
          url: "https://share-map.net/smoking-area/"
        }
      ]
    },
    anime: {
      title: "附近动漫原景地",
      emoji: "🎬",
      intro: "先用中文圣地地图看当前位置附近；想看更多场景和登场话数，再打开 OTABiS",
      phrase: "map",
      items: [
        {
          name: "圣地地图 Screen Pilgrimage",
          trust: "第一推荐",
          description: "打开直接显示地图，支持简体中文、当前位置、作品搜索和路线整理。需要当地网络才能打开哦！",
          badges: ["简体中文", "可定位", "约8970个地点"],
          url: "https://screenpilgrimage.com/"
        },
        {
          name: "OTABiS 动漫圣地巡礼地图",
          trust: "第二推荐",
          description: "点位更多，可查看场景、登场话数、路线与打卡；网页功能较多，以日文为主。需要当地网络才能打开哦！",
          badges: ["约14000个地点", "登场话数", "附近自动推荐"],
          url: "https://app.otabis.jp/"
        }
      ]
    }
  };

  const PHRASES = {
    toilet: {
      ja: "すみません。トイレはどこですか？",
      zh: "不好意思，请问厕所在哪里？"
    },
    smoking: {
      ja: "すみません。一番近い喫煙所はどこですか？",
      zh: "不好意思，请问最近的吸烟点在哪里？"
    },
    map: {
      ja: "この場所を地図で教えてください。",
      zh: "请在地图上告诉我这个地方。"
    },
    directions: {
      ja: "すみません。ここへはどう行けばいいですか？",
      zh: "不好意思，请问去这里怎么走？"
    },
    checkout: {
      ja: "お会計をお願いします。",
      zh: "麻烦结账。"
    },
    card: {
      ja: "クレジットカードは使えますか？",
      zh: "可以使用信用卡吗？"
    },
    menu: {
      ja: "中国語のメニューはありますか？",
      zh: "有中文菜单吗？"
    },
    luggage: {
      ja: "荷物を預かってもらえますか？",
      zh: "可以帮我寄存行李吗？"
    },
    language: {
      ja: "日本語が話せません。ゆっくり話していただけますか？",
      zh: "我不会说日语，可以说慢一点吗？"
    },
    help: {
      ja: "すみません。助けてください。",
      zh: "不好意思，请帮帮我。"
    }
  };

  const state = {
    view: "home",
    previousView: "home",
    category: "smoking",
    phrase: "toilet",
    destination: null,
    favorites: readFavorites(),
    city: localStorage.getItem(CITY_KEY) || "东京",
    toiletMap: null,
    toiletUserMarker: null,
    toiletMarkers: [],
    toiletPosition: null,
    toiletPlaces: [],
    toiletLoading: false
  };

  const els = {
    toast: document.querySelector("#toast"),
    cityDialog: document.querySelector("#cityDialog"),
    comingDialog: document.querySelector("#comingDialog"),
    mapChoiceDialog: document.querySelector("#mapChoiceDialog"),
    sourceList: document.querySelector("#sourceList"),
    sourceTitle: document.querySelector("#sourceTitle"),
    sourceIntro: document.querySelector("#sourceIntro"),
    sourceEmoji: document.querySelector("#sourceEmoji"),
    destinationInput: document.querySelector("#destinationInput"),
    detectedCard: document.querySelector("#detectedCard"),
    detectedText: document.querySelector("#detectedText"),
    japanesePhrase: document.querySelector("#japanesePhrase"),
    chinesePhrase: document.querySelector("#chinesePhrase"),
    phraseDestination: document.querySelector("#phraseDestination"),
    smokingSafety: document.querySelector("#smokingSafety"),
    favoriteList: document.querySelector("#favoriteList"),
    contactForm: document.querySelector("#contactForm")
  };

  function readFavorites() {
    try {
      const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => els.toast.classList.remove("show"), 2200);
  }

  function mapSearchUrl(provider, query, position) {
    const encoded = encodeURIComponent(query);
    if (provider === "amap") {
      const center = position ? `&center=${position.lng.toFixed(6)},${position.lat.toFixed(6)}&coordinate=wgs84&view=map` : "";
      return `https://uri.amap.com/search?keyword=${encoded}${center}&src=heitu&callnative=1`;
    }
    if (provider === "apple") return `https://maps.apple.com/?q=${encoded}`;
    return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  }

  function isValidPosition(position) {
    return position
      && Number.isFinite(position.lat)
      && Number.isFinite(position.lng)
      && position.lat >= -90
      && position.lat <= 90
      && position.lng >= -180
      && position.lng <= 180;
  }

  function openAmapAtCurrentPosition(link) {
    if (link.dataset.locating === "true") {
      toast("正在获取当前位置，请稍等");
      return;
    }
    if (!navigator.geolocation) {
      toast("浏览器不支持定位，无法用高德搜索附近厕所");
      return;
    }
    const description = link.querySelector("small");
    const originalDescription = description.textContent;
    link.dataset.locating = "true";
    link.setAttribute("aria-busy", "true");
    description.textContent = "正在获取当前位置…";

    const finish = () => {
      delete link.dataset.locating;
      link.removeAttribute("aria-busy");
      description.textContent = originalDescription;
    };

    navigator.geolocation.getCurrentPosition(position => {
      const current = {
        lat: Number(position.coords.latitude),
        lng: Number(position.coords.longitude)
      };
      if (!isValidPosition(current)) {
        finish();
        toast("定位坐标无效，无法打开高德地图");
        return;
      }
      const url = mapSearchUrl("amap", link.dataset.locationQuery || "トイレ", current);
      link.href = url;
      link.dataset.lastCenter = `${current.lng.toFixed(6)},${current.lat.toFixed(6)}`;
      finish();
      const opened = window.open(url, "_blank");
      if (opened) opened.opener = null;
      else window.location.assign(url);
    }, error => {
      finish();
      if (error && error.code === error.PERMISSION_DENIED) {
        toast("你没有允许定位，无法用高德搜索附近厕所");
      } else {
        toast("定位失败，无法用高德搜索附近厕所，请重试");
      }
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
  }

  function locateCurrentArea() {
    const button = document.querySelector("#currentAreaButton");
    const label = document.querySelector("#currentAreaText");
    if (!navigator.geolocation) {
      label.textContent = "浏览器不支持定位";
      return;
    }
    button.disabled = true;
    label.textContent = "正在定位…";
    navigator.geolocation.getCurrentPosition(async position => {
      try {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=zh-CN`;
        const response = await fetch(url, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("reverse geocoding failed");
        const address = (await response.json()).address || {};
        const city = address.state || address.province || address.city || address.municipality;
        const district = address.city_district || address.city || address.town || address.suburb || address.county;
        const parts = [city, district].filter((part, index, list) => part && list.indexOf(part) === index);
        label.textContent = parts.slice(0, 2).join(" · ") || "当前位置";
      } catch (error) {
        label.textContent = "已定位 · 地区未知";
      } finally {
        button.disabled = false;
      }
    }, () => {
      label.textContent = "定位失败 · 点此重试";
      button.disabled = false;
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
  }

  function showMapChoice(query, label, options = {}) {
    const community = options.community === true ? {
      url: "https://www.toilet-map-jp.com/ja/map",
      icon: "🚻",
      name: "トイレマップ｜日本全国厕所地图",
      description: "覆盖日本全国 · 可定位当前位置 · 第一推荐 · 需要当地网络才能打开哦！"
    } : options.community;
    document.querySelector("#mapChoiceTitle").textContent = community ? `${label}，怎么找？` : `${label}，用哪个地图？`;
    document.querySelector("#mapChoiceIntro").textContent = options.intro || (community
      ? "先用日本全国厕所地图定位附近点位，也可以直接用常用地图搜索。"
      : "已经选好服务了，现在选择你手机里方便使用的地图。");
    document.querySelector("#mapChoiceNote").textContent = options.note || (community
      ? "建议先看日本网友共享地图，再试 Google 地图；搜不到时可换其他地图。"
      : "在日本建议优先使用 Google 地图；搜不到时可换其他地图。");
    const communityLink = document.querySelector("#mapChoiceCommunity");
    communityLink.hidden = !community;
    if (community) {
      communityLink.href = community.url;
      communityLink.querySelector("span").textContent = community.icon;
      communityLink.querySelector("strong").textContent = community.name;
      communityLink.querySelector("small").textContent = community.description;
    }
    const extraList = document.querySelector("#mapChoiceExtraList");
    const extraChoices = Array.isArray(options.extraChoices) ? options.extraChoices : [];
    extraList.hidden = extraChoices.length === 0;
    extraList.innerHTML = extraChoices.map(item => `
      <a class="map-choice ${escapeHtml(item.className || "community")}" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
        <span>${escapeHtml(item.icon)}</span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.description)}</small>
      </a>
    `).join("");
    document.querySelector("#mapChoiceGoogle small").textContent = options.googleDescription || "日本地点较完整 · 建议优先 · 需要当地网络才能打开哦！";
    document.querySelector("#mapChoiceAmap small").textContent = options.amapDescription || "中国手机更方便 · 日本地点可能较少";
    document.querySelector("#mapChoiceGoogle").href = mapSearchUrl("google", query);
    const amapLink = document.querySelector("#mapChoiceAmap");
    const amapQuery = options.amapQuery || query;
    amapLink.dataset.requireCurrentLocation = options.amapCurrentLocation === true ? "true" : "false";
    amapLink.dataset.locationQuery = amapQuery;
    amapLink.href = options.amapCurrentLocation === true ? "#" : mapSearchUrl("amap", amapQuery);
    document.querySelector("#mapChoiceApple").href = mapSearchUrl("apple", query);
    els.mapChoiceDialog.showModal();
  }

  function go(view, remember = true) {
    if (remember && state.view !== view) state.previousView = state.view;
    state.view = view;
    document.querySelectorAll(".view").forEach(section => section.classList.toggle("active", section.dataset.view === view));
    document.querySelectorAll(".bottom-nav [data-go]").forEach(button => {
      const target = button.dataset.go;
      const active = target === view || (target === "home" && ["toilet-map", "sources", "navigator", "japanese"].includes(view));
      button.classList.toggle("active", active);
    });
    if (view === "favorites") renderFavorites();
    if (view === "japanese") renderPhrase();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCategory(category) {
    if (category === "toilet") {
      state.phrase = "toilet";
      go("toilet-map");
      window.setTimeout(startToiletLocator, 320);
      return;
    }
    state.category = category;
    state.phrase = SOURCES[category].phrase;
    renderSources();
    go("sources");
  }

  function ensureToiletMap() {
    if (state.toiletMap || typeof L === "undefined") return;
    state.toiletMap = L.map("toiletMap", { zoomControl: true }).setView([35.6812, 139.7671], 14);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(state.toiletMap);
    window.setTimeout(() => state.toiletMap?.invalidateSize({ pan: false }), 380);
  }

  function setToiletStatus(message, tone) {
    const status = document.querySelector("#toiletLocationStatus");
    status.textContent = message;
    status.dataset.tone = tone || "neutral";
  }

  function distanceMeters(from, to) {
    const rad = value => value * Math.PI / 180;
    const dLat = rad(to.lat - from.lat);
    const dLng = rad(to.lng - from.lng);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(from.lat)) * Math.cos(rad(to.lat)) * Math.sin(dLng / 2) ** 2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function formatDistance(meters) {
    return meters < 1000 ? `${Math.max(1, Math.round(meters / 10) * 10)}米` : `${(meters / 1000).toFixed(1)}公里`;
  }

  function yesNoLabel(value, yesLabel, noLabel) {
    if (value === "yes" || value === "designated") return yesLabel;
    if (value === "no") return noLabel;
    return "";
  }

  function toiletName(tags) {
    return tags["name:zh"] || tags["name:ja"] || tags.name || "公共厕所";
  }

  function toiletMeta(place) {
    const tags = place.tags || {};
    return [
      yesNoLabel(tags.wheelchair, "无障碍", "未标无障碍"),
      yesNoLabel(tags.changing_table, "有尿布台", ""),
      tags.fee === "yes" ? "可能收费" : tags.fee === "no" ? "免费" : "",
      tags.opening_hours || ""
    ].filter(Boolean);
  }

  function toiletDestination(place) {
    return { raw: `${place.lat},${place.lng}`, label: toiletName(place.tags || {}), coords: { lat: place.lat, lng: place.lng } };
  }

  function renderToiletPlaces() {
    const container = document.querySelector("#toiletResults");
    const summary = document.querySelector("#toiletResultSummary");
    state.toiletMarkers.forEach(marker => marker.remove());
    state.toiletMarkers = [];
    if (!state.toiletPlaces.length) {
      summary.textContent = "附近暂未查到点位";
      container.innerHTML = `<div class="map-empty"><span>🐽</span><p>这一带的公开地图数据可能还不完整。可以移动地图后点“搜索地图中心”。</p></div>`;
      return;
    }
    summary.textContent = `找到 ${state.toiletPlaces.length} 个 · 显示最近 ${Math.min(30, state.toiletPlaces.length)} 个`;
    container.innerHTML = state.toiletPlaces.slice(0, 30).map((place, index) => {
      const destination = toiletDestination(place);
      const links = navLinks(destination);
      const meta = toiletMeta(place);
      return `<article class="toilet-result" data-toilet-index="${index}">
        <button class="toilet-result-main" type="button" data-focus-toilet="${index}"><span class="toilet-rank">${index + 1}</span><span><strong>${escapeHtml(destination.label)}</strong><small>${escapeHtml(formatDistance(place.distance))}${meta.length ? ` · ${escapeHtml(meta.join(" · "))}` : ""}</small></span><b>›</b></button>
        <div class="toilet-result-actions"><a href="${links.google}" target="_blank" rel="noopener">Google导航</a><a href="${links.amap}" target="_blank" rel="noopener">高德导航</a><button type="button" data-save-toilet="${index}">🐽 豚一下</button></div>
      </article>`;
    }).join("");
    state.toiletPlaces.forEach((place, index) => {
      const marker = L.marker([place.lat, place.lng], {
        icon: L.divIcon({ className: "toilet-pin-shell", html: `<span><i>${index + 1}</i></span>`, iconSize: [34, 40], iconAnchor: [17, 38] })
      }).addTo(state.toiletMap).bindPopup(`<strong>${escapeHtml(toiletName(place.tags || {}))}</strong><br>${escapeHtml(formatDistance(place.distance))}`);
      state.toiletMarkers.push(marker);
    });
  }

  async function queryNearbyToilets(position, radius = 3000) {
    if (state.toiletLoading) return;
    state.toiletLoading = true;
    setToiletStatus(`正在查找周围 ${radius / 1000} 公里的厕所…`, "loading");
    const query = `[out:json][timeout:25];(node["amenity"="toilets"](around:${radius},${position.lat},${position.lng});way["amenity"="toilets"](around:${radius},${position.lat},${position.lng});relation["amenity"="toilets"](around:${radius},${position.lat},${position.lng}););out center tags;`;
    const endpoints = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
    let data = null;
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }, body: `data=${encodeURIComponent(query)}` });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        data = await response.json();
        break;
      } catch (_) {}
    }
    state.toiletLoading = false;
    if (!data) {
      setToiletStatus("厕所数据暂时加载失败，请稍后重试", "error");
      document.querySelector("#toiletResultSummary").textContent = "查询失败";
      return;
    }
    state.toiletPlaces = data.elements.map(element => ({
      id: `${element.type}-${element.id}`,
      lat: element.lat ?? element.center?.lat,
      lng: element.lon ?? element.center?.lon,
      tags: element.tags || {}
    })).filter(place => Number.isFinite(place.lat) && Number.isFinite(place.lng)).map(place => ({ ...place, distance: distanceMeters(position, place) })).sort((a, b) => a.distance - b.distance);
    setToiletStatus(`已定位：周围 ${radius / 1000} 公里`, "success");
    renderToiletPlaces();
  }

  function setToiletPosition(lat, lng, label) {
    ensureToiletMap();
    const position = { lat, lng };
    state.toiletPosition = position;
    state.toiletMap.setView([lat, lng], 15);
    if (state.toiletUserMarker) state.toiletUserMarker.remove();
    state.toiletUserMarker = L.circleMarker([lat, lng], { radius: 9, color: "#fff", weight: 3, fillColor: "#347bd1", fillOpacity: 1 }).addTo(state.toiletMap).bindPopup(label || "你在这里");
    queryNearbyToilets(position);
  }

  function startToiletLocator() {
    ensureToiletMap();
    if (!state.toiletMap) {
      setToiletStatus("地图组件加载失败，请检查网络后刷新", "error");
      return;
    }
    state.toiletMap.invalidateSize();
    if (!navigator.geolocation) {
      setToiletStatus("这台设备不支持定位，可移动地图后搜索", "error");
      return;
    }
    setToiletStatus("正在获取当前位置，请允许定位…", "loading");
    navigator.geolocation.getCurrentPosition(
      result => setToiletPosition(result.coords.latitude, result.coords.longitude, "你在这里"),
      () => setToiletStatus("没有取得位置。请开启浏览器定位，或移动地图后搜索。", "error"),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  }

  function renderSources() {
    const group = SOURCES[state.category];
    els.sourceTitle.textContent = group.title;
    els.sourceIntro.textContent = group.intro;
    els.sourceEmoji.textContent = group.emoji;
    els.sourceEmoji.style.background = state.category === "smoking" ? "#f5dfbc" : "#dceaf7";
    els.sourceList.innerHTML = group.items.map(item => `
      <article class="source-card">
        <div class="source-top"><h2>${escapeHtml(item.name)}</h2><span>${escapeHtml(item.trust)}</span></div>
        <p>${escapeHtml(item.description)}</p>
        <div class="badge-row">${item.badges.map(badge => `<span>${escapeHtml(badge)}</span>`).join("")}</div>
        <a class="source-open" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">直接打开地图 ↗</a>
      </article>
    `).join("");
  }

  function extractCoordinates(text) {
    const patterns = [
      /#map=\d+(?:\.\d+)?\/(-?\d{1,2}\.\d+)\/(-?\d{1,3}\.\d+)/i,
      /@(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/,
      /(?:lat|latitude)=(-?\d{1,2}\.\d+).*?(?:lng|lon|longitude)=(-?\d{1,3}\.\d+)/i,
      /(-?\d{1,2}\.\d{4,})\s*[,，\/]\s*(-?\d{1,3}\.\d{4,})/
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (!match) continue;
      const lat = Number(match[1]);
      const lng = Number(match[2]);
      if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { lat, lng };
    }
    return null;
  }

  function parseDestination(raw) {
    const text = raw.trim();
    if (!text) return null;
    const coords = extractCoordinates(text);
    let label = text.replace(/^https?:\/\/\S+$/i, coords ? `坐标 ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : text);
    if (label.length > 120) label = `${label.slice(0, 117)}…`;
    return { raw: text, label, coords };
  }

  function navLinks(destination) {
    const value = destination.coords ? `${destination.coords.lat},${destination.coords.lng}` : destination.raw;
    const encoded = encodeURIComponent(value);
    const amap = destination.coords
      ? `https://uri.amap.com/navigation?to=${destination.coords.lng},${destination.coords.lat},${encodeURIComponent(destination.label)}&mode=walk&policy=1&src=heitu&coordinate=wgs84&callnative=1`
      : `https://uri.amap.com/search?keyword=${encoded}&city=${encodeURIComponent(state.city)}&src=heitu&callnative=1`;
    return {
      google: `https://www.google.com/maps/dir/?api=1&destination=${encoded}&travelmode=walking`,
      amap,
      apple: `https://maps.apple.com/?daddr=${encoded}&dirflg=w`
    };
  }

  function updateDestination() {
    state.destination = parseDestination(els.destinationInput.value);
    const links = state.destination ? navLinks(state.destination) : null;
    const mapping = [["#googleNav", "google"], ["#amapNav", "amap"], ["#appleNav", "apple"]];
    mapping.forEach(([selector, key]) => {
      const link = document.querySelector(selector);
      link.classList.toggle("disabled", !links);
      link.href = links ? links[key] : "#";
    });
    els.detectedCard.hidden = !state.destination;
    els.detectedText.textContent = state.destination ? state.destination.label : "";
    renderPhrase();
  }

  function persistFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    updateFavoriteCount();
  }

  function saveDestination() {
    if (!state.destination) {
      toast("先粘贴地点名称、地址或分享链接");
      els.destinationInput.focus();
      return;
    }
    const fingerprint = state.destination.coords
      ? `${state.destination.coords.lat.toFixed(5)},${state.destination.coords.lng.toFixed(5)}`
      : state.destination.raw.toLowerCase();
    if (state.favorites.some(item => item.fingerprint === fingerprint)) {
      toast("这个地点已经豚过啦");
      return;
    }
    state.favorites.unshift({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      label: state.destination.label,
      raw: state.destination.raw,
      coords: state.destination.coords,
      fingerprint,
      savedAt: new Date().toISOString()
    });
    persistFavorites();
    toast("已豚好，下次直接用");
  }

  function updateFavoriteCount() {
    const count = state.favorites.length;
    document.querySelector("#homeFavoriteCount").textContent = count;
    const navCount = document.querySelector("#navFavoriteCount");
    navCount.textContent = count;
    navCount.hidden = count === 0;
  }

  function renderFavorites() {
    if (!state.favorites.length) {
      els.favoriteList.innerHTML = `<div class="empty-state"><span>🐽</span><h2>还没有豚任何地点</h2><p>在导航助手里粘贴地点，再点“豚一下”。</p></div>`;
      return;
    }
    els.favoriteList.innerHTML = state.favorites.map(item => {
      const destination = { raw: item.raw, label: item.label, coords: item.coords || null };
      const links = navLinks(destination);
      const date = new Date(item.savedAt).toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
      return `<article class="favorite-card">
        <div class="favorite-card-head"><div><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(date)} 豚在这台手机</small></div><button class="delete-favorite" type="button" data-delete="${escapeHtml(item.id)}">删除</button></div>
        <div class="favorite-nav"><a href="${links.google}" target="_blank" rel="noopener">Google</a><a href="${links.amap}" target="_blank" rel="noopener">高德</a><a href="${links.apple}" target="_blank" rel="noopener">Apple</a></div>
      </article>`;
    }).join("");
  }

  function setPhrase(key) {
    state.phrase = key;
    document.querySelectorAll("#phraseTabs button").forEach(button => button.classList.toggle("active", button.dataset.phrase === key));
    document.querySelector(`#phraseTabs [data-phrase="${key}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    renderPhrase();
  }

  function renderPhrase() {
    const phrase = PHRASES[state.phrase] || PHRASES.toilet;
    els.japanesePhrase.textContent = phrase.ja;
    els.chinesePhrase.textContent = phrase.zh;
    els.smokingSafety.hidden = state.phrase !== "smoking";
    if (state.destination) {
      els.phraseDestination.hidden = false;
      els.phraseDestination.textContent = `目的地：${state.destination.label}`;
    } else {
      els.phraseDestination.hidden = true;
      els.phraseDestination.textContent = "";
    }
  }

  async function copyText(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
      toast(successMessage);
      return true;
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      if (copied) toast(successMessage);
      return copied;
    }
  }

  function buildInquiry() {
    const data = new FormData(els.contactForm);
    return [
      "你好，黑豚君，我想咨询日本旅行服务：",
      `需求：${data.get("service") || "未填写"}`,
      `日期：${data.get("date") || "待定"}`,
      `城市：${data.get("city") || "待定"}`,
      `人数／行李：${data.get("people") || "待定"}`,
      `具体需求：${data.get("details") || "稍后补充"}`
    ].join("\n");
  }

  async function shareInquiry(event) {
    event.preventDefault();
    const text = buildInquiry();
    if (navigator.share) {
      try {
        await navigator.share({ title: "找黑豚旅行咨询", text });
        toast("已打开分享菜单");
        return;
      } catch (error) {
        if (error && error.name === "AbortError") return;
      }
    }
    await copyText(text, "咨询内容已复制，可粘贴到微信");
  }

  function updateContactServiceMode(scroll = false) {
    const service = new FormData(els.contactForm).get("service");
    const direct = service === "餐厅预约" || service === "其他需求";
    const prompt = document.querySelector("#directWechatPrompt");
    prompt.hidden = !direct;
    document.querySelector("#tripDetails").hidden = direct;
    document.querySelector("#wechatContact").hidden = direct;
    document.querySelector("#contactNote").hidden = direct;
    if (direct && scroll) prompt.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.addEventListener("click", event => {
    const locatedAmapLink = event.target.closest('#mapChoiceAmap[data-require-current-location="true"]');
    if (locatedAmapLink) {
      event.preventDefault();
      openAmapAtCurrentPosition(locatedAmapLink);
      return;
    }

    const currentAreaButton = event.target.closest("#currentAreaButton");
    if (currentAreaButton) {
      locateCurrentArea();
      return;
    }

    const toiletButton = event.target.closest("[data-toilet-choice]");
    if (toiletButton) {
      showMapChoice("公衆トイレ", "附近厕所", {
        community: true,
        amapCurrentLocation: true,
        amapQuery: "トイレ",
        googleDescription: "日本地点较完整 · 第二推荐 · 需要当地网络才能打开哦！",
        amapDescription: "中国手机更方便 · 日本厕所数据相对较少",
        note: "厕所建议先看日本全国厕所地图，再试 Google 地图；搜不到时可换其他地图。"
      });
      return;
    }

    const onsenButton = event.target.closest("[data-onsen-choice]");
    if (onsenButton) {
      showMapChoice("日帰り温泉", "泡个汤", {
        intro: "先用 Google 地图找附近的日归温泉；需要私汤时，使用下面的专门入口。",
        extraChoices: [
          {
            url: "https://www.spa.or.jp/search_f/",
            icon: "私",
            name: "找私汤／家庭浴池",
            description: "私汤（貸切浴場）通常可避开纹身限制，预约前请向店家确认；公共大浴场通常有限制，部分设施允许",
            className: "private-bath"
          }
        ],
        googleDescription: "日文搜索“日帰り温泉” · 不用住宿，泡完温泉就走 · 定位找附近最方便 · 需要当地网络才能打开哦！",
        amapDescription: "搜索“温泉” · 日本地点相对较少",
        note: "有私汤不代表整家设施一定允许纹身；温泉规则可能变化，出发前请查看详情或向店家确认。"
      });
      return;
    }

    const fishingButton = event.target.closest("[data-fishing-choice]");
    if (fishingButton) {
      showMapChoice("釣具店", "附近渔具店", {
        intro: "选择常用地图，直接用日文“釣具店”搜索附近的渔具店。",
        googleDescription: "日文搜索“釣具店” · 最方便 · 需要当地网络才能打开哦！",
        amapDescription: "搜索“渔具店” · 日本地点相对较少",
        note: "在日本找渔具店建议优先使用 Google 地图；搜不到时可换其他地图。"
      });
      return;
    }

    const mapSearchButton = event.target.closest("[data-map-query]");
    if (mapSearchButton) {
      const query = mapSearchButton.dataset.mapQuery;
      const label = mapSearchButton.dataset.mapLabel || query;
      showMapChoice(query, label);
      return;
    }
    const externalButton = event.target.closest("[data-external]");
    if (externalButton) {
      window.open(externalButton.dataset.external, "_blank", "noopener");
      return;
    }
    const goButton = event.target.closest("[data-go]");
    if (goButton) {
      go(goButton.dataset.go);
      return;
    }
    const backButton = event.target.closest("[data-back]");
    if (backButton) {
      go(state.previousView || "home", false);
      return;
    }
    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      openCategory(categoryButton.dataset.category);
      return;
    }
    const comingButton = event.target.closest("[data-coming]");
    if (comingButton) {
      document.querySelector("#comingTitle").textContent = `${comingButton.dataset.coming}正在整理`;
      els.comingDialog.showModal();
      return;
    }
    const phraseButton = event.target.closest("[data-phrase]");
    if (phraseButton) {
      setPhrase(phraseButton.dataset.phrase);
      return;
    }
    const deleteButton = event.target.closest("[data-delete]");
    if (deleteButton) {
      state.favorites = state.favorites.filter(item => item.id !== deleteButton.dataset.delete);
      persistFavorites();
      renderFavorites();
      toast("已从收藏删除");
      return;
    }
    const focusToilet = event.target.closest("[data-focus-toilet]");
    if (focusToilet) {
      const index = Number(focusToilet.dataset.focusToilet);
      const place = state.toiletPlaces[index];
      if (place && state.toiletMap) {
        state.toiletMap.setView([place.lat, place.lng], 18);
        state.toiletMarkers[index]?.openPopup();
        document.querySelector("#toiletMap").scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    const saveToilet = event.target.closest("[data-save-toilet]");
    if (saveToilet) {
      const place = state.toiletPlaces[Number(saveToilet.dataset.saveToilet)];
      if (!place) return;
      state.destination = toiletDestination(place);
      saveDestination();
    }
  });

  document.querySelectorAll("[data-city]").forEach(button => button.addEventListener("click", () => {
    state.city = button.dataset.city;
    localStorage.setItem(CITY_KEY, state.city);
    els.contactForm.elements.city.value = state.city;
    els.cityDialog.close();
    toast(`已切换到${state.city}`);
  }));

  els.destinationInput.addEventListener("input", updateDestination);
  document.querySelector("#pasteButton").addEventListener("click", async () => {
    try {
      els.destinationInput.value = await navigator.clipboard.readText();
      updateDestination();
      toast("已粘贴，黑豚君正在识别");
    } catch (_) {
      toast("浏览器没允许读取，请长按输入框粘贴");
      els.destinationInput.focus();
    }
  });
  document.querySelector("#clearDestination").addEventListener("click", () => {
    els.destinationInput.value = "";
    updateDestination();
    els.destinationInput.focus();
  });
  document.querySelector("#saveDestination").addEventListener("click", saveDestination);
  document.querySelector("#copyJapanese").addEventListener("click", () => copyText(els.japanesePhrase.textContent, "日文已复制"));
  document.querySelector("#speakJapanese").addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      toast("这台设备暂不支持语音播放");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(els.japanesePhrase.textContent);
    utterance.lang = "ja-JP";
    utterance.rate = .86;
    speechSynthesis.speak(utterance);
    toast("正在播放日语");
  });
  els.contactForm.addEventListener("submit", shareInquiry);
  els.contactForm.addEventListener("change", event => {
    if (event.target.matches('input[name="service"]')) updateContactServiceMode(true);
  });
  document.querySelector("#copyInquiry").addEventListener("click", () => copyText(buildInquiry(), "咨询内容已复制，可粘贴到微信"));
  document.querySelectorAll("[data-copy-wechat]").forEach(button => button.addEventListener("click", () => copyText("zhangpeng816", "微信号已复制：zhangpeng816")));
  document.querySelectorAll("[data-copy-email]").forEach(button => button.addEventListener("click", () => copyText("kurobuta2021@gmail.com", "邮箱已复制：kurobuta2021@gmail.com")));
  document.querySelector("#relocateToilets").addEventListener("click", startToiletLocator);
  document.querySelector("#searchMapArea").addEventListener("click", () => {
    ensureToiletMap();
    if (!state.toiletMap) return;
    const center = state.toiletMap.getCenter();
    const position = { lat: center.lat, lng: center.lng };
    state.toiletPosition = position;
    queryNearbyToilets(position);
  });

  els.contactForm.elements.city.value = state.city;
  updateContactServiceMode();
  updateFavoriteCount();
  renderSources();
  renderPhrase();
})();
