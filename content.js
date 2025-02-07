function replaceAll(searchText, replaceText) {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  let find = new RegExp(searchText, "i");
  while ((node = treeWalker.nextNode())) {
    node.nodeValue = node.nodeValue.replace(find, replaceText);
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

function replaceTargetText(event, searchText, replaceText) {
  if (event.target != null && event.target.childNodes.length > 0) {
    let nodeText = event.target.childNodes[0].nodeValue;
    if (nodeText != null && nodeText.includes(searchText)) {
      let find = new RegExp(searchText, "i");
      event.target.childNodes[0].nodeValue =
        event.target.childNodes[0].nodeValue.replace(find, replaceText);
    }
  }
}

chrome.storage.sync.get(["mode"], (result) => {
  switch (result.mode) {
    case "hover":
      document.addEventListener("mouseover", (e) => {
        for (const [origName, transName] of Object.entries(stringMapping)) {
          replaceTargetText(e, origName, transName);
        }
      });

      document.addEventListener("mouseout", (e) => {
        for (const [origName, transName] of Object.entries(stringMapping)) {
          replaceTargetText(e, transName, origName);
        }
      });
      break;
    case "auto":
    default:
      document.addEventListener("mouseup", function (event) {
        console.log("clicked!");
        delayedWork(0);
      });

      window.addEventListener("load", function (event) {
        console.log("Page fully loaded!");
        delayedWork(2);
      });
      break;
  }
});
