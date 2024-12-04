chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	if (request.greeting === "lighten") {
		sendResponse({ farewell: "lightening" });
	}
	if (request.greeting === "darken") {
		sendResponse({ farewell: "darkening" });
	}
});
