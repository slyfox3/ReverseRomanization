const stringMapping = {
  "arnie yuan": "同學一",
  "Colin SU": "同學二",
  "Shucheng Chao": "同學三",
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
