(function () {
  "use strict";

  const FAVORITES_KEY = "heitu-favorites-v1";
  const CITY_KEY = "heitu-city-v1";
  const WAYBACK_KEY = "heitu-wayback-places-v1";
  const UPDATE_SEEN_KEY = "heitu-seen-updates-v1";
  // Only list entries with actual changes. Bump an entry's version when that section changes again.
  const ENTRY_UPDATES = Object.freeze({
    arrival: "20261006-arrival-samples-fixed",
    wayback: "20261006-arrival-preview",
    favorites: "20261006-onsen-stays-preview",
    "onsen-stays": "20261006-onsen-stays-preview",
    "food-hub": "20261006-gyudon-logos-order",
    "specialty-food-nearby": "20261005-specialty",
    "shopping-hub": "20261006-maid-cafe",
    onsen: "20261006-onsen-booking-help-top",
    "japanese-help": "20261005-translate",
    parking: "20261005-parking",
    contact: "20261005-contact"
  });
  const seenUpdates = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(UPDATE_SEEN_KEY) || "{}");
      return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
    } catch {
      return {};
    }
  })();
  function updateEntryKey(element) {
    return element?.dataset.updateKey || element?.dataset.toolId;
  }
  function refreshUpdateBadges() {
    document.querySelectorAll("button[data-update-key], button[data-tool-id]").forEach(button => {
      const key = updateEntryKey(button);
      const version = ENTRY_UPDATES[key];
      const badge = Array.from(button.children).find(child => child.classList.contains("update-badge"));
      if (!version || seenUpdates[key] === version) {
        badge?.remove();
      } else if (!badge) {
        const label = document.createElement("span");
        label.className = "update-badge";
        label.textContent = "有更新";
        button.append(label);
      }
    });
  }
  function markEntryUpdateSeen(button) {
    const key = updateEntryKey(button);
    const version = ENTRY_UPDATES[key];
    if (!version || seenUpdates[key] === version) return;
    seenUpdates[key] = version;
    try { localStorage.setItem(UPDATE_SEEN_KEY, JSON.stringify(seenUpdates)); } catch { /* Private browsing can block storage. */ }
    refreshUpdateBadges();
  }
  const WAYBACK_LIMIT = 10;
  const ANALYTICS_HOST = "heitun.pages.dev";
  const shareUtils = window.HeituShareUtils;
  let deferredInstallPrompt = null;
  const CONTACT_QR = {
    wechat: {
      title: "微信群二维码",
      src: "./wechat-group-qr.jpg",
      alt: "微信群二维码",
      hint: "使用微信扫码进群；二维码失效时，请复制微信号联系。"
    },
    line: {
      title: "LINE 联系二维码",
      src: "./line-contact-qr.jpg",
      alt: "LINE 联系二维码",
      hint: "使用 LINE 扫码添加，LINE ID：648627464。"
    },
    whatsapp: {
      title: "WhatsApp 联系二维码",
      src: "./whatsapp-contact-qr.jpg",
      alt: "WhatsApp 联系二维码",
      hint: "使用 WhatsApp 扫码添加；用户名：@kurobutajapan。"
    }
  };
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
    },
    freebus: {
      title: "东京站免费巡回巴士",
      emoji: "🚌",
      intro: "不是全东京免费：只跑东京站丸之内、日本桥一带，按你想去的区域选线路",
      phrase: "directions",
      summary: ["免费乘坐", "不用车票・Suica", "官网可看车辆位置"],
      note: "运营时间与到站时间可能因日期、活动和路况变化，出发前请以线路官网的实时信息为准。",
      items: [
        {
          id: "marunouchi",
          name: "去丸之内・大手町・日比谷",
          trust: "东京站西侧",
          description: "选「丸之内 Shuttle」。平日通常 10:00–19:00，周末及节假日 11:00–18:00，约 15–25 分钟一班。",
          schedule: "平日 10:00–19:00｜周末及节假日 11:00–18:00｜15–25分钟一班",
          badges: ["丸之内 Shuttle", "一圈约35–40分钟", "无需预约"],
          action: "看官方路线与实时车辆 ↗",
          url: "https://www.hinomaru-bus.co.jp/free-shuttle/marunouchi/",
          stops: [
            ["新丸大厦", "新丸ビル", 35.6825, 139.7647222], ["大手町塔", "大手町タワー", 35.6853056, 139.7657778], ["东京产经大楼", "東京サンケイビル", 35.6868611, 139.7661111], ["镰仓桥・大手町Gate大楼", "鎌倉河岸・大手町ゲートビル", 35.689349, 139.766748],
            ["三井物产", "三井物産", 35.6882778, 139.7625278], ["日经大楼", "日経ビル", 35.6886944, 139.7621111], ["经团联会馆・JA大楼", "経団連会館・JAビル", 35.6883889, 139.7627778], ["读卖新闻", "読売新聞", 35.688389, 139.7601971],
            ["三井住友银行", "三井住友銀行", 35.687313, 139.7613721], ["邮船大楼", "郵船ビル", 35.6816389, 139.76225], ["明治安田Village・静嘉堂", "明治安田ヴィレッジ・静嘉堂", 35.681625, 139.7596631], ["东京会馆", "東京會舘", 35.6775833, 139.7608056],
            ["第一生命", "第一生命", 35.6757778, 139.7601667], ["日比谷", "日比谷", 35.6743889, 139.7605556], ["新国际大楼", "新国際ビル", 35.6744, 139.7579691], ["三菱大楼", "三菱ビル", 35.67975, 139.7638889]
          ]
        },
        {
          id: "nihonbashi",
          name: "去日本桥・京桥・八重洲",
          trust: "东京站东侧",
          description: "选「Metro Link 日本桥」。每天通常 11:00–19:00，约 15–25 分钟一班。",
          schedule: "每天 11:00–19:00｜15–25分钟一班",
          badges: ["日本桥线", "一圈约40分钟", "无需预约"],
          action: "看官方路线与实时车辆 ↗",
          url: "https://www.hinomaru-bus.co.jp/free-shuttle/nihonbashi/",
          stops: [
            ["东京站八重洲口", "東京駅八重洲口", 35.6830278, 139.7705], ["吴服桥", "呉服橋", 35.6833056, 139.7719167], ["地铁日本桥站", "地下鉄日本橋駅", 35.6831389, 139.7738611], ["地铁三越前站", "地下鉄三越前駅", 35.6850556, 139.77425],
            ["三井纪念美术馆", "三井記念美術館", 35.6869444, 139.7733333], ["新日本桥站", "新日本橋駅", 35.6883333, 139.7733333], ["日本桥室町1丁目", "日本橋室町１丁目", 35.6865, 139.7740556], ["日本桥南端", "日本橋南詰", 35.6832222, 139.7742778],
            ["日本桥高岛屋", "日本橋高島屋", 35.6808333, 139.7727778], ["日本桥3丁目", "日本橋３丁目", 35.68, 139.7722222], ["地铁宝町站", "地下鉄宝町駅", 35.68, 139.7696473], ["京桥2丁目", "京橋２丁目", 35.6769444, 139.77],
            ["京桥1丁目", "京橋１丁目", 35.6786111, 139.7711111], ["八重洲地下街", "ヤエチカ", 35.6794722, 139.7707222]
          ]
        },
        {
          id: "nihonbashi-eline",
          name: "去人形町・滨町・兜町",
          trust: "范围更远",
          description: "选「Metro Link 日本桥 E线」。每天通常 11:00–18:00，约 25–28 分钟一班。",
          schedule: "每天 11:00–18:00｜25–28分钟一班",
          badges: ["日本桥 E线", "人形町・滨町", "无需预约"],
          action: "看官方路线与实时车辆 ↗",
          url: "https://www.hinomaru-bus.co.jp/free-shuttle/nihonbashi_eline/",
          stops: [
            ["东京站八重洲口", "東京駅八重洲口", 35.6830278, 139.7705], ["地铁三越前站", "地下鉄三越前駅", 35.6850556, 139.77425], ["日本桥室町1丁目", "日本橋室町１丁目", 35.6865, 139.7740556], ["堀留町", "堀留町", 35.6880556, 139.7798056],
            ["富泽町", "富沢町", 35.6896667, 139.7825278], ["滨町2丁目・明治座前", "浜町２丁目明治座前", 35.6879167, 139.7866389], ["滨町3丁目・Tornare前", "浜町３丁目トルナーレ前", 35.6851667, 139.7875833], ["地铁水天宫前站", "地下鉄水天宮前駅", 35.6821111, 139.78625],
            ["东京城市航空总站", "東京シティエアターミナル", 35.6816111, 139.7872778], ["人形町1丁目", "人形町１丁目", 35.6844722, 139.7823889], ["茅场町・兜町东证前", "茅場町・兜町東証前", 35.6818333, 139.77925], ["日本桥高岛屋", "日本橋高島屋", 35.6808333, 139.7727778],
            ["八重洲地下街", "ヤエチカ", 35.6794722, 139.7707222]
          ]
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
    waybackPlaces: readWaybackPlaces(),
    waybackDraft: null,
    activeWaybackPlace: null,
    sharedPlace: shareUtils?.sharedPlaceFromUrl(location.href) || null,
    city: localStorage.getItem(CITY_KEY) || "东京",
    activeBusRoute: "marunouchi",
    toiletMap: null,
    toiletUserMarker: null,
    toiletMarkers: [],
    toiletPosition: null,
    toiletPlaces: [],
    toiletLoading: false,
    contactStep: "choose",
    contactPath: "travel"
  };

  const els = {
    toast: document.querySelector("#toast"),
    cityDialog: document.querySelector("#cityDialog"),
    comingDialog: document.querySelector("#comingDialog"),
    contactQrDialog: document.querySelector("#contactQrDialog"),
    supplyChoiceDialog: document.querySelector("#supplyChoiceDialog"),
    sushiChoiceDialog: document.querySelector("#sushiChoiceDialog"),
    gyudonChoiceDialog: document.querySelector("#gyudonChoiceDialog"),
    specialtyChoiceDialog: document.querySelector("#specialtyChoiceDialog"),
    ramenChoiceDialog: document.querySelector("#ramenChoiceDialog"),
    wagyuChoiceDialog: document.querySelector("#wagyuChoiceDialog"),
    izakayaChoiceDialog: document.querySelector("#izakayaChoiceDialog"),
    tempuraChoiceDialog: document.querySelector("#tempuraChoiceDialog"),
    noodleChoiceDialog: document.querySelector("#noodleChoiceDialog"),
    cutletChoiceDialog: document.querySelector("#cutletChoiceDialog"),
    riceChoiceDialog: document.querySelector("#riceChoiceDialog"),
    hotpotChoiceDialog: document.querySelector("#hotpotChoiceDialog"),
    curryChoiceDialog: document.querySelector("#curryChoiceDialog"),
    sweetsChoiceDialog: document.querySelector("#sweetsChoiceDialog"),
    kansaiChoiceDialog: document.querySelector("#kansaiChoiceDialog"),
    mapChoiceDialog: document.querySelector("#mapChoiceDialog"),
    waybackNavDialog: document.querySelector("#waybackNavDialog"),
    saveSiteDialog: document.querySelector("#saveSiteDialog"),
    sharedPlaceDialog: document.querySelector("#sharedPlaceDialog"),
    sourceList: document.querySelector("#sourceList"),
    sourceTitle: document.querySelector("#sourceTitle"),
    sourceIntro: document.querySelector("#sourceIntro"),
    sourceEmoji: document.querySelector("#sourceEmoji"),
    sourceSummary: document.querySelector("#sourceSummary"),
    sourceNote: document.querySelector("#sourceNote"),
    sourceHow: document.querySelector("#sourceHow"),
    sourceAssistant: document.querySelector("#sourceAssistant"),
    sourceJapanese: document.querySelector("#sourceJapanese"),
    destinationInput: document.querySelector("#destinationInput"),
    detectedCard: document.querySelector("#detectedCard"),
    detectedText: document.querySelector("#detectedText"),
    japanesePhrase: document.querySelector("#japanesePhrase"),
    chinesePhrase: document.querySelector("#chinesePhrase"),
    phraseDestination: document.querySelector("#phraseDestination"),
    smokingSafety: document.querySelector("#smokingSafety"),
    favoriteList: document.querySelector("#favoriteList"),
    waybackCapture: document.querySelector("#waybackCapture"),
    waybackList: document.querySelector("#waybackList"),
    waybackCount: document.querySelector("#waybackCount"),
    contactForm: document.querySelector("#contactForm")
  };

  function openContactQr(kind) {
    const qr = CONTACT_QR[kind];
    if (!qr || !els.contactQrDialog) return;
    const title = document.querySelector("#contactQrTitle");
    const image = document.querySelector("#contactQrImage");
    const hint = document.querySelector("#contactQrHint");
    title.textContent = qr.title;
    image.src = qr.src;
    image.alt = qr.alt;
    hint.textContent = qr.hint;
    els.contactQrDialog.showModal();
  }

  function recordMetric(event, tool = "site") {
    if (location.hostname !== ANALYTICS_HOST) return;
    const payload = JSON.stringify({ event, tool });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/event", new Blob([payload], { type: "application/json" }));
      return;
    }
    fetch("/api/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true
    }).catch(() => {});
  }

  function recordOncePerSession(event, tool = "site") {
    const key = `heitu-metric:${event}:${tool}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch (_) {}
    recordMetric(event, tool);
  }

  function startToolAnalytics() {
    recordMetric("page_view");
    recordOncePerSession("session_start");

    const tools = document.querySelectorAll("[data-tool-id]");
    if (!("IntersectionObserver" in window)) {
      tools.forEach(tool => recordOncePerSession("tool_impression", tool.dataset.toolId));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.intersectionRatio < .5) return;
        const tool = entry.target.dataset.toolId;
        recordOncePerSession("tool_impression", tool);
        observer.unobserve(entry.target);
      });
    }, { threshold: [.5] });
    tools.forEach(tool => observer.observe(tool));
  }

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    toast("已添加到主屏幕");
  });

  function readFavorites() {
    try {
      const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function readWaybackPlaces() {
    try {
      const parsed = JSON.parse(localStorage.getItem(WAYBACK_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.slice(0, WAYBACK_LIMIT) : [];
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
      description: "还能忍一忍，我选个环境。覆盖日本全国 · 可定位当前位置 · 需要当地网络才能打开哦！"
    } : options.community;
    document.querySelector("#mapChoiceTitle").textContent = community ? `${label}，怎么找？` : `${label}，用哪个地图？`;
    const mapChoiceIntro = document.querySelector("#mapChoiceIntro");
    mapChoiceIntro.hidden = label === "泡个温泉";
    mapChoiceIntro.textContent = options.intro || (community
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
    document.querySelector("#mapChoiceGoogle strong").textContent = options.googleName || "Google 地图";
    document.querySelector("#mapChoiceAmap small").textContent = options.amapDescription || "中国手机更方便 · 日本地点可能较少";
    document.querySelector("#mapChoiceApple small").textContent = options.appleDescription || "适合 iPhone";
    document.querySelector("#mapChoiceGoogle").href = mapSearchUrl("google", query);
    const amapLink = document.querySelector("#mapChoiceAmap");
    const amapQuery = options.amapQuery || query;
    amapLink.dataset.requireCurrentLocation = options.amapCurrentLocation === true ? "true" : "false";
    amapLink.dataset.locationQuery = amapQuery;
    amapLink.href = options.amapCurrentLocation === true ? "#" : mapSearchUrl("amap", amapQuery);
    document.querySelector("#mapChoiceAmapCopy").dataset.keyword = options.amapManualQuery || query;
    const amapCopyLabel = document.querySelector("#mapChoiceAmapCopyLabel");
    amapCopyLabel.textContent = options.amapCopyLabel || "复制日文词，手动搜索";
    amapCopyLabel.dataset.originalLabel = amapCopyLabel.textContent;
    document.querySelector(".map-choice-amap-tip").textContent = options.amapTip || "若高德跳到中国或没搜到附近：先把地图移到日本，再粘贴上面的日文词搜索。";
    document.querySelector("#mapChoiceAmapKeyword").textContent = options.amapManualQuery || query;
    const onsenManualSearch = label === "泡个温泉";
    document.querySelector("#mapChoiceOnsenHelp").hidden = !onsenManualSearch;
    document.querySelector("#mapChoiceAmapCopyHint").hidden = !onsenManualSearch;
    document.querySelector("#mapChoiceOnsenPrivateCopy").hidden = !onsenManualSearch;
    const appleLink = document.querySelector("#mapChoiceApple");
    appleLink.href = mapSearchUrl("apple", query);
    if (onsenManualSearch) {
      document.querySelector(".map-choice-grid").append(appleLink);
    } else {
      document.querySelector(".map-choice-grid").insertBefore(appleLink, communityLink);
    }
    els.mapChoiceDialog.showModal();
  }

  function go(view, remember = true) {
    if (remember && state.view !== view) state.previousView = state.view;
    state.view = view;
    const exploreContext = ["favorites", "food", "shopping", "onsen-stays"].includes(view);
    document.querySelector(".brand").classList.toggle("brand--explore", exploreContext);
    document.querySelector("#brandTagline").textContent = exploreContext
      ? "定位离你最近的日本美食、二次元周边、数码卖场和百货店。"
      : "定位离你最近的厕所、吸烟区、商超便利店等。";
    document.querySelectorAll(".view").forEach(section => section.classList.toggle("active", section.dataset.view === view));
    document.querySelectorAll(".bottom-nav [data-go]").forEach(button => {
      const target = button.dataset.go;
      const active = target === view || (target === "home" && ["toilet-map", "sources", "navigator", "japanese", "wayback", "arrival", "seasonal"].includes(view)) || (target === "favorites" && ["food", "shopping", "onsen-stays"].includes(view));
      button.classList.toggle("active", active);
    });
    if (view === "favorites") renderFavorites();
    if (view === "japanese") renderPhrase();
    if (view === "wayback") renderWaybackPlaces();
    if (view === "contact") {
      const inquirySummary = document.querySelector("#inquirySummary");
      inquirySummary.hidden = true;
      delete inquirySummary.dataset.copyText;
      showContactStep("channels", "profile");
    }
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
    els.sourceEmoji.style.background = state.category === "smoking" ? "#f5dfbc" : state.category === "freebus" ? "#ffe6c7" : "#dceaf7";
    els.sourceSummary.hidden = !group.summary;
    els.sourceSummary.innerHTML = group.summary ? group.summary.map(item => `<span>✓ ${escapeHtml(item)}</span>`).join("") : "";
    els.sourceNote.hidden = !group.note;
    els.sourceNote.textContent = group.note || "";
    const showHelper = state.category !== "freebus";
    els.sourceHow.hidden = !showHelper;
    els.sourceAssistant.hidden = !showHelper;
    els.sourceJapanese.hidden = !showHelper;
    els.sourceList.innerHTML = state.category === "freebus" ? renderBusRoutes(group.items) : group.items.map(item => `
      <article class="source-card">
        <div class="source-top"><h2>${escapeHtml(item.name)}</h2><span>${escapeHtml(item.trust)}</span></div>
        <p>${escapeHtml(item.description)}</p>
        <div class="badge-row">${item.badges.map(badge => `<span>${escapeHtml(badge)}</span>`).join("")}</div>
        <a class="source-open" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.action || "直接打开地图 ↗")}</a>
      </article>
    `).join("");
  }

  function renderBusRoutes(routes) {
    return routes.map(route => {
      const open = route.id === state.activeBusRoute;
      const split = Math.ceil(route.stops.length / 2);
      const left = route.stops.slice(0, split);
      const right = route.stops.slice(split).reverse();
      const stopHtml = (stop, index, side) => {
        const number = side === "left" ? index + 1 : route.stops.length - index;
        return `<div class="bus-stop ${number === 1 || number === route.stops.length ? "featured" : ""}"><i></i><span><strong>${String(number).padStart(2, "0")} ${escapeHtml(stop[0])}</strong><small lang="ja">${escapeHtml(stop[1])}</small></span></div>`;
      };
      return `
        <article class="bus-route-card ${open ? "open" : ""}">
          <button class="bus-route-heading" type="button" data-route-toggle="${escapeHtml(route.id)}" aria-expanded="${open}">
            <span><strong>${escapeHtml(route.name)}</strong><small>${escapeHtml(route.badges[0])} · ${escapeHtml(route.badges[1])}</small></span>
            <em>${escapeHtml(route.trust)}</em><b>${open ? "⌃" : "⌄"}</b>
          </button>
          <div class="bus-route-detail" ${open ? "" : "hidden"}>
            <p class="bus-schedule">🕒 ${escapeHtml(route.schedule)}</p>
            <button class="bus-map-toggle" type="button" data-route-toggle="${escapeHtml(route.id)}">线路图已展开　⌃</button>
            <section class="bus-loop-map" aria-label="${escapeHtml(route.name)}站点线路图">
              <div class="bus-map-head"><strong>全线 ${route.stops.length} 站</strong><span>保留官方日文站名，方便搜索</span></div>
              <div class="bus-loop"><div class="bus-stops">${left.map((stop, index) => stopHtml(stop, index, "left")).join("")}</div><div class="bus-stops right">${right.map((stop, index) => stopHtml(stop, index, "right")).join("")}</div></div>
              <div class="bus-direction"><span>↓ 行驶方向</span><span>行驶方向 ↑</span></div>
            </section>
            <section class="bus-boarding"><strong>不知道去哪个站上车？</strong><p>定位后显示离你最近的3个站，再用手机地图步行过去。</p><button class="bus-nearest" type="button" data-bus-nearest="${escapeHtml(route.id)}">⌖ 定位离我最近的上车点</button><div class="bus-nearest-results" data-bus-results="${escapeHtml(route.id)}" hidden></div></section>
            <p class="bus-official-note">线路、站点和实时位置可能临时调整，请优先查看官网。</p>
            <div class="bus-route-actions"><a class="bus-live-link" href="${escapeHtml(route.url)}#realtime" target="_blank" rel="noopener">🚌 查询车辆实时位置</a><a class="bus-official-link" href="${escapeHtml(route.url)}" target="_blank" rel="noopener">官方完整路线与运行信息</a></div>
          </div>
        </article>`;
    }).join("");
  }

  function locateNearestBusStops(routeId, button) {
    const route = SOURCES.freebus.items.find(item => item.id === routeId);
    const results = document.querySelector(`[data-bus-results="${routeId}"]`);
    if (!route || !results) return;
    if (!navigator.geolocation) {
      results.hidden = false;
      results.innerHTML = "<p>这台设备不支持定位，请直接打开官方路线查看上车点。</p>";
      return;
    }
    button.disabled = true;
    button.textContent = "正在定位…";
    navigator.geolocation.getCurrentPosition(position => {
      const current = { lat: position.coords.latitude, lng: position.coords.longitude };
      const nearest = route.stops.map((stop, index) => ({ stop, index, distance: distanceMeters(current, { lat: stop[2], lng: stop[3] }) })).sort((a, b) => a.distance - b.distance).slice(0, 3);
      results.hidden = false;
      results.innerHTML = `<strong>离你最近的上车点</strong>${nearest.map(({ stop, index, distance }) => `<button type="button" data-bus-stop-nav="${routeId}" data-bus-stop-index="${index}"><span><b>${escapeHtml(stop[0])}</b><small lang="ja">${escapeHtml(stop[1])}</small></span><em>${distance < 1000 ? `${Math.round(distance)}米` : `${(distance / 1000).toFixed(1)}公里`}　去这里 ›</em></button>`).join("")}<p>距离为直线估算；实际步行路线请以地图软件为准。</p>`;
      button.disabled = false;
      button.textContent = "⌖ 重新定位附近上车点";
    }, () => {
      results.hidden = false;
      results.innerHTML = "<p>没有取得位置。请开启浏览器定位权限后重试。</p>";
      button.disabled = false;
      button.textContent = "⌖ 再试一次";
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 });
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
    const homeFavoriteCount = document.querySelector("#homeFavoriteCount");
    if (homeFavoriteCount) homeFavoriteCount.textContent = count;
    const navCount = document.querySelector("#navFavoriteCount");
    navCount.textContent = count;
    navCount.hidden = count === 0;
  }

  function renderFavorites() {
    const savedPlacesBlock = document.querySelector("#savedPlacesBlock");
    if (!state.favorites.length) {
      if (savedPlacesBlock) savedPlacesBlock.hidden = true;
      els.favoriteList.innerHTML = "";
      return;
    }
    if (savedPlacesBlock) savedPlacesBlock.hidden = false;
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

  function publicSiteUrl() {
    return shareUtils ? shareUtils.publicSiteUrl(location.href) : location.href.split("#")[0];
  }

  async function shareSite() {
    const url = publicSiteUrl();
    const data = {
      title: "随便O｜日本旅行工具箱",
      text: "来日本把这个存一下｜厕所、吸烟点、行李寄存、路痴救星等旅行小工具",
      url
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
        toast("已打开分享菜单");
        return;
      } catch (error) {
        if (error && error.name === "AbortError") return;
      }
    }
    await copyText(url, "分享链接已复制");
  }

  function saveEnvironment() {
    if (!shareUtils) return "desktop";
    return shareUtils.detectSaveEnvironment(navigator.userAgent, {
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints,
      standalone: window.matchMedia?.("(display-mode: standalone)")?.matches || navigator.standalone === true,
      installAvailable: Boolean(deferredInstallPrompt)
    });
  }

  function openSaveSiteGuide() {
    const environment = saveEnvironment();
    const title = document.querySelector("#saveSiteTitle");
    const guide = document.querySelector("#saveSiteGuide");
    const installButton = document.querySelector("#installSiteButton");
    const content = shareUtils.saveGuide(environment);
    installButton.hidden = !content.showInstall;
    title.textContent = content.title;
    guide.innerHTML = `<strong>${content.heading}</strong><p>${content.html}</p>`;
    els.saveSiteDialog.showModal();
  }

  async function promptInstallSite() {
    if (!deferredInstallPrompt) {
      openSaveSiteGuide();
      return;
    }
    const prompt = deferredInstallPrompt;
    deferredInstallPrompt = null;
    await prompt.prompt();
    const result = await prompt.userChoice;
    if (result?.outcome === "accepted") {
      els.saveSiteDialog.close();
      toast("已添加到主屏幕");
    } else {
      openSaveSiteGuide();
    }
  }

  function waybackIcon(label) {
    return ({ "当前地点": "📍", "下车点": "🚕", "酒店": "🏨", "车站出口": "🚉", "商场门口": "🏬" })[label] || "📍";
  }

  function formatWaybackTime(timestamp) {
    const language = window.HeituI18n?.getLanguage?.() || "zh-Hans";
    const locale = language === "en" ? "en-US" : language === "zh-Hant" ? "zh-TW" : "zh-CN";
    return new Intl.DateTimeFormat(locale, { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(timestamp));
  }

  function persistWaybackPlaces() {
    localStorage.setItem(WAYBACK_KEY, JSON.stringify(state.waybackPlaces));
  }

  function waybackCopyText(place) {
    return [
      `${waybackIcon(place.label)} ${place.label}`,
      place.address,
      place.note ? `提醒：${place.note}` : "",
      `坐标：${Number(place.lat).toFixed(6)}, ${Number(place.lng).toFixed(6)}`
    ].filter(Boolean).join("\n");
  }

  function renderWaybackPlaces() {
    if (!els.waybackList) return;
    els.waybackCount.textContent = `${state.waybackPlaces.length} / ${WAYBACK_LIMIT}`;
    if (!state.waybackPlaces.length) {
      els.waybackList.innerHTML = `<div class="wayback-empty"><span>🧭</span><strong>还没记住任何地方</strong><p>下车、出站或离开酒店前，点一次“记住这儿”。</p></div>`;
      return;
    }
    els.waybackList.innerHTML = state.waybackPlaces.map(place => `
      <article class="wayback-place">
        <div class="wayback-place-top">
          <div class="wayback-place-title"><span class="wayback-place-icon">${waybackIcon(place.label)}</span><span><strong>${escapeHtml(place.label)}</strong><small>${escapeHtml(formatWaybackTime(place.savedAt))}</small></span></div>
          <button class="wayback-delete" type="button" data-wayback-delete="${escapeHtml(place.id)}">删除</button>
        </div>
        <p class="wayback-place-address" lang="ja">${escapeHtml(place.address)}</p>
        ${place.note ? `<p class="wayback-place-note">💬 ${escapeHtml(place.note)}</p>` : ""}
        <p class="wayback-place-coords" data-no-i18n>${Number(place.lat).toFixed(6)}, ${Number(place.lng).toFixed(6)}</p>
        <div class="wayback-place-actions"><button class="wayback-navigate" type="button" data-wayback-navigate="${escapeHtml(place.id)}">↩️ 原路回</button><button class="wayback-share" type="button" data-wayback-share="${escapeHtml(place.id)}">↗ 分享位置</button><button class="wayback-copy" type="button" data-wayback-copy="${escapeHtml(place.id)}">复制位置</button></div>
      </article>
    `).join("");
  }

  async function reverseGeocodeWayback(position) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat.toFixed(7)}&lon=${position.lng.toFixed(7)}&zoom=18&addressdetails=1&accept-language=ja`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("reverse geocoding failed");
    const data = await response.json();
    return data.display_name || "日文地址暂时获取不到，请按坐标导航";
  }

  function locateWayback() {
    const button = document.querySelector("#rememberHere");
    if (!navigator.geolocation) {
      toast("这台设备不支持定位，暂时不能记住位置");
      return;
    }
    if (button.dataset.locating === "true") return;
    button.dataset.locating = "true";
    button.querySelector("strong").textContent = "正在定位…";
    navigator.geolocation.getCurrentPosition(async result => {
      const position = { lat: result.coords.latitude, lng: result.coords.longitude };
      button.dataset.locating = "false";
      button.querySelector("strong").textContent = "记住这儿";
      if (!isValidPosition(position)) {
        toast("取得的位置格式不正确，请重新定位");
        return;
      }
      state.waybackDraft = {
        lat: position.lat,
        lng: position.lng,
        accuracy: Math.round(result.coords.accuracy || 0),
        address: "正在获取日文地址…"
      };
      document.querySelector("#waybackAddress").textContent = state.waybackDraft.address;
      document.querySelector("#waybackCoordinates").textContent = `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`;
      document.querySelector("#waybackAccuracy").textContent = state.waybackDraft.accuracy ? `约 ${state.waybackDraft.accuracy} 米` : "已定位";
      els.waybackCapture.hidden = false;
      els.waybackCapture.scrollIntoView({ behavior: "smooth", block: "center" });
      try {
        state.waybackDraft.address = await reverseGeocodeWayback(position);
      } catch (_) {
        state.waybackDraft.address = "日文地址暂时获取不到，请按坐标导航";
      }
      document.querySelector("#waybackAddress").textContent = state.waybackDraft.address;
    }, error => {
      button.dataset.locating = "false";
      button.querySelector("strong").textContent = "记住这儿";
      const message = error && error.code === 1
        ? "你没有允许定位，打开浏览器位置权限后再试"
        : "定位失败，请到室外或网络稳定后再试";
      toast(message);
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 });
  }

  function saveWaybackPlace() {
    if (!state.waybackDraft || !isValidPosition(state.waybackDraft)) {
      toast("请先点“记住这儿”取得当前位置");
      return;
    }
    if (state.waybackPlaces.length >= WAYBACK_LIMIT) {
      toast("最多保存 10 个，请先删除一个旧地点");
      return;
    }
    const selected = document.querySelector('input[name="waybackLabel"]:checked');
    const place = {
      id: `${Date.now()}`,
      label: selected?.value || "当前地点",
      address: state.waybackDraft.address,
      lat: state.waybackDraft.lat,
      lng: state.waybackDraft.lng,
      note: document.querySelector("#waybackNote").value.trim(),
      savedAt: Date.now()
    };
    state.waybackPlaces.unshift(place);
    persistWaybackPlaces();
    renderWaybackPlaces();
    state.waybackDraft = null;
    els.waybackCapture.hidden = true;
    document.querySelector("#waybackNote").value = "";
    document.querySelector('input[name="waybackLabel"][value="当前地点"]').checked = true;
    toast("黑豚帮你记住啦");
    document.querySelector("#waybackSaved").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openWaybackNavigation(place) {
    if (!place || !isValidPosition(place)) return;
    state.activeWaybackPlace = place;
    const destination = `${Number(place.lat).toFixed(6)},${Number(place.lng).toFixed(6)}`;
    document.querySelector("#waybackNavLabel").textContent = `${waybackIcon(place.label)} ${place.label}`;
    document.querySelector("#waybackNavAddress").textContent = place.address;
    const note = document.querySelector("#waybackNavNote");
    note.textContent = place.note ? `提醒：${place.note}` : "";
    note.hidden = !place.note;
    document.querySelector("#waybackGoogle").href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`;
    document.querySelector("#waybackApple").href = `https://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=w`;
    document.querySelector("#waybackAmap").href = `https://uri.amap.com/navigation?to=${Number(place.lng).toFixed(6)},${Number(place.lat).toFixed(6)},${encodeURIComponent(place.label)}&mode=walk&coordinate=wgs84&callnative=1&src=heitu`;
    els.waybackNavDialog.showModal();
  }

  async function shareWaybackPlace(place) {
    if (!place || !isValidPosition(place) || !shareUtils) return;
    const url = shareUtils.sharedPlaceUrl(location.href, place);
    if (!url) {
      toast("这个位置暂时无法分享");
      return;
    }
    const data = {
      title: `${place.label}｜随便O位置分享`,
      text: waybackCopyText(place),
      url
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
        toast("已打开位置分享菜单");
        return;
      } catch (error) {
        if (error && error.name === "AbortError") return;
      }
    }
    await copyText(url, "位置分享链接已复制");
  }

  function showSharedPlace(place) {
    if (!place || !isValidPosition(place)) return;
    const destination = `${Number(place.lat).toFixed(6)},${Number(place.lng).toFixed(6)}`;
    document.querySelector("#sharedPlaceLabel").textContent = `${waybackIcon(place.label)} ${place.label}`;
    document.querySelector("#sharedPlaceAddress").textContent = place.address;
    const note = document.querySelector("#sharedPlaceNote");
    note.textContent = place.note ? `提醒：${place.note}` : "";
    note.hidden = !place.note;
    document.querySelector("#sharedPlaceCoords").textContent = destination;
    document.querySelector("#sharedPlaceGoogle").href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`;
    document.querySelector("#sharedPlaceApple").href = `https://maps.apple.com/?daddr=${encodeURIComponent(destination)}&dirflg=w`;
    document.querySelector("#sharedPlaceAmap").href = `https://uri.amap.com/navigation?to=${Number(place.lng).toFixed(6)},${Number(place.lat).toFixed(6)},${encodeURIComponent(place.label)}&mode=walk&coordinate=wgs84&callnative=1&src=heitu`;
    els.sharedPlaceDialog.showModal();
  }

  function buildInquiry() {
    const data = new FormData(els.contactForm);
    const services = data.getAll("service");
    return [
      "你好，黑豚君，我想咨询日本旅行服务：",
      `需求：${services.length ? services.join("、") : "还没想好"}`,
      `时间：${data.get("timing") || "还没确定"}`
    ].join("\n");
  }

  function showContactStep(step, path = state.contactPath) {
    state.contactStep = step;
    state.contactPath = path;
    const stepNumber = step === "choose" ? 1 : step === "travel" ? 2 : 3;
    document.querySelectorAll("[data-contact-step]").forEach(section => {
      const active = section.dataset.contactStep === step;
      section.hidden = !active;
      section.classList.toggle("active", active);
    });
    document.querySelectorAll("[data-contact-progress]").forEach(item => {
      const itemStep = Number(item.dataset.contactProgress);
      item.classList.toggle("active", itemStep === stepNumber);
      item.classList.toggle("done", itemStep < stepNumber);
    });
    if (step === "choose") els.contactForm.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const contactSphere = document.querySelector("#contactWordSphere");
  document.querySelector("#contactSeeIdeas").addEventListener("click", () => document.querySelector("#contactIdeasTitle").scrollIntoView({ behavior: "smooth", block: "start" }));
  const contactWords = [...contactSphere.querySelectorAll("button")];
  const contactSphereToggle = document.querySelector("#contactSphereToggle");
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const contactSpherePageSize = 14;
  let contactSphereAngle = 0;
  let contactSphereTilt = 0;
  let contactSphereWindow = Math.max(0, contactWords.length - contactSpherePageSize);
  let contactSphereLastSwap = Date.now();
  let contactSpherePaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function drawContactSphere() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      contactWords.forEach(button => {
        button.style.display = "";
        button.style.transform = "none";
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
      });
      return;
    }
    const visibleCount = Math.min(contactSpherePageSize, contactWords.length);
    const activeWords = Array.from({ length: visibleCount }, (_, index) => contactWords[(contactSphereWindow + index) % contactWords.length]);
    contactWords.forEach(button => { button.style.display = activeWords.includes(button) ? "" : "none"; });
    const radius = Math.min(contactSphere.clientWidth * .36, 140);
    const cosine = Math.cos(contactSphereAngle);
    const sine = Math.sin(contactSphereAngle);
    const tiltCosine = Math.cos(contactSphereTilt);
    const tiltSine = Math.sin(contactSphereTilt);
    activeWords.forEach((button, index) => {
      const y = 1 - (index + .5) * 2 / activeWords.length;
      const ring = Math.sqrt(1 - y * y);
      const theta = index * goldenAngle;
      const x = Math.cos(theta) * ring;
      const z = Math.sin(theta) * ring;
      const projectedX = x * cosine + z * sine;
      const rotatedZ = z * cosine - x * sine;
      const projectedY = y * tiltCosine - rotatedZ * tiltSine;
      const depth = y * tiltSine + rotatedZ * tiltCosine;
      button.style.transform = `translate(-50%, -50%) translate(${(projectedX * radius).toFixed(1)}px, ${(projectedY * radius * .87).toFixed(1)}px) scale(${(.77 + (depth + 1) * .15).toFixed(2)})`;
      const visible = depth > -.22;
      button.style.opacity = visible ? String(.68 + (depth + .22) * .26) : "0";
      button.style.pointerEvents = visible ? "auto" : "none";
      button.style.zIndex = String(Math.round((depth + 1) * 100));
    });
  }
  function setContactSpherePaused(paused) {
    contactSpherePaused = paused;
    contactSphereToggle.textContent = paused ? "继续转动" : "暂停转动";
    contactSphereToggle.setAttribute("aria-pressed", String(paused));
  }
  contactWords.forEach(button => {
    button.addEventListener("pointerdown", () => setContactSpherePaused(true));
    button.addEventListener("click", () => {
      contactWords.forEach(item => item.classList.toggle("is-picked", item === button));
      document.querySelector("#contactIdeaPicked").textContent = button.textContent;
      setContactSpherePaused(true);
    });
  });
  let contactSphereDrag = null;
  let contactSphereIgnoreClick = false;
  contactSphere.addEventListener("pointerdown", event => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || (event.pointerType === "mouse" && event.button !== 0)) return;
    contactSphereDrag = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
    setContactSpherePaused(true);
  });
  contactSphere.addEventListener("pointermove", event => {
    if (!contactSphereDrag || contactSphereDrag.id !== event.pointerId) return;
    const dx = event.clientX - contactSphereDrag.x;
    const dy = event.clientY - contactSphereDrag.y;
    if (!contactSphereDrag.moved && Math.abs(dx) + Math.abs(dy) > 3) {
      contactSphereDrag.moved = true;
      contactSphere.setPointerCapture(event.pointerId);
      contactSphere.classList.add("is-dragging");
    }
    contactSphereAngle += dx * .008;
    contactSphereTilt = Math.max(-.7, Math.min(.7, contactSphereTilt + dy * .006));
    contactSphereDrag.x = event.clientX;
    contactSphereDrag.y = event.clientY;
    drawContactSphere();
  });
  function finishContactSphereDrag(event) {
    if (!contactSphereDrag || contactSphereDrag.id !== event.pointerId) return;
    if (contactSphereDrag.moved) {
      contactSphereIgnoreClick = true;
      window.setTimeout(() => { contactSphereIgnoreClick = false; }, 250);
    }
    contactSphereDrag = null;
    contactSphere.classList.remove("is-dragging");
    if (contactSphere.hasPointerCapture(event.pointerId)) contactSphere.releasePointerCapture(event.pointerId);
  }
  contactSphere.addEventListener("pointerup", finishContactSphereDrag);
  contactSphere.addEventListener("pointercancel", finishContactSphereDrag);
  contactSphere.addEventListener("click", event => {
    if (!contactSphereIgnoreClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    contactSphereIgnoreClick = false;
  }, true);
  contactSphereToggle.addEventListener("click", () => setContactSpherePaused(!contactSpherePaused));
  document.querySelector("#contactIdeaAsk").addEventListener("click", () => document.querySelector("#contactMethods").scrollIntoView({ behavior: "smooth", block: "center" }));
  window.addEventListener("resize", drawContactSphere);
  drawContactSphere();
  setContactSpherePaused(contactSpherePaused);
  window.setInterval(() => {
    if (contactSpherePaused || state.view !== "contact" || document.hidden) return;
    if (Date.now() - contactSphereLastSwap > 6500) {
      contactSphereWindow = (contactSphereWindow + 3) % contactWords.length;
      contactSphereLastSwap = Date.now();
    }
    contactSphereAngle += .012;
    drawContactSphere();
  }, 50);

  function submitTravelInquiry(event) {
    event.preventDefault();
    const data = new FormData(els.contactForm);
    if (!data.getAll("service").length) {
      toast("先选一个想聊的方向");
      els.contactForm.querySelector('input[name="service"]').focus();
      return;
    }
    if (!data.get("timing")) {
      toast("再选一下大概什么时候来");
      els.contactForm.querySelector('input[name="timing"]').focus();
      return;
    }
    document.querySelector("#inquirySummaryText").textContent = `${data.getAll("service").join("、")} · ${data.get("timing")}`;
    const inquirySummary = document.querySelector("#inquirySummary");
    delete inquirySummary.dataset.copyText;
    inquirySummary.hidden = false;
    recordOncePerSession("contact_form_complete", "travel");
    showContactStep("channels", "travel");
  }

  document.addEventListener("click", event => {
    markEntryUpdateSeen(event.target.closest("button[data-update-key], button[data-tool-id]"));
    const trackedTool = event.target.closest("[data-tool-id]");
    if (trackedTool) recordOncePerSession("tool_click", trackedTool.dataset.toolId);
    const contactChannel = event.target.closest("[data-contact-channel]");
    if (contactChannel) recordMetric("contact_channel_click", contactChannel.dataset.contactChannel);
    const contactIntro = event.target.closest("[data-contact-intro]");
    if (contactIntro) {
      const inquirySummary = document.querySelector("#inquirySummary");
      inquirySummary.hidden = true;
      delete inquirySummary.dataset.copyText;
      showContactStep("channels", "profile");
      return;
    }
    if (event.target.closest("[data-onsen-contact]")) {
      const picks = ["onsenStayView", "onsenStayWith", "onsenStayBath"]
        .map(name => document.querySelector(`input[name="${name}"]:checked`)?.value)
        .filter(Boolean);
      const selected = picks.length ? picks.join(" · ") : "还没选好，想请你推荐";
      const message = `你好，黑豚君，我想找温泉酒店住一晚。\n想法：${selected}\n日期、地点、预算：我再告诉你。`;
      go("contact");
      const inquirySummary = document.querySelector("#inquirySummary");
      document.querySelector("#inquirySummaryText").textContent = `温泉酒店 · ${selected}`;
      inquirySummary.dataset.copyText = message;
      inquirySummary.hidden = false;
      return;
    }
    const directContact = event.target.closest("[data-direct-contact]");
    if (directContact) {
      const openDialog = directContact.closest("dialog[open]");
      if (openDialog) openDialog.close();
      go("contact");
      document.querySelector("#inquirySummary").hidden = true;
      showContactStep("channels", "profile");
      return;
    }
    const shoppingOption = event.target.closest("[data-shopping-query]");
    if (shoppingOption) {
      const generic = shoppingOption.hasAttribute("data-shopping-generic");
      const latinBrand = shoppingOption.dataset.shoppingQuery === "H&M";
      const maidCafe = shoppingOption.dataset.shoppingQuery === "メイドカフェ";
      const bookstore = Boolean(shoppingOption.closest(".shopping-options--bookstores"));
      showMapChoice(shoppingOption.dataset.shoppingQuery, shoppingOption.dataset.shoppingLabel, {
        intro: maidCafe ? "先在地图上找附近的女仆咖啡厅，再看具体门店的费用、营业时间和评价。" : bookstore ? "先在地图里找附近书店，再点进具体门店看路线和营业时间。" : generic ? "先用地图看附近有哪些店，再点进具体门店确认卖什么、营业时间和路线。" : "先用地图看附近的搜索结果，再点进具体门店确认楼层、品牌和路线。",
        googleDescription: generic ? "用日文类别词搜索 · 需要当地网络才能打开哦！" : latinBrand ? "用品牌名搜索 · 需要当地网络才能打开哦！" : "用日文店名搜索 · 需要当地网络才能打开哦！",
        appleDescription: generic ? "用日文类别词搜索 · 适合 iPhone" : latinBrand ? "用品牌名搜索 · 适合 iPhone" : "用日文店名搜索 · 适合 iPhone",
        amapDescription: latinBrand ? "直接搜索品牌名 · 位置不对时可复制品牌名手动搜" : "直接搜索日文词 · 位置不对时可复制日文词手动搜",
        amapCopyLabel: latinBrand ? "复制品牌名，手动搜索" : undefined,
        amapTip: latinBrand ? "若高德跳到中国或没搜到附近：先把地图移到日本，再粘贴上面的品牌名搜索。" : undefined,
        note: maidCafe ? "部分店另外收座位费，进店前先看价格。" : bookstore ? "各分店规模、库存和营业时间不同，出发前看一下具体门店。" : shoppingOption.dataset.shoppingQuery === "リユースショップ"
          ? "搜索结果可能包含只收购、不零售的店；请看具体门店的照片、经营内容和营业时间。"
          : "地图只显示搜索结果，不保证附近有店、品牌有货或支持免税；请查看具体门店信息。"
      });
      return;
    }
    if (event.target.closest("[data-sushi-open]")) {
      els.sushiChoiceDialog.showModal();
      return;
    }
    const sushiOption = event.target.closest("[data-sushi-query]");
    if (sushiOption) {
      const query = sushiOption.dataset.sushiQuery;
      els.sushiChoiceDialog.close();
      showMapChoice(query, sushiOption.dataset.sushiLabel, {
        intro: "先在地图里搜索，再点进具体分店查看路线；搜索范围可能受地图当前区域影响。",
        googleDescription: "按日文店名搜索门店 · 需要当地网络才能打开哦！",
        appleDescription: "按日文店名搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文店名 · 如果位置不对，可复制日文词手动搜",
        note: "地图先显示搜索结果，不会直接导航；营业时间和排队情况请以具体门店信息为准。"
      });
      return;
    }
    if (event.target.closest("[data-gyudon-open]")) {
      els.gyudonChoiceDialog.showModal();
      return;
    }
    const gyudonOption = event.target.closest("[data-gyudon-query]");
    if (gyudonOption) {
      els.gyudonChoiceDialog.close();
      showMapChoice(gyudonOption.dataset.gyudonQuery, gyudonOption.dataset.gyudonLabel, {
        intro: "先在地图里搜索，再点进具体门店查看菜单和路线；搜索范围可能受地图当前区域影响。",
        googleDescription: "按日文店名搜索门店 · 需要当地网络才能打开哦！",
        appleDescription: "按日文店名搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文店名 · 如果位置不对，可复制日文词手动搜",
        note: "地图先显示搜索结果，不会直接导航；价格、菜单和营业时间请以具体门店为准。"
      });
      return;
    }
    if (event.target.closest("[data-ramen-open]")) {
      els.ramenChoiceDialog.showModal();
      return;
    }
    const ramenOption = event.target.closest("[data-ramen-query]");
    if (ramenOption) {
      const query = ramenOption.dataset.ramenQuery;
      els.ramenChoiceDialog.close();
      showMapChoice(query, ramenOption.dataset.ramenLabel, {
        intro: "先在地图里搜索，再点进具体门店查看路线；地图搜索结果不保证店里一定供应这种口味。",
        googleDescription: "按日文口味搜索拉面店 · 需要当地网络才能打开哦！",
        appleDescription: "按日文口味搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文口味 · 位置不对时可复制日文词手动搜",
        note: "地图先显示搜索结果，不会直接导航；菜单、营业时间和排队情况请以具体门店信息为准。"
      });
      return;
    }
    if (event.target.closest("[data-wagyu-open]")) {
      els.wagyuChoiceDialog.showModal();
      return;
    }
    const wagyuOption = event.target.closest("[data-wagyu-query]");
    if (wagyuOption) {
      els.wagyuChoiceDialog.close();
      showMapChoice(wagyuOption.dataset.wagyuQuery, wagyuOption.dataset.wagyuLabel, {
        intro: "先在地图里找附近的店，再点进具体门店看路线。搜索结果不保证菜单或套餐内容。",
        googleDescription: "按日文词搜索烧肉店 · 需要当地网络才能打开哦！",
        appleDescription: "按日文词搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文词 · 位置不对时可复制日文词手动搜",
        note: "烤肉自助不一定提供和牛；菜品、价格、时限和预约条件请以门店为准。"
      });
      return;
    }
    if (event.target.closest("[data-izakaya-open]")) {
      els.izakayaChoiceDialog.showModal();
      return;
    }
    const izakayaOption = event.target.closest("[data-izakaya-query]");
    if (izakayaOption) {
      els.izakayaChoiceDialog.close();
      showMapChoice(izakayaOption.dataset.izakayaQuery, izakayaOption.dataset.izakayaLabel, {
        intro: "先在地图里看附近的店，再点进具体门店查看路线。地图结果可能受当前区域影响。",
        googleDescription: "按日文词搜索居酒屋 · 需要当地网络才能打开哦！",
        appleDescription: "按日文词搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文词 · 位置不对时可复制日文词手动搜",
        note: "搜索结果不保证供应对应菜品；菜单、营业时间和预约情况请以门店为准。"
      });
      return;
    }
    if (event.target.closest("[data-tempura-open]")) {
      els.tempuraChoiceDialog.showModal();
      return;
    }
    const tempuraOption = event.target.closest("[data-tempura-query]");
    if (tempuraOption) {
      els.tempuraChoiceDialog.close();
      showMapChoice(tempuraOption.dataset.tempuraQuery, tempuraOption.dataset.tempuraLabel, {
        intro: "先在地图里找附近的店，再点进具体门店查看路线；搜索结果不保证菜单内容。",
        googleDescription: "按日文词搜索天妇罗 · 需要当地网络才能打开哦！",
        appleDescription: "按日文词搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文词 · 位置不对时可复制日文词手动搜",
        note: "同一家店可能提供多种吃法；菜单、价格和营业时间请以具体门店为准。"
      });
      return;
    }
    if (event.target.closest("[data-eel-open]")) {
      if (els.riceChoiceDialog.open) els.riceChoiceDialog.close();
      showMapChoice("うなぎ", "附近鳗鱼饭", {
        intro: "用日文搜索附近的鳗鱼料理店；想吃鳗鱼饭，请点进门店确认有うな丼或うな重。",
        googleDescription: "搜索附近鳗鱼料理店 · 需要当地网络才能打开哦！",
        appleDescription: "搜索附近鳗鱼料理店 · 适合 iPhone",
        amapDescription: "直接搜索日文词 · 位置不对时可复制日文词手动搜",
        note: "搜索结果不保证供应鳗鱼饭；菜单、价格、营业时间请以门店为准。"
      });
      return;
    }
    if (event.target.closest("[data-noodle-open]")) {
      els.noodleChoiceDialog.showModal();
      return;
    }
    const noodleOption = event.target.closest("[data-noodle-query]");
    if (noodleOption) {
      els.noodleChoiceDialog.close();
      showMapChoice(noodleOption.dataset.noodleQuery, noodleOption.dataset.noodleLabel, {
        intro: "先在地图里找附近的面店，再点进具体门店看路线。",
        googleDescription: "按日文词搜索面店 · 需要当地网络才能打开哦！",
        appleDescription: "按日文词搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文词 · 位置不对时可复制日文词手动搜",
        note: "菜单、营业时间和排队情况请以具体门店为准。"
      });
      return;
    }
    if (event.target.closest("[data-cutlet-open]")) {
      els.cutletChoiceDialog.showModal();
      return;
    }
    const cutletOption = event.target.closest("[data-cutlet-query]");
    if (cutletOption) {
      els.cutletChoiceDialog.close();
      showMapChoice(cutletOption.dataset.cutletQuery, cutletOption.dataset.cutletLabel, {
        intro: "猪排与牛排分开搜索；先点进具体门店确认菜单，再导航过去。",
        googleDescription: "按日文词搜索炸排店 · 需要当地网络才能打开哦！",
        appleDescription: "按日文词搜索 · 适合 iPhone",
        amapDescription: "直接搜索日文词 · 位置不对时可复制日文词手动搜",
        note: "搜索结果不保证供应对应肉类；菜单、价格和营业时间请以门店为准。"
      });
      return;
    }
    const newFoodChoices = [
      ["rice", els.riceChoiceDialog],
      ["hotpot", els.hotpotChoiceDialog],
      ["curry", els.curryChoiceDialog],
      ["sweets", els.sweetsChoiceDialog],
      ["kansai", els.kansaiChoiceDialog],
      ["specialty", els.specialtyChoiceDialog]
    ];
    for (const [kind, dialog] of newFoodChoices) {
      if (event.target.closest(`[data-${kind}-open]`)) {
        dialog.showModal();
        return;
      }
      const option = event.target.closest(`[data-${kind}-query]`);
      if (option) {
        dialog.close();
        showMapChoice(option.dataset[`${kind}Query`], option.dataset[`${kind}Label`], {
          intro: "先在地图里找附近的店，再点进具体门店确认菜单和路线。",
          googleDescription: "按日文词搜索附近的店 · 需要当地网络才能打开哦！",
          appleDescription: "按日文词搜索 · 适合 iPhone",
          amapDescription: "直接搜索日文词 · 位置不对时可复制日文词手动搜",
          note: "地图搜索结果不保证供应对应菜品；菜单、价格、营业时间请以具体门店为准。"
        });
        return;
      }
    }
    const saveSiteButton = event.target.closest("[data-save-site]");
    if (saveSiteButton) {
      openSaveSiteGuide();
      return;
    }
    const shareSiteButton = event.target.closest("[data-share-site]");
    if (shareSiteButton) {
      shareSite();
      return;
    }
    const waybackShare = event.target.closest("[data-wayback-share]");
    if (waybackShare) {
      const place = state.waybackPlaces.find(item => item.id === waybackShare.dataset.waybackShare);
      if (place) shareWaybackPlace(place);
      return;
    }
    const waybackNavigate = event.target.closest("[data-wayback-navigate]");
    if (waybackNavigate) {
      openWaybackNavigation(state.waybackPlaces.find(place => place.id === waybackNavigate.dataset.waybackNavigate));
      return;
    }
    const waybackCopy = event.target.closest("[data-wayback-copy]");
    if (waybackCopy) {
      const place = state.waybackPlaces.find(item => item.id === waybackCopy.dataset.waybackCopy);
      if (place) copyText(waybackCopyText(place), "完整位置已复制");
      return;
    }
    const waybackDelete = event.target.closest("[data-wayback-delete]");
    if (waybackDelete) {
      if (!window.confirm("确定删除这个记住的地点吗？")) return;
      state.waybackPlaces = state.waybackPlaces.filter(place => place.id !== waybackDelete.dataset.waybackDelete);
      persistWaybackPlaces();
      renderWaybackPlaces();
      toast("已删除这个地点");
      return;
    }

    const locatedAmapLink = event.target.closest('#mapChoiceAmap[data-require-current-location="true"]');
    if (locatedAmapLink) {
      event.preventDefault();
      openAmapAtCurrentPosition(locatedAmapLink);
      return;
    }
    const amapCopyButton = event.target.closest("#mapChoiceAmapCopy, #mapChoiceOnsenPrivateCopy");
    if (amapCopyButton) {
      copyText(amapCopyButton.dataset.keyword, `已复制「${amapCopyButton.dataset.keyword}」，请在高德地图中粘贴搜索`)
        .then(copied => {
          const isPrivateBath = amapCopyButton.id === "mapChoiceOnsenPrivateCopy";
          const label = document.querySelector(isPrivateBath ? "#mapChoiceOnsenPrivateCopyLabel" : "#mapChoiceAmapCopyLabel");
          const originalLabel = isPrivateBath ? "复制私汤日文词" : label.dataset.originalLabel || "复制日文词，手动搜索";
          label.textContent = copied ? "已复制，去高德粘贴搜索" : "复制失败，请手动输入右边日文词";
          clearTimeout(amapCopyButton.resetTimer);
          amapCopyButton.resetTimer = setTimeout(() => { label.textContent = originalLabel; }, 2800);
        });
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
        intro: "完全憋不住就直接用 Google 或 Apple 地图；还能忍一忍，再用全国厕所地图慢慢选环境。",
        amapCurrentLocation: true,
        amapQuery: "トイレ",
        amapManualQuery: "トイレ",
        googleDescription: "完全憋不住啦！日本地点较完整 · 需要当地网络才能打开哦！",
        appleDescription: "完全憋不住啦！适合 iPhone",
        amapDescription: "随缘，我控制得住，慢慢逛过去。中国手机更方便 · 日本厕所数据相对较少",
        note: "地图点位和开放情况可能变化，请结合距离和现场标识选择。"
      });
      return;
    }

    const onsenButton = event.target.closest("[data-onsen-choice]");
    if (onsenButton) {
      showMapChoice("日帰り温泉", "泡个温泉", {
        googleName: "日归温泉 · Google 地图",
        extraChoices: [
          {
            url: mapSearchUrl("google", "貸切温泉"),
            icon: "私",
            name: "找私汤／情侣家庭温泉（纹身 OK）",
            description: "私汤（貸切風呂／貸切温泉）通常可避开纹身限制，预约前请向店家确认；公共大浴场通常有限制，部分设施允许",
            className: "private-bath"
          }
        ],
        googleDescription: "日文搜索“日帰り温泉” · 不用住宿，泡完温泉就走 · 定位找附近最方便 · 需要当地网络才能打开哦！",
        amapDescription: "搜索“温泉” · 日本地点相对较少",
        note: "有私汤不代表整家设施一定允许纹身；温泉规则可能变化，出发前请查看详情或向店家确认。"
      });
      return;
    }

    const luggageButton = event.target.closest("[data-luggage-choice]");
    if (luggageButton) {
      showMapChoice("コインロッカー", "附近行李寄存", {
        community: {
          url: "https://www.coinlocker-navi.com/search/gps/",
          icon: "🧳",
          name: "コインロッカーなび",
          description: "按当前位置查投币柜和人工寄存 · 日本各地 · 第一推荐"
        },
        intro: "先按定位查附近投币柜和人工寄存；需要提前预约时，可以使用 ecbo cloak。",
        extraChoices: [
          {
            url: "https://cloak.ecbo.io/en/locations",
            icon: "予",
            name: "ecbo cloak 预约寄存",
            description: "咖啡店、便利店等寄存点 · 可查看空位并预约",
            className: "reservation"
          }
        ],
        googleDescription: "日文搜索“コインロッカー” · 定位找附近最方便 · 需要当地网络才能打开哦！",
        amapQuery: "行李寄存",
        amapDescription: "搜索“行李寄存” · 日本地点相对较少",
        note: "寄存点营业时间、尺寸和空位可能变化；大件行李或想确保有位置时，建议提前预约。"
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

    const supplyButton = event.target.closest("[data-supply-choice]");
    if (supplyButton) {
      els.supplyChoiceDialog.showModal();
      return;
    }
    const supplyOption = event.target.closest("[data-supply-kind]");
    if (supplyOption) {
      const supplyChoices = {
        convenience: {
          query: "コンビニ", label: "附近便利店",
          intro: "用日文“コンビニ”搜索附近便利店，适合临时补给、ATM和营业时间较晚时使用。",
          googleDescription: "日文搜索“コンビニ” · 地点更完整 · 需要当地网络才能打开哦！",
          amapQuery: "便利店", amapDescription: "搜索“便利店” · 日本地点可能较少",
          note: "营业时间以地图和店铺现场为准；部分门店并非24小时营业。"
        },
        supermarket: {
          query: "スーパーマーケット", label: "附近超市",
          intro: "用日文“スーパーマーケット”搜索附近超市，适合买熟食、便当和日常用品。",
          googleDescription: "日文搜索“スーパーマーケット” · 地点更完整 · 需要当地网络才能打开哦！",
          amapQuery: "超市", amapDescription: "搜索“超市” · 日本地点可能较少",
          note: "营业时间和休息日可能变化；傍晚以后部分熟食会有折扣。"
        },
        drugstore: {
          query: "ドラッグストア", label: "附近药妆店",
          intro: "用日文“ドラッグストア”搜索附近药妆店，可找药妆、护肤品和日用品。",
          googleDescription: "日文搜索“ドラッグストア” · 查看附近收录的店铺 · 需要当地网络才能打开哦！",
          amapQuery: "药妆店", amapDescription: "搜索“药妆店” · 日本地点可能较少",
          note: "地图收录不一定完整；营业时间、库存和免税条件请以店铺现场为准。"
        }
      };
      const choice = supplyChoices[supplyOption.dataset.supplyKind];
      if (!choice) return;
      els.supplyChoiceDialog.close();
      showMapChoice(choice.query, choice.label, choice);
      return;
    }

    if (event.target.closest("[data-parking-choice]")) {
      showMapChoice("コインパーキング", "附近收费停车场", {
        intro: "自驾游找临时收费车位。先在地图查看附近停车场，再选具体地点导航过去。",
        googleDescription: "日文搜索收费停车场 · 需要当地网络才能打开哦！",
        appleDescription: "日文搜索收费停车场 · 适合 iPhone",
        amapDescription: "直接搜索日文词 · 若位置不对，可复制日文词手动搜",
        note: "地图排序不保证最近，也不保证有空位；停车费用、营业时间、限高及付款方式请以现场标识为准。"
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
    const busRouteToggle = event.target.closest("[data-route-toggle]");
    if (busRouteToggle) {
      state.activeBusRoute = state.activeBusRoute === busRouteToggle.dataset.routeToggle ? "" : busRouteToggle.dataset.routeToggle;
      renderSources();
      return;
    }
    const busNearest = event.target.closest("[data-bus-nearest]");
    if (busNearest) {
      locateNearestBusStops(busNearest.dataset.busNearest, busNearest);
      return;
    }
    const busStopNav = event.target.closest("[data-bus-stop-nav]");
    if (busStopNav) {
      const route = SOURCES.freebus.items.find(item => item.id === busStopNav.dataset.busStopNav);
      const stop = route?.stops[Number(busStopNav.dataset.busStopIndex)];
      if (stop) showMapChoice(`${stop[1]} 無料巡回バス バス停`, `${stop[0]}上车点`, { intro: "选择手机里方便使用的地图，确认步行路线后再出发。", note: "站点可能临时调整，到达后请核对现场站牌和官网信息。" });
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
    if (els.contactForm.elements.city) els.contactForm.elements.city.value = state.city;
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
  document.querySelector("#rememberHere").addEventListener("click", locateWayback);
  document.querySelector("#returnHere").addEventListener("click", () => {
    renderWaybackPlaces();
    document.querySelector("#waybackSaved").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelector("#saveWaybackPlace").addEventListener("click", saveWaybackPlace);
  document.querySelector("#copyWaybackPlace").addEventListener("click", () => {
    if (state.activeWaybackPlace) copyText(waybackCopyText(state.activeWaybackPlace), "完整位置已复制");
  });
  document.querySelector("#copySiteLink").addEventListener("click", async () => {
    const copied = await copyText(publicSiteUrl(), "网址已复制");
    if (copied) els.saveSiteDialog.close();
  });
  document.querySelector("#installSiteButton").addEventListener("click", promptInstallSite);
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
  els.contactForm.addEventListener("submit", submitTravelInquiry);
  document.querySelectorAll("[data-contact-path]").forEach(button => button.addEventListener("click", () => {
    const path = button.dataset.contactPath;
    recordMetric("contact_path", path);
    if (path === "travel") {
      showContactStep("travel", path);
      return;
    }
    recordOncePerSession("contact_form_complete", path);
    document.querySelector("#inquirySummary").hidden = true;
    showContactStep("channels", path);
  }));
  document.querySelector("[data-contact-back]").addEventListener("click", () => go(state.previousView && state.previousView !== "contact" ? state.previousView : "home", false));
  document.querySelector("#copyInquiry").addEventListener("click", () => copyText(document.querySelector("#inquirySummary").dataset.copyText || buildInquiry(), "咨询内容已复制，可粘贴到微信"));
  document.querySelectorAll("[data-copy-wechat]").forEach(button => button.addEventListener("click", () => copyText("zhangpeng816", "微信号已复制：zhangpeng816")));
  document.querySelectorAll("[data-copy-whatsapp]").forEach(button => button.addEventListener("click", () => copyText("@kurobutajapan", "WhatsApp 用户名已复制：@kurobutajapan")));
  document.querySelectorAll("[data-contact-qr]").forEach(button => button.addEventListener("click", () => openContactQr(button.dataset.contactQr)));
  const arrivalMenuButtons = [...document.querySelectorAll("[data-arrival-open]")];
  const arrivalPanels = [...document.querySelectorAll("[data-arrival-panel]")];
  arrivalMenuButtons.forEach(button => button.addEventListener("click", () => {
    const next = button.getAttribute("aria-expanded") === "true" ? "" : button.dataset.arrivalOpen;
    arrivalMenuButtons.forEach(item => item.setAttribute("aria-expanded", String(item.dataset.arrivalOpen === next)));
    arrivalPanels.forEach(panel => { panel.hidden = panel.dataset.arrivalPanel !== next; });
    if (next && window.matchMedia("(max-width: 600px)").matches) {
      const panel = arrivalPanels.find(item => item.dataset.arrivalPanel === next);
      requestAnimationFrame(() => panel?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }));
  const arrivalHotelInput = document.querySelector("#arrivalHotelInput");
  const arrivalHotelResults = document.querySelector("#arrivalHotelResults");
  arrivalHotelInput.addEventListener("input", () => { arrivalHotelResults.hidden = true; });
  document.querySelector("#arrivalHotelForm").addEventListener("submit", event => {
    event.preventDefault();
    const hotel = arrivalHotelInput.value.trim();
    if (!hotel) { arrivalHotelInput.focus(); return; }
    const encoded = encodeURIComponent(hotel);
    document.querySelector("#arrivalHotelGoogle").href = `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
    document.querySelector("#arrivalHotelApple").href = `https://maps.apple.com/?daddr=${encoded}`;
    document.querySelector("#arrivalHotelAmap").href = mapSearchUrl("amap", hotel);
    arrivalHotelResults.hidden = false;
  });
  document.querySelector("#arrivalHotelCopy").addEventListener("click", () => {
    const hotel = arrivalHotelInput.value.trim();
    if (hotel) copyText(hotel, "酒店名称／地址已复制");
  });
  document.querySelectorAll("[data-arrival-zoom]").forEach(button => button.addEventListener("click", () => {
    const source = button.closest(".arrival-sample")?.querySelector(".arrival-form-example");
    const dialog = document.querySelector("#arrivalZoomDialog");
    if (!source || !dialog) return;
    dialog.classList.remove("is-zoomed");
    dialog.querySelector("#arrivalZoomToggle").textContent = "放大细节";
    dialog.querySelector("#arrivalZoomToggle").setAttribute("aria-pressed", "false");
    dialog.querySelector("#arrivalZoomTitle").textContent = button.dataset.arrivalZoom === "ed" ? "入境记录填写范本" : "海关申报填写范本";
    dialog.querySelector("[data-arrival-zoom-content]").replaceChildren(source.cloneNode(true));
    dialog.showModal();
  }));
  document.querySelector("#arrivalZoomToggle").addEventListener("click", event => {
    const zoomed = document.querySelector("#arrivalZoomDialog").classList.toggle("is-zoomed");
    event.currentTarget.textContent = zoomed ? "看整张" : "放大细节";
    event.currentTarget.setAttribute("aria-pressed", String(zoomed));
  });
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

  if (els.contactForm.elements.city) els.contactForm.elements.city.value = state.city;
  showContactStep("channels", "profile");
  refreshUpdateBadges();
  updateFavoriteCount();
  renderWaybackPlaces();
  renderSources();
  renderPhrase();
  if (state.sharedPlace) window.setTimeout(() => showSharedPlace(state.sharedPlace), 80);
  startToolAnalytics();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
