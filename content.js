const stringMapping = {
  "CHANG Jung Lin": "張榮麟",
  "CHANG Ming Hsiung": "張明雄",
  "CHANG Pei Wei": "張裴瑋",
  //"CHANG Tzu Chien": "",
  "CHANG YI": "張毅",
  "CHANG Yu Lung": "張玉龍",
  //"CHANG Yu Yuan": "",
  "CHAO Fong Pang": "趙豐邦",
  "CHEN Chia Hua": "陳佳樺",
  "CHEN Hsin Ting": "陳信廷",
  //"CHEN Pin Lin": "",
  "CHEN Ying Chieh": "陳英傑",
  "CHENG Shun Yang": "鄭舜陽",
  //"CHIANG Hsin Hsing": "",
  "Chiang Shui Ching": "江水淨",
  //"CHIEN Bo Chun": "",
  //"Chiu Chun Yuan": "",
  //"CHIU Po Han": "",
  //"CHOU Chia Chia": "",
  //"CHOU Chia Lin": "",
  "CHOU Chieh Yu": "周婕妤",
  "CHU Hung Ming": "朱宏銘",
  //"CHUANG Yaw Lin": "",
  "FANG Hsiao Lang": "方小郎",
  "FU Che Wei": "傅哲偉",
  "HSIEH Chia Chen": "謝佳臻",
  "HSIEH Shang Yu": "謝尚諭",
  "HSU Jui An": "許睿安",
  //"HSU Shih Wei": "",
  "HSUEH Wen Chang": "薛文章",
  //"HUANG Wei Lun": "",
  //"KAO shun yang": "",
  "KO Pin Yi": "柯秉逸",
  "KO Ping Chung": "柯秉中",
  "KO Ping Han": "柯秉漢",
  //"KUO Chun Nan": "",
  "KUO HSUAN WEI": "郭玄偉",
  "KUO Po Cheng": "郭柏成",
  //"LAI Ming Huan": "",
  //"LAI Wei Qi": "",
  "LEE Kun Fang": "李昆芳",
  //"LEE Wei Jen": "",
  //"LIAO Hung Yen": "",
  //"LIAO Ying Kai": "",
  "LIEN Chih Wei": "連治瑋",
  "LIN Chao Tse": "林肇則",
  //"LIN Cheng Yen": "",
  //"LIN Huang Kuei": "",
  //"LIN Jia Zheng": "",
  //"Lin Mei Wen": "",
  "LIN Shih Kai": "林詩凱",
  "LIN Ta Li": "林達理",
  "LIN Tsung Han": "林宗翰",
  //"Liu Cheng Hsiung": "",
  "LIU Chien Hung": "劉建弘",
  "LIU Chun Chuan": "劉峻銓",
  "LIU Ri Teng": "劉日騰",
  "LIU SHAO CHIANG": "劉少強",
  "LIU Shin Mei": "柳信美",
  "LIU Yun Cheng": "劉運程",
  "LU Hui Chan": "呂輝展",
  //"SHAO Yu Hsin": "",
  //"SHIH Wei Yu": "",
  "SUN Yi Hsuan": "孫翌軒",
  //"TAI Chi Hsiang": "",
  "TANG Ching Ting": "唐境霆",
  "TSAI Pei Chun": "蔡佩君",
  //"WANG Chi Sheng": "",
  "WANG Chih Yung": "王智勇",
  "WANG Ching Feng": "王清鋒",
  //"WANG Chuan Min": "",
  "WANG Hung Hsiang": "王泓翔",
  "WU Cheng Lin": "吳政霖",
  "WU Kun Lin": "吳坤霖",
  //"YANG Dong Yu": "",
  "YANG Gong Hao": "楊恭豪",
  //"Ye Chun Hung": "",
  "YU Li Si": "余豊熙",
  //"ZENG Huan Zhong": "",
  //"Zheng Sen": "",
  "Zhuang Zhi Yu": "莊智宇",
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
