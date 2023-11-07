// add dark stylesheets as child elements to document element
function darkenStatsPage() {
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL("stylesheets/statistics.css");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    document.documentElement.appendChild(cssLink);
}

darkenStatsPage();