(() => {
  const $ = id => document.getElementById(id);
  const sourceNames = { xhs: "小红书", douyin: "抖音", bilibili: "B 站", wechat: "视频号／微信", youtube: "YouTube", tiktok: "TikTok", google: "Google", unknown: "来源未知" };
  const channelNames = { "wechat-copy": "复制微信号", "wechat-qr": "查看微信二维码", "line-open": "打开 LINE", "line-qr": "查看 LINE 二维码", "whatsapp-copy": "复制 WhatsApp", "whatsapp-qr": "查看 WhatsApp 二维码", "email-write": "写邮件", "email-copy": "复制邮箱" };
  const serviceNames = { "play-airport-help": "机场接送", "play-park-transfer-help": "乐园接送", "custom-route-consult": "小众一／两日游", "onsen-stay-direct-contact": "温泉酒店安排", "onsen-stay-consult": "温泉酒店咨询", "food-consult-hub": "美食推荐预约", "food-reservation-help": "餐厅预约", "cruise-consult": "邮轮一日游", "local-experience-hub": "当地体验", "selfdrive-consult": "华人租车咨询", "ski-transfer-help": "雪场接送", "ski-resort-transfer-help": "雪场接送", "airport-transfer-help": "机场接送", "hotel-transfer-help": "酒店接送", "theme-park-transfer-help": "乐园接送", "outlet-transfer-help": "奥莱接送", "aquariums-transfer-help": "水族馆接送", "night-transfer-help": "夜景接送", "onsen-booking-help": "温泉预约", "explore-help": "逛吃推荐安排", "seasonal-trip-help": "季节旅行安排", "fireworks-help": "花火大会安排", "festivals-help": "祭典活动安排" };
  const viewNames = { home:"工具箱首页", favorites:"逛吃日本", food:"附近吃什么", shopping:"附近逛什么", play:"玩日本", seasonal:"日本正当时", "seasonal-detail":"当季活动详情", ski:"滑雪／玩雪", onsen:"泡个温泉", "onsen-stays":"温泉酒店", cruise:"邮轮一日游", selfdrive:"自己租车", "theme-parks":"主题乐园", aquariums:"水族馆／动物园", night:"夜景地", outlets:"奥特莱斯", "rainy-day":"雨天备选", arrival:"入境小助手", wayback:"路痴救星", sources:"实用地图", contact:"找黑豚" };
  const contextNames = { unknown:"没有可判断的近期点击", "nav-contact":"直接点找黑豚", "direct-cta":"服务咨询按钮" };
  const countryNames = { jp: "日本", cn: "中国大陆", hk: "香港", tw: "台湾", mo: "澳门", sg: "新加坡", us: "美国", kr: "韩国", au: "澳大利亚", gb: "英国", my: "马来西亚", th: "泰国", ca: "加拿大", xx: "未知" };
  const chinaRegionNames = { ah:"安徽",bj:"北京",cq:"重庆",fj:"福建",gs:"甘肃",gd:"广东",gx:"广西",gz:"贵州",hi:"海南",he:"河北",hl:"黑龙江",ha:"河南",hb:"湖北",hn:"湖南",js:"江苏",jx:"江西",jl:"吉林",ln:"辽宁",nm:"内蒙古",nx:"宁夏",qh:"青海",sn:"陕西",sd:"山东",sh:"上海",sx:"山西",sc:"四川",tj:"天津",xj:"新疆",xz:"西藏",yn:"云南",zj:"浙江",unknown:"未识别" };
  const tokyoDay = offset => {
    const date = new Date(Date.now() + offset * 86400000);
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  };
  const today = tokyoDay(0);
  const yesterday = tokyoDay(-1);
  const isDemo = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && new URLSearchParams(location.search).get("preview") === "1";
  const count = (rows, event, tool, day) => rows.reduce((sum, row) => sum + (row.event === event && (tool === undefined || row.tool === tool) && (!day || row.day === day) ? Number(row.count) || 0 : 0), 0);
  const sumByTool = (rows, event) => {
    const totals = new Map();
    rows.filter(row => row.event === event).forEach(row => totals.set(row.tool, (totals.get(row.tool) || 0) + Number(row.count || 0)));
    return totals;
  };
  const pct = (a, b) => b ? `${Math.round(a / b * 100)}%` : "—";
  const precisePct = (a, b) => b ? `${(a / b * 100).toFixed(1)}%` : "—";
  const display = (id, value) => { $(id).textContent = value; };
  const cell = (row, value, className) => {
    const node = document.createElement("td");
    node.textContent = value;
    if (className) node.className = className;
    row.appendChild(node);
    return node;
  };
  const empty = (tbody, columns, message) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = columns;
    td.className = "empty";
    td.textContent = message;
    tr.appendChild(td);
    tbody.appendChild(tr);
  };
  const setDelta = (id, current, previous) => {
    const node = $(id);
    node.hidden = false;
    node.className = `delta ${current > previous ? "up" : current < previous ? "down" : "flat"}`;
    node.textContent = `${current === previous ? "持平" : current > previous ? `比昨日全天多 ${current - previous}` : `比昨日全天少 ${previous - current}`} · 昨日全天 ${previous}`;
  };
  const sourceName = source => sourceNames[source] || (source.startsWith("partner-") ? `合作方 ${source.slice(8)}` : source);
  const rowsFor = (all, days) => all.filter(row => row.day >= tokyoDay(-(days - 1)) && row.day <= today);
  const demoRows = () => {
    const rows = [];
    const put = (day, event, tool, total) => rows.push({ day, event, tool, count: total });
    [[today, 83, 112], [yesterday, 101, 137]].forEach(([day, sessions, views]) => {
      put(day, "session_start", "site", sessions); put(day, "page_view", "site", views);
      [["xhs", 27, 7, 4], ["douyin", 18, 4, 2], ["bilibili", 6, 1, 1], ["wechat", 3, 1, 0], ["unknown", sessions - 54, 5, 2]].forEach(([source, visits, intents, actions]) => {
        put(day, "source_session", source, visits); put(day, "lead_intent", source, intents); put(day, "lead_action", source, actions);
      });
      [["custom-route-consult", 12], ["play-airport-help", 9], ["onsen-stay-direct-contact", 7], ["food-reservation-help", 6], ["ski-transfer-help", 3], ["outlets-map", 22], ["theme-parks", 18], ["ski-guide", 15], ["food-hub", 14], ["toilet", 11]].forEach(([tool, clicks]) => {
        put(day, "tool_click", tool, clicks); put(day, "tool_impression", tool, clicks * 4);
      });
      [["wechat-copy", 7], ["wechat-qr", 4], ["line-open", 2], ["email-write", 1]].forEach(([tool, n]) => put(day, "contact_channel_click", tool, n));
      [["jp", 39], ["cn", 31], ["hk", 7], ["sg", 4]].forEach(([tool, n]) => put(day, "country_session", tool, n));
      [["bj", 6], ["sh", 5], ["gd", 4]].forEach(([tool, n]) => put(day, "china_region_session", tool, n));
      [["play", 5], ["favorites", 2], ["food", 1], ["home", 1]].forEach(([tool, n]) => put(day, "contact_from_view", tool, n));
      [["custom-route-consult", 3], ["onsen-stay-direct-contact", 2], ["food-hub", 1], ["ski-guide", 1], ["unknown", 2]].forEach(([tool, n]) => put(day, "contact_from_tool", tool, n));
      [["custom-route-consult", 3], ["onsen-stay-direct-contact", 2], ["food-consult-hub", 1], ["nav-contact", 3]].forEach(([tool, n]) => put(day, "contact_from_cta", tool, n));
    });
    return rows;
  };
  let allRows = [];
  let labelMap = new Map();
  async function loadLabels() {
    try {
      const response = await fetch("./index.html", { cache: "no-store" });
      if (!response.ok) return;
      const html = new DOMParser().parseFromString(await response.text(), "text/html");
      html.querySelectorAll("[data-tool-id]").forEach(node => {
        const id = node.dataset.toolId;
        const title = node.querySelector("strong, h2, h3, .card-title")?.textContent || node.getAttribute("aria-label") || node.textContent;
        const clean = title?.replace(/\s+/g, " ").trim().slice(0, 34);
        if (clean && (!labelMap.has(id) || clean.length < labelMap.get(id).length)) labelMap.set(id, clean);
      });
    } catch (_) {}
  }
  function draw(all, days, generatedAt) {
    const rows = rowsFor(all, days);
    const isToday = days === 1;
    const visits = count(rows, "source_session");
    const intents = count(rows, "lead_intent");
    const actions = count(rows, "lead_action");
    const toolClicks = count(rows, "tool_click");
    const toolImpressions = count(rows, "tool_impression");
    const hasNewCohort = visits > 0;
    display("sessions", count(rows, "session_start").toLocaleString());
    display("views", count(rows, "page_view").toLocaleString());
    display("clicks", toolClicks.toLocaleString());
    display("ctr", precisePct(toolClicks, toolImpressions));
    display("intents", hasNewCohort ? intents.toLocaleString() : "—");
    display("leadActions", hasNewCohort ? actions.toLocaleString() : "—");
    ["sessionsDelta", "viewsDelta", "clicksDelta", "ctrDelta", "intentsDelta", "actionsDelta"].forEach(id => $(id).hidden = true);
    $("dailyNote").hidden = !isToday;
    if (isToday) {
      setDelta("sessionsDelta", count(rows, "session_start"), count(all, "session_start", undefined, yesterday));
      setDelta("viewsDelta", count(rows, "page_view"), count(all, "page_view", undefined, yesterday));
      setDelta("clicksDelta", toolClicks, count(all, "tool_click", undefined, yesterday));
      const yesterdayClicks = count(all, "tool_click", undefined, yesterday);
      const yesterdayImpressions = count(all, "tool_impression", undefined, yesterday);
      if (toolImpressions && yesterdayImpressions) {
        const change = toolClicks / toolImpressions * 100 - yesterdayClicks / yesterdayImpressions * 100;
        const delta = $("ctrDelta");
        delta.hidden = false;
        delta.className = `delta ${change > 0 ? "up" : change < 0 ? "down" : "flat"}`;
        delta.textContent = `${change > 0 ? "+" : ""}${change.toFixed(1)} 个百分点 · 昨日全天 ${precisePct(yesterdayClicks, yesterdayImpressions)}`;
      }
      if (hasNewCohort && count(all, "source_session", undefined, yesterday)) {
        setDelta("intentsDelta", intents, count(all, "lead_intent", undefined, yesterday));
        setDelta("actionsDelta", actions, count(all, "lead_action", undefined, yesterday));
      }
    }
    display("funnelVisits", hasNewCohort ? visits.toLocaleString() : "—");
    display("funnelIntents", hasNewCohort ? intents.toLocaleString() : "—");
    display("funnelActions", hasNewCohort ? actions.toLocaleString() : "—");
    display("intentRate", hasNewCohort ? pct(intents, visits) + " 进入咨询" : "上线后累计");
    display("actionRate", hasNewCohort ? pct(actions, visits) + " 操作联系方式" : "上线后累计");
    const sources = $("sources"); sources.replaceChildren();
    const sourceVisits = sumByTool(rows, "source_session");
    const sourceIntents = sumByTool(rows, "lead_intent");
    const sourceActions = sumByTool(rows, "lead_action");
    display("knownSourceRate", hasNewCohort ? `${pct(visits - (sourceVisits.get("unknown") || 0), visits)} 带来源标签` : "暂无新版数据");
    if (!sourceVisits.size) empty(sources, 5, "新版来源统计上线后会出现在这里；旧访问无法倒推来源。");
    [...sourceVisits].sort((a, b) => b[1] - a[1]).forEach(([source, total]) => {
      const tr = document.createElement("tr");
      cell(tr, sourceName(source)); cell(tr, total.toLocaleString(), "number"); cell(tr, (sourceIntents.get(source) || 0).toLocaleString(), "number"); cell(tr, (sourceActions.get(source) || 0).toLocaleString(), "number"); cell(tr, pct(sourceActions.get(source) || 0, total), "number"); sources.appendChild(tr);
    });
    const services = $("services"); services.replaceChildren();
    const clicks = sumByTool(rows, "tool_click");
    const serviceList = [...clicks].filter(([tool]) => serviceNames[tool]).sort((a, b) => b[1] - a[1]);
    if (!serviceList.length) empty(services, 2, "目前没有服务入口点击数据。");
    serviceList.forEach(([tool, total]) => { const tr = document.createElement("tr"); cell(tr, serviceNames[tool]); cell(tr, total.toLocaleString(), "number"); services.appendChild(tr); });
    const channels = $("channels"); channels.replaceChildren();
    const channelList = [...sumByTool(rows, "contact_channel_click")].filter(([tool]) => channelNames[tool]).sort((a, b) => b[1] - a[1]);
    if (!channelList.length) empty(channels, 2, "目前没有联系方式操作数据。");
    channelList.forEach(([tool, total]) => { const tr = document.createElement("tr"); cell(tr, channelNames[tool]); cell(tr, total.toLocaleString(), "number"); channels.appendChild(tr); });
    const tools = $("tools"); tools.replaceChildren();
    const impressions = sumByTool(rows, "tool_impression");
    const toolList = [...new Set([...clicks.keys(), ...impressions.keys()])].map(tool => [tool, clicks.get(tool) || 0, impressions.get(tool) || 0]).sort((a, b) => b[1] - a[1] || b[2] - a[2]);
    $("toolCompareHeader").hidden = !isToday;
    if (!toolList.length) empty(tools, isToday ? 7 : 6, "目前没有入口点击数据。");
    toolList.forEach(([tool, total, seen]) => {
      const tr = document.createElement("tr");
      cell(tr, serviceNames[tool] || labelMap.get(tool) || tool.replace(/-/g, " "));
      cell(tr, seen.toLocaleString(), "number").dataset.label = "曝光";
      cell(tr, total.toLocaleString(), "number").dataset.label = "点击";
      cell(tr, precisePct(total, toolClicks), "number").dataset.label = "点击占比";
      if (isToday) {
        const difference = total - count(all, "tool_click", tool, yesterday);
        cell(tr, `${difference > 0 ? "+" : ""}${difference}`, `number change ${difference > 0 ? "up" : difference < 0 ? "down" : "flat"}`).dataset.label = "较昨日";
      }
      cell(tr, precisePct(total, seen), "number").dataset.label = "点击率";
      const graph = cell(tr, "", "trend-cell");
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = `${seen ? Math.min(100, total / seen * 100) : 0}%`;
      bar.appendChild(fill);
      graph.appendChild(bar);
      tools.appendChild(tr);
    });
    const contactContext = (tbodyId, event) => {
      const tbody = $(tbodyId); tbody.replaceChildren();
      const list = [...sumByTool(rows, event)].sort((a, b) => b[1] - a[1]);
      if (!list.length) empty(tbody, 2, "新统计上线后开始显示，旧数据无法补回。");
      list.forEach(([key, total]) => {
        const tr = document.createElement("tr");
        cell(tr, event === "contact_from_view" ? viewNames[key] || key : contextNames[key] || serviceNames[key] || labelMap.get(key) || key.replace(/-/g, " "));
        cell(tr, total.toLocaleString(), "number"); tbody.appendChild(tr);
      });
    };
    contactContext("contactFromViews", "contact_from_view");
    contactContext("contactFromTools", "contact_from_tool");
    contactContext("contactFromCtas", "contact_from_cta");
    const geography = (tbodyId, event, names, denominator) => {
      const tbody = $(tbodyId); tbody.replaceChildren();
      const list = [...sumByTool(rows, event)].sort((a, b) => b[1] - a[1]).slice(0, 12);
      if (!list.length) empty(tbody, 3, "暂无地区数据。");
      const total = denominator || list.reduce((sum, item) => sum + item[1], 0);
      list.forEach(([key, value]) => { const tr = document.createElement("tr"); cell(tr, names[key] || key || "未知"); cell(tr, value.toLocaleString(), "number"); cell(tr, pct(value, total), "number"); tbody.appendChild(tr); });
    };
    geography("countries", "country_session", countryNames);
    geography("chinaRegions", "china_region_session", chinaRegionNames);
    display("updatedAt", `更新时间：${new Date(generatedAt).toLocaleString("zh-CN", { timeZone: "Asia/Tokyo" })}（日本时间）`);
  }
  async function refresh() {
    const days = Number($("days").value);
    if (isDemo) { allRows = demoRows(); draw(allRows, days, new Date().toISOString()); return; }
    const key = $("key").value.trim() || localStorage.getItem("heitu-stats-key") || "";
    if (!key) { $("login").hidden = false; $("dashboard").hidden = true; return; }
    $("loginError").textContent = "";
    try {
      const response = await fetch(`/api/stats?days=${Math.max(2, days)}`, { headers: { "x-stats-key": key }, cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 401 ? "访问码不正确，请重新输入。" : response.status === 503 ? "统计服务尚未配置。" : `暂时无法读取数据（${response.status}）。`);
      const data = await response.json();
      localStorage.setItem("heitu-stats-key", key);
      $("login").hidden = true; $("dashboard").hidden = false;
      allRows = Array.isArray(data.rows) ? data.rows : [];
      draw(allRows, days, data.generatedAt || new Date().toISOString());
    } catch (error) {
      $("login").hidden = false; $("dashboard").hidden = true;
      $("loginError").textContent = error.message || "网络暂时不可用，请稍后重试。";
    }
  }
  $("loginButton").addEventListener("click", refresh);
  $("key").addEventListener("keydown", event => { if (event.key === "Enter") refresh(); });
  $("refresh").addEventListener("click", refresh);
  $("days").addEventListener("change", refresh);
  document.querySelectorAll("[data-copy-source]").forEach(button => button.addEventListener("click", async () => {
    const url = `https://heitun.pages.dev/?src=${button.dataset.copySource}`;
    try { await navigator.clipboard.writeText(url); $("copyStatus").textContent = `已复制：${url}`; }
    catch (_) { $("copyStatus").textContent = `请手动复制：${url}`; }
  }));
  loadLabels().then(() => {
    if (isDemo) { $("login").hidden = true; $("dashboard").hidden = false; $("demoNote").hidden = false; }
    else $("key").value = localStorage.getItem("heitu-stats-key") || "";
    refresh();
  });
})();
