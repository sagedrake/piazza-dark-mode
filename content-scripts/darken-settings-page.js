// add dark stylesheets as child elements to document element
function darkenSettingsPage() {
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL("stylesheets/settings.css");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    document.documentElement.appendChild(cssLink);
}

darkenSettingsPage();