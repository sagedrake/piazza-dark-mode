// add dark stylesheets as child elements to document element
function darkenQAndAPage() {
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL("stylesheets/q&a.css");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    document.documentElement.appendChild(cssLink);
}

darkenQAndAPage();