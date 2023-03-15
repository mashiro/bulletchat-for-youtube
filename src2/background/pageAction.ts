export function pageAction() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url != null) {
      if (tab.url.match(/^https:\/\/www\.youtube\.com\//)) {
        chrome.pageAction.show(tabId)
      }
    }
  })
}
