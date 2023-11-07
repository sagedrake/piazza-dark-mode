// add dark stylesheets as child elements to document element
function darkenResourcesPage() {
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL("stylesheets/resources.css");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    document.documentElement.appendChild(cssLink);
}

darkenResourcesPage();