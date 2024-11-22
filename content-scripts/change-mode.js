createChangeModeButton();

function changeMode() {
	chrome.storage.local.get(["mode"]).then((result) => {
		if (result.mode === "DARK") {
			lighten();
			document.getElementById("change_mode_image").src = chrome.runtime.getURL("images/moon.png");
			chrome.storage.local.set({ mode: "LIGHT" }).then(() => {});
		} else if (result.mode === "LIGHT") {
			darken();
			document.getElementById("change_mode_image").src = chrome.runtime.getURL("images/sun.png");
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
