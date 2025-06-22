chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("blocked", (data) => {
    chrome.storage.local.set({ blocked: data.blocked || [] });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    chrome.storage.local.get("blocked", (data) => {
      const blockedSites = data.blocked || [];
      for (const site of blockedSites) {
        const url = new URL(changeInfo.url);
        if (url.hostname === site || url.hostname.endsWith(`.${site}`)) {
          chrome.tabs.remove(tabId);
          break;
        }
      }
    });
  }
});
