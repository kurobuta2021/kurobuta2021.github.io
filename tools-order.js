(() => {
  "use strict";
  const key = "heitu-more-tools-front-v2";
  const grid = document.querySelector(".more-tools-grid");
  const extra = document.getElementById("moreToolsExtra");
  const dialog = document.getElementById("toolsOrderDialog");
  const list = document.getElementById("toolsOrderList");
  const cards = Array.from(grid.querySelectorAll(".mini-tool:not(.bus-mini)"));
  const lookup = new Map(cards.map(card => [card.dataset.toolId, card]));
  const defaults = ["anime", "outlets-map", "laundry", "wayback", "sea-view-stations-home", "luggage-home-mini"];
  let front = defaults.slice();
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (Array.isArray(saved) && saved.length === 6 && new Set(saved).size === 6 && saved.every(id => lookup.has(id) || id === "food-home-mini")) {
      front = saved.map(id => id === "parking" ? "sea-view-stations-home" : id === "food-home-mini" ? "luggage-home-mini" : id);
      if (["anime|outlets-map|laundry|wayback|luggage-home-mini|sea-view-stations-home", "anime|outlets-map|laundry|wayback|sea-view-stations-home|weather"].includes(front.join("|"))) front = defaults.slice();
      if (new Set(front).size !== 6) front = defaults.slice();
    }
  } catch { /* Continue with defaults when local storage is unavailable. */ }

  function apply() {
    front.forEach(id => grid.insertBefore(lookup.get(id), extra));
    cards.filter(card => !front.includes(card.dataset.toolId)).forEach(card => extra.append(card));
    list.replaceChildren(...cards.map(card => {
      const id = card.dataset.toolId;
      const position = front.indexOf(id);
      const row = document.createElement("div");
      row.className = "tools-order-row";
      const name = document.createElement("strong");
      name.textContent = card.querySelector("strong")?.textContent || id;
      const status = document.createElement("small");
      status.textContent = position >= 0 ? `首页第 ${position + 1} 个` : "在更多里";
      const action = document.createElement("button");
      action.type = "button";
      action.dataset.toolPick = id;
      action.textContent = position === 0 ? "已置顶" : position >= 0 ? "往前移" : "放前面";
      action.disabled = position === 0;
      row.append(name, status, action);
      return row;
    }));
  }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(front)); } catch { /* Preference remains for this visit. */ }
    apply();
  }
  document.getElementById("customizeTools").addEventListener("click", () => dialog.showModal());
  document.getElementById("toolsOrderClose").addEventListener("click", () => dialog.close());
  document.getElementById("toolsOrderReset").addEventListener("click", () => { front = defaults.slice(); persist(); });
  list.addEventListener("click", event => {
    const id = event.target.closest("[data-tool-pick]")?.dataset.toolPick;
    if (!id) return;
    const position = front.indexOf(id);
    if (position > 0) [front[position - 1], front[position]] = [front[position], front[position - 1]];
    else if (position === -1) front[front.length - 1] = id;
    persist();
  });
  apply();
})();
