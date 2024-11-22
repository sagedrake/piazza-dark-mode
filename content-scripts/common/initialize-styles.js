const commonCssLink = document.createElement("link");
commonCssLink.href = chrome.runtime.getURL("stylesheets/common-page-elements.css");
commonCssLink.rel = "stylesheet";
commonCssLink.type = "text/css";
commonCssLink.id = "commonCSS";

// initialize dark/light style when common-page-elements.js is first run
initializeStyle().catch(console.log);

function darken() {
	// each page-specific js file has its own version of darkenPageSpecificElements()
	darkenPageSpecificElements();

	document.documentElement.appendChild(commonCssLink);
}

function lighten() {
	// each page-specific js file has its own version of lightenPageSpecificElements()
	lightenPageSpecificElements();

	const commonCssLink = document.getElementById("commonCSS");
	document.documentElement.removeChild(commonCssLink);
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
