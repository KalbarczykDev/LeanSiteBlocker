# Lean Site Blocker 🔒

A minimalist bloatless Chrome extension that **instantly closes tabs**
when users try to visit blocked websites.

## Screenshot

![LeanSiteBlocker](https://github.com/user-attachments/assets/f73196e5-3eb6-4868-9348-61fd6ce4fc6d)

## Instalation
1. Follow standard steps for installing chrome extensions
[LeanSiteBlocker](https://chromewebstore.google.com/detail/mcgbmeofmblfiopcjphcbcjamdbipdcn?utm_source=item-share-cb)

## Local Development 
1. Clone the repository or download latest release.
2. Go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **“Load unpacked”**
5. Select the folder containing this project

## Usage

1. Click the extension icon in your browser toolbar
2. Type a domain like `youtube.com` or `facebook.com`
3. Click **Add**
4. Try to visit the site — it will **instantly close**

To remove a domain, click **Remove** next to it in the popup.

---

## How It Works

- The extension listens to tab updates using `chrome.tabs.onUpdated`
- If the URL matches a blocked domain, the tab is automatically closed
- All data is stored locally in `chrome.storage.local`

---
