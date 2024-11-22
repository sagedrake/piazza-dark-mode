const cssLink = document.createElement("link");
cssLink.href = chrome.runtime.getURL("stylesheets/settings.css");
cssLink.rel = "stylesheet";
cssLink.type = "text/css";
cssLink.id = "q&aCSS";

// add dark stylesheet as child to document
function darkenPageSpecificElements() {
	document.documentElement.appendChild(cssLink);
}

// remove dark stylesheet
function lightenPageSpecificElements() {
	document.documentElement.removeChild(cssLink);
}
