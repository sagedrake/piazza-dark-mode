createChangeModeButton();

function sendToServiceWorker(str) {
	console.log("sending message");
	chrome.runtime
		.sendMessage({ greeting: str })
		.then((response) => {
			console.log(response);
		})
		.catch((e) => {
			console.log(`Error when sending message from content script to service worker: ${e}`);
		});
}

function changeMode() {
	chrome.storage.local.get(["mode"]).then(async (result) => {
		if (result.mode === "DARK") {
			// send message to service worker which will forward the message to documents in iframes
			sendToServiceWorker("lighten");
			// call the lighten function in set-style.js
			lighten();
			document.getElementById("change_mode_image").src = chrome.runtime.getURL("images/moon.png");
			// persist the new mode selection
			chrome.storage.local.set({ mode: "LIGHT" }).then(() => {});
		} else if (result.mode === "LIGHT") {
			// send message to service worker which will forward the message to documents in iframes
			sendToServiceWorker("darken");
			// call the darken function in set-style.js
			darken();
			document.getElementById("change_mode_image").src = chrome.runtime.getURL("images/sun.png");
			// persist the new mode selection
			chrome.storage.local.set({ mode: "DARK" }).then(() => {});
		}
	});
}

// creates a button on the top bar to change between light and dark mode (if the button doesn't already exist)
function createChangeModeButton() {
	// if the button already exists, return early instead of creating it
	if (document.getElementById("change_mode") != null) {
		return;
	}
	const changeModeContainer = document.createElement("div");
	changeModeContainer.id = "change_mode";

	const changeModeButton = document.createElement("button");
	changeModeButton.className = "btn btn-primary";
	changeModeButton.type = "button";
	changeModeButton.id = "change_mode_button";
	changeModeButton.style.padding = "5px 5px 5px 5px";
	changeModeButton.addEventListener("mousedown", changeMode);

	const changeModeImage = document.createElement("img");
	changeModeImage.height = 25;
	changeModeImage.margin = "auto";
	changeModeImage.id = "change_mode_image";

	chrome.storage.local.get(["mode"]).then((result) => {
		if (result.mode === "DARK") {
			changeModeImage.src = chrome.runtime.getURL("images/sun.png");
		} else {
			changeModeImage.src = chrome.runtime.getURL("images/moon.png");
		}
	});

	changeModeButton.appendChild(changeModeImage);
	changeModeContainer.appendChild(changeModeButton);
	const topBar = document.getElementById("topbar");
	const topBarChild = document.getElementById("userAccountBlockId");
	topBar.insertBefore(changeModeContainer, topBarChild);
}
