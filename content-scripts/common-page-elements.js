let mode;

const commonCssLink = document.createElement("link");
commonCssLink.href = chrome.runtime.getURL("stylesheets/common-page-elements.css");
commonCssLink.rel = "stylesheet";
commonCssLink.type = "text/css";
commonCssLink.id = "commonCSS";

console.log("initialize");
// initialize dark/light style when common-page-elements.js is first run
initializeStyle();

function darken() {
    darkenPageSpecificElements();

    document.documentElement.appendChild(commonCssLink);
}

function lighten() {
    lightenPageSpecificElements();

    const commonCssLink = document.getElementById("commonCSS");
    document.documentElement.removeChild(commonCssLink);
}

// start in dark mode if saved setting is DARK, or start in light mode if saved setting is LIGHT
async function initializeStyle() {
    chrome.storage.local.get(["mode"]).then((result) => {
        if (result.mode === "DARK") {
            darken();
            mode = "DARK";
        } else {
            mode = "LIGHT"
        }
    });
}


function changeMode() {
    console.log("mode: " + mode);
    if (mode === "DARK") {
        lighten();
        document.getElementById("change_mode_image").src = chrome.runtime.getURL("images/moon.png");
        mode = "LIGHT";
        chrome.storage.local.set({ mode: "LIGHT" }).then(() => {
        });
    } else if (mode === "LIGHT") {
        darken();
        document.getElementById("change_mode_image").src = chrome.runtime.getURL("images/sun.png");
        mode = "DARK";
        chrome.storage.local.set({ mode: "DARK" }).then(() => {
        });
    }
}


// creates a button on the top bar to change between light and dark mode (iff the button doesn't already exist)
function createChangeModeButton() {
    // if the button already exists, return early instead of creating it
    if  (document.getElementById("change_mode") != null) {
        return;
    }
    const changeModeContainer = document.createElement("div");
    changeModeContainer.id = "change_mode";

    const changeModeButton = document.createElement("button");
    changeModeButton.className = "btn btn-primary"
    changeModeButton.type="button";
    changeModeButton.id = "change_mode_button";
    changeModeButton.style.padding = "5px 5px 5px 5px"
    changeModeButton.addEventListener("mousedown", changeMode);

    const changeModeImage = document.createElement("img");
    changeModeImage.height = 25
    changeModeImage.margin = "auto";
    changeModeImage.id = "change_mode_image";
    if (mode === "DARK") {
        changeModeImage.src = chrome.runtime.getURL("images/sun.png");
    } else {
        changeModeImage.src = chrome.runtime.getURL("images/moon.png");
    }

    changeModeButton.appendChild(changeModeImage);
    changeModeContainer.appendChild(changeModeButton);
    const topBar = document.getElementById("topbar");
    const topBarChild = document.getElementById("userAccountBlockId");
    topBar.insertBefore(changeModeContainer, topBarChild);
}

// when message from background script is received, it means the page has completed loading
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // button on top bar to change between light/dark mode can only be added after the page has finished loading
        //    because this is when the top bar is guaranteed to exist
        if (request.greeting === "page loaded") {
            createChangeModeButton();
        }
        sendResponse({farewell: "goodbye"});
    }
);
