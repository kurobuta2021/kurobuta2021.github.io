// 新宿首批核验数据：地点事实来自新宿区官网或 OpenStreetMap；坐标来源单独标注。
// “核验”表示来源已交叉检查，不代表开放状态实时不变。到达后仍请以现场标识为准。
window.PLACES = [
  {
    id: "s-shinjuku-east", type: "smoking",
    name: "新宿站东口公共吸烟所", nameJa: "新宿駅東口公衆喫煙所",
    lat: 35.6922993, lng: 139.7006399,
    description: "位于新宿站东口广场。新宿区官网列出的公共吸烟所；开放情况请以现场标识为准。",
    hours: "官方未公布 · 以现场为准", tags: ["室外", "公共吸烟所", "官方名录"], address: "新宿三丁目38番先",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/seikatsu/file11_01_00003.html", sourceUpdatedAt: "2024-08-05",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/relation/16475130",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "exact"
  },
  {
    id: "s-shinjuku-west", type: "smoking",
    name: "新宿站西口公共吸烟所", nameJa: "新宿駅西口公衆喫煙所",
    lat: 35.6914541, lng: 139.6990077,
    description: "位于新宿站西口地面环岛内。名称与地址来自新宿区官网，地图点位来自 OSM 吸烟区标记。",
    hours: "官方未公布 · 以现场为准", tags: ["室外", "公共吸烟所", "官方名录"], address: "西新宿一丁目1番先",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/seikatsu/file11_01_00003.html", sourceUpdatedAt: "2024-08-05",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/node/12485097703",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "mapped_area"
  },
  {
    id: "s-shinjuku-southeast", type: "smoking",
    name: "新宿站东南口高架下公共吸烟所", nameJa: "新宿駅東南口高架下公衆喫煙所",
    lat: 35.6894622, lng: 139.7016316,
    description: "位于东南口广场旁的国道高架下。名称与地址来自新宿区官网，坐标来自 OSM 吸烟区标记。",
    hours: "官方未公布 · 以现场为准", tags: ["高架下", "公共吸烟所", "官方名录"], address: "新宿三丁目37番先",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/seikatsu/file11_01_00003.html", sourceUpdatedAt: "2024-08-05",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/node/12485097702",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "mapped_area"
  },
  {
    id: "s-nomura-tobacco", type: "smoking",
    name: "THE TOBACCO NISHISHINJUKU", nameJa: "THE TOBACCO NISHISHINJUKU",
    lat: 35.6929922, lng: 139.6953779,
    description: "新宿野村大厦 B2F 的室内公共吸烟空间。地图针定位到建筑中心，入楼后请按楼层指示寻找。",
    hours: "08:00–24:00 · 大厦休馆时不可用", tags: ["室内", "B2F", "官方补助设施"], address: "西新宿1-26-2 新宿野村ビル B2F", floor: "B2F",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/kenkou/eisei01_000001_00005.html", sourceUpdatedAt: "2026-03-30",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/way/137626356",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "building"
  },
  {
    id: "s-ns-building-tobacco", type: "smoking",
    name: "THE TOBACCO TOCHOMAE", nameJa: "THE TOBACCO TOCHOMAE",
    lat: 35.68895, lng: 139.69362,
    description: "新宿 NS 大厦 29F 的室内公共吸烟空间。地图针定位到建筑范围，入楼后请乘电梯并按楼层指示寻找。",
    hours: "08:00–23:00 · 大厦休馆时不可用", tags: ["室内", "29F", "官方补助设施"], address: "西新宿2-4-1 新宿NSビル 29F", floor: "29F",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/kenkou/eisei01_000001_00005.html", sourceUpdatedAt: "2026-03-30",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/search?query=%E6%96%B0%E5%AE%BFNS%E3%83%93%E3%83%AB",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "building"
  },
  {
    id: "s-paspa-yotsuya", type: "smoking",
    name: "paspa 四谷公共吸烟所", nameJa: "paspa四谷公衆喫煙所",
    lat: 35.6866248, lng: 139.7278517,
    description: "第一上野大厦内的公共吸烟空间。地图针定位到建筑中心，入口请以现场招牌为准。",
    hours: "07:00–20:00 · 周六日及节假日休", tags: ["室内", "工作日", "官方补助设施"], address: "四谷1-19-16 第一上野ビル",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/kenkou/eisei01_000001_00005.html", sourceUpdatedAt: "2026-03-30",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/way/170182452",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "building"
  },
  {
    id: "t-nanzo-in", type: "toilet",
    name: "南藏院前公共厕所", nameJa: "南蔵院前公衆便所",
    lat: 35.7009785, lng: 139.7359114,
    description: "新宿区公共厕所名录中的独立公共厕所。OSM 标记显示可进入，但未标记无障碍设施。",
    hours: "开放时间待确认", tags: ["公共厕所", "官方名录", "免费"], address: "箪笥町1",
    sourceName: "新宿区公共厕所名录", sourceUrl: "https://www.city.shinjuku.lg.jp/content/000065796.pdf",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/node/1576400983",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "exact"
  },
  {
    id: "t-toyama", type: "toilet",
    name: "户山公共厕所", nameJa: "戸山公衆トイレ",
    lat: 35.7009446, lng: 139.709288,
    description: "新宿区公共厕所名录中的独立公共厕所。OSM 标记为免费、可无障碍使用。",
    hours: "OSM 标记 24 小时 · 以现场为准", tags: ["免费", "无障碍", "公共厕所"], address: "戸山2-33",
    sourceName: "新宿区公共厕所名录", sourceUrl: "https://www.city.shinjuku.lg.jp/content/000065796.pdf",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/way/506670466",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "exact"
  },
  {
    id: "t-central-park-office", type: "toilet",
    name: "新宿中央公园 管理事务所旁厕所", nameJa: "新宿中央公園 公衆トイレ",
    lat: 35.6909807, lng: 139.6881192,
    description: "新宿区官网确认中央公园内设有厕所；此针为 OSM 中管理事务所附近的厕所建筑。",
    hours: "约 09:00–17:00（OSM）· 以现场为准", tags: ["公园", "无障碍", "婴儿护理台"], address: "西新宿2-11 新宿中央公園内",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/seikatsu/file15_02_00001.html",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/way/586444391",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "exact"
  },
  {
    id: "t-central-park-north", type: "toilet",
    name: "新宿中央公园 北侧厕所", nameJa: "新宿中央公園 公衆トイレ",
    lat: 35.6915407, lng: 139.6895665,
    description: "中央公园内的厕所建筑。公园官网确认园内有厕所，具体坐标来自 OSM。",
    hours: "开放时间待确认", tags: ["公园", "公共厕所"], address: "西新宿2-11 新宿中央公園内",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/seikatsu/file15_02_00001.html",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/way/583703379",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "exact"
  },
  {
    id: "t-central-park-south", type: "toilet",
    name: "新宿中央公园 南侧厕所", nameJa: "新宿中央公園 公衆トイレ",
    lat: 35.6893524, lng: 139.6888664,
    description: "中央公园内的厕所建筑。公园官网确认园内有厕所，具体坐标来自 OSM。",
    hours: "开放时间待确认", tags: ["公园", "公共厕所"], address: "西新宿2-11 新宿中央公園内",
    sourceName: "新宿区官网", sourceUrl: "https://www.city.shinjuku.lg.jp/seikatsu/file15_02_00001.html",
    coordinateSourceName: "OpenStreetMap contributors", coordinateSourceUrl: "https://www.openstreetmap.org/way/583881927",
    checkedAt: "2026-09-19", verification: "official_plus_osm", locationPrecision: "exact"
  },
  {
    id: "t-shinjuku-east-underground", type: "toilet",
    name: "新宿站东口地下通道厕所", nameJa: "新宿駅東口 地下公衆トイレ",
    lat: 35.69186, lng: 139.70075,
    description: "OSM 室内地图中的地下公共厕所，位于 B1 层附近。尚未与新宿区官方设施编号逐项匹配。",
    hours: "开放时间待确认", tags: ["地下", "车站", "OSM 社区数据"], floor: "B1",
    sourceName: "OpenStreetMap contributors", sourceUrl: "https://www.openstreetmap.org/relation/16287839",
    checkedAt: "2026-09-19", verification: "community_mapped", locationPrecision: "mapped_area"
  },
  {
    id: "t-shinjuku-southeast-underground", type: "toilet",
    name: "新宿站东南口地下厕所", nameJa: "新宿駅東南口 地下トイレ",
    lat: 35.69083, lng: 139.70172,
    description: "OSM 室内地图中的地下公共厕所，位于 B1 层附近。女性设施记录含婴儿护理台；请以现场标识为准。",
    hours: "开放时间待确认", tags: ["地下", "车站", "婴儿护理台"], floor: "B1",
    sourceName: "OpenStreetMap contributors", sourceUrl: "https://www.openstreetmap.org/relation/16346149",
    checkedAt: "2026-09-19", verification: "community_mapped", locationPrecision: "mapped_area"
  }
];

window.PLACES.forEach(place => { if (!place.ward) place.ward = "新宿区"; });

window.PLACE_SCHEMA = {
  required: ["id", "type", "name", "lat", "lng"],
  optional: ["nameJa", "description", "hours", "tags", "address", "floor", "ward", "wardPrecision", "sourceName", "sourceUrl", "sourceUpdatedAt", "coordinateSourceName", "coordinateSourceUrl", "checkedAt", "verification", "locationPrecision", "externalId"],
  types: ["toilet", "smoking"],
  verificationValues: ["official_plus_osm", "official_source", "community_mapped"],
  locationPrecisionValues: ["exact", "mapped_area", "building"]
};

// 演示版不伪造“真实用户留言”。用户在本机提交的现场情报仍会以待审核状态出现。
window.COMMUNITY_REPORTS = [];

window.REPORT_SCHEMA = {
  required: ["id", "placeId", "tags", "status", "createdAt"],
  optional: ["comment", "author", "helpful", "moderationNote"],
  statuses: ["pending_review", "published", "rejected"]
};
