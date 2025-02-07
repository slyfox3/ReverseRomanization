document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  chrome.storage.sync.get(["mode"], (result) => {
    const storedMode = result.mode || "auto";
    document.getElementById(storedMode).checked = true;
  });

  form.addEventListener("click", () => {
    //TODO: maybe auto refresh webpage after click, instead of asking user to refresh
    const curMode = document.querySelector('input[name="mode"]:checked').value;
    console.log(curMode);
    chrome.storage.sync.set({ mode: curMode });
  });
});
