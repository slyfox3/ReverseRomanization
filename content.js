const stringMapping = {
  "CHANG Chih Hsuan": "張芷瑄",
  "CHANG Hsin Yu": "章心宥",
  "CHANG Jung Lin": "張榮麟",
  "CHANG Ming Hsiung": "張明雄",
  "CHANG Pei Wei": "張裴瑋",
  "CHANG Tzu Chien": "張子謙",
  "CHANG YI": "張翼",
  "CHANG Yu Lung": "張玉龍",
  "CHANG Yu Yuan": "章又元",
  "CHAO Fong Pang": "趙豐邦",
  "CHEN Chia Hua": "陳佳樺",
  "CHEN Hsin Ting": "陳信廷",
  "CHEN Pin Lin": "陳品霖",
  "CHEN Ying Chieh": "陳英傑",
  "CHENG Shun Yang": "鄭舜陽",
  "CHIANG Shui Ching": "江水淨",
  "CHIEN Bo Chun": "簡伯鈞",
  "CHIU Chun Yuan": "邱俊元",
  "CHIU Po Han": "邱柏翰",
  "CHIU Wei Yu": "施威宇",
  "CHOU Chia Chia": "周家嘉",
  "CHOU Chia Lin": "周家麟",
  "CHOU Chieh Yu": "周婕妤",
  "CHU Hung Ming": "朱宏銘",
  "CHUANG Yaw Lin": "莊曜霖",
  "FANG Hsiao Lang": "方小郎",
  "FU Che Wei": "傅哲偉",
  "HSIEH Chia Chen": "謝佳臻",
  "HSIEH Shang Yu": "謝尚諭",
  "HSU Jui An": "許睿安",
  "HSU Shih Wei": "許世瑋",
  "HSUEH Wen Chang": "薛文章",
  "HUANG Wei Lun": "黃唯綸",
  "JIANG Xin Xing": "江信興",
  "KAO shun yang": "高舜暘",
  "KO Pin Yi": "柯秉逸",
  "KO Ping Chung": "柯秉中",
  "KO Ping Han": "柯秉漢",
  "KUO Chun Nan": "郭俊男",
  "KUO Hsuan Wei": "郭玄偉",
  "KUO Po Cheng": "郭柏成",
  "Kazuo FURUTA": "古田和男",
  "LAI Ming Huan": "賴明煥",
  "LAI Wei Qi": "賴瑋棋",
  "LEE Kun Fang": "李昆芳",
  "LEE Wei Jen": "李維仁",
  "LIAO Hung Yen": "廖泓雁",
  "LIAO Ying Kai": "廖英凱",
  "LIEN Chih Wei": "連治瑋",
  "LIN Chao Tse": "林肇則",
  "LIN Cheng Yen": "林承諺",
  "LIN Huang Kuei": "林煌貴",
  "LIN Jia Zheng": "林家正",
  "LIN Mei Wen": "林媺玟",
  "LIN Shih Kai": "林詩凱",
  "LIN Ta Li": "林達理",
  "LIN Tsung Han": "林宗翰",
  "LIU Cheng Hsiung": "劉正雄",
  "LIU Chien Hung": "劉建弘",
  "LIU Chun Chuan": "劉峻銓",
  "LIU Ri Teng": "劉日騰",
  "LIU Shin Mei": "柳信美",
  "LIU Yun Cheng": "劉運程",
  "LU Hui Chan": "呂輝展",
  "LIU SHAO CHIANG": "劉少強",
  "SHAO Yu Hsin": "邵育鑫",
  "SUN Yi Hsuan": "孫翌軒",
  "TAI Chi Hsiang": "戴啟祥",
  "TANG Ching Ting": "唐境霆",
  "TSAI Pei Chun": "蔡佩君",
  "WANG Chi Sheng": "王志聖",
  "WANG Chih Yung": "王智勇",
  "WANG Ching Feng": "王清鋒",
  "WANG Chuan Min": "王權敏",
  "WANG Hung Hsiang": "王泓翔",
  "WU Cheng Lin": "吳政霖",
  "WU Kun Lin": "吳坤霖",
  "YANG Dong Yu": "楊東裕",
  "YANG Gong Hao": "楊恭豪",
  "YE Chun Hung": "葉峻宏",
  "YU Li Si": "余豊熙",
  "ZENG Huan Zhong": "曾煥中",
  "ZHUANG Zhi Yu": "莊智宇",
  "Zheng Sen": "鄭森",
};

function replaceAll(searchText, replaceAll) {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  let find = new RegExp(searchText, "i");
  while ((node = treeWalker.nextNode())) {
    node.nodeValue = node.nodeValue.replace(find, replaceAll);
  }
}

function workImpl() {
  for (const [key, value] of Object.entries(stringMapping)) {
    replaceAll(key, value);
  }
}

function delayedWork(delay_sec) {
  setTimeout(() => {
    console.log("After sleep");
    workImpl();
  }, delay_sec * 1000);
}

document.addEventListener("mouseup", function (event) {
  console.log("clicked!");
  delayedWork(1);
});

window.addEventListener("load", function (event) {
  console.log("Page fully loaded!");
  delayedWork(4);
});
