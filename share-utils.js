(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.HeituShareUtils = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const MAX_TOKEN_LENGTH = 4096;

  function clip(value, maxLength) {
    return String(value || "").trim().slice(0, maxLength);
  }

  function validCoordinate(value, min, max) {
    const number = Number(value);
    return Number.isFinite(number) && number >= min && number <= max ? Number(number.toFixed(6)) : null;
  }

  function sanitizeSharedPlace(place) {
    if (!place || typeof place !== "object") return null;
    const lat = validCoordinate(place.lat, -90, 90);
    const lng = validCoordinate(place.lng, -180, 180);
    if (lat === null || lng === null) return null;
    return {
      v: 1,
      label: clip(place.label, 40) || "分享的位置",
      address: clip(place.address, 320) || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      note: clip(place.note, 120),
      lat,
      lng
    };
  }

  function encodeUtf8(value) {
    if (typeof Buffer !== "undefined") return Buffer.from(value, "utf8").toString("base64");
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  function decodeUtf8(value) {
    if (typeof Buffer !== "undefined") return Buffer.from(value, "base64").toString("utf8");
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodeSharedPlace(place) {
    const safe = sanitizeSharedPlace(place);
    if (!safe) return "";
    return encodeUtf8(JSON.stringify(safe)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  }

  function decodeSharedPlace(token) {
    if (!token || typeof token !== "string" || token.length > MAX_TOKEN_LENGTH || !/^[A-Za-z0-9_-]+$/.test(token)) return null;
    try {
      const padding = "=".repeat((4 - token.length % 4) % 4);
      const json = decodeUtf8(token.replace(/-/g, "+").replace(/_/g, "/") + padding);
      if (json.length > 1600) return null;
      return sanitizeSharedPlace(JSON.parse(json));
    } catch (_) {
      return null;
    }
  }

  function publicSiteUrl(currentUrl) {
    const url = new URL(currentUrl);
    url.hash = "";
    url.searchParams.delete("spot");
    return url.toString();
  }

  function sharedPlaceUrl(currentUrl, place) {
    const token = encodeSharedPlace(place);
    if (!token) return "";
    const url = new URL(publicSiteUrl(currentUrl));
    url.hash = `spot=${token}`;
    return url.toString();
  }

  function sharedPlaceFromUrl(currentUrl) {
    const url = new URL(currentUrl);
    const hash = url.hash.replace(/^#/, "");
    if (!hash.startsWith("spot=")) return null;
    return decodeSharedPlace(hash.slice(5));
  }

  function detectSaveEnvironment(userAgent, options = {}) {
    const ua = String(userAgent || "");
    const ios = /iPad|iPhone|iPod/i.test(ua) || (options.platform === "MacIntel" && Number(options.maxTouchPoints) > 1);
    const wechat = /MicroMessenger/i.test(ua);
    const android = /Android/i.test(ua);
    const iosSafari = ios && /Safari/i.test(ua) && !/(CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo)/i.test(ua);
    if (options.standalone) return "installed";
    if (wechat) return "wechat";
    if (options.installAvailable) return "install";
    if (iosSafari) return "ios-safari";
    if (ios) return "ios-other";
    if (android) return "android";
    return "desktop";
  }

  const SAVE_GUIDES = {
    installed: { title: "随便O已经保存", heading: "已经保存到主屏幕", html: "以后直接点桌面上的随便O图标就能打开。", showInstall: false },
    wechat: { title: "保存随便O", heading: "在微信里这样保存", html: "<ol><li>点右上角“…”菜单，选择收藏。</li><li>想放到手机桌面：选择“在浏览器打开”，再按系统浏览器的“添加到主屏幕”。</li></ol>", showInstall: false },
    "ios-safari": { title: "保存随便O", heading: "添加到 iPhone 主屏幕", html: "<ol><li>点 Safari 底部的分享按钮。</li><li>向下找到“添加到主屏幕”。</li><li>点右上角“添加”。</li></ol>", showInstall: false },
    "ios-other": { title: "保存随便O", heading: "请先用 Safari 打开", html: "复制网址后用 Safari 打开，再点“分享 → 添加到主屏幕”。", showInstall: false },
    install: { title: "保存随便O", heading: "可以直接安装到手机", html: "点击下面的“添加到主屏幕”，以后像 App 一样从桌面打开。", showInstall: true },
    android: { title: "保存随便O", heading: "添加到 Android 主屏幕", html: "点浏览器右上角菜单，选择“添加到主屏幕”或“安装应用”。不同浏览器文字可能略有不同。", showInstall: false },
    desktop: { title: "保存随便O", heading: "收藏这个网站", html: "电脑可按 Ctrl+D（Mac 按 ⌘D）加入书签；也可以复制网址发到手机。", showInstall: false }
  };

  function saveGuide(environment) {
    const guide = SAVE_GUIDES[environment] || SAVE_GUIDES.desktop;
    return { ...guide };
  }

  return {
    sanitizeSharedPlace,
    encodeSharedPlace,
    decodeSharedPlace,
    publicSiteUrl,
    sharedPlaceUrl,
    sharedPlaceFromUrl,
    detectSaveEnvironment,
    saveGuide
  };
});
