// Rebuild the two seasonal maps from public-domain Natural Earth geography.
// Usage: node scripts/generate-seasonal-maps.mjs /path/to/ne_50m_admin_0_countries.geojson
import fs from "node:fs";
import path from "node:path";

const source = process.argv[2];
if (!source) throw new Error("Pass a Natural Earth countries GeoJSON path");
const geo = JSON.parse(fs.readFileSync(source, "utf8"));
const japan = geo.features.find((feature) => feature.properties.ADMIN === "Japan");
if (!japan || japan.geometry.type !== "MultiPolygon") throw new Error("Japan geometry missing");

const project = ([lon, lat]) => [65 + (lon - 128) * 14.6, 36 + (46 - lat) * 29.5];
const rounded = (number) => number.toFixed(1);
const paths = japan.geometry.coordinates
  .filter((polygon) => polygon[0].some(([lon, lat]) => lon >= 128 && lon <= 146 && lat >= 30 && lat <= 46))
  .map((polygon) => polygon.map((ring) => ring.map((point, index) => {
    const [x, y] = project(point);
    return `${index ? "L" : "M"}${rounded(x)} ${rounded(y)}`;
  }).join(" ") + "Z").join(" "));

const cities = [
  { name: "札幌", lon: 141.35, lat: 43.06, side: "left", y: 105, sakura: "5/1", leaves: "10/28" },
  { name: "青森", lon: 140.74, lat: 40.82, side: "right", y: 166, sakura: "4/22", leaves: "11/13" },
  { name: "仙台", lon: 140.87, lat: 38.27, side: "left", y: 231, sakura: "4/8", leaves: "11/21" },
  { name: "金泽", lon: 136.66, lat: 36.56, side: "left", y: 284, sakura: "4/3", leaves: "11/24" },
  { name: "东京", lon: 139.69, lat: 35.68, side: "right", y: 314, sakura: "3/24", leaves: "11/28" },
  { name: "大阪", lon: 135.5, lat: 34.69, side: "right", y: 368, sakura: "3/27", leaves: "12/1" },
  { name: "广岛", lon: 132.46, lat: 34.39, side: "left", y: 377, sakura: "3/25", leaves: "11/22" },
  { name: "福冈", lon: 130.4, lat: 33.59, side: "left", y: 426, sakura: "3/22", leaves: "12/1" },
  { name: "鹿儿岛", lon: 130.56, lat: 31.6, side: "right", y: 473, sakura: "3/26", leaves: "12/15" },
];

function mapSvg(kind) {
  const spring = kind === "sakura";
  const color = spring ? "#bc648f" : "#bd7644";
  const fill = spring ? "#f4d9e5" : "#f4dbbf";
  const bg = spring ? "#fff8fb" : "#fffaf5";
  const caption = spring ? "樱花常年初开参考" : "红叶常年最佳观赏参考";
  const labels = cities.map((city) => {
    const [x, y] = project([city.lon, city.lat]);
    const boxX = city.side === "left" ? 8 : 260;
    const lineX = city.side === "left" ? 128 : 260;
    const date = spring ? city.sakura : city.leaves;
    return `<path d="M${rounded(x)} ${rounded(y)} L${lineX} ${city.y}" fill="none" stroke="${color}" stroke-opacity=".5" stroke-width="1.3"/><circle cx="${rounded(x)}" cy="${rounded(y)}" r="3.4" fill="${color}" stroke="#fff" stroke-width="1.5"/><rect x="${boxX}" y="${city.y - 13}" width="112" height="26" rx="13" fill="#fff" stroke="${color}" stroke-opacity=".45"/><text x="${boxX + 10}" y="${city.y + 4}" fill="#3d3541" font-size="12" font-weight="700">${city.name} <tspan fill="${color}">${date}</tspan></text>`;
  }).join("\n  ");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 520" role="img" aria-label="${caption}日本地图">
  <rect width="380" height="520" rx="20" fill="${bg}"/>
  <text x="16" y="25" fill="#493d49" font-size="15" font-weight="800">${caption}</text>
  <path d="${paths.join(" ")}" fill="${fill}" stroke="${color}" stroke-width="1.2" stroke-linejoin="round"/>
  ${labels}
  <text x="16" y="507" fill="#786e77" font-size="10">日期非下一季预测 · 地图底图：Natural Earth（公有领域）</text>
</svg>\n`;
}

const assets = path.join(import.meta.dirname, "..", "assets");
for (const kind of ["sakura", "leaves"]) fs.writeFileSync(path.join(assets, `${kind}-reference-map.svg`), mapSvg(kind));
