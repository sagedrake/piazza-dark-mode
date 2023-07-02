document.addEventListener('DOMContentLoaded', async () => {
    const dialogBox = document.getElementById('dialog-box');
    const activeTab = await getActiveTab();

    if (activeTab.url.includes("piazza.com")) {
    } else {
        dialogBox.innerHTML = 'This is not Piazza';
        document.getElementById("sun").style.display = 'none';
        document.getElementById("moon").style.display = 'none';
        document.getElementById("toggle").style.display = 'none';
    }
});

document.getElementById("toggleSwitch").addEventListener("click", darken);

async function darken() {
    let activeTab = await getActiveTab();
    console.log(activeTab.id);

    if (document.getElementById("toggleSwitch").checked === true) {
        await chrome.scripting.insertCSS({
            files: ['darkStyling.css'],
            target: {tabId: activeTab.id}
        });
    } else {
        await chrome.scripting.removeCSS({
            target: { tabId: activeTab.id},
            files: ['darkStyling.css']
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








