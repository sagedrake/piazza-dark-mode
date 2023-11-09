let mode;

chrome.storage.local.get(["mode"]).then((result) => {
    if (result.mode === "DARK") {
        mode = "DARK";
    } else {
        mode = "LIGHT"
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "mode setting please") {
            sendResponse({farewell: mode});
        } else if (request.greeting === "set light") {
            mode = "LIGHT";
            sendResponse({farewell: "done"});
        } else if (request.greeting === "set dark") {
            mode = "DARK"
            sendResponse({farewell: "done"});
        }
    }
);

// Send message to content-script.js when any tab is updated
chrome.tabs.onUpdated.addListener(async function (tabId, info) {
    const activeTab = await getActiveTab();
    const correctTab = activeTab.url.includes("piazza.com")
        && (activeTab.url.includes("class")
            || activeTab.url.includes("resources")
            || activeTab.url.includes("info")
            || activeTab.url.includes("staff")
            || activeTab.url.includes("account_settings"));

    if (info.status === 'complete' && correctTab) {
        await chrome.tabs.sendMessage(activeTab.id, {greeting: "page loaded"})
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


