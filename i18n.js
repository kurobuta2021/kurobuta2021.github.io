(function () {
  "use strict";

  const LANGUAGE_KEY = "heitu-language-v1";
  const supported = new Set(["zh-Hans", "zh-Hant", "en"]);
  const phraseMap = [
    ["干货", "乾貨"], ["复制", "複製"], ["为准", "為準"], ["方便面", "方便麵"], ["里面", "裡面"], ["这里", "這裡"],
    ["哪里", "哪裡"], ["公里", "公里"], ["台手机", "臺手機"], ["这台", "這臺"],
    ["一个", "一個"], ["几个", "幾個"], ["这个", "這個"], ["哪个", "哪個"],
    ["二维码", "二維碼"], ["视频", "影片"], ["软件", "軟體"], ["信息", "資訊"]
  ];
  const charMap = {
    "万":"萬","与":"與","专":"專","业":"業","东":"東","丝":"絲","丢":"丟","两":"兩","严":"嚴","丧":"喪","个":"個","丰":"豐","临":"臨","为":"為","丽":"麗","举":"舉","么":"麼","义":"義","乌":"烏","乐":"樂","乔":"喬","习":"習","乡":"鄉","书":"書","买":"買","乱":"亂","争":"爭","于":"於","云":"雲","亚":"亞","产":"產","亲":"親","仅":"僅","从":"從","仓":"倉","仪":"儀","们":"們","价":"價","众":"眾","优":"優","会":"會","伞":"傘","伟":"偉","传":"傳","伤":"傷","伦":"倫","伪":"偽","体":"體","余":"餘","侠":"俠","侣":"侶","侧":"側","侦":"偵","侨":"僑","侩":"儈","侪":"儕","侬":"儂","俩":"倆","俭":"儉","债":"債","倾":"傾","偿":"償","储":"儲","儿":"兒","兑":"兌","党":"黨","兰":"蘭","关":"關","兴":"興","养":"養","兽":"獸","冈":"岡","册":"冊","写":"寫","军":"軍","农":"農","冲":"沖","决":"決","况":"況","冻":"凍","净":"淨","凉":"涼","减":"減","凑":"湊","凛":"凜","凤":"鳳","凭":"憑","凯":"凱","击":"擊","凿":"鑿","刍":"芻","划":"劃","刘":"劉","则":"則","刚":"剛","创":"創","删":"刪","别":"別","刽":"劊","剂":"劑","剐":"剮","剑":"劍","剧":"劇","劝":"勸","办":"辦","务":"務","动":"動","励":"勵","劳":"勞","势":"勢","勋":"勳","勾":"勾","匀":"勻","区":"區","医":"醫","华":"華","协":"協","单":"單","卖":"賣","卢":"盧","卫":"衛","却":"卻","厂":"廠","厅":"廳","历":"歷","压":"壓","厌":"厭","厕":"廁","县":"縣","叁":"參","参":"參","双":"雙","发":"發","变":"變","叙":"敘","叠":"疊","号":"號","叹":"嘆","吁":"籲","合":"合","后":"後","吓":"嚇","吕":"呂","吗":"嗎","听":"聽","启":"啟","吴":"吳","呐":"吶","呕":"嘔","员":"員","呛":"嗆","呜":"嗚","咏":"詠","咙":"嚨","咛":"嚀","咸":"鹹","响":"響","哑":"啞","哒":"噠","哓":"嘵","哔":"嗶","哗":"嘩","哙":"噲","哜":"嚌","哝":"噥","唛":"嘜","唤":"喚","啧":"嘖","啬":"嗇","啭":"囀","啮":"嚙","啰":"囉","啸":"嘯","喷":"噴","喽":"嘍","嗫":"囁","嘘":"噓","团":"團","园":"園","围":"圍","国":"國","图":"圖","圆":"圓","圣":"聖","场":"場","坏":"壞","块":"塊","坚":"堅","坛":"壇","坝":"壩","坞":"塢","坟":"墳","坠":"墜","垄":"壟","垒":"壘","垦":"墾","垫":"墊","埘":"塒","埙":"塤","埚":"堝","堑":"塹","墙":"牆","壮":"壯","声":"聲","壳":"殼","处":"處","备":"備","复":"復","够":"夠","头":"頭","夹":"夾","夺":"奪","奋":"奮","奖":"獎","奥":"奧","妆":"妝","妇":"婦","妈":"媽","姗":"姍","娱":"娛","娄":"婁","娇":"嬌","娈":"孌","婴":"嬰","婵":"嬋","媪":"媼","嫒":"嬡","嫔":"嬪","孙":"孫","学":"學","宁":"寧","宝":"寶","实":"實","宠":"寵","审":"審","宪":"憲","宫":"宮","宽":"寬","宾":"賓","寻":"尋","导":"導","对":"對","将":"將","尔":"爾","尘":"塵","尝":"嘗","尧":"堯","尴":"尷","尽":"盡","层":"層","届":"屆","属":"屬","岁":"歲","岂":"豈","岖":"嶇","岗":"崗","岛":"島","岭":"嶺","岳":"嶽","峡":"峽","峦":"巒","币":"幣","帅":"帥","师":"師","帐":"帳","帘":"簾","帜":"幟","带":"帶","帮":"幫","帧":"幀","席":"席","并":"並","广":"廣","庄":"莊","庆":"慶","庐":"廬","库":"庫","应":"應","庙":"廟","废":"廢","开":"開","异":"異","弃":"棄","张":"張","弥":"彌","弯":"彎","弹":"彈","强":"強","归":"歸","录":"錄","当":"當","彻":"徹","径":"徑","忆":"憶","忧":"憂","怀":"懷","态":"態","总":"總","恋":"戀","恒":"恆","恳":"懇","恶":"惡","恼":"惱","悦":"悅","悬":"懸","惊":"驚","惧":"懼","惨":"慘","惩":"懲","惯":"慣","愤":"憤","愿":"願","戏":"戲","户":"戶","执":"執","扩":"擴","扫":"掃","扬":"揚","扰":"擾","抚":"撫","抢":"搶","护":"護","报":"報","担":"擔","拟":"擬","拢":"攏","拣":"揀","拥":"擁","拦":"攔","拧":"擰","拨":"撥","择":"擇","挂":"掛","挚":"摯","挛":"攣","挞":"撻","挟":"挾","挡":"擋","挣":"掙","挥":"揮","捞":"撈","损":"損","换":"換","据":"據","捡":"撿","掳":"擄","掷":"擲","掺":"摻","揽":"攬","搀":"攙","搁":"擱","搂":"摟","搅":"攪","携":"攜","摄":"攝","摆":"擺","摇":"搖","撑":"撐","撵":"攆","撸":"擼","擞":"擻","攒":"攢","敌":"敵","敛":"斂","数":"數","斋":"齋","斓":"斕","斗":"鬥","断":"斷","无":"無","旧":"舊","时":"時","旷":"曠","昙":"曇","昼":"晝","显":"顯","晋":"晉","晒":"曬","晓":"曉","暂":"暫","术":"術","机":"機","杀":"殺","杂":"雜","权":"權","条":"條","来":"來","杨":"楊","极":"極","构":"構","枪":"槍","柜":"櫃","标":"標","栋":"棟","栏":"欄","树":"樹","样":"樣","桥":"橋","桩":"樁","梦":"夢","检":"檢","楼":"樓","欢":"歡","欧":"歐","步":"步","歼":"殲","残":"殘","毁":"毀","毕":"畢","气":"氣","汉":"漢","汤":"湯","沟":"溝","没":"沒","沥":"瀝","沦":"淪","泞":"濘","泪":"淚","泻":"瀉","泽":"澤","洁":"潔","浅":"淺","浆":"漿","浇":"澆","测":"測","济":"濟","浓":"濃","涛":"濤","涝":"澇","涡":"渦","涣":"渙","润":"潤","涩":"澀","淀":"澱","渊":"淵","渐":"漸","温":"溫","湾":"灣","湿":"濕","满":"滿","滤":"濾","滥":"濫","滨":"濱","滚":"滾","滞":"滯","灾":"災","炉":"爐","点":"點","炼":"煉","烁":"爍","烟":"煙","烫":"燙","热":"熱","爱":"愛","爷":"爺","牵":"牽","状":"狀","犹":"猶","狈":"狽","狮":"獅","独":"獨","狭":"狹","猎":"獵","猪":"豬","猫":"貓","献":"獻","玛":"瑪","现":"現","环":"環","电":"電","画":"畫","畅":"暢","疗":"療","疟":"瘧","疮":"瘡","疯":"瘋","痒":"癢","瘫":"癱","皱":"皺","盏":"盞","盐":"鹽","监":"監","盖":"蓋","盘":"盤","着":"著","睁":"睜","瞒":"瞞","矫":"矯","矿":"礦","码":"碼","砖":"磚","础":"礎","礼":"禮","祷":"禱","祸":"禍","离":"離","种":"種","称":"稱","积":"積","稳":"穩","窝":"窩","窥":"窺","窜":"竄","竞":"競","笔":"筆","笼":"籠","筑":"築","筛":"篩","签":"簽","简":"簡","类":"類","粮":"糧","紧":"緊","纠":"糾","红":"紅","纤":"纖","约":"約","级":"級","纪":"紀","纫":"紉","纬":"緯","纯":"純","纱":"紗","纲":"綱","纳":"納","纵":"縱","纷":"紛","纸":"紙","纹":"紋","线":"線","练":"練","组":"組","细":"細","织":"織","终":"終","绍":"紹","经":"經","绑":"綁","结":"結","绕":"繞","绘":"繪","给":"給","络":"絡","绝":"絕","统":"統","绣":"繡","继":"繼","绩":"績","续":"續","绿":"綠","缓":"緩","编":"編","缘":"緣","缝":"縫","缩":"縮","缴":"繳","网":"網","罗":"羅","罚":"罰","罢":"罷","职":"職","联":"聯","聪":"聰","肃":"肅","肠":"腸","肤":"膚","胜":"勝","胶":"膠","脏":"髒","脑":"腦","脚":"腳","脱":"脫","脸":"臉","腊":"臘","腾":"騰","舆":"輿","舰":"艦","艺":"藝","节":"節","芜":"蕪","苏":"蘇","药":"藥","获":"獲","莲":"蓮","莳":"蒔","萝":"蘿","营":"營","萧":"蕭","萨":"薩","蓝":"藍","虑":"慮","虚":"虛","虫":"蟲","虽":"雖","蚀":"蝕","蚁":"蟻","蛊":"蠱","蛮":"蠻","补":"補","衬":"襯","袭":"襲","见":"見","观":"觀","规":"規","览":"覽","觉":"覺","触":"觸","计":"計","订":"訂","认":"認","讥":"譏","讨":"討","让":"讓","讪":"訕","训":"訓","议":"議","讯":"訊","记":"記","讲":"講","讳":"諱","讶":"訝","许":"許","论":"論","讼":"訟","设":"設","访":"訪","诀":"訣","证":"證","评":"評","识":"識","诉":"訴","诊":"診","词":"詞","译":"譯","试":"試","诗":"詩","诚":"誠","话":"話","询":"詢","该":"該","详":"詳","语":"語","误":"誤","说":"說","请":"請","诸":"諸","诺":"諾","读":"讀","课":"課","调":"調","谅":"諒","谈":"談","谋":"謀","谓":"謂","谢":"謝","谣":"謠","谦":"謙","谨":"謹","谱":"譜","贝":"貝","负":"負","贡":"貢","财":"財","责":"責","贤":"賢","败":"敗","账":"賬","货":"貨","质":"質","贩":"販","贪":"貪","贫":"貧","购":"購","贯":"貫","贴":"貼","贵":"貴","贷":"貸","贸":"貿","费":"費","贺":"賀","贼":"賊","资":"資","赖":"賴","赞":"讚","赠":"贈","赢":"贏","赵":"趙","趋":"趨","跃":"躍","践":"踐","踪":"蹤","车":"車","轨":"軌","轩":"軒","转":"轉","轮":"輪","软":"軟","轰":"轟","轻":"輕","载":"載","较":"較","辅":"輔","辆":"輛","辈":"輩","辉":"輝","辑":"輯","输":"輸","辖":"轄","辙":"轍","边":"邊","辽":"遼","达":"達","迁":"遷","过":"過","迈":"邁","运":"運","还":"還","进":"進","远":"遠","违":"違","连":"連","迟":"遲","选":"選","递":"遞","逻":"邏","遗":"遺","邮":"郵","邻":"鄰","郑":"鄭","郁":"鬱","酝":"醞","酱":"醬","酿":"釀","里":"裡","鉴":"鑑","针":"針","钓":"釣","钞":"鈔","钟":"鐘","钱":"錢","钩":"鉤","钮":"鈕","铁":"鐵","铜":"銅","银":"銀","锁":"鎖","锅":"鍋","错":"錯","键":"鍵","长":"長","门":"門","问":"問","闲":"閒","间":"間","闷":"悶","闹":"鬧","闻":"聞","阅":"閱","队":"隊","阳":"陽","阴":"陰","阵":"陣","阶":"階","际":"際","陆":"陸","陈":"陳","险":"險","随":"隨","隐":"隱","难":"難","雾":"霧","静":"靜","顶":"頂","项":"項","顺":"順","须":"須","顾":"顧","顿":"頓","颁":"頒","预":"預","领":"領","颠":"顛","风":"風","飞":"飛","饭":"飯","饮":"飲","馆":"館","马":"馬","驳":"駁","驻":"駐","驾":"駕","验":"驗","骑":"騎","骗":"騙","骚":"騷","鱼":"魚","渔":"漁","页":"頁","鸟":"鳥","鸡":"雞","麦":"麥","黄":"黃","齐":"齊","龄":"齡","龙":"龍"
  };

  const englishMap = {
    "迪士尼・环球影城接送": "Disney & Universal transfers", "酒店往返乐园，早出发、散场回程": "Hotel-to-park rides, morning or after closing", "东京迪士尼乐园／迪士尼海洋、大阪环球影城，想从酒店出发或散场后直接回去？告诉我日期、人数、上下车地点和单程／往返需求，先确认能否安排及价格。": "Heading to Tokyo Disneyland, DisneySea or Universal Studios Japan? Tell me your date, group size, pickup and drop-off points, and whether you need one way or return. I'll check availability and price first.", "找黑豚问接送与报价 →": "Ask Heitun about rides and pricing →",
    "按城市找": "Find by city", "全部城市／地区": "All cities / regions", "按城市筛选水族馆和动物园": "Filter aquariums and zoos by city", "按城市筛选夜景地点": "Filter night-view spots by city", "按城市筛选 · 地图同步": "Filter by city · Map updates too", "按城市挑代表地点，再打开地图和官网。": "Choose a city, then explore selected venues on the map and official sites.", "按城市挑观景台、缆车和夜景地点。": "Choose a city to see observation decks, ropeways and night views.", "这里只展示部分代表性夜景地点，不是全国完整名单。夜景受天气和能见度影响；屋顶与缆车也可能临时停运。出发前请看官网当日公告、最后入场时间和票务要求。": "These are selected night-view spots, not a complete list. Weather and visibility affect views; rooftops and ropeways may close. Check official notices, last entry and ticket rules before you go.",
    "先看各地代表地点，再按城市搜更多。": "Explore selected places, then search other cities.", "筛选已收录城市": "Filter listed cities", "全部已收录城市": "All listed cities", "筛选本站已收录的水族馆和动物园城市": "Filter cities listed for aquariums and zoos", "筛选本站已收录的夜景城市": "Filter cities listed for night views", "没看到你的城市？": "Don't see your city?", "上面是代表地点，不是全国目录。先点顶部「换个地方」选城市，再用地图搜索更多场馆。": "These are examples, not a nationwide directory. Use Change place above, then search more venues on a map.", "搜更多水族馆 ↗": "Find more aquariums ↗", "搜更多动物园 ↗": "Find more zoos ↗", "想找其他城市的夜景？": "Looking for night views in another city?", "先点顶部「换个地方」选城市，再用地图搜观景台和夜景地点；地图结果请核对官网。": "Use Change place above, then search observation decks and viewpoints on a map; verify results on official sites.", "搜更多夜景地 ↗": "Find more night views ↗", "更多水族馆": "More aquariums", "更多动物园": "More zoos", "更多夜景地": "More night views", "用日文词在地图搜索更多地点；这是第三方地图结果，不是本站核实过的场馆名单。": "Search more places in Japanese on a map. Third-party results are not a verified list from this site.", "按所选城市或当前位置搜索 · 日本地点较完整": "Search the selected city or nearby · more Japan listings", "按所选城市或当前位置搜索 · 适合 iPhone": "Search the selected city or nearby · good for iPhone", "日本地点可能较少，可复制日文词重搜": "Fewer Japan listings; copy the Japanese term to retry", "想找列表外的城市？先点页面顶部「换个地方」。开放时间、票价与是否需要预约，请以场馆官网为准。": "For a city not listed, use Change place above. Check official sites for hours, tickets and booking.",
    "上面只列代表地点。输入其他日本城市，用地图搜索更多场馆；不输入就沿用上面选中的城市或顶部的位置。": "Only selected places are listed above. Enter another Japanese city to search more venues on a map; leave it blank to use the selected city or location above.", "输入城市，如广岛": "Enter a city, e.g. Hiroshima", "要搜索的日本城市": "Japanese city to search", "输入日本城市，用地图搜更多观景台和夜景地；不输入就沿用上面选中的城市或顶部的位置。": "Enter a Japanese city to search more observation decks and viewpoints; leave it blank to use the selected city or location above.", "可在页面输入其他日本城市重新搜索。开放时间、票价与是否需要预约，请以场馆官网为准。": "Enter another Japanese city on the page to search again. Check official sites for hours, tickets and booking.", "用日文词在地图搜索更多夜景地点；第三方地图结果并非本站核实名单。": "Search more night-view spots in Japanese on a map. Third-party results are not verified by this site.", "可在页面输入其他日本城市重新搜索。开放时间、天气影响与是否需要预约，请以景点官网为准。": "Enter another Japanese city on the page to search again. Check official sites for hours, weather impacts and booking.",
    "横滨": "Yokohama", "名古屋": "Nagoya", "神户": "Kobe", "旭川": "Asahikawa", "福冈": "Fukuoka", "函馆": "Hakodate", "长崎": "Nagasaki",
    "墨田水族馆": "Sumida Aquarium", "东京 · 晴空塔城": "Tokyo · Skytree Town", "和晴空塔安排在同一天比较顺路。": "Easy to combine with Tokyo Skytree.", "上野动物园": "Ueno Zoo", "东京 · 上野": "Tokyo · Ueno", "上野公园内的动物园，先查开放日。": "A zoo in Ueno Park; check opening days.", "天王寺动物园": "Tennoji Zoo", "大阪 · 天王寺": "Osaka · Tennoji", "和新世界、天王寺一带可以顺路安排。": "Easy to combine with Shinsekai and Tennoji.", "京都水族馆": "Kyoto Aquarium", "京都 · 梅小路": "Kyoto · Umekoji", "靠近京都站，雨天也可先看室内展区。": "Near Kyoto Station; check indoor exhibits on rainy days.", "东山动植物园": "Higashiyama Zoo and Botanical Gardens", "名古屋 · 东山": "Nagoya · Higashiyama", "动物园与植物园一起逛，留意闭园日。": "Combine zoo and gardens; check closure days.", "神户须磨海洋世界": "Kobe Suma Sea World", "神户 · 须磨": "Kobe · Suma", "可看海洋生物与演出，先核对场次。": "Marine life and shows; check the schedule.", "海之中道海洋世界": "Marine World Uminonakamichi", "福冈 · 海之中道": "Fukuoka · Uminonakamichi", "在海之中道一带，先核对交通与表演时间。": "In the Uminonakamichi area; check access and show times.",
    "东京塔": "Tokyo Tower", "东京 · 芝公园": "Tokyo · Shiba Park", "经典东京夜景，可先看展望台门票。": "Classic Tokyo views; check observatory tickets.", "横滨宇宙时钟摩天轮": "Cosmo Clock 21 Ferris Wheel", "横滨 · 港未来": "Yokohama · Minato Mirai", "坐摩天轮看港未来灯光，留意晚间运营时间。": "See Minato Mirai lights from the wheel; check evening hours.", "阿倍野 HARUKAS 300": "Abeno Harukas 300", "大阪 · 天王寺": "Osaka · Tennoji", "高层室内观景，也可顺路逛天王寺。": "High-rise indoor views; combine with Tennoji.", "京都塔展望室": "Kyoto Tower Observatory", "京都 · 京都站前": "Kyoto · Kyoto Station", "靠近京都站，先确认当天营业时间。": "Near Kyoto Station; check today's hours.", "Midland Square 空中回廊": "Midland Square Sky Promenade", "名古屋 · 名古屋站": "Nagoya · Nagoya Station", "市中心高空观景，天气可能影响户外区域。": "City-center views; weather may affect outdoor areas.", "神户港塔": "Kobe Port Tower", "神户 · 美利坚公园": "Kobe · Meriken Park", "可看港口与城市灯光，屋顶开放受天气影响。": "Port and city lights; rooftop access depends on weather.", "稻佐山展望台": "Mount Inasa Observatory", "长崎 · 稻佐山": "Nagasaki · Mt. Inasa", "看港口夜景，上山前确认缆车运行。": "See the harbor at night; check ropeway operation.",
    "自己去玩": "Explore on your own", "地图与官网直达": "Maps and official sites", "自己去玩的地点": "Places to explore on your own", "‹ 返回雨天备选": "‹ Back to rainy-day options",
    "水族馆、动物园": "Aquariums and zoos", "按名字挑，地图找位置": "Pick by name, find it on the map", "按城市挑，地图找位置": "Choose a city, find it on the map", "今晚去看夜景": "Night views tonight", "观景台、缆车和夜景地": "Observatories, ropeways and night views", "按城市挑观景台和夜景地": "Choose a city for night views", "下雨了去哪儿？": "Where to go when it rains?", "室内备选": "Indoor alternatives",
    "水族馆、动物园去哪儿？": "Where to find aquariums and zoos?", "先看代表地点，再按名字打开地图和官网。": "Browse selected places, then open maps and official sites by name.",
    "日本代表性水族馆和动物园位置地图": "Map of selected aquariums and zoos in Japan", "地图暂时加载不了；下面的地点名单仍可使用。": "The map is unavailable. The list below still works.",
    "全国代表地点 · 不用先选城市": "Selected places across Japan · No city filter needed", "这里只展示部分代表性场馆，不是全国完整名单。开放日、门票、演出和户外区域安排请以场馆官网为准。": "These are selected venues, not a complete list. Check official sites for opening days, tickets, shows and outdoor areas.",
    "日本代表性夜景地点分布地图": "Map of selected night-view spots in Japan", "按名字挑观景台、缆车和夜景地点。": "Choose observatories, ropeways and night-view spots by name.",
    "夜景受天气和能见度影响；屋顶与缆车也可能临时停运。出发前请看官网当日公告、最后入场时间和票务要求。": "Weather and visibility affect night views. Rooftops and ropeways may close. Check official notices, last entry and ticket rules before you go.",
    "从现有玩法里，先挑比较不怕雨的。": "Start with options that work better in the rain.", "去水族馆": "Visit an aquarium", "先看室内展区；部分表演或区域仍在户外。": "Look for indoor exhibits; some shows or areas are outdoors.",
    "三丽鸥彩虹乐园": "Sanrio Puroland", "东京多摩的室内主题乐园 · 官网直达": "Indoor theme park in Tokyo's Tama area · Official site", "想逛奥特莱斯": "Browse outlets", "有些是露天商场，先确认你选的那家。": "Some outlets are outdoors; check the one you choose.",
    "博物馆、美术馆": "Museums and art galleries", "看日本观光局的地点介绍 · 官方网站": "Browse places on the JNTO official site", "这里是雨天备选，不代表这些地点当天一定开放或完全在室内。出发前看场馆公告，再打开地图核对交通。": "These are rain-day alternatives, not a guarantee of opening or fully indoor access. Check venue notices and transport before leaving.",
    "场馆官网 ↗": "Venue site ↗", "景点官网 ↗": "Attraction site ↗",
    "阳光水族馆": "Sunshine Aquarium", "东京 · 池袋": "Tokyo · Ikebukuro", "在 Sunshine City 里，适合安排半天。": "Inside Sunshine City; a half-day option.",
    "大阪海游馆": "Osaka Aquarium Kaiyukan", "大阪 · 天保山": "Osaka · Tempozan", "靠近大阪港，先到官网查时段和门票。": "Near Osaka Port; check times and tickets on its site.",
    "名古屋港水族馆": "Port of Nagoya Public Aquarium", "爱知 · 名古屋港": "Aichi · Nagoya Port", "名古屋港一带的大型水族馆。": "A large aquarium in the Nagoya Port area.",
    "旭山动物园": "Asahiyama Zoo", "北海道 · 旭川": "Hokkaido · Asahikawa", "去旭川时可以看看，开放日按季节确认。": "Consider it in Asahikawa; check seasonal opening days.",
    "冲绳美丽海水族馆": "Okinawa Churaumi Aquarium", "冲绳 · 本部町": "Okinawa · Motobu", "在冲绳本岛北部，先核对交通和开放时间。": "In northern Okinawa; check access and opening hours.",
    "东京 · 涩谷": "Tokyo · Shibuya", "城市夜景；屋顶区域会受天气影响。": "City views; rooftop access depends on weather.",
    "东京晴空塔": "Tokyo Skytree", "东京 · 押上": "Tokyo · Oshiage", "高空看东京；先查门票和当天能见度。": "See Tokyo from above; check tickets and visibility.",
    "梅田蓝天大厦·空中庭园": "Umeda Sky Building · Floating Garden", "大阪 · 梅田": "Osaka · Umeda", "适合大阪市区夜间顺路去看看。": "A city night-view stop in Osaka.",
    "函馆山夜景": "Mt. Hakodate Night View", "北海道 · 函馆": "Hokkaido · Hakodate", "上山前先看缆车运行和天气。": "Check ropeway operation and weather before going up.",
    "藻岩山夜景": "Mt. Moiwa Night View", "北海道 · 札幌": "Hokkaido · Sapporo", "可从札幌市区出发，先查缆车运行。": "Reachable from Sapporo; check ropeway operation.",
    "福冈塔": "Fukuoka Tower", "福冈 · 百道滨": "Fukuoka · Momochihama", "在海边看城市夜景，留意最后入场时间。": "Seaside city views; check the last admission time.",
    "日本代表性滑雪场地图": "Map of selected ski resorts in Japan",
    "先在地图上挑雪场": "Choose a ski resort on the map",
    "代表地点 · 不用先选城市": "Selected destinations · No city filter needed",
    "地图仅展示日本各地部分热门、代表性滑雪场。想找更多雪场，请点下方「按城市找雪场」。": "The map shows selected popular and representative ski resorts, not every resort in Japan. For more, use Browse resorts by city below.",
    "日本代表性滑雪场分布地图": "Map of selected ski resorts across Japan",
    "地图暂时加载不了；下面的雪场名单仍可使用。": "The map is unavailable. The resort list below still works.",
    "地图点位供看大致位置；初学者区域、装备租借和开放情况请以雪场官网当季公告为准。": "Map pins show approximate locations. Check each resort's current notices for beginner areas, rentals and opening status.",
    "有初学者区域": "Beginner area", "有装备租借": "Gear rental", "雪场官网 ↗": "Resort website ↗",
    "二世古联合滑雪场": "Niseko United", "北海道 · 二世古": "Hokkaido · Niseko", "四个雪区相连，适合想多滑几天的人。": "Four linked ski areas for a longer stay.",
    "富良野滑雪场": "Furano Ski Resort", "北海道 · 富良野": "Hokkaido · Furano", "北海道内陆的雪场，官网可查雪道和雪况。": "An inland Hokkaido resort; check runs and conditions on its site.",
    "藏王温泉滑雪场": "Zao Onsen Ski Resort", "山形 · 藏王温泉": "Yamagata · Zao Onsen", "想把滑雪、树冰和温泉放在一起考虑。": "Combine skiing, snow monsters and hot springs.",
    "GALA 汤泽滑雪场": "GALA Yuzawa Snow Resort", "新潟 · 越后汤泽": "Niigata · Echigo-Yuzawa", "车站连着雪场，适合比较东京出发的一日行程。": "The station connects to the resort; compare it for a Tokyo day trip.",
    "白马八方尾根滑雪场": "Hakuba Happo-one Ski Resort", "长野 · 白马": "Nagano · Hakuba", "雪道选择多，先按水平看雪道图。": "Many runs; check the trail map for your level.",
    "八北高原滑雪场": "Hachi Kita Ski Resort", "兵库 · 香美町": "Hyogo · Kami", "关西方向的选择，设有初次滑雪区域。": "A Kansai option with a first-timer area.",
    "琵琶湖谷滑雪场": "Biwako Valley Ski Resort", "滋贺 · 琵琶湖西侧": "Shiga · West of Lake Biwa", "想从京都、大阪方向出发，可先看看这里。": "Consider it when traveling from Kyoto or Osaka.",
    "日本各地奥特莱斯": "Outlet malls across Japan",
    "札幌北广岛": "Sapporo Kitahiroshima", "木更津": "Kisarazu", "酒酒井": "Shisui", "御殿场": "Gotemba", "长岛": "Nagashima", "大阪临空": "Osaka Rinku", "福冈旁·鸟栖": "Tosu · Near Fukuoka",
    "看地图挑一家，直接打开导航和官网。": "Choose one on the map, then open navigation or its official site.",
    "‹ 返回逛吃日本": "‹ Back to Eat & Shop",
    "先看全国位置，再按名字挑想去的那家。": "See the locations first, then choose a mall by name.",
    "日本各地代表性奥特莱斯分布地图": "Map of selected outlet malls across Japan",
    "地图暂时加载不了；下面的奥特莱斯名单仍可使用。": "The map is unavailable. The outlet list below still works.",
    "点名字，看它在哪里": "Choose a place by name",
    "全国代表地点 · 不用先选城市": "Selected locations across Japan · No city filter needed",
    "想找更多奥莱？": "Looking for more outlets?",
    "地图只展示部分代表性奥莱，不是全国完整名单。更多地点可到下面两家运营方的中文目录，按地区继续找：": "The map shows selected outlets, not a complete list. Find more by region in these two operators' Chinese directories:",
    "三井奥特莱斯全国目录 ↗": "Mitsui Outlet Park directory ↗",
    "Premium Outlets 全国目录 ↗": "Premium Outlets directory ↗",
    "地图点位只供看大致分布；导航时请点开地图确认准确入口。品牌、营业时间与优惠请以各商场官网为准。": "Pins show approximate locations. Confirm the exact entrance in your map app. Check each official site for brands, hours and offers.",
    "商场官网 ↗": "Official mall site ↗",
    "三井奥特莱斯·札幌北广岛": "Mitsui Outlet Park Sapporo Kitahiroshima", "北海道 · 札幌周边": "Hokkaido · Near Sapporo", "室内购物，北海道下雪天也能慢慢逛。": "Indoor shopping, even on snowy Hokkaido days.",
    "三井奥特莱斯·仙台港": "Mitsui Outlet Park Sendai Port", "宫城 · 仙台": "Miyagi · Sendai", "仙台港一带，适合东北行程顺路逛。": "By Sendai Port, easy to add to a Tohoku trip.",
    "三井奥特莱斯·木更津": "Mitsui Outlet Park Kisarazu", "千叶 · 东京湾东侧": "Chiba · East side of Tokyo Bay", "东京周边的大型奥莱，适合留半天逛。": "A large outlet near Tokyo; allow half a day.",
    "酒酒井 Premium Outlets": "Shisui Premium Outlets", "千叶 · 成田机场附近": "Chiba · Near Narita Airport", "往返成田机场时，可以看看是否顺路。": "See if it fits your Narita Airport route.",
    "御殿场 Premium Outlets": "Gotemba Premium Outlets", "静冈 · 富士山附近": "Shizuoka · Near Mt. Fuji", "去富士山、箱根一带时可以考虑。": "Consider it on a Mt. Fuji or Hakone trip.",
    "三井奥特莱斯·北陆小矢部": "Mitsui Outlet Park Hokuriku Oyabe", "富山 · 金泽与富山之间": "Toyama · Between Kanazawa and Toyama", "北陆行程想买东西，可从这里找起。": "A shopping stop on a Hokuriku itinerary.",
    "三井奥特莱斯·爵士之梦长岛": "Mitsui Outlet Park Jazz Dream Nagashima", "三重 · 名古屋周边": "Mie · Near Nagoya", "旁边就是长岛乐园，购物和玩乐可安排一天。": "Beside Nagashima Spa Land; combine shopping and rides.",
    "临空 Premium Outlets": "Rinku Premium Outlets", "大阪 · 关西机场附近": "Osaka · Near Kansai Airport", "靠近关西机场，适合对照航班时间安排。": "Near Kansai Airport; plan around your flight.",
    "三井奥特莱斯·仓敷": "Mitsui Outlet Park Kurashiki", "冈山 · 仓敷站旁": "Okayama · By Kurashiki Station", "车站旁，逛完还能去仓敷美观地区。": "By the station, near Kurashiki's historic quarter.",
    "鸟栖 Premium Outlets": "Tosu Premium Outlets", "佐贺 · 福冈周边": "Saga · Near Fukuoka", "九州行程可看看，从福冈出发也方便。": "A Kyushu option with access from Fukuoka.",
    "冲绳 ASHIBINAA 奥特莱斯": "Okinawa Outlet Mall Ashibinaa", "冲绳 · 丰见城": "Okinawa · Tomigusuku", "那霸机场南侧，离岛前可考虑顺路逛。": "South of Naha Airport; consider it before departure.",
    "日本主题游乐园去哪儿？": "Where to go for theme parks?",
    "除了迪士尼和环球影城，再看看这些乐园在哪里。": "Beyond Disney and Universal, see where these parks are.",
    "点地图看位置，或直接点下面的名字。": "Tap the map or choose a park by name below.",
    "日本代表性游乐园位置地图": "Map of selected theme parks in Japan",
    "地图暂时加载不了；下面的乐园名单仍可直接使用。": "The map is unavailable. The park list below still works.",
    "先看看这些乐园": "Explore these parks",
    "按名称点开，不用先选城市": "Choose by name; no city selection needed",
    "这里只展示部分代表性地点；地图点位供看分布，实际导航请点开地图确认。开放日、票价及预约方式，请以乐园官网为准。": "This is a selection, not a complete list. Map pins show the general distribution; confirm exact navigation in your map app. Check official sites for hours, prices and reservations.",
    "乐园官网 ↗": "Official park site ↗",
    "富士急乐园": "Fuji-Q Highland", "山梨 · 富士山旁": "Yamanashi · Near Mt. Fuji", "想坐刺激过山车，先看这里。": "Start here for thrilling roller coasters.",
    "三丽鸥彩虹乐园": "Sanrio Puroland", "东京 · 多摩": "Tokyo · Tama", "三丽鸥角色和演出，室内也能玩。": "Sanrio characters and shows, all indoors.",
    "长岛乐园": "Nagashima Spa Land", "三重 · 名古屋附近": "Mie · Near Nagoya", "过山车多，也有适合亲子的项目。": "Many coasters, plus family-friendly rides.",
    "吉卜力公园": "Ghibli Park", "爱知 · 长久手": "Aichi · Nagakute", "走进吉卜力作品世界；不是传统过山车乐园。": "Step into Ghibli worlds; not a conventional ride park.",
    "豪斯登堡": "Huis Ten Bosch", "长崎 · 佐世保": "Nagasaki · Sasebo", "欧风街景、季节活动和夜间灯光。": "European-style streets, seasonal events and night lights.",
    "东京迪士尼度假区": "Tokyo Disney Resort", "千叶 · 舞滨": "Chiba · Maihama", "迪士尼乐园和迪士尼海洋都在这里。": "Home to Tokyo Disneyland and DisneySea.",
    "日本环球影城": "Universal Studios Japan", "大阪 · 此花区": "Osaka · Konohana", "电影与角色主题项目，记得先查入园安排。": "Movie and character attractions; check entry details first.",
    "山梨 · 富士山旁 · 想坐刺激过山车，先看这里。": "Yamanashi · Near Mt. Fuji · Thrilling roller coasters",
    "东京 · 多摩 · 三丽鸥角色和演出，室内也能玩。": "Tokyo · Tama · Sanrio shows and indoor fun",
    "三重 · 名古屋附近 · 过山车多，也有适合亲子的项目。": "Mie · Near Nagoya · Coasters and family rides",
    "爱知 · 长久手 · 走进吉卜力作品世界；不是传统过山车乐园。": "Aichi · Nagakute · Explore Ghibli worlds",
    "长崎 · 佐世保 · 欧风街景、季节活动和夜间灯光。": "Nagasaki · Sasebo · Streets, events and lights",
    "千叶 · 舞滨 · 迪士尼乐园和迪士尼海洋都在这里。": "Chiba · Maihama · Disneyland and DisneySea",
    "大阪 · 此花区 · 电影与角色主题项目，记得先查入园安排。": "Osaka · Konohana · Movie and character attractions",
    "点开选玩法": "Choose an activity",
    "点击对应的雪场，查看开场日期、雪况、天气、滑道参数、价格等。": "Tap a resort to see opening dates, snow conditions, weather, slope details, prices and more.",
    "SNOWY · 繁体中文": "SNOWY · Traditional Chinese",
    "全国各个滑雪场 当前积雪厚度及天气查询": "Snow depth and weather at ski resorts across Japan",
    "当前看雪场直播": "Watch resort cameras now",
    "STEEP · 繁体中文；不保证全天直播": "STEEP · Traditional Chinese; streams may not run all day",
    "滑雪场、玩雪地，先选一个；再看看附近和当天雪况。": "Choose a ski resort or snow-play area, then check nearby options and today's conditions.",
    "找附近雪场，再查积雪、天气和现场画面": "Find nearby resorts, then check snow depth, weather and live views",
    "雪场接送": "Ski resort transfer",
    "STEEP · 繁体中文；并非每家都有": "STEEP · Traditional Chinese; not every resort has a camera",
    "搜一下当前附近的滑雪场？": "Search for ski resorts near your current location?",
    "搜索附近的什么？": "What would you like to find nearby?", "滑雪场、玩雪地，先选一个；也能按城市慢慢挑。": "Choose a ski resort or snow-play area, or browse by city.", "附近滑雪场": "Nearby ski resorts", "先地图找雪场，再按城市看初学者和租借信息": "Search the map, then browse beginner and rental details by city", "附近玩雪地": "Nearby snow-play areas", "地图搜附近滑雪场": "Find ski resorts on a map", "打开地图后核对搜索位置；没到日本可先点顶部「换个地方」。": "Check the search area after opening the map; if you're not in Japan, use Change place above.", "选地图打开": "Choose a map", "复制日文词": "Copy Japanese term", "当前位置附近有没有玩雪的地方？": "Any snow-play areas near you?", "很多场所只在冬季雪季开放，夏天可能改做其他游乐项目。搜到后请确认当季是否能玩雪。": "Many venues open for snow play only in winter and may offer other activities in summer. Check whether snow play is available this season.",
    "附近玩雪地，用哪个地图？": "Which map for snow play?", "附近滑雪场，用哪个地图？": "Which map for ski resorts?", "用日文找附近的玩雪区；地图结果可能混有普通公园，请确认场地是否开放玩雪。": "Search snow-play areas in Japanese; results may include ordinary parks, so confirm access.", "用日文找附近雪场；点开具体雪场后，再核对当天开放和装备租借。": "Search nearby resorts in Japanese, then confirm today's opening and rentals.", "打开后核对搜索位置 · 日本地点较完整": "Check the search area · more Japanese listings", "打开后核对搜索位置 · 适合 iPhone": "Check the search area · good for iPhone", "定位搜索 · 日本地点可能较少，可复制日文词重搜": "Location search · fewer Japan listings; copy the Japanese term to retry", "未到日本？先点页面顶部「换个地方」。地图结果不保证按距离排序，雪场和玩雪区的开放情况以官网为准。": "Not in Japan yet? Use Change place above. Map results may not be distance-sorted; confirm opening status with the venue.",
    "找滑雪场": "Find ski resorts", "从出发城市找周边雪场，顺便看租借与雪况": "Browse from your base city, then check rentals and snow", "你从哪里出发？": "Where are you starting?", "先找住的城市周边，再看每家雪场的雪道、装备租借和当天雪况。": "Start near the city you're staying in, then check runs, rentals and snow conditions.", "其他城市": "Other cities", "先看一个例子；更多雪场在下面按城市查": "One example; browse more resorts by city below",
    "东京出发 · GALA 汤泽": "From Tokyo · GALA Yuzawa", "新潟县越后汤泽一带，适合拿来比较东京周边的滑雪行程。": "In the Echigo-Yuzawa area of Niigata; a starting point for a Tokyo-based ski trip.", "适合初学者": "Beginner-friendly", "可租装备": "Gear rental", "依据：雪场官网列有初级缓坡和装备租借。": "Based on official beginner runs and rental information.", "看雪道 ↗": "View runs ↗", "看租借 ↗": "View rentals ↗",
    "札幌出发 · 札幌手稻": "From Sapporo · Sapporo Teine", "札幌市内的雪场，先看初学区是否适合同行的人。": "A resort in Sapporo; check whether its beginner area suits your group.", "依据：雪场官网列有初学区和装备租借。": "Based on the official beginner-area and rental pages.", "看初学区 ↗": "View beginner area ↗", "大阪／京都出发 · 琵琶湖谷": "From Osaka / Kyoto · Biwako Valley", "滋贺县的雪场，可作为关西周边的一个参考。": "A Shiga resort to consider from Kansai.", "依据：雪场官网列有初级雪道和装备租借。": "Based on official beginner-run and rental information.", "看中文介绍与租借 ↗": "Chinese guide and rentals ↗",
    "其他城市 · 到雪场目录筛选": "Other cities · browse the directory", "可按城市或地区找候选雪场；别把出发城市误当成雪场所在城市。": "Browse by base city or region; your starting city is not the resort location.", "打开中文雪场目录 ↗": "Open Chinese resort directory ↗", "找更多雪场，查当天雪况": "Find more resorts and current conditions", "按城市找更多雪场，再确认积雪、开放情况和镜头。第三方信息会变化，不是本站实时播报。": "Browse more resorts by city, then check snow, opening status and cameras. Third-party data may change.", "按城市找雪场": "Browse resorts by city", "查积雪与天气": "Snow depth and weather", "看雪场镜头": "Resort cameras", "「适合初学者」只表示官网有初级区域或缓坡，不保证当天开放；租借品类、尺寸和库存请在出发前向雪场确认。": "Beginner-friendly means official beginner terrain exists, not that it's open today. Confirm rental items, sizes and availability before leaving.",
    "滑雪、玩雪去哪儿？": "Where to ski or play in the snow?", "想认真滑，还是只想玩玩雪？先选一个。": "Want to ski, or just enjoy the snow? Choose one.",
    "去滑雪，还是玩玩雪？": "Ski or play in the snow?", "不用先研究一堆雪场，选你想玩的就好。": "Choose what you want to do first.",
    "滑雪场": "Ski resorts", "从第一次学，到想找更过瘾的雪道": "From your first lesson to more challenging runs", "玩雪・雪上活动": "Snow play & activities", "不想滑雪也能玩，拍照、雪橇、雪圈都算": "No skiing needed: photos, sledding and tubing", "进去看看 →": "Explore →", "‹ 换一种玩法": "‹ Choose another activity",
    "滑雪，先看自己是哪一类": "Start with your skiing experience", "第一次学": "First lesson", "会滑，想进步": "Ready to improve", "经常滑": "Ski often", "第一次学：": "First lesson:", "先找有初学者课程、装备租借和缓坡的雪场，不用追求大雪场。": "Look for beginner lessons, rentals and gentle slopes—not just a big resort.", "看初学者指南 ↗": "Beginner guide ↗", "会滑，想进步：": "Ready to improve:", "找初中级雪道都有、能多滑几条路线的雪场，再比较交通和课程。": "Look for varied beginner and intermediate runs, then compare access and lessons.", "经常滑：": "Ski often:", "先看雪道难度、当天开放的缆车和雪况；不要只凭宣传照片决定。": "Check run difficulty, open lifts and current snow before choosing.",
    "再看从哪座城市出发": "Where are you starting?", "东京": "Tokyo", "札幌": "Sapporo", "全国其他地区": "Elsewhere in Japan", "先看一个代表方向，再比较更多雪场": "One starting point; compare more resorts nearby", "东京出发 → 越后汤泽一带": "Tokyo → Echigo-Yuzawa area", "周边有多个雪场，适合先比较交通、教学和温泉安排。": "Compare several nearby resorts for access, lessons and onsen stops.", "看中文地区介绍 ↗": "Chinese area guide ↗", "看 GALA 雪场官网 ↗": "GALA official site ↗", "札幌出发 → 札幌手稻": "Sapporo → Sapporo Teine", "离札幌较近，先比较初学区和其他雪道是否符合自己的水平。": "Close to Sapporo; check which runs suit your level.", "看中文介绍 ↗": "Chinese guide ↗", "看雪场官网 ↗": "Resort official site ↗", "大阪／京都出发 → 琵琶湖谷": "Osaka / Kyoto → Biwako Valley", "关西一日游的参考方向，开放情况请按当天公告确认。": "A Kansai day-trip option; confirm the day's opening status.", "看中文官网 ↗": "Chinese official site ↗", "全国其他地区 → 按地区挑雪场": "Elsewhere → browse by region", "北海道、东北、长野、新潟等地雪场很多，先按出发城市筛，不必硬套一个榜单。": "Browse Hokkaido, Tohoku, Nagano, Niigata and more by your departure city.", "看全国雪场目录（英文）↗": "Nationwide ski directory (English) ↗", "临出发查当天情况": "Check today's conditions before leaving", "开放雪道、缆车和积雪会变；下面是第三方查询入口，不是本站实时播报。": "Open runs, lifts and snow can change. These are third-party sources, not live updates from this site.", "这只是选方向；实际交通时间、课程、租借和票价要按出发日期查官方信息。": "These are starting points; check official sites for travel, lessons, rentals and prices.",
    "不滑雪，也能痛快玩雪": "Enjoy snow without skiing", "不用先学会滑雪，挑喜欢的雪上活动，再看目的地有没有、适不适合同行的人。": "Pick an activity, then check if your destination offers it for your group.", "雪橇・雪圈": "Sledding & tubing", "轻松玩，带小朋友也能考虑；先查年龄和身高限制。": "Easy fun; check age and height limits for children.", "雪地乐园": "Snow play area", "堆雪人、打雪仗、拍雪景，适合不想上雪道的人。": "Build snowmen, play and take photos without skiing.", "雪地散步": "Snowshoe walk", "想多看风景，可找有向导的雪鞋徒步体验。": "Try a guided snowshoe walk for scenery.", "怎么找附近能玩的地方？": "Where can you go?", "先用中文了解雪地活动，再到各场地官网确认开放日期、门票和交通。": "Start with the Chinese guide, then confirm dates, tickets and access with each venue.", "看日本观光局中文雪季介绍": "JNTO Chinese winter guide", "第三方官网": "Third-party official site", "玩雪区不一定在滑雪票范围内，能否租装备、是否接受幼童，请以场地公告为准。": "Snow-play areas may require separate tickets. Check rentals and child policies with each venue.",
    "附近想怎么玩雪？": "How would you like to play in the snow nearby?", "按玩法搜 · 不是实时开放名单": "Search by activity · not live opening status", "先选一种玩法，用地图搜当前位置附近；没到日本可先点顶部「换个地方」。": "Choose an activity and search near your location on a map. Not in Japan yet? Use Change place above.", "搜附近能滑雪橇或雪圈的场地": "Search nearby sledding or tubing areas", "亲子玩雪区": "Family snow-play areas", "堆雪人、打雪仗，适合不滑雪的人": "Snowmen and snowball fights without skiing", "雪上活动": "Snow activities", "雪鞋散步等体验，先查是否需要预约": "Snowshoe walks and more; check booking rules", "地图搜索可能混入普通公园；很多场地只在冬季开放，夏季可能改做其他项目。出发前请核对今季公告。": "Map results may include ordinary parks. Many venues open only in winter; check this season's notice before leaving.", "不知道去哪儿？先看这些代表地点": "Not sure where? Explore these examples", "玩雪场地 · 不是全国完整名单": "Snow-play venues · not a complete list", "按地区看": "Browse by region", "全部地区": "All regions", "这些是曾提供玩雪项目的代表地点，不表示今天开放。雪况、日期、门票、装备租借及儿童限制每季可能变动，以场地官网当季公告为准。": "These example venues have offered snow play; this does not mean they are open today. Check official seasonal notices for snow, dates, tickets, rentals and child rules.", "附近雪橇场": "Sledding nearby", "附近亲子玩雪区": "Family snow play nearby", "附近雪上活动": "Snow activities nearby", "场地官网 ↗": "Venue website ↗", "北海道": "Hokkaido", "东北": "Tohoku", "关东周边": "Around Kanto", "关西周边": "Around Kansai",
    "去滑雪，先从哪儿选？": "Where should you ski?", "新手、带娃、滑雪玩家，按出发地找个方向。": "A starting point for beginners, families and skiers, based on where you stay.",
    "去滑雪": "Go skiing", "先挑个适合自己的方向，出发前再看当天能不能滑。": "Pick a suitable area first, then check what's open before you go.",
    "这次想怎么玩？": "What kind of ski day?", "第一次滑": "First time", "带娃玩雪": "Snow play with kids", "认真滑雪": "A proper ski day",
    "从哪里出发？": "Where are you starting?", "东京周边": "Tokyo area", "札幌周边": "Sapporo area", "大阪／京都": "Osaka / Kyoto", "其他地区": "Elsewhere",
    "黑豚帮你先缩小范围": "A starting point from Heitun", "东京出发，可以先看越后汤泽": "From Tokyo: start with Echigo-Yuzawa",
    "车站周边有多个雪场，适合把一日体验和温泉放在一起比较。": "Several ski areas near the station make it worth comparing a day trip with an onsen stop.",
    "札幌出发，可以先看札幌手稻": "From Sapporo: start with Sapporo Teine", "市区出发较方便，有初级到进阶雪道；适合先试一次。": "Accessible from the city, with runs for beginners through advanced skiers.",
    "大阪／京都出发，可以先看琵琶湖谷": "From Osaka / Kyoto: start with Biwako Valley", "关西的一日游方向；是否开放雪道，要等雪季按当天公告确认。": "A Kansai day-trip option; check the day's notice to see whether ski runs are open.",
    "不在这些城市？按地区找雪场": "Elsewhere? Browse ski areas by region", "先看日本观光局的地区介绍，再按交通和玩法缩小范围。": "Start with JNTO's regional guide, then narrow your choice by travel time and activities.",
    "看日本观光局中文介绍 ↗": "Read JNTO's Chinese guide ↗", "看日本观光局中文指南 ↗": "Read JNTO's Chinese guide ↗", "参考雪场官网：GALA 汤泽 ↗": "Example resort: GALA Yuzawa official site ↗", "查看札幌手稻官网营业状况 ↗": "Check Sapporo Teine's official status ↗", "查看琵琶湖谷中文官网 ↗": "Biwako Valley Chinese official site ↗", "看看初学者中文指南 ↗": "Beginner guide in Chinese ↗",
    "选之前留意": "Before you choose", "第一次滑：先确认有没有教学、装备和雪服租借，别只看雪场照片。": "First time: check lessons, equipment and clothing rentals—not just the photos.",
    "带娃玩雪：先看儿童雪地乐园、年龄限制和保暖休息区；不一定要买滑雪票。": "With kids: check snow-play areas, age limits and warm rest spaces; you may not need a ski lift ticket.",
    "认真滑雪：重点查当天开放雪道、缆车、雪量和天气，别只看往年雪季日期。": "Skiers: check open runs and lifts, snow and weather today—not last year's season dates.",
    "临出发，查当天情况": "Check conditions before you go", "雪场开放、雪道和缆车会随天气变化。下面是第三方实时入口，不是本站实时播报。": "Resort, run and lift status can change with the weather. These are third-party updates, not live reports from this site.",
    "看地区雪况": "Regional snow reports", "查雪场营业与积雪": "Resort status & snow depth", "这里只是选方向，不代表当天已经开场，也不保证有中文教练；票价、租借和课程请以雪场官方信息为准。": "These are starting points, not confirmation of opening or Chinese lessons. Check the resort's official information for tickets, rentals and classes.",
    "接下来的花火日期": "Upcoming fireworks dates", "接下来的祭典日期": "Upcoming festival dates",
    "这里按日期列出接下来": "Here are the next", "最多10场花火大会": "up to 10 fireworks events", "最多10场祭典活动": "up to 10 festivals", "，不是全国完整名单。想找更多，去下面网站按城市、日期搜；拿不准也可以找黑豚问问。": ", ordered by date—not a complete nationwide list. Search the sites below by city and date for more, or ask Heitun.",
    "已整理的花火场次都过去了；可以去下面网站找新日期。": "All listed fireworks dates have passed. Check the sites below for new dates.", "已整理的祭典活动都过去了；可以去下面网站找新日期。": "All listed festival dates have passed. Check the sites below for new dates.",
    "当月部分场次参考": "Selected events this month", "当月部分活动参考": "Selected events this month",
    "这里只挑了几场": "Here are a few", "当月的花火大会": "fireworks events this month", "当月的祭典活动": "festivals this month", "，不是全国完整名单。想找更多，去下面网站按城市、日期搜；拿不准也可以找黑豚问问。": ", not a complete nationwide list. Search the sites below by city and date for more, or ask Heitun.",
    "这个月还没整理到花火场次；可以去下面网站按地区找。": "No fireworks events are listed for this month yet. Check the sites below by region.", "这个月还没整理到祭典活动；可以去下面网站按城市、日期找。": "No festivals are listed for this month yet. Check the sites below by city and date.",
    "玩日本": "Enjoy Japan", "‹ 返回玩日本": "‹ Back to Enjoy Japan", "先来黑豚的频道看看": "Explore Heitun's channels first",
    "想看一场热闹，住一晚温泉，或者走一条不一样的路？从这里挑个想法。": "Find a local event, stay at an onsen, or take a different route. Pick an idea here.",
    "最新实时情报": "Latest updates", "樱花、红叶、花火、当地活动和雪景": "Blossoms, leaves, fireworks, local events and snow", "看看最近有什么好玩 →": "See what's happening soon →", "点开看看最近有什么好玩": "Tap to see what's on now",
    "说说你想怎么玩": "How would you like to explore?", "有喜欢的，点进去看看；需要安排就直接找我聊。": "Open what interests you, or message me if you need help arranging it.",
    "需要人帮忙": "Need a hand?", "找黑豚安排": "Ask Heitun to arrange it", "先选你想办的事，再把地点、日期和人数告诉我。": "Choose what you need, then tell me the place, date and group size.",
    "想自己挑选": "Explore on your own", "自己查、自己订": "Browse and book yourself", "查地点和玩法，开放时间与预约条件以店家官网为准。": "Explore places and activities; check opening hours and booking rules on the official site.",
    "想看热闹、自己去玩，或找黑豚帮忙安排？": "Find events, explore on your own, or ask Heitun for help?", "先认识黑豚": "Meet Heitun", "看看我的视频和频道": "See my videos and channels", "看看我的视频和频道，里面有日本各地美食、温泉、玩法攻略等！": "See my videos and channels for food, hot springs and travel ideas from around Japan!", "看看他亲自体验过的日本美食和玩法": "See the food and experiences Heitun has tried firsthand in Japan", "先认识黑豚｜看看他亲自体验过的日本美食和玩法": "Meet Heitun | Food and experiences he has tried firsthand in Japan", "先认识黑豚的博主身份｜看看他亲自体验过的日本美食和玩法": "Meet Heitun as a travel creator | See the food and experiences he has tried firsthand in Japan", "点击对应平台标识，跳转黑豚的频道视频攻略。": "Tap a platform icon to visit Heitun's channel for video travel guides.",
    "有人帮你安排": "Get help planning", "找黑豚": "Ask Heitun", "找黑豚推荐安排": "Ask Heitun for suggestions and help", "交给黑豚安排": "Let Heitun arrange it", "找黑豚安排接送": "Ask Heitun to arrange a transfer", "找雪场、查雪况": "Find resorts and snow reports", "环球影城 迪士尼 等等": "Universal Studios · Disney · more", "点开看详情，再决定要不要联系": "Open for details before contacting me", "点开查看详情，再做决定。": "Open the details, then decide.",
    "机场接送": "Airport transfers", "机场接送机预订": "Book an airport transfer", "东京、大阪、北海道、福冈等日本多地均可": "Tokyo, Osaka, Hokkaido, Fukuoka and other areas across Japan", "行李多、带老人小孩，少折腾转车": "Luggage or family? Skip difficult transfers", "海景、山景、雪景或情侣私汤": "Sea views, mountain views, snow or private baths",
    "夯": "Featured", "时间紧，挤出一两天，按你的兴趣安排": "Short on time? Set aside a day or two, planned around your interests", "时间不多？直达精髓！挤出一天或两天，去看看红叶、雪景、牧场、乡下温泉这些不一样的日本。其余时间自己玩；包车的这一两天，你想看什么、想体验什么，就按你的兴趣来安排，不用跟着固定路线赶景点，整体预算也更好控制。": "Short on time? Set aside one or two days for autumn leaves, snow scenery, farms or countryside hot springs. Explore independently on other days. For your private-car days, tell us what you want to see and do so the route follows your interests instead of a rushed fixed itinerary, while keeping the overall budget easier to manage.",
    "推荐餐厅、订位或帮忙打日语电话": "Restaurant ideas, bookings or calls in Japanese", "查看全部服务": "See all services", "还有当地体验、邮轮和小众路线": "Local experiences, cruises and custom routes",
    "还有当地体验": "More local experiences",
    "手作、和服、钓鱼，约好可自行前往": "Crafts, kimono and fishing; travel there yourself", "港口、时间和路线一起想": "Plan around your port, schedule and route", "小众一日／两日游线路": "Custom one- or two-day trips", "与当地车队共同设计中": "In development with local drivers",
    "具体能否帮办，需要先了解地点、时间和事情内容。": "Please share the place, date and request so we can check what is possible.", "自己看看、自己决定": "Explore at your own pace", "链接和地图直达": "Direct links and maps",
    "想自己开去乡下、海边或雪景地？先确认驾照是否适用，再看日本租车网站；想找华人租车行，也可以问黑豚。": "Want to drive to the countryside, coast or snow? Check whether your license is valid in Japan, browse Japanese rental sites, or ask Heitun about Chinese-speaking rental options.", "需符合日本认可的驾驶许可；订前请在店家中文网站核对。": "An eligible driving permit is required; check the operator's Chinese site before booking.", "开放时间、价格及预约条件，以店家官网为准。": "Check official sites for hours, prices and booking rules.",
    "找黑豚安排机场接送": "Ask Heitun to arrange an airport transfer", "行李多，老人小孩照顾，转车麻烦，还不如包个车接送酒店更省心省钱。": "Travelling with luggage, older family members or kids? A private ride to your hotel can make transfers easier and may be better value for a group.",
    "邮轮靠岸，玩上一天": "A day ashore from your cruise", "告诉我邮轮停靠的港口城市、上下船时间和想去的地方，一起安排当天怎么玩。": "Tell me the port city, when you can leave and return to the ship, and where you'd like to go. We'll plan the day together.", "找黑豚安排一天": "Ask Heitun to plan the day", "只停一天，挑个舒服的玩法。": "One day ashore—pick a pace that suits you.", "想怎么玩？": "How would you like to explore?", "轻松逛港口附近": "Explore near the port", "包车玩一天": "Private car for the day", "还没想好": "Not sure yet", "告诉我邮轮停靠的港口城市、上下船时间和想去的地方，一起安排当天怎么玩。上下船时间请以实际能下船和必须返船的时间为准。": "Tell me the port city, when you can leave and return to the ship, and where you'd like to go. Use the actual disembarkation and return deadlines, not only the published port times.",
    "看看日本当季有什么好玩，也可以找黑豚聊聊安排。": "See what's on in Japan this season, or ask Heitun for help planning.",
    "我就是你日本的人脉！哈哈哈哈哈": "I'm your Japan connection! Haha!",
    "日本正当时": "Japan in season", "查看最新实时情报": "See the latest updates", "查当季花期与活动": "Seasonal blooms and events", "樱花 · 红叶 · 花火 · 当地热闹": "Blossoms · Autumn leaves · Fireworks · Local events", "滑雪 · 花火大会 · 红叶 · 樱花 · 当地热闹 · 主题游乐园": "Skiing · Fireworks · Autumn leaves · Blossoms · Local events · Theme parks", "点开看最近有什么好玩": "See what's happening soon",
    "看看你去的那几天，哪座城市正好有花，有烟火，有热闹。": "See which city has blossoms, fireworks or festivals during your trip.",
    "看樱花": "Cherry blossoms", "看开花、满开时间和地区": "Bloom and full-bloom dates by region", "看各地预计开花时间": "Forecast bloom dates by region", "查看花期 ↗": "View bloom dates ↗",
    "追红叶": "Autumn leaves", "看各地变色与见顷": "Color changes and peak dates", "看各地预计见顷": "Forecast peak colors by region", "查看见顷 ↗": "View peak colors ↗",
    "先去原站看 2026 年预测；下面这张是多年平均参考。同一座城市，": "See the 2026 forecast on the original site first. The map below shows long-term averages. Even within one city, ", "查看 2026 红叶预测图": "View the 2026 autumn-leaf forecast map", "LIVE JAPAN · 简体中文｜到原站看预测及赏枫地点": "LIVE JAPAN · Simplified Chinese | Forecast and viewing spots on the original site",
    "看花火大会": "Fireworks festivals", "按月份、地区找大会": "Find events by month and region", "看全国花火大会资讯": "Fireworks events across Japan", "查看日历 ↗": "View calendar ↗", "查看花火 ↗": "View fireworks ↗",
    "赶祭典活动": "Local festivals", "看看当地这几天有什么活动": "See what's on during your trip", "查看活动 ↗": "View events ↗",
    "当地有什么好玩": "What's on nearby", "拉面大赛、美食节、市集、展览……": "Ramen contests, food fairs, markets and exhibitions…", "去看看 ↗": "Explore events ↗",
    "追雪去 滑雪 玩雪": "Find snow · Ski · Play", "找附近滑雪场、玩雪地，再查当天雪况。": "Find nearby ski resorts and snow-play areas, then check today's conditions.",
    "花期是预测，活动也可能改期；出发前再看详情与主办方最新通知。": "Bloom dates are forecasts, and events can change. Check the details and organizer updates before you go.",
    "想去的地方太远，怎么安排？": "The place you want to visit is far away—how should you plan it?", "时间、路线拿不准，来找我聊聊。": "Not sure about timing or routes? Ask me.",
    "简体": "简体", "繁體": "繁體", "选择语言": "Choose language", "语言切换": "Language", "主要导航": "Main navigation", "有更新": "Updated", "近": "Soon", "季": "Season",
    "黑豚君 · 日本旅行工具箱": "Heitun · Japan Toolbox",
    "黑豚的日本旅行工具箱": "Heitun's Japan Toolbox",
    "定位离你最近的厕所、吸烟区、商超便利店等。": "Locate the nearest toilets, smoking areas, supermarkets, convenience stores and more.",
    "回到首页": "Back to home", "回到工具箱": "Back to toolbox", "定位当前地区": "Locate current area", "定位当前区": "Locate me", "换个地方": "Change place", "换个地方搜索": "Search another place", "搜索地点": "Search area", "文": "文",
    "纯干货！！": "Only the useful stuff!", "当地人共享的宝藏工具，": "Local-approved travel tools,", "邪修！！纯干货！": "Travel hacks! Only the useful stuff!", "日本自由行宝藏网站": "A Japan travel site worth saving", "中文直达！": "made easy for you.",
    "日本吃喝拉撒": "Everyday Japan, made easier", "📍 日本全国可用": "📍 Available across Japan", "黑豚日本旅行": "Heitun Japan travel",
    "📍立刻定位离你最近的什么？": "📍 What can I find near me?", "随便O": "Find a toilet", "人有三急，附近厕所，": "When nature calls,", "随便屙！": "find one nearby!",
    "来一根": "Smoking spots", "找合法吸烟点": "Find legal smoking areas", "定位最近的吸烟点": "Locate the nearest smoking area", "合规吸烟区": "Designated smoking areas", "吸烟有害健康。": "Smoking is harmful to health.",
    "便利一下": "Nearby shopping", "找附近便利店": "Find a nearby convenience store", "找附近便利店，": "Find a nearby store,", "补给不发愁。": "and stock up with ease.", "便利店・超市，": "Convenience store or supermarket,", "马上找附近。": "find one nearby now.", "便利店・超市": "Convenience stores · Supermarkets", "药妆店也能找": "Drugstores too", "药妆店・便利店": "Drugstores · convenience stores",
    "现在想买什么？": "What are you shopping for?", "便利店适合临时补给，超市更适合买熟食和日常用品。": "Convenience stores are best for quick stops; supermarkets are better for prepared food and daily shopping.", "临时补给找便利店，买熟食找超市，药妆和日用品找药妆店。": "Convenience stores for quick stops, supermarkets for prepared food, and drugstores for beauty and daily essentials.",
    "附近便利店": "Nearby convenience stores", "饮料・饭团・ATM": "Drinks · Rice balls · ATM", "营业时间通常更长": "Usually open later", "马上找": "Find now",
    "附近超市": "Nearby supermarkets", "熟食・便当・日常采购": "Prepared food · Bento · Daily shopping", "选择更多，通常更划算": "More choice, usually better value",
    "附近药妆店": "Nearby drugstores", "药妆・护肤・日用品": "Beauty · Skincare · Daily essentials", "日文搜索「ドラッグストア」": "Search ‘ドラッグストア’",
    "用日文“スーパーマーケット”搜索附近超市，适合买熟食、便当和日常用品。": "Search in Japanese for nearby supermarkets—ideal for prepared food, bento and daily items.", "用日文“コンビニ”搜索附近便利店，适合临时补给、ATM和营业时间较晚时使用。": "Search in Japanese for nearby convenience stores—ideal for quick supplies, ATMs and late hours.",
    "日文搜索“スーパーマーケット” · 地点更完整 · 需要当地网络才能打开哦！": "Search ‘スーパーマーケット’ · More complete listings · Requires local internet access", "日文搜索“コンビニ” · 地点更完整 · 需要当地网络才能打开哦！": "Search ‘コンビニ’ · More complete listings · Requires local internet access", "搜索“超市” · 日本地点可能较少": "Search ‘supermarket’ · Fewer Japan listings", "搜索“便利店” · 日本地点可能较少": "Search ‘convenience store’ · Fewer Japan listings",
    "用日文“ドラッグストア”搜索附近药妆店，可找药妆、护肤品和日用品。": "Search ‘ドラッグストア’ for nearby beauty, skincare and daily essentials.", "日文搜索“ドラッグストア” · 查看附近收录的店铺 · 需要当地网络才能打开哦！": "Search ‘ドラッグストア’ · View listed nearby stores · Requires local internet access", "搜索“药妆店” · 日本地点可能较少": "Search ‘drugstore’ · Fewer Japan listings", "地图收录不一定完整；营业时间、库存和免税条件请以店铺现场为准。": "Map listings may be incomplete. Check opening hours, stock and tax-free terms at the store.",
    "营业时间和休息日可能变化；傍晚以后部分熟食会有折扣。": "Hours and closing days may change; some prepared food is discounted in the evening.", "营业时间以地图和店铺现场为准；部分门店并非24小时营业。": "Check the map and storefront for hours; not every location is open 24 hours.",
    "动漫原景地": "Anime locations", "找找附近出现过的动画场景": "Find anime scenes nearby",
    "泡个温泉": "Hot springs", "有纹身？优先找私汤": "Tattoo? Try private bath", "有纹身？先找私汤": "Tattoo? Try a private bath", "附近日归温泉・私汤": "Nearby day-use & private onsen", "附近日归温泉": "Nearby day-use onsen",
    "路痴救星": "Never Get Lost", "记住这儿 · 原路回": "Save here · Find your way back", "下车点、出口、酒店门口，一键记住": "Save a drop-off, station exit or hotel entrance", "记住下车点、出口、": "Save your drop-off or exit,", "酒店门口，一键原路回": "then find your way back.", "不迷路，": "Don't get lost.", "不迷路": "Don't get lost", "定个位": "Save your spot", "导航返回": "Navigate back", "一键定位出发位置，": "Save your starting point,", "一键导航返回。": "then navigate back.",
    "行李寄存": "Luggage storage", "按定位找离你最近的行李寄存点。": "Use your location to find the nearest luggage storage.", "按定位找离你最近的": "Find the nearest", "行李寄存点。": "luggage storage.", "附近寄存行李": "Store luggage nearby", "轻松逛街": "Explore hands-free",
    "保存和分享随便O": "Save and share SuiBianO", "保存随便O": "Save SuiBianO", "下次一按就打开": "Open it in one tap next time", "收藏好！下次一按就打开。": "Save it now—open it in one tap next time.",
    "分享随便O": "Share SuiBianO", "分享给朋友": "Share with friends", "发给来日本的朋友": "Send it to friends visiting Japan", "发给要来日本的朋友": "Send it to friends visiting Japan", "添加到手机桌面": "Add to your phone's Home Screen", "以后像 App 一样，一点就打开。": "Open it in one tap, just like an app.", "保存到桌面": "Save to Home Screen",
    "先记住这个地方，想回来时直接导航。": "Save this place now and navigate back whenever you need.", "位置只保存在这台手机，不会上传": "Location stays on this device and is never uploaded", "🔒 位置只保存在这台手机，不会上传": "🔒 Location stays on this device and is never uploaded",
    "🔒 记住的地点只保存在这台手机；地图和地址由第三方加载": "🔒 Saved places stay on this phone; maps and addresses load from third-party services",
    "路痴救星主要功能": "Never Get Lost tools", "记住这儿": "Save here", "获取现在的位置": "Get your current location", "原路回": "Find my way back", "↩️ 原路回": "↩️ Find my way back", "选择已保存地点": "Choose a saved place",
    "也可以在地图上选": "Or pick a point on the map", "点「看我在哪」显示蓝点；也能直接点地图选位置。": "Show your location for a blue dot, or tap the map to pick a place.", "⌖ 看我在哪": "⌖ Show my location", "点地图选择要记住的位置": "Tap the map to choose a place to save", "点地图选位置，或点「看我在哪」": "Tap the map, or show your location", "记住选中的点": "Save selected point", "地图选点": "Map point", "🗺️ 地图选点": "🗺️ Map point", "地图上选的点": "Point chosen on map", "地图暂时加载不了，还可以用上面的「记住这儿」。": "The map isn't loading. You can still use Save here above.", "这台设备不支持定位，仍可以点地图选位置。": "Location isn't supported here. You can still tap the map.", "正在定位你的位置…": "Locating you…", "蓝点是你现在的位置；点地图选要记住的点。": "The blue dot is your current location. Tap the map to choose a place to save.", "没有允许定位，仍可以点地图选位置。": "Location permission was denied. You can still tap the map.", "定位暂时失败，仍可以点地图选位置。": "Location failed. You can still tap the map.", "保存好了；再点地图可以选下一个位置。": "Saved. Tap the map to choose another place.",
    "刚刚定位到": "Just located", "确认这个地点": "Confirm this place", "正在获取日文地址…": "Getting the Japanese address…", "这是哪里？": "What is this place?",
    "当前地点": "Current place", "下车点": "Drop-off point", "酒店": "Hotel", "车站出口": "Station exit", "商场门口": "Mall entrance",
    "📍 当前地点": "📍 Current place", "🚕 下车点": "🚕 Drop-off point", "🏨 酒店": "🏨 Hotel", "🚉 车站出口": "🚉 Station exit", "🏬 商场门口": "🏬 Mall entrance",
    "加一句提醒（可不填）": "Add a note (optional)", "例：东口便利店旁、红色招牌下面": "Example: beside the east-exit store, under the red sign", "记住这个地方": "Save this place",
    "我记住的地方": "Places I saved", "还没记住任何地方": "No places saved yet", "下车、出站或离开酒店前，点一次“记住这儿”。": "Tap “Save here” before leaving a taxi, station or hotel.",
    "复制位置": "Copy place", "复制完整位置": "Copy full location", "不用登录。清除浏览器数据或更换手机后，这些地点不会自动同步。": "No login needed. These places do not sync after clearing browser data or changing phones.",
    "走回这个地方": "Walk back to this place", "步行导航 · 日本优先推荐": "Walking directions · Recommended in Japan", "步行导航 · 日本路线可能较少": "Walking directions · Japan routes may be limited", "步行导航 · 适合 iPhone": "Walking directions · Best for iPhone",
    "↗ 分享位置": "↗ Share place", "分享位置": "Share place", "朋友分享了一个位置": "A friend shared a place", "只显示这个分享位置，不会读取或分享对方保存的其他地点。": "Only this shared place is shown. No other saved places are read or shared.", "继续使用其他工具": "Continue to other tools",
    "日文地址暂时获取不到，请按坐标导航": "Japanese address is unavailable. Navigate using the coordinates.", "删除这个记住的地点": "Delete this saved place",
    "豚一下，以后用": "Save it for later", "收藏想去的地点 · 已收藏": "Save places you want to visit · Saved",
    "更多": "More", "更多功能": "More tools", "更多实用地图探索": "Explore more useful maps", "还有更多实用工具，助你轻松玩转日本！": "More practical tools for an easier trip around Japan!",
    "给日本人看": "Show to a local", "一键显示或复制日文": "Show or copy Japanese", "看地图找好逛的奥莱": "Find outlet malls on the map", "洗衣房": "Laundromat", "找附近的自助洗衣房": "Find a nearby laundromat", "附近洗衣房": "Nearby laundromats",
    "更多实用地图": "More useful maps", "网友共享情报": "Community-shared info",
    "渔具店": "Fishing tackle", "找附近的渔具店": "Find a nearby tackle shop", "今天吃啥": "What to eat today", "附近美食 · 翻牌子": "Nearby food · Spin to choose",
    "停车场": "Parking", "自驾游 · 找附近收费停车场": "Road trip · Find nearby paid parking", "附近收费停车场": "Nearby paid parking",
    "附近收费停车场，用哪个地图？": "Which map for nearby paid parking?",
    "自驾游找临时收费车位。先在地图查看附近停车场，再选具体地点导航过去。": "Find short-stay paid parking for your road trip. Check nearby lots on a map, then choose one for directions.",
    "日文搜索收费停车场 · 需要当地网络才能打开哦！": "Search paid parking in Japanese · Local internet needed",
    "日文搜索收费停车场 · 适合 iPhone": "Search paid parking in Japanese · Best for iPhone",
    "直接搜索日文词 · 若位置不对，可复制日文词手动搜": "Search the Japanese term · Copy it if the area is wrong",
    "地图排序不保证最近，也不保证有空位；停车费用、营业时间、限高及付款方式请以现场标识为准。": "Map order does not guarantee the nearest or an available space. Check on-site signs for rates, hours, height limits and payment methods.",
    "薅羊毛 · 0元 · 3条线": "Good deal · Free · 3 routes", "东京站免费巴士": "Free Tokyo Station buses", "丸之内、日本桥一带，上车不用买票": "Around Marunouchi and Nihonbashi · No ticket needed",
    "地点由第三方用户共享，请以现场为准。": "Locations are shared by third-party users. Please verify on site.", "地图地点来自第三方服务，请以现场为准。": "Map locations come from third-party services. Please verify on site.",
    "找黑豚": "Ask Heitun", "在日本遇到事，有需要再问我": "Need help in Japan? Ask me anytime", "给黑豚留言 →": "Message Heitun →", "在日本遇到问题？": "Need help in Japan?", "问黑豚": "Ask Heitun", "问黑豚安排接送": "Ask Heitun for a transfer", "旅行问题・行程建议・当地情报": "Travel questions · Itineraries · Local tips", "有需要再问我！": "Just ask whenever you need!",
    "找黑豚进度": "Ask Heitun progress", "有些事情，": "Some things need", "工具解决不了。": "a real conversation.",
    "日本旅行、生活，或者其他日本相关的问题，都可以来找我聊聊。": "Travel, everyday life, or anything else about Japan—come talk to me.",
    "来日本玩，有事找黑豚": "Visiting Japan? Ask Heitun", "一日游／包车、机场接送、多日行程规划": "Day tours / private cars, airport transfers, and multi-day planning",
    "还有别的事？也可以找黑豚": "Something else? Ask Heitun too", "日本相关的其他事情，可以来聊聊": "Chat with me about other Japan-related questions",
    "来日本玩，需要服务": "Visiting Japan? Need a service", "包车接送・行程规划・预约协助": "Private transport · Trip planning · Reservation help",
    "其他日本相关事情": "Other Japan-related matters", "生活、合作或其他问题": "Everyday life, partnerships, or other questions", "第一次认识黑豚？先了解一下": "New to Heitun? Learn more first", "第一次认识黑豚？看他视频先了解一下": "New to Heitun? Watch his videos first",
    "准备来日本玩？": "Planning a trip to Japan?", "你大概想怎么安排，我先看看～": "Tell me roughly what you need and I’ll take a look.",
    "你主要想找我做什么？": "What would you like help with?", "可多选": "Choose more than one", "一日游／包车": "Day tour / private car", "机场接送": "Airport transfer",
    "主要需要什么？": "What do you mainly need?", "行程规划": "Trip planning", "预约协助": "Reservation help", "下一步，联系黑豚": "Next, contact Heitun",
    "多日行程规划": "Multi-day itinerary", "还没想好": "Not sure yet", "先聊聊": "Let’s chat", "大概什么时候来？": "When are you coming?",
    "已经在日本": "Already in Japan", "1个月内": "Within 1 month", "1–3个月": "In 1–3 months", "还没确定": "Not decided yet",
    "简单选一下就好～": "Just make a quick choice", "更详细的情况，加我后再聊！": "We can discuss the details after you add me.", "找黑豚聊聊": "Chat with Heitun",
    "收到啦！": "Got it!", "找个方便的方式聊聊": "Choose an easy way to chat", "加我的时候，把刚才选的需求告诉我就行。": "When you add me, just mention what you selected.", "看看大家都有哪些需求？": "See what others are asking about", "点这里往下看": "Tap to see more",
    "日本相关的其他事情，直接来聊聊就好。": "For other Japan-related questions, just come chat.", "微信和我的自媒体主页都在这里。": "My WeChat and social media pages are all here.", "刚才选择": "Your choices", "复制需求": "Copy request", "微信联系方式": "WeChat contact",
    "推荐": "Recommended", "微信快速直接聊": "Chat directly on WeChat", "微信群二维码": "WeChat group QR code", "扫码进群；二维码失效时，可复制上方微信号联系。": "Scan to join the group. If the QR code expires, copy the WeChat ID above.",
    "查看二维码": "View QR code", "联系方式二维码": "Contact QR code", "请使用对应应用扫码。": "Scan with the corresponding app.",
    "使用微信扫码进群；二维码失效时，请复制微信号联系。": "Scan with WeChat to join the group. If the QR code expires, copy the WeChat ID.",
    "LINE 咨询": "LINE", "LINE ID：648627464": "LINE ID: 648627464", "打开 LINE": "Open LINE", "LINE 联系二维码": "LINE QR code", "使用 LINE 扫码添加，LINE ID：648627464。": "Scan with LINE to add me. LINE ID: 648627464.",
    "WhatsApp 咨询": "WhatsApp", "用户名：@kurobutajapan": "Username: @kurobutajapan", "复制用户名": "Copy username", "WhatsApp 联系二维码": "WhatsApp QR code", "使用 WhatsApp 扫码添加；用户名：@kurobutajapan。": "Scan with WhatsApp to add me. Username: @kurobutajapan.",
    "其他联系方式": "Other contact methods", "黑豚的社交平台": "Heitun's social channels", "也可以来黑豚的频道看看": "Explore Heitun's channels", "点图标打开主页": "Tap an icon to open the page", "打开黑豚的小红书主页": "Open Heitun's RED profile", "打开黑豚的抖音主页": "Open Heitun's Douyin profile", "打开黑豚的B站主页": "Open Heitun's Bilibili profile", "打开黑豚的YouTube频道": "Open Heitun's YouTube channel", "打开黑豚的TikTok主页": "Open Heitun's TikTok profile", "小红书": "RED", "抖音": "Douyin", "B站": "Bilibili", "黑豚的小红书": "Heitun on RED", "黑豚的抖音": "Heitun on Douyin", "黑豚的B站": "Heitun on Bilibili", "黑豚的YouTube": "Heitun on YouTube", "黑豚的TikTok": "Heitun on TikTok", "账号或主页链接需要补充": "Account or profile link needed", "频道链接需要补充": "Channel link needed", "待补充": "To be added",
    "打开我的小红书主页": "Open my RED profile", "打开我的抖音主页": "Open my Douyin profile", "打开我的B站主页": "Open my Bilibili profile", "打开我的YouTube频道": "Open my YouTube channel", "打开我的TikTok主页": "Open my TikTok profile",
    "邮箱 / Email": "Email", "小红书、抖音、B站、YouTube、TikTok 的真实账号尚未写入项目，补充后即可启用跳转。": "The verified RED, Douyin, Bilibili, YouTube and TikTok accounts have not been added yet. Links can be enabled once provided.",
    "本站负责中文整理和操作辅助；地点信息与实际服务由跳转后的第三方网站提供。": "This site organizes and explains the tools; location data and services are provided by the linked third-party sites.",
    "首页": "Home", "工具箱": "Toolbox", "逛日本": "Explore Japan", "逛吃日本": "Eat & Shop", "豚一下": "Explore", "竿": "Rod", "高": "A",
    "好吃的、好玩的，黑豚正在慢慢整理。": "Food and local experiences are on the way.", "先透露一点": "A quick preview", "黑豚正在准备这些": "What Heitun is preparing", "内容还在踩点和整理，但现在已经可以先来问我。": "The guides are still being researched, but you can already ask me for help.", "现在可以联系": "Available now", "找人帮忙": "Ask for help", "在日本遇到事情搞不定？可以先问问。": "Stuck with something in Japan? Ask first and see if I can help.", "陪同": "In-person help", "跑腿儿": "Errands", "帮打电话": "Phone calls", "餐厅预约 / 改期": "Restaurant booking / changes", "联系黑豚": "Contact Heitun", "具体能否帮办，需要先了解地点、时间和事情内容。": "Availability depends on the location, timing and details.",
    "首批内容整理中": "First guides in progress", "日本美食指南": "Japan food guide", "东京、大阪、京都，当地吃法和不容易踩雷的选择。": "Local food and safer picks in Tokyo, Osaka and Kyoto.", "拉面": "Ramen", "烧肉": "Yakiniku", "居酒屋": "Izakaya", "当地小店": "Local eateries", "问黑豚找美食": "Ask Heitun about food",
    "边用边整理": "Useful now, more on the way", "先找附近好用的": "Find something nearby", "回转寿司先能找店；其他美食和路线，还在慢慢整理。": "Find nearby sushi chains now; more food and routes are being prepared.",
    "现在能用 · 日本各地": "Available now · Across Japan", "附近回转寿司": "Nearby conveyor-belt sushi", "选一家连锁店，看看附近哪家方便去。": "Pick a chain and find a convenient nearby branch.", "选寿司店": "Choose a sushi chain",
    "附近想吃哪家寿司？": "Which sushi chain nearby?", "先挑品牌，再选常用地图。地图会列出附近门店，点进具体分店后再导航。": "Pick a chain, then a map. Open a specific branch from the results before navigating.",
    "不挑品牌，就近找": "Any chain · Find nearby", "回転寿司 · 附近有什么吃什么": "回転寿司 · See what's nearby", "寿司郎 · ": "Sushiro · ", "藏寿司 · ": "Kura Sushi · ", "滨寿司 · ": "Hama Sushi · ", "河童寿司 · ": "Kappa Sushi · ",
    "搜索附近的スシロー门店": "Search nearby Sushiro branches", "搜索附近的くら寿司门店": "Search nearby Kura Sushi branches", "搜索附近的はま寿司门店": "Search nearby Hama Sushi branches", "搜索附近的かっぱ寿司门店": "Search nearby Kappa Sushi branches",
    "品牌标志仅用于辨认门店；请以各品牌及地图显示的信息为准。": "Brand logos identify stores only; check each brand and map for current details.",
    "好吃的先找起来，其他玩法慢慢整理。": "Find food nearby now; more local experiences are on the way.",
    "回转寿司、拉面先能找店；其他美食和路线，还在慢慢整理。": "Find nearby sushi and ramen now; more food and routes are being prepared.",
    "附近拉面店": "Nearby ramen", "按口味找：豚骨、味噌、酱油、盐味或沾面。": "Find ramen by style: tonkotsu, miso, shoyu, shio or tsukemen.", "选拉面口味": "Choose a ramen style",
    "附近想吃什么拉面？": "What kind of ramen are you craving?", "按口味找店，再选常用地图。搜索结果只是线索，进店前记得看菜单。": "Choose a style, then a map. Search results are only a starting point; check the menu before visiting.",
    "不挑口味，就近找": "Any style · Find nearby", "ラーメン · 先看看附近有什么": "ラーメン · See what's nearby",
    "豚骨拉面": "Tonkotsu ramen", "豚骨ラーメン · 浓郁骨汤": "豚骨ラーメン · Rich pork-bone broth",
    "味噌拉面": "Miso ramen", "味噌ラーメン · 香浓咸鲜": "味噌ラーメン · Savory miso flavor",
    "酱油拉面": "Shoyu ramen", "醤油ラーメン · 日式酱油风味": "醤油ラーメン · Soy-sauce flavor",
    "盐味拉面": "Shio ramen", "塩ラーメン · 相对清爽": "塩ラーメン · Generally lighter flavor",
    "沾面": "Tsukemen", "つけ麺 · 面和蘸汤分开上": "つけ麺 · Noodles with separate dipping broth",
    "分类可能重叠；具体口味、营业时间和排队情况请查看门店信息。": "Styles may overlap. Check each store for flavors, hours and wait times.",
    "附近拉面店，用哪个地图？": "Which map for nearby ramen?", "豚骨拉面，用哪个地图？": "Which map for tonkotsu ramen?", "味噌拉面，用哪个地图？": "Which map for miso ramen?", "酱油拉面，用哪个地图？": "Which map for shoyu ramen?", "盐味拉面，用哪个地图？": "Which map for shio ramen?", "沾面，用哪个地图？": "Which map for tsukemen?",
    "先在地图里搜索，再点进具体门店查看路线；地图搜索结果不保证店里一定供应这种口味。": "Search on the map, then open a specific store for directions. Results do not guarantee that flavor is on the menu.",
    "按日文口味搜索拉面店 · 需要当地网络才能打开哦！": "Search ramen by Japanese style · Local internet needed", "按日文口味搜索 · 适合 iPhone": "Search by Japanese style · Best for iPhone", "直接搜索日文口味 · 位置不对时可复制日文词手动搜": "Search by Japanese style · Copy the term if the area is wrong",
    "地图先显示搜索结果，不会直接导航；菜单、营业时间和排队情况请以具体门店信息为准。": "Maps show search results first, not direct navigation. Check each store for menu, hours and wait times.",
    "寿司、拉面、和牛烧肉先能找店；其他美食和路线慢慢整理。": "Find nearby sushi, ramen and wagyu yakiniku now; more food and routes are on the way.",
    "附近和牛烧肉": "Nearby wagyu yakiniku", "想单点，还是想找和牛烧肉自助？": "Order à la carte, or look for an all-you-can-eat option?", "选烧肉吃法": "Choose a yakiniku option",
    "附近想吃哪种和牛烧肉？": "What kind of wagyu yakiniku are you after?", "先选吃法，再用地图找附近的店。进店前记得核对菜单和价格。": "Choose how you want to eat, then find nearby restaurants on a map. Check the menu and prices first.",
    "和牛烤肉": "Wagyu yakiniku", "和牛 焼肉 · 看菜单，按喜好点菜": "和牛 焼肉 · Check the menu and order what you like", "和牛烧肉自助": "All-you-can-eat wagyu yakiniku", "和牛 焼肉 食べ放題 · 先核对套餐": "和牛 焼肉 食べ放題 · Check the course details",
    "“食べ放題”不代表所有套餐都含和牛；请确认菜品、时限、价格及预约条件。": "All-you-can-eat does not mean every course includes wagyu. Check the dishes, time limit, price and booking rules.",
    "和牛烤肉，用哪个地图？": "Which map for wagyu yakiniku?", "和牛烧肉自助，用哪个地图？": "Which map for all-you-can-eat wagyu yakiniku?",
    "先在地图里找附近的店，再点进具体门店看路线。搜索结果不保证提供和牛或自助套餐。": "Find nearby restaurants on a map, then open a specific one for directions. Search results do not guarantee wagyu or an all-you-can-eat course.",
    "按日文词搜索烧肉店 · 需要当地网络才能打开哦！": "Search yakiniku with Japanese terms · Local internet needed", "按日文词搜索 · 适合 iPhone": "Search with Japanese terms · Best for iPhone", "直接搜索日文词 · 位置不对时可复制日文词手动搜": "Search the Japanese term · Copy it if the area is wrong",
    "请向门店确认是否供应和牛、套餐是否包含和牛，以及价格、时限和预约条件。": "Confirm wagyu availability, course inclusions, price, time limit and reservation rules with the restaurant.",
    "寿司、拉面、烧肉先能找店；其他美食和路线慢慢整理。": "Find nearby sushi, ramen and yakiniku now; more food and routes are on the way.",
    "附近烧肉店": "Nearby yakiniku", "和牛烤肉，还是烤肉自助？": "Wagyu yakiniku or all-you-can-eat yakiniku?", "附近想吃哪种烧肉？": "What kind of yakiniku are you after?",
    "烤肉自助": "All-you-can-eat yakiniku", "焼肉 食べ放題 · 想吃和牛请核对套餐": "焼肉 食べ放題 · Check the course if you want wagyu", "自助不一定提供和牛；请确认菜品、时限、价格及预约条件。": "All-you-can-eat may not include wagyu. Check the dishes, time limit, price and booking rules.",
    "烤肉自助，用哪个地图？": "Which map for all-you-can-eat yakiniku?", "先在地图里找附近的店，再点进具体门店看路线。搜索结果不保证菜单或套餐内容。": "Find nearby restaurants on a map, then open a specific one for directions. Search results do not guarantee menu or course details.",
    "烤肉自助不一定提供和牛；菜品、价格、时限和预约条件请以门店为准。": "All-you-can-eat yakiniku may not include wagyu. Check dishes, price, time limit and booking rules with the restaurant.",
    "寿司、拉面、烧肉、居酒屋先能找店；其他美食和路线慢慢整理。": "Find nearby sushi, ramen, yakiniku and izakaya now; more food and routes are on the way.",
    "附近居酒屋": "Nearby izakaya", "不挑、烧鸟或海鲜，按想吃的找。": "Choose any, yakitori or seafood.", "选居酒屋": "Choose an izakaya",
    "附近想去哪种居酒屋？": "What kind of izakaya are you after?", "先按想吃的选，再用地图看附近有什么店。": "Pick what you want to eat, then check nearby places on a map.",
    "不挑，就近找居酒屋": "Any izakaya nearby", "居酒屋 · 看看附近有什么": "居酒屋 · See what's nearby", "烧鸟": "Yakitori", "焼き鳥 居酒屋 · 烤鸡肉串": "焼き鳥 居酒屋 · Grilled chicken skewers", "海鲜": "Seafood", "海鮮 居酒屋 · 刺身、烤鱼等": "海鮮 居酒屋 · Sashimi, grilled fish and more",
    "“就近”是按当前位置找店，不保证第一条最近；菜单、营业时间请以门店为准。": "Nearby search uses your current area; the first result may not be closest. Check menus and hours with the restaurant.",
    "烧鸟居酒屋": "Yakitori izakaya", "海鲜居酒屋": "Seafood izakaya", "附近居酒屋，用哪个地图？": "Which map for nearby izakaya?", "烧鸟居酒屋，用哪个地图？": "Which map for yakitori izakaya?", "海鲜居酒屋，用哪个地图？": "Which map for seafood izakaya?",
    "先在地图里看附近的店，再点进具体门店查看路线。地图结果可能受当前区域影响。": "Check nearby places on the map, then open a specific restaurant for directions. Results may depend on the current map area.",
    "按日文词搜索居酒屋 · 需要当地网络才能打开哦！": "Search izakaya using Japanese terms · Local internet needed", "搜索结果不保证供应对应菜品；菜单、营业时间和预约情况请以门店为准。": "Search results do not guarantee those dishes. Check menus, hours and reservations with the restaurant.",
    "烧鸟、海鲜、海鲜现烤，按想吃的找。": "Find yakitori, seafood or grilled seafood.", "海鲜现烤": "Grilled seafood", "海鮮 浜焼き · 找烤贝类、鱼虾的店": "海鮮 浜焼き · Find grilled shellfish, fish and shrimp", "海鲜现烤，用哪个地图？": "Which map for grilled seafood?",
    "想吃什么，就从下面选；其他美食和路线慢慢整理。": "Pick what you feel like eating below; more food and routes are on the way.",
    "附近天妇罗": "Nearby tempura", "天妇罗、天丼，还是天妇罗定食？": "Tempura, tendon or a tempura set meal?", "选天妇罗吃法": "Choose a tempura option",
    "附近想吃哪种天妇罗？": "What kind of tempura are you after?", "按吃法找店，再选常用地图；实际菜单请点进门店确认。": "Choose a serving style, then a map. Check the actual menu with the restaurant.",
    "不挑，就近找天妇罗": "Any tempura nearby", "天ぷら · 先看看附近有什么": "天ぷら · See what's nearby", "天丼 · 天妇罗盖饭": "Tendon · Tempura rice bowl", "天丼 · 炸物盖在米饭上": "天丼 · Tempura over rice", "天妇罗定食": "Tempura set meal", "天ぷら 定食 · 天妇罗配饭和小菜": "天ぷら 定食 · Tempura with rice and sides",
    "同一家店可能提供不止一种吃法；菜单、价格和营业时间请以门店为准。": "A restaurant may offer more than one serving style. Check its menu, prices and hours.",
    "附近天妇罗，用哪个地图？": "Which map for nearby tempura?", "天丼，用哪个地图？": "Which map for tendon?", "天妇罗定食，用哪个地图？": "Which map for a tempura set meal?",
    "先在地图里找附近的店，再点进具体门店查看路线；搜索结果不保证菜单内容。": "Find nearby restaurants on the map, then open one for directions. Search results do not guarantee menu items.",
    "按日文词搜索天妇罗 · 需要当地网络才能打开哦！": "Search tempura using Japanese terms · Local internet needed", "同一家店可能提供多种吃法；菜单、价格和营业时间请以具体门店为准。": "A restaurant may offer several serving styles. Check its menu, prices and hours.",
    "附近鳗鱼饭": "Nearby eel rice", "搜附近的鳗鱼料理店，再看具体菜单。": "Find a nearby eel restaurant, then check its menu.", "找鳗鱼饭": "Find eel rice",
    "用日文搜索附近的鳗鱼料理店；想吃鳗鱼饭，请点进门店确认有うな丼或うな重。": "Search for nearby eel restaurants in Japanese. Check that the restaurant serves うな丼 or うな重 if you want eel rice.",
    "搜索附近鳗鱼料理店 · 需要当地网络才能打开哦！": "Find eel restaurants · Local internet needed", "搜索附近鳗鱼料理店 · 适合 iPhone": "Find eel restaurants · Best for iPhone", "搜索结果不保证供应鳗鱼饭；菜单、价格、营业时间请以门店为准。": "Search results do not guarantee eel rice. Check menu, prices and hours with the restaurant.",
    "附近鳗鱼饭，用哪个地图？": "Which map for nearby eel rice?",
    "荞麦面 / 乌冬": "Soba / udon", "想吃哪种面，就按日文词找附近店。": "Choose a noodle type to find nearby places.", "选面条": "Choose noodles", "附近想吃哪种面？": "Which noodles are you after?", "选好荞麦面或乌冬，再用地图找附近的店。": "Choose soba or udon, then find a nearby restaurant on a map.",
    "荞麦面": "Soba", "そば · 可冷吃，也可热吃": "そば · Served cold or hot", "乌冬": "Udon", "うどん · 粗面条，热汤或凉拌": "うどん · Thick noodles, hot or cold", "两种面有些店都会卖；具体菜单、营业时间以门店为准。": "Some restaurants serve both. Check their menus and hours.",
    "荞麦面，用哪个地图？": "Which map for soba?", "乌冬，用哪个地图？": "Which map for udon?", "先在地图里找附近的面店，再点进具体门店看路线。": "Find nearby noodle restaurants on the map, then open one for directions.", "按日文词搜索面店 · 需要当地网络才能打开哦！": "Search noodles in Japanese · Local internet needed", "菜单、营业时间和排队情况请以具体门店为准。": "Check the restaurant for menu, hours and wait times.",
    "炸猪排 / 炸牛排": "Tonkatsu / gyukatsu", "两种不同的炸排，选好再找店。": "Choose pork or beef cutlet, then find a restaurant.", "选炸排": "Choose a cutlet", "附近想吃哪种炸排？": "Which cutlet are you after?", "猪排和牛排分开搜，避免到店才发现不是想吃的那种。": "Search pork and beef cutlets separately so you get the right dish.",
    "炸猪排": "Tonkatsu", "とんかつ · 猪肉裹粉油炸": "とんかつ · Breaded, fried pork", "炸牛排": "Gyukatsu", "牛カツ · 牛肉裹粉油炸": "牛カツ · Breaded, fried beef", "具体肉类、熟度、价格和营业时间请以门店为准。": "Check the meat, doneness, prices and hours with the restaurant.",
    "炸猪排，用哪个地图？": "Which map for tonkatsu?", "炸牛排，用哪个地图？": "Which map for gyukatsu?", "猪排与牛排分开搜索；先点进具体门店确认菜单，再导航过去。": "Search pork and beef separately. Check the menu at a specific restaurant before navigating.", "按日文词搜索炸排店 · 需要当地网络才能打开哦！": "Search cutlet restaurants in Japanese · Local internet needed", "搜索结果不保证供应对应肉类；菜单、价格和营业时间请以门店为准。": "Search results may not serve the meat you want. Check menu, prices and hours.",
    "附近回转寿司，用哪个地图？": "Which map for nearby sushi?", "先在地图里搜索，再点进具体分店查看路线；搜索范围可能受地图当前区域影响。": "Search on the map, then open a specific branch for directions. Results may depend on the map's current area.",
    "按日文店名搜索门店 · 需要当地网络才能打开哦！": "Search branches by Japanese name · Local internet needed", "按日文店名搜索 · 适合 iPhone": "Search by Japanese name · Best for iPhone", "直接搜索日文店名 · 如果位置不对，可复制日文词手动搜": "Search the Japanese name · If the area is wrong, copy the term and search manually", "地图先显示搜索结果，不会直接导航；营业时间和排队情况请以具体门店信息为准。": "Maps show search results first, not direct navigation. Check each branch for hours and wait times.",
    "与当地车队共同设计中": "Being designed with local drivers", "黑豚设计小众一日/两日游线路": "Heitun's custom one- or two-day trips", "时间有限！直达精髓！日本各地红叶、雪景、樱花，动漫，牧场，温泉等。挑几条个性化小众一日游线路体验。包车不赶景点，根据人数、时间和兴趣，安排更适合你的玩法。": "Short on time? Get straight to the best parts: autumn leaves, snow, cherry blossoms, anime, farms and hot springs. Pick a personalized one-day route or plan a two-day trip. Travel by private car at your own pace, shaped around your group, time and interests.", "提前咨询安排路线": "Ask about planning a route", "页面内容正在整理，美食建议和个性化用车路线现在也可以找黑豚咨询。": "The pages are still in progress, but you can already ask Heitun about food and personalized driving routes.", "已经豚下来的地点": "Your saved places", "收藏新地点": "Save a new place",
    "返回工具箱": "Back to toolbox", "‹ 返回工具箱": "‹ Back to toolbox", "返回": "Back", "‹ 返回": "‹ Back", "定位当前位置，查看附近厕所。": "Use your location to find nearby toilets.", "重新定位": "Relocate", "⌖ 重新定位": "⌖ Relocate",
    "正在准备定位…": "Preparing location…", "附近厕所地图": "Nearby toilet map", "离你最近": "Nearest to you", "等待定位": "Waiting for location",
    "搜索地图中心": "Search map center", "允许浏览器使用位置后，附近厕所会显示在这里。": "Allow location access to see nearby toilets here.",
    "地点来自 OpenStreetMap 社区数据，开放时间和设施可能变化，请以现场标识为准。": "Locations come from OpenStreetMap community data. Hours and facilities may change; check signs on site.",
    "附近厕所": "Nearby toilets", "公共厕所": "Public toilet", "黑豚君替你挑好用的服务": "Heitun has picked the most useful services",
    "东京站免费巡回巴士": "Free Tokyo Station shuttle buses", "不是全东京免费：只跑东京站丸之内、日本桥一带，按你想去的区域选线路": "Not free across all Tokyo: these routes only cover the Marunouchi and Nihonbashi areas around Tokyo Station. Choose by destination.",
    "免费乘坐": "Free to ride", "不用车票・Suica": "No ticket or Suica", "官网可看车辆位置": "Live bus location on official site",
    "运营时间与到站时间可能因日期、活动和路况变化，出发前请以线路官网的实时信息为准。": "Hours and arrivals may change with dates, events and traffic. Check the live information on the official route page before leaving.",
    "去丸之内・大手町・日比谷": "For Marunouchi, Otemachi and Hibiya", "东京站西侧": "West side of Tokyo Station", "选「丸之内 Shuttle」。平日通常 10:00–19:00，周末及节假日 11:00–18:00，约 15–25 分钟一班。": "Take the Marunouchi Shuttle. Usually 10:00–19:00 on weekdays and 11:00–18:00 on weekends and holidays, every 15–25 minutes.",
    "平日 10:00–19:00｜周末及节假日 11:00–18:00｜15–25分钟一班": "Weekdays 10:00–19:00 | Weekends & holidays 11:00–18:00 | Every 15–25 min",
    "丸之内 Shuttle": "Marunouchi Shuttle", "一圈约35–40分钟": "35–40 min per loop", "无需预约": "No reservation", "看官方路线与实时车辆 ↗": "Official route & live buses ↗",
    "去日本桥・京桥・八重洲": "For Nihonbashi, Kyobashi and Yaesu", "东京站东侧": "East side of Tokyo Station", "选「Metro Link 日本桥」。每天通常 11:00–19:00，约 15–25 分钟一班。": "Take Metro Link Nihonbashi. Usually 11:00–19:00 daily, every 15–25 minutes.",
    "每天 11:00–19:00｜15–25分钟一班": "Daily 11:00–19:00 | Every 15–25 min",
    "日本桥线": "Nihonbashi route", "一圈约40分钟": "About 40 min per loop",
    "去人形町・滨町・兜町": "For Ningyocho, Hamacho and Kabutocho", "范围更远": "Wider area", "选「Metro Link 日本桥 E线」。每天通常 11:00–18:00，约 25–28 分钟一班。": "Take Metro Link Nihonbashi E Line. Usually 11:00–18:00 daily, every 25–28 minutes.",
    "每天 11:00–18:00｜25–28分钟一班": "Daily 11:00–18:00 | Every 25–28 min",
    "日本桥 E线": "Nihonbashi E Line", "人形町・滨町": "Ningyocho · Hamacho",
    "线路图已展开　⌃": "Route map expanded　⌃", "保留官方日文站名，方便搜索": "Official Japanese stop names retained for search",
    "不知道去哪个站上车？": "Not sure where to board?", "定位后显示离你最近的3个站，再用手机地图步行过去。": "See the three nearest stops, then open walking directions in your map app.",
    "⌖ 定位离我最近的上车点": "⌖ Find my nearest stops", "线路、站点和实时位置可能临时调整，请优先查看官网。": "Routes, stops and live locations may change. Check the official site first.",
    "🚌 查询车辆实时位置": "🚌 Check live bus location", "官方完整路线与运行信息": "Official route and service info",
    "离你最近的上车点": "Nearest stops", "距离为直线估算；实际步行路线请以地图软件为准。": "Distances are straight-line estimates. Follow your map app for the walking route.",
    "这台设备不支持定位，请直接打开官方路线查看上车点。": "Location is unavailable. Open the official route to check boarding stops.", "没有取得位置。请开启浏览器定位权限后重试。": "Location was unavailable. Enable browser location and try again.",
    "⌖ 重新定位附近上车点": "⌖ Refresh nearest stops", "⌖ 再试一次": "⌖ Try again", "去这里 ›": "Go here ›",
    "选择手机里方便使用的地图，确认步行路线后再出发。": "Choose a map app and confirm the walking route before leaving.", "站点可能临时调整，到达后请核对现场站牌和官网信息。": "Stops may change temporarily. Check the sign and official site when you arrive.",
    "黑豚君导航助手": "Heitun navigation helper",
    "直接给日本人看": "Show directly to a local", "🇯🇵 直接给日本人看": "🇯🇵 Show to a local",
    "粘贴地点名称、日文地址、坐标或分享链接。": "Paste a place name, Japanese address, coordinates or share link.",
    "目的地": "Destination", "例：渋谷駅前喫煙所\n或粘贴第三方网站分享链接": "Example: 渋谷駅前喫煙所\nor paste a share link",
    "从剪贴板粘贴": "Paste from clipboard", "清空": "Clear", "已准备导航": "Ready to navigate",
    "地图软件会根据文字或坐标再次确认地点": "Your map app will confirm the place using the text or coordinates",
    "Google 地图": "Google Maps", "日归温泉 · Google 地图": "Day-use onsen · Google Maps", "高德地图": "Amap", "高德地图 · 直接跳转": "Amap · Open directly", "复制日文词，手动搜索": "Copy Japanese term and search manually", "复制私汤日文词": "Copy private onsen term", "日归温泉 · 当天往返，不用住宿": "Day-use onsen · No overnight stay", "私汤 · 独立使用，纹身规则请确认": "Private onsen · Confirm tattoo rules", "已复制，去高德粘贴搜索": "Copied · Paste into Amap", "复制失败，请手动输入右边日文词": "Copy failed · Type the Japanese term shown", "若高德跳到中国或没搜到附近：先把地图移到日本，再粘贴上面的日文词搜索。": "If Amap searches in China or misses nearby places, move the map to Japan, then paste the Japanese term above.", "Apple 地图": "Apple Maps", "豚一下（收藏）": "Save this place", "🐽 豚一下（收藏）": "🐽 Save this place", "🇯🇵 给日本人看": "🇯🇵 Show to a local",
    "在日本通常优先推荐 Google Maps；高德对部分日本地点和步行路线的识别可能不完整。": "Google Maps is usually recommended in Japan. Amap may have fewer Japanese places and walking routes.",
    "选一句，把屏幕直接递给对方；左右滑动查看更多。": "Choose a phrase and show the screen to the other person. Swipe for more.",
    "常用日语": "Useful Japanese", "找厕所": "Find a toilet", "找吸烟点": "Find a smoking area", "请指地图": "Point on map", "怎么走": "Directions",
    "请结账": "The bill, please", "能刷卡吗": "Cards accepted?", "中文菜单": "Chinese menu", "寄存行李": "Store luggage", "不会日语": "No Japanese", "需要帮助": "Need help",
    "不好意思，请问厕所在哪里？": "Excuse me, where is the toilet?", "不好意思，请问最近的吸烟点在哪里？": "Excuse me, where is the nearest smoking area?",
    "请在地图上告诉我这个地方。": "Please show me this place on the map.", "不好意思，请问去这里怎么走？": "Excuse me, how can I get here?",
    "麻烦结账。": "The bill, please.", "可以使用信用卡吗？": "Can I pay by credit card?", "有中文菜单吗？": "Do you have a Chinese menu?",
    "可以帮我寄存行李吗？": "Could you store my luggage?", "我不会说日语，可以说慢一点吗？": "I don't speak Japanese. Could you speak slowly?", "不好意思，请帮帮我。": "Excuse me, please help me.",
    "播放日语": "Play Japanese", "🔊 播放日语": "🔊 Play Japanese", "复制日文": "Copy Japanese", "更多翻译方式": "More ways to translate", "没找到想说的？用 Google 翻译": "Need another phrase? Use Google Translate", "自己打字翻译": "Type to translate", "中文 → 日文 ↗": "Chinese → Japanese ↗", "照片翻译": "Translate a photo", "日文照片 → 中文 ↗": "Japanese photo → Chinese ↗", "将跳转到 Google 翻译；图片页可上传已拍照片。手机若无法使用，请在 Google 翻译 App 点「相机」。": "Opens Google Translate. Upload a photo on its Images page. If that doesn't work on your phone, use Camera in the Google Translate app.", "20岁以下不得进入吸烟区域，请以现场标识为准。": "People under 20 may not enter smoking areas. Follow on-site signs.",
    "我的收藏": "My saved places", "黑豚君帮你记在这台手机里。": "Saved on this device by Heitun.", "粘贴一个新地点": "Paste a new place", "＋ 粘贴一个新地点": "＋ Paste a new place",
    "不用登录。清除浏览器数据或更换手机后，收藏不会自动同步。": "No login needed. Saved places do not sync after clearing browser data or changing phones.",
    "在日本遇到事，": "Need something in Japan?", "跟我说说": "Tell me about it", "问一下，也可能我就帮你搞定了。": "Just ask—I may be able to sort it out for you.",
    "正在记录需求的黑豚君": "Heitun taking notes", "你需要什么？": "What do you need?", "包车／接送机": "Private car / airport transfer", "定制行程": "Custom itinerary",
    "餐厅预约": "Restaurant reservation", "其他需求": "Other request", "🚗 包车／接送机": "🚗 Private car / airport transfer", "🗺 定制行程": "🗺 Custom itinerary", "🍽 餐厅预约": "🍽 Restaurant reservation", "💬 其他需求": "💬 Other request", "这类需求，直接微信聊更快": "For this request, WeChat is faster",
    "这次想让我帮什么？": "What can I help with this time?", "接送机／包车一日游": "Airport transfer / private day tour", "多日路线帮你规划": "Help plan a multi-day route", "想吃的店，帮你预约": "Help book a restaurant you love", "其他当地事，也可以问我": "Ask me about anything local",
    "🚐 接送机／包车一日游": "🚐 Airport transfer / private day tour", "🗺 多日路线帮你规划": "🗺 Help plan a multi-day route", "🍽 想吃的店，帮你预约": "🍽 Help book a restaurant you love", "💬 其他当地事，也可以问我": "💬 Ask me about anything local",
    "微信号：zhangpeng816 · 复制后到微信搜索": "WeChat: zhangpeng816 · Copy and search in WeChat", "复制微信号": "Copy WeChat ID",
    "进群说一声": "Join the group and say hello", "微信扫码加入；二维码失效时请复制微信号联系。": "Scan with WeChat to join. If the QR code expires, copy the WeChat ID.",
    "准备什么时候来？": "When are you coming?", "准备去哪座城市？": "Which city are you visiting?", "东京": "Tokyo", "例：东京、京都、大阪": "Example: Tokyo, Kyoto, Osaka",
    "大概几个人？": "How many people?", "例：3人，2个大行李箱": "Example: 3 people, 2 large suitcases", "想让我帮你做什么？": "How can I help?",
    "简单说说时间、路线和特别需求": "Tell me the timing, route and special requests", "留言给黑豚": "Message Heitun", "复制咨询内容，去微信粘贴": "Copy request for WeChat",
    "邮件联系，回复也很快": "Email me—I usually reply quickly", "写邮件": "Email", "复制邮箱": "Copy email", "邮箱联系方式": "Email contact", "邮箱已复制：kurobuta2021@gmail.com": "Email copied: kurobuta2021@gmail.com",
    "也可以直接联系": "Or contact directly", "复制": "Copy", "群二维码以后加入；目前可直接复制微信号添加。": "A group QR code can be added later. For now, copy the WeChat ID.",
    "提交后会打开手机分享菜单；不支持分享时，会自动复制咨询内容。": "Submitting opens the share menu; if sharing is unavailable, the request is copied automatically.",
    "这次去哪儿？": "Where are you going?", "关闭": "Close", "当前重点整理": "Current focus", "使用全国服务": "Use nationwide services",
    "大阪": "Osaka", "京都": "Kyoto", "北海道": "Hokkaido", "冲绳": "Okinawa", "正在整理": "Coming soon",
    "这个工具还在筛选可靠来源。先不放不确定的链接，整理好再上线。": "We are still checking reliable sources. Unverified links will not be added yet.", "知道了": "Got it",
    "用哪个地图打开？": "Which map would you like to use?", "已经选好服务了，现在选择你手机里方便使用的地图。": "Service selected. Now choose the map that works best on your phone.",
    "トイレマップ｜日本全国厕所地图": "Toilet Map · Nationwide Japan", "覆盖日本全国 · 可定位当前位置 · 第一推荐": "Nationwide coverage · Location enabled · Top pick",
    "日本地点较完整 · 第二推荐": "Good Japan coverage · Second pick", "中国手机更方便 · 日本厕所数据相对较少": "Convenient on Chinese phones · Fewer toilet listings in Japan",
    "适合 iPhone": "Best for iPhone", "在日本建议优先使用 Google 地图；搜不到时可换其他地图。": "Google Maps is recommended in Japan. Try another map if no result appears.",
    "浏览器不支持定位": "Location is not supported", "正在定位…": "Locating…", "当前位置": "Current location", "已定位 · 地区未知": "Located · Area unknown", "定位失败 · 点此重试": "Location failed · Tap to retry",
    "覆盖日本全国 · 可定位当前位置 · 第一推荐 · 需要当地网络才能打开哦！": "Nationwide Japan · Location enabled · Top pick · Requires local internet access",
    "完全憋不住啦！日本地点较完整 · 需要当地网络才能打开哦！": "Can't hold it any longer! Good Japan coverage · Requires local internet access", "完全憋不住啦！适合 iPhone": "Can't hold it any longer! Best for iPhone", "还能忍一忍，我选个环境。覆盖日本全国 · 可定位当前位置 · 需要当地网络才能打开哦！": "I can still wait and choose a better option. Nationwide Japan · Location enabled · Requires local internet access", "随缘，我控制得住，慢慢逛过去。中国手机更方便 · 日本厕所数据相对较少": "No rush—I can take my time. Convenient on Chinese phones · Fewer toilet listings in Japan",
    "完全憋不住就直接用 Google 或 Apple 地图；还能忍一忍，再用全国厕所地图慢慢选环境。": "If you can't hold it, use Google or Apple Maps right away. If you can wait, use the nationwide toilet map to choose a better option.", "地图点位和开放情况可能变化，请结合距离和现场标识选择。": "Map locations and availability may change. Check the distance and on-site signs.",
    "赶时间先用常用地图找附近；想多看几个点，再打开专门的厕所地图。": "In a hurry? Start with a familiar map. For more options, open the dedicated toilet map.",
    "先找附近厕所": "Find a toilet nearby", "Google 和 Apple 地图，点开看路线": "Google and Apple Maps · Open for directions", "想用专门的厕所地图？": "Want a dedicated toilet map?", "再看日本全国厕所地图": "Explore the nationwide toilet map", "其他找法": "Other ways to search", "高德地图和复制日文词备用": "Amap and a Japanese search term as backups",
    "专门找厕所 · 可定位当前位置": "Dedicated toilet map · Uses your location", "定位搜附近 · 点开看路线": "Search nearby · Open for directions", "iPhone 搜附近 · 点开看路线": "Search nearby on iPhone · Open for directions", "搜附近厕所 · 日本地点可能较少": "Search nearby toilets · Fewer Japan listings",
    "先用日本全国厕所地图定位附近点位，也可以直接用常用地图搜索。": "Start with the nationwide toilet map, or search directly in your preferred map app.",
    "建议先看日本网友共享地图，再试 Google 地图；搜不到时可换其他地图。": "Try the community map first, then Google Maps. Switch maps if needed.",
    "日本地点较完整 · 建议优先 · 需要当地网络才能打开哦！": "Good Japan coverage · Recommended · Requires local internet access", "中国手机更方便 · 日本地点可能较少": "Convenient on Chinese phones · Fewer Japan listings",
    "无障碍": "Accessible", "未标无障碍": "Accessibility not listed", "有尿布台": "Changing table", "可能收费": "Fee may apply", "免费": "Free",
    "附近暂未查到点位": "No nearby places found", "这一带的公开地图数据可能还不完整。可以移动地图后点“搜索地图中心”。": "Public map data may be incomplete here. Move the map and tap “Search map center”.",
    "厕所数据暂时加载失败，请稍后重试": "Toilet data failed to load. Please try again later.", "查询失败": "Search failed", "你在这里": "You are here",
    "地图组件加载失败，请检查网络后刷新": "Map failed to load. Check your connection and refresh.", "这台设备不支持定位，可移动地图后搜索": "This device cannot provide location. Move the map and search instead.",
    "正在获取当前位置，请允许定位…": "Getting your location. Please allow location access…", "没有取得位置。请开启浏览器定位，或移动地图后搜索。": "Location was unavailable. Enable browser location or move the map and search.",
    "直接打开地图 ↗": "Open map directly ↗", "先粘贴地点名称、地址或分享链接": "Paste a place name, address or share link first", "这个地点已经豚过啦": "This place is already saved", "已豚好，下次直接用": "Saved for later",
    "还没有豚任何地点": "No saved places yet", "在导航助手里粘贴地点，再点“豚一下”。": "Paste a place in the navigation helper, then tap Save.", "删除": "Delete",
    "已打开分享菜单": "Share menu opened", "咨询内容已复制，可粘贴到微信": "Request copied. Paste it into WeChat.", "已从收藏删除": "Removed from saved places",
    "已粘贴，黑豚君正在识别": "Pasted. Heitun is checking it.", "浏览器没允许读取，请长按输入框粘贴": "Clipboard access was blocked. Press and hold the field to paste.",
    "日文已复制": "Japanese copied", "这台设备暂不支持语音播放": "Speech playback is not supported on this device", "正在播放日语": "Playing Japanese",
    "微信号已复制：zhangpeng816": "WeChat ID copied: zhangpeng816", "WhatsApp 用户名已复制：@kurobutajapan": "WhatsApp username copied: @kurobutajapan",
    "随便O已经保存": "SuiBianO is already saved", "已经保存到主屏幕": "Already saved to your home screen", "以后直接点桌面上的随便O图标就能打开。": "Next time, tap the SuiBianO icon on your home screen.",
    "在微信里这样保存": "Save it in WeChat", "点微信右上角的“…”菜单，选择“收藏”。": "Tap the … menu in the top-right corner of WeChat and choose Favorite.", "桌面图标更方便：": "A Home Screen icon is more convenient:", "想放到手机桌面随时查看，请选择“在默认浏览器打开”；如果没有这个选项，可以先复制网址，再用默认浏览器打开。进入浏览器后，点击“共享”，或打开浏览器菜单，再选择“添加到主屏幕”。以后就能像 App 一样随时点开。": "To keep it on your Home Screen, choose Open in Default Browser. If that option is unavailable, copy the URL and open it in your default browser. Then tap Share, or open the browser menu, and choose Add to Home Screen. You can then open it anytime like an app.",
    "添加到 iPhone 主屏幕": "Add to the iPhone Home Screen", "点 Safari 底部的分享按钮。": "Tap Safari’s Share button.", "向下找到“添加到主屏幕”。": "Scroll down to Add to Home Screen.", "点右上角“添加”。": "Tap Add in the top-right corner.",
    "请先用 Safari 打开": "Open it in Safari first", "复制网址后用 Safari 打开，再点“分享 → 添加到主屏幕”。": "Copy the URL, open it in Safari, then tap Share → Add to Home Screen.",
    "可以直接安装到手机": "Install it on your phone", "点击下面的“添加到主屏幕”，以后像 App 一样从桌面打开。": "Tap Add to Home Screen below and open it from your home screen like an app.",
    "添加到 Android 主屏幕": "Add to the Android Home Screen", "点浏览器右上角菜单，选择“添加到主屏幕”或“安装应用”。不同浏览器文字可能略有不同。": "Open the browser menu and choose Add to Home Screen or Install app. The wording may vary by browser.",
    "收藏这个网站": "Bookmark this website", "电脑可按 Ctrl+D（Mac 按 ⌘D）加入书签；也可以复制网址发到手机。": "Press Ctrl+D (⌘D on Mac) to bookmark it, or copy the URL to your phone.",
    "添加到主屏幕": "Add to Home Screen", "复制网址": "Copy URL", "已复制网址": "URL copied", "复制失败，请手动复制网址": "Could not copy. Please copy the URL manually.", "网址已复制": "URL copied", "分享链接已复制": "Share link copied", "位置分享链接已复制": "Place share link copied", "已打开位置分享菜单": "Place share menu opened", "这个位置暂时无法分享": "This place cannot be shared right now", "已添加到主屏幕": "Added to Home Screen",
    "这台设备不支持定位，暂时不能记住位置": "Location is not supported on this device", "取得的位置格式不正确，请重新定位": "The location format is invalid. Please try again.",
    "你没有允许定位，打开浏览器位置权限后再试": "Location permission was denied. Enable it in your browser and try again.", "定位失败，请到室外或网络稳定后再试": "Location failed. Try again outdoors or with a stable connection.",
    "请先点“记住这儿”取得当前位置": "Tap “Save here” to get your current location first.", "最多保存 10 个，请先删除一个旧地点": "You can save up to 10 places. Delete an old one first.",
    "黑豚帮你记住啦": "Heitun saved this place", "完整位置已复制": "Full location copied", "确定删除这个记住的地点吗？": "Delete this saved place?", "已删除这个地点": "Place deleted", "已定位": "Located", "提醒：": "Note:",
    "附近合法吸烟点": "Nearby legal smoking areas", "两个入口都直达地图；先看 CLUB JT，再用网友共享地图补充": "Both links open a map. Try CLUB JT first, then the community map for more places.",
    "CLUB JT 吸烟点地图": "CLUB JT smoking map", "第一推荐": "Top pick", "第二推荐": "Second pick",
    "JT 调查、用户投稿及餐厅资料结合；首次使用可能需要确认已满20岁并允许定位。需要当地网络才能打开哦！": "Combines JT research, user submissions and restaurant data. First use may require age and location confirmation. Requires local internet access.",
    "排在第一": "Start here", "直达地图": "Direct map", "日本全国": "Nationwide Japan", "吸烟区信息共享地图君": "Community smoking area map",
    "覆盖咖啡店、商场和公共吸烟区等详细信息，直接进入网页版地图。需要当地网络才能打开哦！": "Detailed listings for cafés, malls and public smoking areas. Opens the web map directly. Requires local internet access.",
    "详细补充": "Detailed coverage", "无需登录": "No login", "网友共享": "Community shared",
    "附近动漫原景地": "Nearby anime locations", "这里整理了几个好用的动漫圣地地图，中文、日文网站都有；点开直达原站，支持原创。": "A few useful anime pilgrimage maps in Chinese and Japanese. Each link takes you directly to the original site to support its creators.",
    "吃饭、逛店、动漫场景打卡，从这里挑个入口。": "Food, shops or anime locations—pick a place to start.", "中文、日文地图 · 直达原站": "Chinese and Japanese maps · Original sites", "找找附近出现过的动画场景。": "Find real places featured in anime nearby.", "🎞️ 按作品找地点": "🎞️ Search by title", "📍 附近场景打卡": "📍 Nearby anime locations", "🗺️ 中文地图": "🗺️ Chinese map", "🌸 圣地巡礼": "🌸 Anime pilgrimage", "打开动漫圣地地图": "Open anime pilgrimage maps",
    "直接打开原站地图 ↗": "Open original map site ↗",
    "Anitabi 动画巡礼地图": "Anitabi anime pilgrimage map", "中文地图，按作品找动漫原景地；点开后在 Anitabi 原站查看地点和场景。": "Browse anime locations by title on Anitabi's Chinese-language map. The link opens the original site.", "中文地图": "Chinese-language map", "按作品找": "Browse by title", "直达原站": "Opens original site", "第三推荐": "Third pick",
    "圣地地图 Screen Pilgrimage": "Screen Pilgrimage map", "打开直接显示地图，支持简体中文、当前位置、作品搜索和路线整理。需要当地网络才能打开哦！": "Opens directly to a map with Simplified Chinese, current location, title search and route planning. Requires local internet access.",
    "简体中文": "Simplified Chinese", "可定位": "Location enabled", "约8970个地点": "About 8,970 locations", "OTABiS 动漫圣地巡礼地图": "OTABiS anime pilgrimage map",
    "点位更多，可查看场景、登场话数、路线与打卡；网页功能较多，以日文为主。需要当地网络才能打开哦！": "More locations with scene, episode, route and check-in details. Mostly Japanese. Requires local internet access.",
    "约14000个地点": "About 14,000 locations", "登场话数": "Episode details", "附近自动推荐": "Nearby suggestions",
    "找私汤／情侣家庭温泉（纹身 OK）": "Find a private onsen for couples or families (tattoos OK)", "私汤（貸切風呂／貸切温泉）通常可避开纹身限制，预约前请向店家确认；公共大浴场通常有限制，部分设施允许": "Private baths (貸切風呂 / 貸切温泉) often avoid tattoo restrictions. Confirm before booking; public baths usually have restrictions, though some allow tattoos.",
    "泡个温泉，怎么找？": "How to find an onsen", "有纹身，或想两个人一起泡？先找「貸切風呂」。能否接待纹身、是否要预约，出发前看店家说明。": "Have tattoos, or want to bathe together? Try a private bath (貸切風呂). Check each venue's tattoo and booking rules first.", "YUASOBI · 日归貸切風呂": "YUASOBI · Day-use private baths", "专找当天往返的家族风吕／私汤，可按地区或当前位置找。": "Find day-use family/private baths by area or current location.", "全国日归温泉地图 · 貸切風呂": "Japan day-use onsen map · Private baths", "在地图上找附近可日归的貸切風呂。": "Find nearby day-use private baths on the map.", "Google 地图找附近私汤": "Find nearby private baths on Google Maps", "搜「貸切温泉」，进店前确认预约与纹身规则。": "Search 貸切温泉; check booking and tattoo rules before visiting.", "是否天然温泉、是否日归可用，以店家说明为准。": "Check each venue for natural spring water and day-use availability.",
    "想当天泡完就走，先找日归温泉；有纹身或想一起泡，再看私汤。": "For a same-day soak, start with a day-use onsen. For tattoos or bathing together, look for a private bath.", "当天泡完就走": "Soak and go today", "先找附近的日归温泉": "Find a day-use onsen nearby", "有纹身，或想一起泡？": "Tattoos, or bathing together?", "找私汤／家族风吕，预约前确认规则": "Look for a private bath; confirm the rules before booking", "没搜到？换个找法": "Didn't find one? Try another way", "高德地图和复制日文词备用": "Amap and Japanese search terms as backups", "搜“日帰り温泉” · 定位找附近最方便": "Search 日帰り温泉 · Best for nearby results", "iPhone 找附近日归温泉": "Find nearby day-use onsen on iPhone",
    "不会日语，想预约某家店的私汤？": "Need help booking a private bath at a particular place in Japanese?",
    "日文搜索“日帰り温泉” · 不用住宿，泡完温泉就走 · 定位找附近最方便 · 需要当地网络才能打开哦！": "Search 日帰り温泉 · No overnight stay needed · Easy nearby search · Requires local internet access",
    "搜索“温泉” · 日本地点相对较少": "Search 温泉 · Fewer Japan listings", "有私汤不代表整家设施一定允许纹身；温泉规则可能变化，出发前请查看详情或向店家确认。": "A private bath does not mean the entire facility allows tattoos. Rules change; check details or ask before visiting.",
    "附近渔具店": "Nearby tackle shops", "选择常用地图，直接用日文“釣具店”搜索附近的渔具店。": "Choose a map and search the Japanese term 釣具店 for nearby tackle shops.",
    "日文搜索“釣具店” · 最方便 · 需要当地网络才能打开哦！": "Search 釣具店 · Most convenient · Requires local internet access", "搜索“渔具店” · 日本地点相对较少": "Search tackle shops · Fewer Japan listings",
    "在日本找渔具店建议优先使用 Google 地图；搜不到时可换其他地图。": "Google Maps is recommended for tackle shops in Japan. Try another map if needed.",
    "附近行李寄存": "Nearby luggage storage", "先按定位查附近投币柜和人工寄存；需要提前预约时，可以使用 ecbo cloak。": "Use your location to find nearby lockers and staffed storage. Use ecbo cloak when you want to reserve ahead.",
    "先找离你近的寄存点；大件行李或怕没空位，再看看能否预约。": "Find a nearby storage point first. For large bags or limited space, check reservation options.",
    "先查附近寄存点": "Find nearby storage", "找投币柜或人工寄存，先看位置": "Check lockers and staffed storage on the map", "担心没位置？": "Worried about availability?", "看看能否提前预约寄存": "Check if you can reserve ahead", "立刻地图搜索附近寄存点": "Search nearby storage on a map", "Google、Apple，或高德备用": "Google and Apple, with Amap as backup",
    "コインロッカーなび": "Coin Locker Navi", "按当前位置查投币柜和人工寄存 · 日本各地 · 第一推荐": "Nearby lockers and staffed storage · Across Japan · Top pick",
    "按当前位置查投币柜和人工寄存": "Find lockers and staffed storage near you",
    "ecbo cloak 预约寄存": "ecbo cloak reservations", "咖啡店、便利店等寄存点 · 可查看空位并预约": "Storage at cafés, convenience stores and more · Check availability and reserve",
    "看寄存点和空位，再决定是否预约": "Check locations and availability, then decide whether to book",
    "日文搜索“コインロッカー” · 定位找附近最方便 · 需要当地网络才能打开哦！": "Search コインロッカー · Easy nearby search · Requires local internet access",
    "用日文搜索附近的投币柜": "Search nearby lockers in Japanese", "iPhone 搜附近的投币柜": "Find nearby lockers on iPhone", "搜行李寄存 · 日本地点可能较少": "Search luggage storage · Fewer Japan listings",
    "搜索“行李寄存” · 日本地点相对较少": "Search luggage storage · Fewer Japan listings",
    "寄存点营业时间、尺寸和空位可能变化；大件行李或想确保有位置时，建议提前预约。": "Hours, accepted sizes and availability may change. Reserve ahead for large luggage or to secure a spot.",
    "找黑豚帮我挑温泉酒店": "Ask Heitun to help choose an onsen hotel",
    "想吃点日本特色的？先从美食入口选。": "Looking for Japanese food? Start here.",
    "现在能用 · 打开地图找附近": "Available now · Search nearby on a map", "附近吃什么": "What to eat nearby", "寿司、拉面、烧肉、咖喱、日式火锅……": "Sushi, ramen, yakiniku, curry, hot pot and more…", "打开美食分类": "Browse food", "‹ 返回豚一下": "‹ Back to Picks",
    "住一晚温泉酒店": "Stay at an onsen hotel", "时间紧，空出两天住一晚温泉，海景，山景，雪景，情侣私汤，带家人去日本乡下边走边玩，体验一趟温泉游。": "Short on time? Set aside two days for an overnight onsen trip: ocean, mountain or snow views, a private bath for two, or a family trip through the Japanese countryside.", "‹ 返回逛吃日本": "‹ Back to Eat & Shop", "说说你想怎么住，我帮你挑温泉酒店。": "Tell me your ideal stay and I'll help find an onsen hotel.", "想看什么景？": "What view would you like?", "🌊 海景": "🌊 Ocean", "⛰️ 山景": "⛰️ Mountains", "❄️ 雪景": "❄️ Snow", "都行，你推荐": "You choose", "和谁去？": "Who's coming?", "💑 两个人": "💑 Two people", "👶 带娃": "👶 With kids", "👨‍👩‍👧 带长辈": "👨‍👩‍👧 With parents", "🙋 一个人": "🙋 Solo", "想怎么泡？": "How would you like to bathe?", "客房自带私汤": "Private bath in the room", "可预约私汤": "Reservable private bath", "大浴场": "Shared bath", "都可以": "Any is fine", "这些选项只帮你理清想法，不会自动发给我。记住你的需求，联系时告诉我日期、地点和预算，我来帮你安排。": "These options help you decide what you want; they are not sent to me. Keep your preferences in mind, then contact me with your dates, location and budget. I'll help arrange your stay.", "约一顿美食": "Book a great meal", "想吃黑豚视频里那家？或者不知道怎么选，想让我推荐一家性价比味道好的？怕没位、不会打日语电话，都可以来找我帮你约。": "Want to try the restaurant in my video, or need a tasty place that's good value? Worried about availability or calling in Japanese? Ask me and I'll help you book.", "找黑豚帮忙预约": "Ask Heitun to help book",
    "约个当地体验": "Book a local experience", "北海道小樽吹个自己的玻璃杯、札幌冰上钓鱼；大阪做寿司和章鱼小丸子、京都穿和服、东京湾海钓半日。约好时间，可自行前往。": "Blow your own glass in Otaru, try ice fishing near Sapporo, make sushi and takoyaki in Osaka, wear a kimono in Kyoto, or spend half a day sea fishing in Tokyo Bay. Once booked, you can go on your own.", "所在当地城市有哪些体验活动？费用和能不能中文或英文接待，先找黑豚问清楚": "What experiences are available in the city you're visiting? Ask Heitun about prices and whether they can host you in Chinese or English.",
    "东京街头卡丁车": "Tokyo street go-karting", "开着卡丁车逛东京？需要日本认可的国际驾驶许可，或符合条件的地区驾照及日文译本；订前请在官网核对。": "See Tokyo by street go-kart? You need a driving permit recognized in Japan, or an eligible regional license with an official Japanese translation. Check the operator's requirements before booking.", "打开店家中文网站": "Open the operator's Chinese site",
    "吃的先能找，逛的我们接着整理。": "Find food now; shopping guides are coming next.", "美食现在能找店，购物分类接着整理。": "Find food now; shopping guides are coming next.", "下一步一起整理": "Planning next", "附近逛什么": "Where to shop nearby", "服饰、杂货、百货的入口先留好了": "Fashion, variety stores and department stores are next", "‹ 返回逛日本": "‹ Back to Explore Japan", "购物分类的位置先留好，店铺入口还没有上线。": "The shopping section is ready; store links are not live yet.", "接下来一起决定怎么分类": "Let's decide the categories together", "服饰、杂货和百货怎么排，等我们选好再放可用的地图入口。": "We'll add working map links after choosing how to group fashion, variety stores and department stores.", "先用工具箱找附近药妆、便利店和超市": "Use the toolbox for nearby drugstores, convenience stores and supermarkets",
    "选个想吃的，打开常用地图看看附近的店、评价和路线，挑中再导航过去。": "Pick what you feel like eating, then check nearby places, reviews and routes on your preferred map before navigating there.", "不知道当地有什么特色？又怕到了餐厅没位？": "Not sure what local food to try, or worried a restaurant may be full?", "想找推荐、预约或改期，或需要打日语电话，都可以提前找黑豚帮你联系餐厅。": "For recommendations, bookings, changes or a call in Japanese, ask Heitun to contact the restaurant ahead of time.", "找黑豚问问": "Ask Heitun", "找黑豚推荐预约": "Ask Heitun to recommend or book", "我命由我不由天，再来！": "My choice—spin again!", "先选一类": "Pick a category", "地图结果不保证有对应菜品，去之前看看菜单和营业时间。": "Map results may not serve the dish. Check the menu and hours before visiting.",
    "回转寿司": "Conveyor-belt sushi", "附近门店・连锁品牌": "Nearby branches · Chains", "拉面": "Ramen", "豚骨・味噌・沾面": "Tonkotsu · Miso · Tsukemen", "烧肉": "Yakiniku", "和牛・烤肉自助": "Wagyu · All-you-can-eat", "居酒屋": "Izakaya", "烧鸟・海鲜现烤": "Yakitori · Grilled seafood",
    "牛丼御三家": "Three gyudon chains", "日式牛肉盖饭・快捷实惠": "Japanese beef bowls · Quick & good value", "想吃哪家牛丼？": "Which beef-bowl chain?", "先选品牌，再用常用地图找附近门店。松屋的牛肉盖饭通常叫「牛めし」。": "Pick a chain, then find a nearby branch on your preferred map. Matsuya usually calls its beef bowl 牛めし.", "牛丼 · 先看看附近有什么": "牛丼 · See what's nearby", "吉野家 · 搜索附近门店": "Yoshinoya · Find nearby branches", "食其家 · ": "Sukiya · ", "すき家 · 搜索附近门店": "Sukiya · Find nearby branches", "松屋 · 牛めし与定食": "Matsuya · Beef bowls & set meals", "价格、菜单和营业时间会因门店而异，请以门店信息为准。": "Prices, menus and hours vary by branch; check the store listing.",
    "米饭・定食": "Rice & set meals", "海鲜丼・鳗鱼饭・定食": "Seafood bowl · Eel · Set meals", "日式火锅": "Japanese hot pot", "涮涮锅・寿喜锅": "Shabu-shabu · Sukiyaki", "日式咖喱": "Japanese curry", "咖喱饭・汤咖喱": "Curry rice · Soup curry", "天妇罗": "Tempura", "天丼・天妇罗定食": "Tendon · Set meals", "荞麦面・乌冬": "Soba · Udon", "冷热都能找": "Hot or cold", "炸猪排・炸牛排": "Pork or beef cutlet", "先选肉类，再找店": "Choose the meat first", "甜品・茶": "Sweets & tea", "和果子・抹茶甜品": "Wagashi · Matcha sweets", "各地店铺数量不同；地图搜索可以使用，不代表附近一定有对应店铺。": "Availability varies by area. A working map search does not mean a restaurant is nearby.",
    "想吃哪种米饭？": "Which rice dish?", "这里按游客找饭的习惯放在一起，并不是说每一种都是定食。": "Grouped for easy browsing; not every dish here is a set meal.", "日式定食": "Japanese set meal", "定食 · 米饭、主菜和配菜": "定食 · Rice, main dish and sides", "海鲜丼": "Seafood rice bowl", "海鮮丼 · 海鲜盖饭": "海鮮丼 · Seafood over rice", "鳗鱼饭": "Eel rice", "うなぎ · 到店确认うな丼或うな重": "うなぎ · Check for うな丼 or うな重", "想吃咖喱饭请返回分类选择「日式咖喱」。菜单、价格和营业时间以门店为准。": "For curry rice, choose Japanese curry. Check menus, prices and hours with the restaurant.",
    "想吃哪种日式火锅？": "Which Japanese hot pot?", "涮涮锅": "Shabu-shabu", "しゃぶしゃぶ · 涮肉和蔬菜": "しゃぶしゃぶ · Thinly sliced meat and vegetables", "寿喜锅": "Sukiyaki", "すき焼き · 偏甜咸口味": "すき焼き · Sweet-savory broth", "涮涮锅不代表一定有和牛；肉类、套餐、价格和预约条件请以门店为准。": "Shabu-shabu does not always include wagyu. Check the meat, menu, prices and booking rules.",
    "想吃哪种咖喱？": "Which curry?", "日式咖喱饭": "Japanese curry rice", "カレーライス · 想吃炸猪排咖喱可看カツカレー": "カレーライス · Look for カツカレー for pork cutlet curry", "北海道汤咖喱": "Hokkaido soup curry", "スープカレー · 札幌代表美食": "スープカレー · A Sapporo specialty", "汤咖喱在北海道更有代表性，其他地方不一定找得到；具体菜单请以门店为准。": "Soup curry is most associated with Hokkaido and may be harder to find elsewhere. Check menus.",
    "想吃哪种甜品？": "Which sweet treat?", "和果子": "Wagashi", "和菓子 · 团子、大福等日式点心": "和菓子 · Dango, daifuku and more", "抹茶甜品": "Matcha sweets", "抹茶 スイーツ · 先看店里的具体甜品": "抹茶 スイーツ · Check the shop's menu", "日式咖啡店": "Japanese coffee shop", "喫茶店 · 坐下来喝茶吃点心": "喫茶店 · Sit down for tea and sweets", "搜索结果不保证供应某款点心；进店前请查看菜单与营业时间。": "Search results may not offer a specific sweet. Check the menu and hours.",
    "先在地图里找附近的店，再点进具体门店确认菜单和路线。": "Find a nearby place on the map, then check its menu and directions.", "按日文词搜索附近的店 · 需要当地网络才能打开哦！": "Search nearby places in Japanese · Local internet needed", "地图搜索结果不保证供应对应菜品；菜单、价格、营业时间请以具体门店为准。": "Map results may not serve the dish. Check menu, prices and hours with the restaurant.",
    "关西小吃": "Kansai bites", "大阪烧・章鱼烧": "Okonomiyaki · Takoyaki", "想吃哪种关西小吃？": "Which Kansai snack?", "大阪烧": "Okonomiyaki", "お好み焼き · 铁板现煎": "お好み焼き · Griddled savory pancake", "章鱼烧": "Takoyaki", "たこ焼き · 经典街头小吃": "たこ焼き · Popular street snack", "这两种是关西代表小吃；其他地区也可搜索，但附近不一定有店。": "These are Kansai specialties. You can search elsewhere, but a nearby shop is not guaranteed.",
    "特色料理": "Specialty dishes", "河豚・蟹・牛舌": "Fugu · Crab · Beef tongue", "想吃哪种特色料理？": "Which specialty dish?", "先选想吃的，再用常用地图找店。各地店铺数量不同，不一定附近就有。": "Pick a dish, then find a restaurant on your preferred map. Availability varies by area.", "河豚料理": "Fugu cuisine", "ふぐ料理 · 刺身、河豚锅等": "ふぐ料理 · Sashimi, fugu hot pot and more", "蟹料理": "Crab cuisine", "かに料理 · 先看套餐和价格": "かに料理 · Check sets and prices", "牛舌料理": "Beef tongue", "牛たん · 仙台特色": "牛たん · A Sendai specialty", "河豚请到正规经营的店铺用餐；菜单、价格、营业时间和预约条件以门店为准。": "Eat fugu at a properly licensed restaurant. Check the menu, prices, hours and reservations with the restaurant.",
    "附近吃什么、逛什么，选好再打开地图。": "Find food and shops nearby, then open your preferred map.", "美食和购物都能按日文词打开附近地图。": "Search food and shops nearby using Japanese terms.", "现在能用 · 按购物目的找": "Ready to use · Shop by purpose", "百货、商场、电器卖场、美妆与连锁店": "Department stores, malls, electronics, beauty and chains",
    "先想好要逛什么，再用地图找附近的店。": "Choose what to shop for, then find nearby stores on a map.", "大商场、百货专柜和药妆店不是一回事。这里按购物目的分；搜到后请看具体门店的楼层、品牌和营业时间。": "Malls, department-store counters and drugstores differ. Browse by purpose, then check each store's floors, brands and hours.",
    "百货店": "Department stores", "大丸・高岛屋・三越・伊势丹": "Daimaru · Takashimaya · Mitsukoshi · Isetan", "想逛品牌专柜，先找附近百货；不同城市、不同店的品牌不一样。": "For brand counters, start with a department store. Brands vary by city and branch.", "不挑品牌，就近找": "Any brand · Find nearby", "大丸": "Daimaru", "高岛屋": "Takashimaya", "三越": "Mitsukoshi", "伊势丹": "Isetan",
    "大型购物中心": "Shopping malls", "逛街、吃饭、购物一次搞定": "Shopping and dining in one place", "逛永旺商城": "Browse AEON Mall",
    "大型电器卖场": "Large electronics stores", "相机・耳机・家电・数码产品": "Cameras · Headphones · Appliances · Tech", "这些是电器卖场的搜索入口；同一品牌也有不同规模的门店，先看门店照片和楼层。": "These searches find electronics retailers. Branch sizes vary; check photos and floor guides.",
    "大牌化妆品": "Premium beauty", "百货专柜・多品牌美妆店": "Beauty counters · Multi-brand stores", "想买专柜品牌，先找百货店化妆品楼层；想多试几个牌子，也可找 @cosme。它们不等于药妆店。": "For beauty counters, check department-store beauty floors. Try @cosme for multiple brands; neither is a drugstore.", "百货美妆专柜": "Department-store beauty", "@cosme 美妆店": "@cosme beauty store",
    "熟悉的连锁店": "Familiar chains", "优衣库・GU・DAISO 等": "UNIQLO · GU · DAISO and more", "衣服、杂货和生活用品，从熟悉的品牌开始找；点开后用日文店名搜附近门店。": "Start with familiar fashion and lifestyle chains, then search nearby branches by their Japanese names.", "服饰": "Fashion", "杂货・生活用品": "Lifestyle goods", "优衣库": "UNIQLO", "唐吉诃德": "Don Quijote",
    "优衣库・H&M・ABC-MART 等": "UNIQLO · H&M · ABC-MART and more", "衣服、鞋子、杂货和生活用品，从熟悉的品牌开始找；点开后用店名搜附近门店。": "Start with familiar clothing, footwear and lifestyle chains, then search nearby branches by name.", "服饰・鞋店": "Fashion · Shoes", "H&M · 服装店": "H&M · Fashion", "ABC-MART · 鞋店": "ABC-MART · Shoes", "用品牌名搜索 · 需要当地网络才能打开哦！": "Search by brand name · Local internet needed", "用品牌名搜索 · 适合 iPhone": "Search by brand name · Best for iPhone", "直接搜索品牌名 · 位置不对时可复制品牌名手动搜": "Search the brand name · Copy it if the area is wrong", "复制品牌名，手动搜索": "Copy brand name and search manually", "若高德跳到中国或没搜到附近：先把地图移到日本，再粘贴上面的品牌名搜索。": "If Amap searches in China or misses nearby places, move the map to Japan, then paste the brand name above.",
    "GU · 平价服饰": "GU · Affordable fashion", "DAISO · 日本百元店": "DAISO · Japanese 100-yen shop", "DAISO 日本百元店": "DAISO · 100-yen shop", "无印良品": "MUJI", "LOFT · 生活杂货": "LOFT · Lifestyle goods", "Hands · 生活杂货": "Hands · Lifestyle goods", "3COINS · 小物杂货": "3COINS · Small lifestyle goods", "DAISO 不一定每件都是 100 日元，实际价格以店内标示为准。": "Not every DAISO item is ¥100. Check the price in store.",
    "地图只负责搜索，不保证附近有店、品牌有货或支持免税。药妆、超市和便利店仍在首页「便利一下」。": "Map searches do not guarantee a nearby branch, stock or tax-free shopping. Find drugstores, supermarkets and convenience stores in the toolbox.",
    "附近百货店": "Nearby department stores", "大丸百货": "Daimaru", "三越百货": "Mitsukoshi", "永旺商城": "AEON Mall", "附近大型购物中心": "Nearby shopping malls", "附近电器卖场": "Nearby electronics stores",
    "先用地图看附近的搜索结果，再点进具体门店确认楼层、品牌和路线。": "Check nearby map results, then open a specific branch for floors, brands and directions.", "用日文店名搜索 · 需要当地网络才能打开哦！": "Search the Japanese store name · Local internet needed", "用日文店名搜索 · 适合 iPhone": "Search the Japanese store name · Best for iPhone", "地图只显示搜索结果，不保证附近有店、品牌有货或支持免税；请查看具体门店信息。": "Map results do not guarantee a nearby branch, stock or tax-free shopping. Check the specific store.",
    "大丸・高岛屋・三越・阪急等": "Daimaru · Takashimaya · Mitsukoshi · Hankyu and more", "先找附近百货，再看店内品牌；这些名字并非每座城市都有。": "Find a nearby department store, then check its brands. Not every chain has a branch in every city.", "阪急百货": "Hankyu Department Store", "松坂屋": "Matsuzakaya", "丸井今井": "Marui Imai", "岩田屋": "Iwataya", "札幌等・北海道": "Sapporo and Hokkaido", "福冈等・九州": "Fukuoka and Kyushu",
    "永旺商城・LaLaport・Ario": "AEON Mall · LaLaport · Ario", "优先看面积大、评价较好的郊区店：当地人常逛，更有生活感；停车场通常更宽敞、车位更充足，自驾也方便。": "Try a larger, well-reviewed suburban mall for a local feel. Parking is often roomier, with more spaces for drivers.",
    "必客 · Bic Camera": "Bic Camera", "友都八喜 · Yodobashi": "Yodobashi Camera", "山田电机 · Yamada": "Yamada Denki", "爱电王 · EDION": "EDION",
    "必客 Bic Camera": "Bic Camera", "友都八喜 Yodobashi": "Yodobashi Camera", "山田电机 Yamada Denki": "Yamada Denki", "爱电王 EDION": "EDION", "📍 大阪・名古屋・福冈等": "📍 Osaka · Nagoya · Fukuoka, etc.",
    "百货、商场、电器卖场与连锁店": "Department stores, malls, electronics and chains", "想逛熟悉的连锁店、商场、百货或电器卖场，先选一类。大牌化妆品可到百货店找；具体品牌请看门店楼层信息。": "Choose familiar chains, malls, department stores or electronics shops. For premium beauty, check a department store's beauty floor and brands.", "想买大牌化妆品，可以找百货店的化妆品楼层；具体品牌和柜台请看门店信息。这些百货并非每座城市都有。": "For premium beauty, check department-store beauty floors and each branch's brands.", "只放能逛一整个商场的品牌系列；各城市不一定都有，先看附近门店。": "Only full shopping-mall chains are listed. Availability varies by city; check nearby branches.",
    "📍 东京・大阪・京都等": "📍 Tokyo · Osaka · Kyoto, etc.", "📍 东京・札幌・福冈等": "📍 Tokyo · Sapporo · Fukuoka, etc.", "📍 东京・京都等": "📍 Tokyo · Kyoto, etc.", "📍 大阪・神户・福冈等": "📍 Osaka · Kobe · Fukuoka, etc.", "📍 东京・名古屋等": "📍 Tokyo · Nagoya, etc.", "📍 札幌・函馆等": "📍 Sapporo · Hakodate, etc.", "📍 福冈・久留米等": "📍 Fukuoka · Kurume, etc.", "📍 全国多地": "📍 Many areas across Japan", "📍 东京・大阪・福冈等": "📍 Tokyo · Osaka · Fukuoka, etc.", "📍 东京・大阪周边・福冈等": "📍 Tokyo · near Osaka · Fukuoka, etc.", "📍 札幌・东京・大阪周边等": "📍 Sapporo · Tokyo · near Osaka, etc.", "📍 札幌・东京・大阪・福冈等": "📍 Sapporo · Tokyo · Osaka · Fukuoka, etc.",
    "城市仅举例，不代表只在这些地方有店；附近有没有仍以地图和门店信息为准。地图不保证品牌有货或支持免税。药妆、超市和便利店仍在首页「便利一下」。": "Cities are examples, not an exhaustive list. Check the map and branch details for nearby stores, stock and tax-free service. Find drugstores, supermarkets and convenience stores in the toolbox.",
    "中古淘货": "Secondhand finds", "品牌中古・古着杂货": "Pre-owned luxury · Vintage clothing", "想淘二手品牌包、手表或古着，可从这两家找起；各分店经营范围、货品和规模不同。": "Start with these two for pre-owned bags, watches or vintage clothes. Selection and store size vary by branch.",
    "KOMEHYO 中古店": "KOMEHYO resale store", "コメ兵 · 品牌包、腕表等": "コメ兵 · Bags, watches and more", "2nd STREET 中古店": "2nd STREET resale store", "セカンドストリート · 古着、杂货等": "セカンドストリート · Vintage clothes and more",
    "二次元周边": "Anime & game merchandise", "动漫周边・手办・游戏": "Merch · Figures · Games", "想买新品，还是淘中古？先挑一家店，再看看附近分店的照片和评价，免得白跑一趟。": "Looking for new merch or secondhand finds? Pick a store, then check nearby branches' photos and reviews before you go.",
    "黑豚碎碎念 · 顺路体验": "Heitun's take · Nearby experience", "女仆咖啡厅": "Maid café", "附近女仆咖啡厅": "Nearby maid cafés", "打开地图找附近": "Find nearby on map", "东西难吃，主打互动情绪价值高！一般都在当地的动漫街附近，部分店另外收座位费，进店前先看价格。": "In my view, the food is not the draw—the interaction and atmosphere are! You can often find them around anime districts. Some charge a separate seating fee, so check prices before entering.", "先在地图上找附近的女仆咖啡厅，再看具体门店的费用、营业时间和评价。": "Find nearby maid cafés on the map, then check each venue's fees, hours and reviews.", "部分店另外收座位费，进店前先看价格。": "Some venues charge a separate seating fee. Check prices before entering.",
    "骏河屋": "Surugaya", "駿河屋 · 新品与中古都有": "駿河屋 · New and pre-owned items", "Animate 动漫周边": "Animate merchandise", "アニメイト · 动漫周边、新品为主": "アニメイト · Anime merchandise, mainly new", "まんだらけ · 主打中古收藏": "まんだらけ · Mainly pre-owned collectibles", "らしんばん · 主打中古周边": "らしんばん · Mainly pre-owned merch",
    "附近中古店": "Nearby resale shops", "附近动漫周边店": "Nearby anime merch shops", " · 先看看附近有什么": " · See what's nearby", "先用地图看附近有哪些店，再点进具体门店确认卖什么、营业时间和路线。": "See nearby shops on the map, then check what each sells, opening hours and directions.",
    "用日文类别词搜索 · 需要当地网络才能打开哦！": "Search the Japanese category · Local internet needed", "用日文类别词搜索 · 适合 iPhone": "Search the Japanese category · Best for iPhone", "搜索结果可能包含只收购、不零售的店；请看具体门店的照片、经营内容和营业时间。": "Results may include buy-only shops. Check photos, what the store sells and opening hours.",
    "蛋包饭・海鲜丼・鳗鱼饭": "Omurice · Seafood bowl · Eel", "蛋包饭": "Omurice", "オムライス · 鸡蛋包着调味米饭": "オムライス · Omelette over seasoned rice",
    "定位离你最近的日本美食、二次元周边、数码卖场和百货店。": "Find nearby Japanese food, anime goods, electronics and department stores.",
    "附近吃什么、逛什么，选好再打开地图；优先参考评分高、评价多的店。": "Pick what to eat or shop for, then open a map. Well-reviewed places with many ratings are a useful starting point.",
    "服饰、百货、数码、中古、二次元……": "Fashion, department stores, tech, resale and anime…", "打开逛什么分类": "Browse shopping categories", "‹ 返回逛吃日本": "‹ Back to Eat & Shop",
    "👕 熟悉的连锁店": "👕 Familiar chains", "🏬 百货店": "🏬 Department stores", "🛒 大型购物中心": "🛒 Shopping malls", "📷 电器卖场": "📷 Electronics stores", "🧥 中古淘货": "🧥 Secondhand finds", "🎮 二次元周边": "🎮 Anime & game merch",
    "📚 书店": "📚 Bookstores", "书店": "Bookstores", "找本书・逛文具・顺路看看": "Books · Stationery · A pleasant browse", "不挑就搜附近书店；想逛连锁店，也可以按日文店名找。各分店规模和卖的东西不一样，点进地图看看照片和营业时间。": "Search nearby bookstores, or choose a chain by its Japanese name. Branches vary in size and selection; check photos and hours on the map.", "附近书店": "Nearby bookstores", "纪伊国屋书店": "Kinokuniya", "丸善书店": "Maruzen", "淳久堂书店": "Junkudo", "茑屋书店": "Tsutaya Books", "未来屋书店": "Miraiya Shoten", "書店 · 看看附近有什么": "書店 · See what is nearby", "先在地图里找附近书店，再点进具体门店看路线和营业时间。": "Find a nearby bookstore on the map, then open a branch for directions and hours.", "各分店规模、库存和营业时间不同，出发前看一下具体门店。": "Branch size, stock and hours vary. Check the specific store before you go.",
    "日本入境助手": "Japan Arrival Guide", "入境小助手": "Arrival Helper", "官方填写入口": "Official entry form", "申报单范本": "Filled declaration samples", "第一次入境不慌": "First visit, step by step", "记住下车点、车站出口或酒店，定个位，导航返回": "Save a stop, exit or hotel and navigate back", "记住地点，导航返回": "Save a spot · Navigate back",
    "第一次来日本，填资料、查提醒、走出机场一步步来。": "First time in Japan? Complete the forms, check key reminders and leave the airport with confidence.",
    "先做这件事": "Start here", "入境资料，两种办法二选一": "Entry forms: choose one of two ways", "电子入境卡直通": "Online entry forms", "出发前在官网填好，落地亮二维码，省去现场填表丝滑入关。": "Fill them out on the official site before departure, then show your QR code on arrival. Skip filling out forms on site for a smoother arrival.",
    "现场填写纸质表": "Fill out paper forms on arrival", "来不及提前弄也别慌，到了按现场指引填表。多花点填写时间，现场排队人一般较多。": "Didn't prepare in advance? No worries. Follow the airport signs and fill out the forms there. It takes extra time, and the line for paper forms is usually longer.", "去 Visit Japan Web 官网填写": "Open official Visit Japan Web", "不会填？到短视频平台搜「Visit Japan Web 填写教程」看看，个人资料记得只在官网填。": "Need help? Search video platforms for a Visit Japan Web tutorial, but enter your personal details only on the official site.", "看官方使用说明 ↗": "Official user guide ↗", "核对网址为 vjw.digital.go.jp；具体适用手续和现场指引以日本官方为准。": "Check that the URL is vjw.digital.go.jp. Follow current official and on-site instructions.",
    "看范本：入境记录": "Filled sample: arrival card", "看范本：海关申报": "Filled sample: customs form", "虚构信息填写示例，点开看整张。": "Filled example using fictional details. Open the full form.", "查看整张入境记录范本 ↗": "View full arrival-card example ↗", "查看整张海关申报范本 ↗": "View full customs-form example ↗", "填写范本": "Filled example", "入境记录填写范本": "Filled arrival-card example", "海关申报填写范本": "Filled customs-form example", "默认看整张；想看字，点“放大细节”后左右滑动。实际资料和申报按自己的情况填写。": "The full form appears first. Tap Zoom in and swipe to inspect; use your real details and declarations.", "放大细节": "Zoom in", "看整张": "Fit whole form", "姓名、地址和勾选只是示范，填写时按你自己的真实情况来。": "Names, addresses and ticks are examples only. Fill in your own truthful details.", "“是／否”只是示范，携带物品和申报事项要按真实情况填写。": "Yes/no ticks are examples only. Declare your actual belongings and circumstances.", "出入国在留管理厅原件 ↗": "Original immigration form ↗", "日本海关原件 ↗": "Original customs form ↗", "先认个样子，现场按拿到的表格填写就好。": "Take a look first, then fill in the form provided on site.",
    "第一次填写，先准备这些": "What to prepare", "证件与航班": "Passport and flight", "护照、航班号、抵达日期；签证或免签资格按本人国籍单独核实。": "Have your passport, flight number and arrival date ready. Check visa requirements for your own nationality.",
    "日本住宿信息": "Accommodation in Japan", "准备酒店住处的名称、日文地址和电话，填写时照订单核对。": "Have your accommodation's name, Japanese address and phone number ready. Check them against your booking.",
    "确认登记结果": "Review your registration", "电子版按官网步骤完成后，确认页面显示的二维码；出发前再检查信息是否与证件一致。": "After completing the online steps on the official site, check the QR code shown. Before departure, verify the details against your documents.",
    "出发前的小清单": "Pre-departure checklist", "核对护照有效期；确认签证或免签资格": "Check passport validity; confirm visa or visa-waiver eligibility", "核对机票与住宿资料": "Check flight and accommodation details", "检查 Visit Japan Web 登记资料与二维码": "Review Visit Japan Web details and QR code", "有没有带违禁品？食品、药品或动植物？先查官方携带规定": "Bringing anything prohibited? Food, medicine, plants or animals? Check the official rules first", "勾选仅在当前页面临时保留，不会上传。": "Checks remain on this page temporarily and are not uploaded.",
    "机场便民设施提醒": "Before leaving the airport", "过完入境和海关，离开机场前花一分钟看看这些；不一定都要办，市区有，但是不如机场集中，不懂得你还可以直接去问讯台找个工作人员给你指。": "After immigration and customs, take a minute to check these before leaving the airport. You may not need them all. They're available in town too, but easier to find together at the airport. If you're unsure, ask the information desk to point you in the right direction.",
    "交通 IC 卡办了没？": "Got a transit IC card yet?", "地铁、巴士、便利店、自动贩卖机等地方都能用，很方便；想办实体 Suica 等交通卡，建议问机场询问台。苹果手机可以直接注册电子版，更方便，提前在家弄好都行。": "You can use one on trains, buses, at convenience stores and vending machines. For a physical Suica or similar card, ask at the airport information desk. On an iPhone, you can add a digital transit card in advance at home.",
    "手机网搞没搞定？": "Is your mobile data working?", "漫游和租的Wi-Fi能用不？机场还有SIM 卡或 Wi‑Fi 柜台，营业时间和套餐自己确认。": "Is your roaming or rented Wi-Fi working? Airports also have SIM and Wi-Fi counters; check their opening hours and plans yourself.",
    "备用的现金准备好了没有？": "Have some backup cash?", "许多小店爱收现金，人均备个1-2万日元就差不多了，机场有换汇柜台和 ATM；市区便利店的 ATM 也能用银联卡取日元。": "Many small shops prefer cash. Around ¥10,000–20,000 per person is a handy backup. Airports have exchange counters and ATMs, and some convenience-store ATMs in town let you withdraw yen with UnionPay.",
    "出机场前，再检查一遍！": "One last check before leaving!", "有的机场到市内要一个多小时，厕所先上好；想抽烟就去指定吸烟室，随身行李带齐了没？人齐没齐检查一遍哈！": "Some airports are over an hour from the city. Use the restroom before leaving; if you smoke, use a designated smoking room. Check your bags and make sure everyone in your group is together!",
    "日本各机场接送机预约": "Airport transfer booking across Japan",
    "入境卡怎么填？": "How do I fill in the entry forms?", "电子填写、纸表范本": "Online forms and filled paper samples", "填之前准备啥？": "What should I have ready?", "护照、航班、住宿信息": "Passport, flight and hotel details", "出发前再看一眼": "One last check before you go", "证件、机票和住宿，临走核对一遍": "Check your documents, flight and hotel", "落地了先别急着走": "Before you leave the airport", "交通卡、手机网络、现金和机场设施": "Transit card, mobile data, cash and airport services",
    "入境小助手功能": "Arrival helper sections", "入境资料": "Entry forms", "电子填写 · 纸表范本": "Online forms · paper samples", "填写准备": "What to prepare", "证件 · 航班 · 住宿": "Passport · flight · hotel", "出发清单": "Before you go", "临行前检查一遍": "A quick final check", "机场便民": "At the airport", "交通卡 · 网络 · 现金": "Transit card · data · cash", "去酒店": "Go to hotel", "粘贴地址 · 打开地图": "Paste address · open a map", "出机场，去酒店": "From the airport to your hotel", "把订单上的酒店名称或地址复制进来，选个地图打开。进地图后看一眼是不是你订的那家，再点路线。": "Paste your hotel's name or address from the booking and choose a map. Check that it's the right hotel before starting directions.", "酒店名称或地址": "Hotel name or address", "粘贴酒店名称或地址": "Paste hotel name or address", "找酒店": "Find hotel", "Google 地图": "Google Maps", "Apple 地图": "Apple Maps", "高德地图": "Amap", "复制酒店名称／地址": "Copy hotel name/address", "高德若跳转后没找到，就复制上面的文字，在地图里手动搜索。输入内容只用来打开地图，不保存在本站。": "If Amap doesn't find it, copy the text and search manually. Your input only opens the map; this site does not save it.", "酒店名称／地址已复制": "Hotel name/address copied",
    "有事就找我聊聊": "Let's talk", "先看看黑豚的频道，想说什么直接联系我。": "Get to know me through my channels, then message me directly.", "你是不是也在想这些？": "Thinking about something like this?", "点一句，咱们聊聊怎么弄。": "Tap an idea and let's talk it through.", "暂停转动": "Pause", "继续转动": "Keep turning", "可以找黑豚聊的想法": "Ideas to talk about", "包车一天追红叶": "A day chasing autumn leaves", "樱花季想多跑几个地方": "See more cherry-blossom spots", "大阪一路玩到东京": "Travel from Osaka to Tokyo", "札幌出发去二世古滑雪": "Ski Niseko from Sapporo", "落地机场想有人接": "Need an airport pickup", "那家餐厅好想订": "Help booking that restaurant", "想泡私汤又不会打电话": "Book a private bath", "临时想请你帮个忙": "Need a hand with something", "想代买个东西": "Need help buying something", "有个想法想聊聊合作": "Have a collaboration idea", "带爸妈轻松逛一天": "An easy day out with parents", "带娃去哪儿省心": "A kid-friendly day out", "我们想包车去富士山一天": "A private day trip to Mt. Fuji", "我老婆过几天生日，能帮我订个蛋糕送到酒店吗？": "My wife's birthday is coming up. Can you get a cake delivered to our hotel?", "我护照丢酒店了，你能帮我打个电话问问嘛。": "I may have left my passport at the hotel. Can you call them?", "我想订一天海景温泉": "A day at a seaside onsen", "我想找个情侣泡的私汤温泉": "A private bath for two", "我想去乡下玩儿一天": "A day out in the countryside", "我想去海钓一天": "A day of sea fishing", "我想带家人玩儿十天，多玩几个城市。": "A ten-day family trip across several cities", "我想去当地人逛的海鲜市场": "Visit a local seafood market", "刚刚看到": "You picked", "有事直接说就好": "Just tell me what's on your mind", "找黑豚聊聊 ↑": "Message Heitun ↑",
    "不只拍日本，也帮你玩日本。": "More than filming Japan—I help you explore it.",
    "视频里看到想去的地方，或者行程有事需要帮忙，直接找我聊。": "Saw a place in my videos you want to visit, or need help with your trip? Just message me.",
    "帮我代买个游戏机": "Help me buy a game console", "我想带娃去农场逛逛": "A farm visit with the kids",
    "我想包车一天去追红叶": "I want a private car for a day of autumn leaves", "樱花季想一天多跑几个地方": "I want to see several cherry-blossom spots in one day", "我想从大阪一路玩到东京": "I want to travel from Osaka all the way to Tokyo", "我想从札幌去二世古滑一天雪": "I want a day of skiing in Niseko from Sapporo",
    "落地机场了，能找人来接吗？": "Can someone pick me up at the airport?", "我想吃的那家店订不到位，能帮我问问吗？": "The restaurant I want is fully booked. Can you ask for me?", "我想泡私汤，日语电话搞不定": "I want a private bath, but I can't handle the phone call in Japanese", "我在日本遇到点事，能帮我一下吗？": "Something came up in Japan. Could you help me?",
    "我想买个限定款，能帮我找找吗？": "I want a limited edition item. Can you help me find it?", "我有个想法，想找你聊聊合作": "I have an idea and want to talk about working together", "想带爸妈轻松玩一天，有什么路线？": "I want an easy day out with my parents. Any route ideas?", "带娃来日本，哪儿玩比较省心？": "Where can I take my kids in Japan for an easy day out?",
"我想约家好吃的鳗鱼饭": "I want to book a good unagi restaurant", "我想找家实惠的和牛烤肉": "I want an affordable wagyu yakiniku place", "我想去合掌村看看雪景": "I want to see Shirakawa-go in the snow", "我想去配一副眼镜": "I want to get a pair of glasses made", "我想去定制一套西装": "I want to have a suit tailored", "我想约个体检": "I want to book a health checkup", "我想找个陪同翻译": "I want an interpreter to accompany me", "拖一拖球，点一句，看看有没有你想的，咱们聊聊怎么弄。": "Drag the globe and pick an idea that sounds like yours. Let's talk it through.",
    "旅游服务（接送机，行程定制，一日/多日游等）可免费约餐厅；单独代预约、代办等服务会收取少量服务费，觉得合适再决定。": "Travel services (airport transfers, custom itineraries, day or multi-day trips) include complimentary restaurant booking help. Standalone bookings, errands and similar help have a small service fee; you can decide after hearing the price.",
    "我想找个和服店租和服": "I want to find a shop where I can rent a kimono", "我想迪士尼早晚接送一下": "I want a ride to Disney in the morning and back in the evening", "我想去北海道玩儿一圈": "I want to travel around Hokkaido", "我想去九州各地泡温泉": "I want to visit hot springs around Kyushu", "我想冲绳帮我约一下浮潜": "I want help booking snorkeling in Okinawa", "我想去一趟蜡笔小新的老家": "I want to visit Crayon Shin-chan's hometown"
  };

  Object.assign(englishMap, {
    "JT 调查、用户投稿及餐厅资料结合；首次使用可能需要确认已满20岁并允许定位。可能需要当地网络才能打开哦！": "Combines JT research, user submissions and restaurant data. First use may require age and location confirmation. You may need a local network to open it.",
    "覆盖咖啡店、商场和公共吸烟区等详细信息，直接进入网页版地图。可能需要当地网络才能打开哦！": "Detailed listings for cafés, malls and public smoking areas. Opens the web map directly. You may need a local network to open it.",
    "打开直接显示地图，支持简体中文、当前位置、作品搜索和路线整理。可能需要当地网络才能打开哦！": "Opens directly to a map with Simplified Chinese, current location, title search and route planning. You may need a local network to open it.",
    "点位更多，可查看场景、登场话数、路线与打卡；网页功能较多，以日文为主。可能需要当地网络才能打开哦！": "More locations with scene, episode, route and check-in details. Mostly Japanese. You may need a local network to open it.",
    "地图只展示部分代表地点，不是全国完整名单。输入城市用地图继续搜，或到两家运营方的中文目录按地区找。": "The map shows selected examples, not a complete list. Enter a city to search maps, or browse the two operators' Chinese directories by region.",
    "要搜索的日本城市": "Japanese city to search",
    "输入城市，如广岛": "Enter a city, e.g. Hiroshima",
    "地图搜更多奥莱 ↗": "Find more outlets on a map ↗",
    "想逛更多古着、买手店？": "Want more vintage and select shops?",
    "可输入其他日本城市；不输入就用上面选中的城市，交给地图继续找。": "Enter another Japanese city, or leave it blank to search the city selected above.",
    "输入城市，如京都": "Enter a city, e.g. Kyoto",
    "搜古着店 ↗": "Find vintage shops ↗",
    "搜买手店 ↗": "Find select shops ↗",
    "提前查别的城市的温泉？": "Looking for onsen in another city?",
    "备用地图": "Backup map",
    "高德地图和日文词搜索": "Amap and Japanese search terms",
    "输入日本城市，再选日归温泉或私汤；不输入就参考顶部选的位置。": "Enter a Japanese city, then choose day-use onsen or private baths. Leave it blank to use the location above.",
    "输入城市，如箱根": "Enter a city, e.g. Hakone",
    "搜日归温泉 ↗": "Find day-use onsen ↗",
    "搜私汤 ↗": "Find private baths ↗",
    "更多奥莱": "More outlets",
    "更多古着店": "More vintage shops",
    "更多买手店": "More select shops",
    "其他城市的日归温泉": "Day-use onsen in other cities",
    "其他城市的私汤": "Private baths in other cities",
    "按城市和日文词交给地图搜索；结果不是本站核实的完整名单。": "Search maps by city and Japanese term. Results are not a complete, verified list from this site.",
    "按城市和日文词搜索 · 需要当地网络": "Search by city and Japanese term · Local network access needed",
    "按城市和日文词搜索 · 适合 iPhone": "Search by city and Japanese term · Good for iPhone",
    "地图可能显示周边城市的结果；具体地点、营业时间和预约条件请点进门店或官网核对。": "Maps may include nearby cities. Check each venue or official site for location, hours and booking rules."
  });

  Object.assign(englishMap, {
    "更多实用工具": "More useful tools", "调整顺序": "Customize", "查日本天气": "Japan weather",
    "日本看海的车站": "Sea-view stations in Japan", "日本看海的浪漫车站": "Japan’s scenic sea-view stations", "全国海景车站地图 · 日文原站": "Nationwide station map · Japanese site", "全国地图 · 日文原站": "Nationwide map · Japanese site",
    "奈良": "Nara", "金泽": "Kanazawa", "长野": "Nagano", "仙台": "Sendai", "广岛": "Hiroshima", "冲绳·那霸": "Okinawa · Naha", "当前位置": "Current location", "。": ".",
    "选城市或当前位置 · 看详细预报": "Choose a city or your location · Detailed forecast",
    "日本天气预报": "Japan weather forecast", "选一座城市，或定位到你现在的位置，直接看天气变化。": "Choose a city or use your location to see the forecast here.",
    "想查哪里？": "Where to check?", "选城市": "Choose a city", "📍 当前的位置": "📍 Current location",
    "点“当前位置”才会请求定位；查询时会向天气服务发送约 1 公里精度的位置。": "Location is requested only when tapped. Approximate coordinates are sent to the forecast service.",
    "选择城市后就能看到未来几天的预报。": "Choose a city to see the coming days.",
    "接下来 24 小时": "Next 24 hours", "未来几天": "Coming days", "多云": "Cloudy", "晴间多云": "Partly cloudy", "晴朗": "Sunny", "下雨": "Rain", "下雪": "Snow", "雷雨": "Thunderstorms", "有雾": "Fog", "天气变化": "Variable weather",
    "天气是预报，不是实时实测；山区、海边和雪场可能与市中心不同。数据来自 ": "Forecast, not live observations. Mountains, coasts and ski areas can differ from city centers. Data from ",
    "，本站翻译并整理展示。遇到台风、大雨等情况，请再查": ", translated and organized by this site. For typhoons or heavy rain, also check ", "日本气象厅警报": "JMA weather warnings",
    "调整首页常用工具": "Customize home shortcuts", "点“放前面”即可替换首页最后一项；只保存在你这台设备。": "Move an item to the front six by replacing the last one. Saved on this device only.",
    "往前移": "Move up", "放前面": "Show in front", "已置顶": "First", "在更多里": "Under More", "恢复默认顺序": "Restore default order",
    "当前位置不在日本范围内，请选城市查询。": "Current location is outside Japan. Choose a city.",
    "此浏览器不支持定位，请选城市查询。": "This browser cannot locate you. Choose a city.",
    "没有取得定位，请允许定位，或直接选城市查询。": "Location unavailable. Allow access or choose a city.",
    "正在获取你的位置…": "Getting your location…", "暂时取不到天气，请稍后重试；遇到恶劣天气请以日本气象厅警报为准。": "Forecast unavailable. Retry later, and check JMA warnings for severe weather."
  });

  const originals = new WeakMap();
  const originalAttributes = new WeakMap();
  const requestedLanguage = new URLSearchParams(location.search).get("lang");
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  let currentLanguage = supported.has(requestedLanguage) ? requestedLanguage : supported.has(savedLanguage) ? savedLanguage : "zh-Hans";

  function toTraditional(text) {
    let output = text;
    phraseMap.forEach(([from, to]) => { output = output.split(from).join(to); });
    return Array.from(output, character => charMap[character] || character).join("");
  }

  function toEnglish(text) {
    const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const leading = match ? match[1] : "";
    const core = match ? match[2] : text;
    const trailing = match ? match[3] : "";
    let translated = englishMap[core];
    if (!translated) {
      const networkHint = core.match(/^(.*?)(?: · |。)(可能需要当地网络(?:才能打开哦！)?|需要当地网络(?:才能打开哦！)?)(。?)$/);
      if (networkHint) {
        const base = englishMap[networkHint[1]] || englishMap[`${networkHint[1]}。`];
        if (base) translated = `${base} · ${networkHint[2].startsWith("可能") ? "May need local network access" : "Local network access needed"}`;
      }
    }
    if (!translated) {
      translated = core
        .replace(/东京/g, "Tokyo").replace(/大阪/g, "Osaka").replace(/京都/g, "Kyoto").replace(/札幌/g, "Sapporo").replace(/函馆/g, "Hakodate").replace(/名古屋/g, "Nagoya").replace(/横滨/g, "Yokohama").replace(/神户/g, "Kobe").replace(/奈良/g, "Nara").replace(/金泽/g, "Kanazawa").replace(/长野/g, "Nagano").replace(/仙台/g, "Sendai").replace(/广岛/g, "Hiroshima").replace(/福冈/g, "Fukuoka").replace(/长崎/g, "Nagasaki").replace(/冲绳·那霸/g, "Okinawa · Naha").replace(/当前位置/g, "Current location")
        .replace(/^正在查询(.+)的天气预报…$/, "Loading forecast for $1…")
        .replace(/^(.+) · (\d\d:\d\d) 预报$/, "$1 · $2 forecast")
        .replace(/^气温 (.+)°C$/, "Temperature $1°C")
        .replace(/^接下来 1 小时降水 (.+) mm$/, "Rain next hour $1 mm")
        .replace(/^风速 (.+) m\/s$/, "Wind $1 m/s")
        .replace(/^湿度 (.+)%$/, "Humidity $1%")
        .replace(/^数据更新时间：(.+)（日本时间）$/, "Updated: $1 (Japan time)")
        .replace(/^首页第 (\d+) 个$/, "Home #$1")
        .replace(/周一/g, " Mon").replace(/周二/g, " Tue").replace(/周三/g, " Wed").replace(/周四/g, " Thu").replace(/周五/g, " Fri").replace(/周六/g, " Sat").replace(/周日/g, " Sun")
        .replace(/晴间多云/g, "Partly cloudy").replace(/多云/g, "Cloudy").replace(/晴朗/g, "Sunny").replace(/下雨/g, "Rain").replace(/下雪/g, "Snow").replace(/雷雨/g, "Thunderstorms").replace(/有雾/g, "Fog")
        .replace(/^翻到「(.+)」！附近没有？我命由我不由天，再来！$/, "Landed on “$1”! Nothing nearby? My choice—spin again!")
        .replace(/^已收藏 (\d+)$/, "Saved $1")
        .replace(/^找到 (\d+) 个 · 显示最近 (\d+) 个$/, "Found $1 · Showing nearest $2")
        .replace(/^正在查找周围 ([\d.]+) 公里的厕所…$/, "Searching for toilets within $1 km…")
        .replace(/^已定位：周围 ([\d.]+) 公里$/, "Located · Within $1 km")
        .replace(/^坐标 (.+)$/, "Coordinates $1")
        .replace(/^选好了：(.+)$/, "Selected: $1")
        .replace(/^约 (\d+) 米$/, "About $1 m")
        .replace(/^提醒：(.+)$/, "Note: $1")
        .replace(/^目的地：(.+)$/, "Destination: $1")
        .replace(/^(.+) 豚在这台手机$/, "$1 · Saved on this device")
        .replace(/^已切换到(.+)$/, "Switched to $1")
        .replace(/^(.+)，怎么找？$/, "How would you like to find $1?")
        .replace(/^(.+)，用哪个地图？$/, "Which map for $1?")
        .replace(/^(.+)正在整理$/, "$1 · Coming soon")
        .replace(/米$/, " m")
        .replace(/公里$/, " km");
    }
    return leading + translated + trailing;
  }

  function translate(text) {
    if (currentLanguage === "zh-Hant") return toTraditional(text);
    if (currentLanguage === "en") return toEnglish(text);
    return text;
  }

  function shouldSkip(node) {
    const parent = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    return !parent || parent.closest("script, style, [data-no-i18n], [lang='ja']");
  }

  function rememberAttribute(element, name) {
    let saved = originalAttributes.get(element);
    if (!saved) {
      saved = {};
      originalAttributes.set(element, saved);
    }
    if (!(name in saved)) saved[name] = element.getAttribute(name);
    return saved[name];
  }

  function translateNode(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      if (shouldSkip(root) || !root.data.trim()) return;
      if (!originals.has(root)) originals.set(root, root.data);
      const source = originals.get(root);
      root.data = translate(source);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && shouldSkip(root)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walker.nextNode())) translateNode(textNode);
    const elements = root.nodeType === Node.ELEMENT_NODE ? [root, ...root.querySelectorAll("*")] : [...document.querySelectorAll("*")];
    elements.forEach(element => {
      if (shouldSkip(element)) return;
      ["placeholder", "aria-label", "title", "content", "alt"].forEach(name => {
        if (!element.hasAttribute(name)) return;
        const source = rememberAttribute(element, name);
        element.setAttribute(name, translate(source));
      });
    });
  }

  const observer = new MutationObserver(mutations => {
    observer.disconnect();
    mutations.forEach(mutation => {
      if (mutation.type === "characterData") originals.set(mutation.target, mutation.target.data);
      mutation.addedNodes.forEach(node => translateNode(node));
      if (mutation.type === "characterData") translateNode(mutation.target);
    });
    observe();
  });

  function observe() {
    observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });
  }

  function setLanguage(language) {
    currentLanguage = supported.has(language) ? language : "zh-Hans";
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    observer.disconnect();
    translateNode(document);
    document.documentElement.lang = currentLanguage === "zh-Hant" ? "zh-Hant" : currentLanguage === "en" ? "en" : "zh-CN";
    const select = document.querySelector("#languageSelect");
    if (select) select.value = currentLanguage;
    observe();
  }

  const select = document.querySelector("#languageSelect");
  if (select) select.addEventListener("change", event => setLanguage(event.target.value));
  setLanguage(currentLanguage);
  window.HeituI18n = { setLanguage, getLanguage: () => currentLanguage };
})();
