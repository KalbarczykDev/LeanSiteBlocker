let input = document.getElementById("siteInput");
let addButton = document.getElementById("addButton");
let siteList = document.getElementById("siteList");

function sanitizeDomain(rawInput) {
  return rawInput
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*/, "");
}

function makeRuleList(domains) {
  return domains.map((domain, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: `||${domain}`,
      resourceTypes: ["main_frame"],
    },
  }));
}

function updateBlockRules(domains) {
  const rules = makeRuleList(domains);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({ length: 1000 }, (_, i) => i + 1),
    addRules: rules,
  });
}

function showList(domains) {
  siteList.innerHTML = "";
  domains.forEach((domain, index) => {
    let li = document.createElement("li");
    li.textContent = domain;

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => {
      domains.splice(index, 1);
      chrome.storage.local.set({ blocked: domains }, () => {
        updateBlockRules(domains);
        showList(domains);
      });
    };

    li.appendChild(removeButton);
    siteList.appendChild(li);
  });
}

addButton.onclick = () => {
  let newInput = input.value.trim();
  if (newInput === "") return;

  const domain = sanitizeDomain(newInput);

  chrome.storage.local.get("blocked", (data) => {
    let domains = data.blocked || [];
    if (!domains.includes(domain)) {
      domains.push(domain);
      chrome.storage.local.set({ blocked: domains }, () => {
        updateBlockRules(domains);
        showList(domains);
      });
    }
    input.value = "";
  });
};

chrome.storage.local.get("blocked", (data) => {
  let domains = data.blocked || [];
  showList(domains);
});
