console.log("background.js loaded11");

chrome.runtime.onInstalled.addListener(function () {
  console.log("Extension Installed.");
  chrome.storage.local
    .set({ yrmPolicy: 1 })
    .then(() => {
      console.log("--------sw.js----------");
    })
    .catch((e) => {
      console.log(e);
    });
});
