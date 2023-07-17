chrome.tabs.onUpdated.addListener(async function (tabId, info) {
    const activeTab = await getActiveTab();

    if (info.status === 'complete') {
        await chrome.tabs.sendMessage(activeTab.id, {greeting: "dark"})
    }
});

async function getActiveTab() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}


