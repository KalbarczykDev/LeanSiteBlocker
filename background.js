chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("blocked", (data) => {
    let sites = data.blocked || [];

    let rules = [];
    for (let i = 0; i < sites.length; i++) {
      rules.push({
        id: i + 1,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: sites[i],
          resourceTypes: ["main_frame"],
        },
      });
    }

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((r) => r.id),
      addRules: rules,
    });
  });
});
