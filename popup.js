let categories = {};
const boxes = document.querySelectorAll(".box");
setup();

function setup() {
  log("setup", "fn start");

  chrome.storage.sync.get(["data"], function (items) {
    log("setup", "chrome.storage.sync.get", JSON.stringify(items));
    try {
      categories = JSON.parse(items.data);
      boxes.forEach((box) => {
        box.checked = categories[box.id];
      });
    } catch {
      console.log("no storage exist");
    }
  });

  boxes.forEach((box) => {
    categories[box.id] = true;
    box.addEventListener("change", function (event) {
      categories[event.target.id] = box.checked;
    });
  });

  const submit = document.querySelector("#submit1");
  submit.addEventListener("click", SendData);

  const reset = document.querySelector("#reset");
  reset.addEventListener("click", () => {
    ResetSetAll(false);
  });

  const selectAll = document.querySelector("#selectAll");
  selectAll.addEventListener("click", () => {
    ResetSetAll(true);
  });

  function ResetSetAll(check) {
    for (var key in categories) {
      categories[key] = check;
    }
    boxes.forEach((box) => {
      box.checked = check;
    });
  }

  async function SendData() {
    log("[setup][SendData]", "fn start try7");

    chrome.storage.sync.set({ data: JSON.stringify(categories) }, () => {
      chrome.storage.local.get("yrmPolicy", function (data) {
        chrome.storage.local
          .set({ yrmPolicy: -1 * data.yrmPolicy })
          .then(() => {})
          .catch((e) => {
            console.log(e);
          });
      });
    });
  }
}

function onSetURL() {
  console.log("set uninstall URL");
}

function onError(error) {
  console.log(`Error: ${error}`);
}

let settingUrl = chrome.runtime.setUninstallURL(
  "https://docs.google.com/forms/d/e/1FAIpQLSfJN5uz5FHbQXzZ0DK2XhBytrnHDTxPdNljOSeZFsmFJQz4HA/viewform"
);
settingUrl.then(onSetURL, onError);

function log(fn = "notsent", data, data2 = "") {
  console.log(`[popup.js] function:[${fn}] data:[${data}] [${data2}]`);
}
