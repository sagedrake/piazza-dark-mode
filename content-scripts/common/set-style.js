const COMMON_STYLESHEET_NAME = "commonCSS";
const commonCssLink = document.createElement("link");
// this stylesheet styles elements that are common among Piazza pages
commonCssLink.href = chrome.runtime.getURL("stylesheets/common-page-elements.css");
commonCssLink.rel = "stylesheet";
commonCssLink.type = "text/css";
commonCssLink.id = COMMON_STYLESHEET_NAME;

// initialize dark/light style when common-page-elements.js is first run
initializeStyle().catch(console.log);

function darken() {
	// add stylesheet if it is not present already
	if (document.getElementById(COMMON_STYLESHEET_NAME) === null) {
		document.documentElement.appendChild(commonCssLink);
	}
	// each page-specific js file has its own version of darkenPageSpecificElements() that should be called if it exists
	if (typeof darkenPageSpecificElements === "function") {
		darkenPageSpecificElements();
	}
}

function lighten() {
	const commonCssLink = document.getElementById(COMMON_STYLESHEET_NAME);
	if (commonCssLink) {
		document.documentElement.removeChild(commonCssLink);
	}

	// each page-specific js file has its own version of lightenPageSpecificElements() that should be called if it exists
	if (typeof lightenPageSpecificElements === "function") {
		lightenPageSpecificElements();
	}
}

// start in dark mode if saved setting is DARK, or start in light mode if saved setting is LIGHT
async function initializeStyle() {
	chrome.storage.local.get(["mode"]).then((result) => {
		if (result.mode === "DARK") {
			darken();
		} else if (result.mode === "LIGHT") {
			// do nothing since page is light by default
		} else {
			// if result.mode has not been set, default to dark mode
			chrome.storage.local.set({ mode: "DARK" }).then(() => {});
			darken();
		}
	});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log("received message from service worker");
	if (request.greeting === "lighten") {
		lighten();
		sendResponse({ farewell: "lightened" });
	}
	if (request.greeting === "darken") {
		darken();
		sendResponse({ farewell: "darkened" });
	}
});
