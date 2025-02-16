function buildRegex() {
  const ret = new Array(stringMapping.length);
  let i = 0;
  for (const [key, value] of Object.entries(stringMapping)) {
    ret[i] = [new RegExp(key, "i"), value];
    i++;
  }
  return ret;
}

// This is the core of the find-replace logic.
// The function take a field to search text in, iterates over all the
// reomanized name patterns, and returns the first match.
// The caller is responsible to carry out the acutal replace action.
// Note: if hover mode is on, we do the same thing to check all patterns
// when mouse "enters" a field. If the field contains a romanized name,
// the code "memorizes" that romanized name in the global variable, which
// will be used to be "reverted back" when the mouse focus leaves that field.
// Also, when the global variables are set, we don't check other patterns at all.
let hoverTempOriginal = null;
let hoverTempReplaced = null;
function maybeReplace(regexMapping, field, isHover = false) {
  const old = field;
  if (isHover && hoverTempReplaced) {
    let ret = [hoverTempReplaced, hoverTempOriginal];
    hoverTempReplaced = null;
    hoverTempOriginal = null;
    return ret;
  }

  for (const [regex, replacement] of regexMapping) {
    if (regex.test(field)) {
      if (isHover) {
        hoverTempOriginal = regex.source;
        hoverTempReplaced = replacement;
      }
      return [regex, replacement];
    }
  }
  return [null, null];
}

function replaceEntireTree(regexMapping) {
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
    [regex, repl] = maybeReplace(regexMapping, node.nodeValue);
    if (regex) {
      node.nodeValue = node.nodeValue.replace(regex, repl);
    }
  }
}

const regexMapping = buildRegex();
function workImpl() {
  console.log("BUSY");
  console.time("workImpl"); //start timer
  replaceEntireTree(regexMapping);
  console.timeEnd("workImpl"); // stop!
}

function delayedWork(delay_sec) {
  setTimeout(() => {
    workImpl();
  }, delay_sec * 1000);
}

function replaceHover(event, regexMapping) {
  if (event.target != null && event.target.childNodes.length > 0) {
    if (event.target.childNodes[0].nodeValue) {
      const isHover = true;
      [regex, repl] = maybeReplace(
        regexMapping,
        event.target.childNodes[0].nodeValue,
        isHover
      );
      event.target.childNodes[0].nodeValue =
        event.target.childNodes[0].nodeValue.replace(regex, repl);
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
        replaceHover(e, regexMapping);
      });

      document.addEventListener("mouseout", (e) => {
        replaceHover(e, regexMapping);
      });
      break;
    case "auto":
    default:
      enableMutationObserver();
  }
});
