// Send message to content-script.js when any tab is updated
chrome.tabs.onUpdated.addListener(async function (tabId, info) {
    const activeTab = await getActiveTab();

    if (info.status === 'complete' && activeTab.url.includes("piazza.com")) {
        await chrome.tabs.sendMessage(activeTab.id, {greeting: "dark"})
    }
});

// Return the active tab
async function getActiveTab() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}


