function buildRegex() {
  const ret = new Array(stringMapping.length);
  let i = 0;
  for (const [key, value] of Object.entries(stringMapping)) {
    ret[i] = [new RegExp(key, "i"), value];
    i++;
  }
  return ret;
}

function replaceAll(regexMapping) {
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
    for (const [key, value] of regexMapping) {
      node.nodeValue = node.nodeValue.replace(searchRegex, replaceText);
    }
  }
}

const regexMapping = buildRegex();
function workImpl() {
  console.log("BUSY");
  console.time("workImpl"); //start timer
  replaceAll(regexMapping);
  console.timeEnd("workImpl"); // stop!
}

function delayedWork(delay_sec) {
  setTimeout(() => {
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

function enableMutationObserver() {
  tLastMutation = Date.now(); // reset
  const callback = (mutationList, observer) => {
    console.log(
      ` Delta t = ${Date.now() - tLastMutation} Number of mutations: ${
        mutationList.length
      }`
    );

    elapsed = Date.now() - tLastMutation;
    tLastMutation = Date.now();

    // empirically, these small mutations don't change useful content
    // there's a bunch of mutations of these sizes  when scrolling around
    if (
      mutationList.length <= 14 ||
      mutationList.length == 16 ||
      mutationList.length == 20
    ) {
      return;
    }

    // something over the network happened
    // also let some tiny data that's following slip in
    if (elapsed > 75) {
      console.log("Triggering delayed work");
      delayedWork(0.2);
    }
  };

  const config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: false,
    attributeOldValue: false,
    characterDataOldValue: false,
  };

  let observer = new MutationObserver(callback);
  observer.observe(document, config);
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
      enableMutationObserver();
  }
});
