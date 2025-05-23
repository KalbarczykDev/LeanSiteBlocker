# Lean Site Blocker 🔒

A minimalist bloatless Chrome extension that **instantly closes tabs** when users try to visit blocked websites.

## Screenshot
![LeanSiteBlocker](https://github.com/user-attachments/assets/f73196e5-3eb6-4868-9348-61fd6ce4fc6d)


##  Installation

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **“Load unpacked”**
4. Select the folder containing this project

## Usage

1. Click the extension icon in your browser toolbar
2. Type a domain like `youtube.com` or `facebook.com`
3. Click **Add**
4. Try to visit the site — it will **instantly close** 

To remove a domain, click **Remove** next to it in the popup.

---

##  How It Works

- The extension listens to tab updates using `chrome.tabs.onUpdated`
- If the URL matches a blocked domain, the tab is automatically closed
- All data is stored locally in `chrome.storage.local`

---

