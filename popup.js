const input = document.getElementById("urlInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("blockList");

const updateRules = async (blockedSites) => {
  const rules = blockedSites.map((site, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: site,
      resourceTypes: ["main_frame"],
    },
  }));

  const ruleIds = rules.map((r) => r.id);

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ruleIds,
    addRules: rules,
  });
};

const renderList = (sites) => {
  list.innerHTML = "";
  sites.forEach((site, index) => {
    const li = document.createElement("li");
    li.textContent = site;
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.onclick = async () => {
      const newSites = sites.filter((_, i) => i !== index);
      await chrome.storage.local.set({ blocked: newSites });
      await updateRules(newSites);
      renderList(newSites);
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
};

addBtn.onclick = async () => {
  const url = input.value.trim();
  if (url) {
    chrome.storage.local.get("blocked", async (data) => {
      const blocked = data.blocked || [];
      if (!blocked.includes(url)) {
        const updated = [...blocked, url];
        await chrome.storage.local.set({ blocked: updated });
        await updateRules(updated);
        renderList(updated);
      }
    });
    input.value = "";
  }
};

chrome.storage.local.get("blocked", (data) => {
  const blocked = data.blocked || [];
  renderList(blocked);
});
