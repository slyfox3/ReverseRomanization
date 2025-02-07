function buildRegex() {
  const ret = new Map();
  for (const [key, value] of Object.entries(stringMapping)) {
    ret.set(new RegExp(key, "i"), value);
  }
  return ret;
}

function replaceAll(searchRegex, replaceText) {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = treeWalker.nextNode())) {
    if (node.nodeValue.length < 6) {
      // no one's name is this short
      // this reduces compute by almost 50%
      continue;
    }
    node.nodeValue = node.nodeValue.replace(searchRegex, replaceText);
  }
}

const regexMapping = buildRegex();
function workImpl() {
  console.time("workImpl"); //start timer
  for (const [key, value] of regexMapping) {
    replaceAll(key, value);
  }
  console.timeEnd("workImpl"); // stop!
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
