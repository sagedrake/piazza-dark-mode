const cssLink = document.createElement("link");
cssLink.href = chrome.runtime.getURL("stylesheets/resources.css");
cssLink.rel = "stylesheet";
cssLink.type = "text/css";
cssLink.id = "q&aCSS"

// add dark stylesheet as child elements to document element
function darkenPageSpecificElements() {
    document.documentElement.appendChild(cssLink);
    console.log("darken");
}

// remove dark stylesheet
function lightenPageSpecificElements() {
    document.documentElement.removeChild(cssLink);
}