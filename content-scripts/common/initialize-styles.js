const commonCssLink = document.createElement("link");
commonCssLink.href = chrome.runtime.getURL("stylesheets/common-page-elements.css");
commonCssLink.rel = "stylesheet";
commonCssLink.type = "text/css";
commonCssLink.id = "commonCSS";

// initialize dark/light style when common-page-elements.js is first run
initializeStyle().catch(console.log);

function darken() {
	// this stylesheet styles elements that are common among Piazza pages
	document.documentElement.appendChild(commonCssLink);

	// each page-specific js file has its own version of darkenPageSpecificElements() that should be called if it exists
	if (typeof darkenPageSpecificElements === "function") {
		darkenPageSpecificElements();
	}
}

function lighten() {
	const commonCssLink = document.getElementById("commonCSS");
	document.documentElement.removeChild(commonCssLink);

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
