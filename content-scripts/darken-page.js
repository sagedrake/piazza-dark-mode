function darkenPage() {
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL("stylesheets/all-piazza-pages.css");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    document.documentElement.appendChild(cssLink);
}

darkenPage();