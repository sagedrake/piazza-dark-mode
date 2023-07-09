
document.addEventListener('DOMContentLoaded', async () => {

    const dialogBox = document.getElementById('dialog-box');
    const activeTab = await getActiveTab();

    if (activeTab.url.includes("piazza.com")) {
        chrome.storage.local.get(["mode"]).then((result) => {
            console.log("Value initially is " + result.mode);

            // set toggle to be initially on if mode is currently set to DARK
            if (result.mode === "DARK") {
                document.getElementById("toggleSwitch").checked = true;
            }
        });
    } else {
        dialogBox.innerHTML = 'This is not Piazza';
        document.getElementById("sun").style.display = 'none';
        document.getElementById("moon").style.display = 'none';
        document.getElementById("toggle").style.display = 'none';
    }
});

document.getElementById("toggleSwitch").addEventListener("click", changeMode);

async function changeMode() {
    let activeTab = await getActiveTab();

    if (document.getElementById("toggleSwitch").checked === true) {

        /*
        await chrome.scripting.insertCSS({
            files: ['darkStyling.css'],
            target: {tabId: activeTab.id}
        });
        */

        await chrome.tabs.sendMessage(activeTab.id, {greeting: "dark"});
        await chrome.runtime.sendMessage("darken");

        chrome.storage.local.set({ mode: "DARK" }).then(() => {
            console.log("Value is set to DARK");
        });

    } else {
        /*
        await chrome.scripting.removeCSS({
            target: { tabId: activeTab.id},
            files: ['darkStyling.css']
        });
        */
        await chrome.runtime.sendMessage("lighten");

        chrome.storage.local.set({ mode: "LIGHT" }).then(() => {
            console.log("Value is set to LIGHT");
        });
    }
}

async function getActiveTab() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}








