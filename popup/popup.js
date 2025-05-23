let input = document.getElementById("siteInput");
let addButton = document.getElementById("addButton");
let siteList = document.getElementById("siteList");

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

  const domain = newInput
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
  chrome.storage.local.get("blocked", (data) => {
    let domains = data.blocked || [];
    if (!domains.includes(domain)) {
      domains.push(domain);
      chrome.storage.local.set({ blocked: domains }, () => {
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
