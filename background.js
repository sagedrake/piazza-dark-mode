chrome.tabs.onUpdated.addListener(async function (tabId, info) {
    if (info.status === 'loading') {

        const activeTab = await getActiveTab();

        if (activeTab.url.includes("piazza.com")) {
            chrome.storage.local.get(["mode"]).then((result) => {

                // set toggle to be initially on if mode is currently set to DARK
                if (result.mode === "DARK") {
                    darken(activeTab);
                }
            });
        }
    }
});


chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    const activeTab = await getActiveTab();
    if (message === 'darken') {
        await darken(activeTab);
    }
    if (message === 'lighten') {
        await lighten(activeTab);
    }
    sendResponse({ status: "done" });
    return true;
});


async function darken(activeTab) {
    // remove css file if it's already been inserted, which prevents the file from being inserted multiple times
    // this is necessary because chrome.tabs.onUpdated sometimes fires multiple times in a row
    await chrome.scripting.removeCSS({
        files: ['darkStyling.css'],
        target: {tabId: activeTab.id}
    });

    await chrome.scripting.insertCSS({
        files: ['darkStyling.css'],
        target: {tabId: activeTab.id}
    });
}

async function lighten(activeTab) {
    await chrome.scripting.removeCSS({
        files: ['darkStyling.css'],
        target: {tabId: activeTab.id}
    });
}

async function getActiveTab() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}


