chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("blocked", async (data) => {
    const blocked = data.blocked || [];
    const rules = blocked.map((site, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: site,
        resourceTypes: ["main_frame"],
      },
    }));
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((r) => r.id),
      addRules: rules,
    });
  });
});
