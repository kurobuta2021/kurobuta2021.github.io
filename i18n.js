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
    "简体": "简体", "繁體": "繁體", "选择语言": "Choose language", "语言切换": "Language", "主要导航": "Main navigation",
    "黑豚君 · 日本旅行工具箱": "Heitun · Japan Travel Toolbox",
    "黑豚的日本旅行工具箱": "Heitun's Japan Travel Toolbox",
    "离你最近的厕所、合法吸烟点、便利店，一个都别藏。": "Nearby toilets, legal smoking areas and convenience stores—all in one place.",
    "回到首页": "Back to home", "定位当前地区": "Locate current area", "定位当前区": "Locate me", "文": "文",
    "纯干货！！": "Only the useful stuff!", "当地人共享的宝藏工具，": "Local-approved travel tools,", "中文直达！": "made easy for you.",
    "日本吃喝拉撒": "Everyday Japan, made easier", "黑豚日本旅行": "Heitun Japan travel",
    "现在需要什么？": "What do you need now?", "随便O": "Find a toilet", "人有三急，附近厕所，": "When nature calls,", "随便屙！": "find one nearby!",
    "来一根": "Smoking spots", "找合法吸烟点": "Find legal smoking areas", "吸烟有害健康。": "Smoking is harmful to health.",
    "便利一下": "Convenience stores", "找附近便利店": "Find a nearby convenience store",
    "动漫原景地": "Anime locations", "找找附近出现过的动画场景": "Find anime scenes near you",
    "泡个汤": "Hot springs", "有纹身？优先找私汤": "Tattoo? Try a private bath", "附近日归温泉・私汤": "Nearby day-use onsen & private baths",
    "豚一下，以后用": "Save it for later", "收藏想去的地点 · 已收藏": "Save places you want to visit · Saved",
    "给日本人看": "Show to a local", "一键显示或复制日文": "Show or copy useful Japanese",
    "更多实用地图": "More useful maps", "网友共享情报": "Community-shared info",
    "渔具店": "Fishing tackle", "找附近的渔具店": "Find a nearby tackle shop",
    "扔一下": "Trash bins", "找附近公共垃圾桶 · 可定位": "Find nearby public trash bins · Location enabled",
    "地点由第三方用户共享，请以现场为准。": "Locations are shared by third-party users. Please verify on site.",
    "找黑豚": "Ask Heitun", "在日本遇到事，有需要再问我": "Need help in Japan? Ask me anytime", "给黑豚留言 →": "Message Heitun →",
    "本站负责中文整理和操作辅助；地点信息与实际服务由跳转后的第三方网站提供。": "This site organizes and explains the tools; location data and services are provided by the linked third-party sites.",
    "首页": "Home", "豚一下": "Saved", "竿": "Rod", "高": "A",
    "返回工具箱": "Back to toolbox", "‹ 返回工具箱": "‹ Back to toolbox", "返回": "Back", "‹ 返回": "‹ Back", "定位当前位置，查看附近厕所。": "Use your location to find nearby toilets.", "重新定位": "Relocate", "⌖ 重新定位": "⌖ Relocate",
    "正在准备定位…": "Preparing location…", "附近厕所地图": "Nearby toilet map", "离你最近": "Nearest to you", "等待定位": "Waiting for location",
    "搜索地图中心": "Search map center", "允许浏览器使用位置后，附近厕所会显示在这里。": "Allow location access to see nearby toilets here.",
    "地点来自 OpenStreetMap 社区数据，开放时间和设施可能变化，请以现场标识为准。": "Locations come from OpenStreetMap community data. Hours and facilities may change; check signs on site.",
    "附近厕所": "Nearby toilets", "公共厕所": "Public toilet", "黑豚君替你挑好用的服务": "Heitun has picked the most useful services",
    "在第三方服务里找到地点": "Find a place in a third-party service", "打开定位，点进你感兴趣的地点详情。": "Enable location and open the place details.",
    "复制地址或分享链接": "Copy the address or share link", "回来交给黑豚君，补上中文导航和收藏。": "Bring it back to Heitun for navigation and saving.",
    "黑豚君导航助手": "Heitun navigation helper", "粘贴地点，打开 Google／高德／Apple": "Paste a place and open Google, Amap or Apple",
    "直接给日本人看": "Show directly to a local", "🇯🇵 直接给日本人看": "🇯🇵 Show to a local",
    "粘贴地点名称、日文地址、坐标或分享链接。": "Paste a place name, Japanese address, coordinates or share link.",
    "目的地": "Destination", "例：渋谷駅前喫煙所\n或粘贴第三方网站分享链接": "Example: 渋谷駅前喫煙所\nor paste a share link",
    "从剪贴板粘贴": "Paste from clipboard", "清空": "Clear", "已准备导航": "Ready to navigate",
    "地图软件会根据文字或坐标再次确认地点": "Your map app will confirm the place using the text or coordinates",
    "Google 地图": "Google Maps", "高德地图": "Amap", "Apple 地图": "Apple Maps", "豚一下（收藏）": "Save this place", "🐽 豚一下（收藏）": "🐽 Save this place", "🇯🇵 给日本人看": "🇯🇵 Show to a local",
    "在日本通常优先推荐 Google Maps；高德对部分日本地点和步行路线的识别可能不完整。": "Google Maps is usually recommended in Japan. Amap may have fewer Japanese places and walking routes.",
    "选一句，把屏幕直接递给对方；左右滑动查看更多。": "Choose a phrase and show the screen to the other person. Swipe for more.",
    "常用日语": "Useful Japanese", "找厕所": "Find a toilet", "找吸烟点": "Find a smoking area", "请指地图": "Point on map", "怎么走": "Directions",
    "请结账": "The bill, please", "能刷卡吗": "Cards accepted?", "中文菜单": "Chinese menu", "寄存行李": "Store luggage", "不会日语": "No Japanese", "需要帮助": "Need help",
    "不好意思，请问厕所在哪里？": "Excuse me, where is the toilet?", "不好意思，请问最近的吸烟点在哪里？": "Excuse me, where is the nearest smoking area?",
    "请在地图上告诉我这个地方。": "Please show me this place on the map.", "不好意思，请问去这里怎么走？": "Excuse me, how can I get here?",
    "麻烦结账。": "The bill, please.", "可以使用信用卡吗？": "Can I pay by credit card?", "有中文菜单吗？": "Do you have a Chinese menu?",
    "可以帮我寄存行李吗？": "Could you store my luggage?", "我不会说日语，可以说慢一点吗？": "I don't speak Japanese. Could you speak slowly?", "不好意思，请帮帮我。": "Excuse me, please help me.",
    "播放日语": "Play Japanese", "🔊 播放日语": "🔊 Play Japanese", "复制日文": "Copy Japanese", "20岁以下不得进入吸烟区域，请以现场标识为准。": "People under 20 may not enter smoking areas. Follow on-site signs.",
    "我的收藏": "My saved places", "黑豚君帮你记在这台手机里。": "Saved on this device by Heitun.", "粘贴一个新地点": "Paste a new place", "＋ 粘贴一个新地点": "＋ Paste a new place",
    "不用登录。清除浏览器数据或更换手机后，收藏不会自动同步。": "No login needed. Saved places do not sync after clearing browser data or changing phones.",
    "在日本遇到事，": "Need something in Japan?", "跟我说说": "Tell me about it", "先聊需求，不下单、不付款。": "Chat first—no order or payment required.",
    "正在记录需求的黑豚君": "Heitun taking notes", "你需要什么？": "What do you need?", "包车／接送机": "Private car / airport transfer", "定制行程": "Custom itinerary",
    "餐厅预约": "Restaurant reservation", "其他需求": "Other request", "🚗 包车／接送机": "🚗 Private car / airport transfer", "🗺 定制行程": "🗺 Custom itinerary", "🍽 餐厅预约": "🍽 Restaurant reservation", "💬 其他需求": "💬 Other request", "这类需求，直接微信聊更快": "For this request, WeChat is faster",
    "微信号：zhangpeng816 · 复制后到微信搜索": "WeChat: zhangpeng816 · Copy and search in WeChat", "复制微信号": "Copy WeChat ID",
    "进群说一声": "Join the group and say hello", "微信扫码加入；二维码失效时请复制微信号联系。": "Scan with WeChat to join. If the QR code expires, copy the WeChat ID.",
    "准备什么时候来？": "When are you coming?", "准备去哪座城市？": "Which city are you visiting?", "东京": "Tokyo", "例：东京、京都、大阪": "Example: Tokyo, Kyoto, Osaka",
    "大概几个人？": "How many people?", "例：3人，2个大行李箱": "Example: 3 people, 2 large suitcases", "想让我帮你做什么？": "How can I help?",
    "简单说说时间、路线和特别需求": "Tell me the timing, route and special requests", "留言给黑豚": "Message Heitun", "复制咨询内容，去微信粘贴": "Copy request for WeChat",
    "也可以发邮件联系": "You can also email us", "写邮件": "Email", "复制邮箱": "Copy email", "邮箱联系方式": "Email contact", "邮箱已复制：kurobuta2021@gmail.com": "Email copied: kurobuta2021@gmail.com",
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
    "微信号已复制：zhangpeng816": "WeChat ID copied: zhangpeng816",
    "附近合法吸烟点": "Nearby legal smoking areas", "两个入口都直达地图；先看 CLUB JT，再用网友共享地图补充": "Both links open a map. Try CLUB JT first, then the community map for more places.",
    "CLUB JT 吸烟点地图": "CLUB JT smoking map", "第一推荐": "Top pick", "第二推荐": "Second pick",
    "JT 调查、用户投稿及餐厅资料结合；首次使用可能需要确认已满20岁并允许定位。需要当地网络才能打开哦！": "Combines JT research, user submissions and restaurant data. First use may require age and location confirmation. Requires local internet access.",
    "排在第一": "Start here", "直达地图": "Direct map", "日本全国": "Nationwide Japan", "吸烟区信息共享地图君": "Community smoking area map",
    "覆盖咖啡店、商场和公共吸烟区等详细信息，直接进入网页版地图。需要当地网络才能打开哦！": "Detailed listings for cafés, malls and public smoking areas. Opens the web map directly. Requires local internet access.",
    "详细补充": "Detailed coverage", "无需登录": "No login", "网友共享": "Community shared",
    "附近动漫原景地": "Nearby anime locations", "先用中文圣地地图看当前位置附近；想看更多场景和登场话数，再打开 OTABiS": "Start with Screen Pilgrimage for nearby places; open OTABiS for more scenes and episode details.",
    "圣地地图 Screen Pilgrimage": "Screen Pilgrimage map", "打开直接显示地图，支持简体中文、当前位置、作品搜索和路线整理。需要当地网络才能打开哦！": "Opens directly to a map with Simplified Chinese, current location, title search and route planning. Requires local internet access.",
    "简体中文": "Simplified Chinese", "可定位": "Location enabled", "约8970个地点": "About 8,970 locations", "OTABiS 动漫圣地巡礼地图": "OTABiS anime pilgrimage map",
    "点位更多，可查看场景、登场话数、路线与打卡；网页功能较多，以日文为主。需要当地网络才能打开哦！": "More locations with scene, episode, route and check-in details. Mostly Japanese. Requires local internet access.",
    "约14000个地点": "About 14,000 locations", "登场话数": "Episode details", "附近自动推荐": "Nearby suggestions",
    "先用 Google 地图找附近的日归温泉；需要私汤时，使用下面的专门入口。": "Use Google Maps for nearby day-use onsen, or the dedicated option below for private baths.",
    "找私汤／家庭浴池": "Find a private / family bath", "私汤（貸切浴場）通常可避开纹身限制，预约前请向店家确认；公共大浴场通常有限制，部分设施允许": "Private baths (貸切浴場) often avoid tattoo restrictions. Confirm before booking; public baths usually have restrictions, though some allow tattoos.",
    "日文搜索“日帰り温泉” · 不用住宿，泡完温泉就走 · 定位找附近最方便 · 需要当地网络才能打开哦！": "Search 日帰り温泉 · No overnight stay needed · Easy nearby search · Requires local internet access",
    "搜索“温泉” · 日本地点相对较少": "Search 温泉 · Fewer Japan listings", "有私汤不代表整家设施一定允许纹身；温泉规则可能变化，出发前请查看详情或向店家确认。": "A private bath does not mean the entire facility allows tattoos. Rules change; check details or ask before visiting.",
    "附近渔具店": "Nearby tackle shops", "选择常用地图，直接用日文“釣具店”搜索附近的渔具店。": "Choose a map and search the Japanese term 釣具店 for nearby tackle shops.",
    "日文搜索“釣具店” · 最方便 · 需要当地网络才能打开哦！": "Search 釣具店 · Most convenient · Requires local internet access", "搜索“渔具店” · 日本地点相对较少": "Search tackle shops · Fewer Japan listings",
    "在日本找渔具店建议优先使用 Google 地图；搜不到时可换其他地图。": "Google Maps is recommended for tackle shops in Japan. Try another map if needed."
  };

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
      translated = core
        .replace(/^已收藏 (\d+)$/, "Saved $1")
        .replace(/^找到 (\d+) 个 · 显示最近 (\d+) 个$/, "Found $1 · Showing nearest $2")
        .replace(/^正在查找周围 ([\d.]+) 公里的厕所…$/, "Searching for toilets within $1 km…")
        .replace(/^已定位：周围 ([\d.]+) 公里$/, "Located · Within $1 km")
        .replace(/^坐标 (.+)$/, "Coordinates $1")
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
      ["placeholder", "aria-label", "title", "content"].forEach(name => {
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
