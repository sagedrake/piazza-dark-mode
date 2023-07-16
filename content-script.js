function addListeners() {
    // wait 1 second, then add event listeners to elements that will open editing panes when clicked
    // the 1-second delay is needed because these elements might not exist until some milliseconds after the site loads
    setTimeout( function() {
        if (document.getElementById('s_answerPlaceholderId') != null) {
            document.getElementById('s_answerPlaceholderId').addEventListener("mousedown", clicked);
        }
        if (document.getElementById('followup-box') != null) {
            document.getElementById('followup-box').addEventListener("mousedown", clicked);
        }
        let replyButtons = document.querySelectorAll('input[data-id^="followup_reply_id"]');
        replyButtons.forEach(function(button) {
            button.addEventListener('mousedown', clicked);
        });
    }, 1000)
}

chrome.storage.local.get(["mode"]).then( (result) => {
    // set toggle to be initially on if mode is currently set to DARK
    if (result.mode === "DARK") {
        addListeners();
    }
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "dark") {
            setTimeout(function() {
                darkenEditingPanes();
            }, 100);
            setTimeout(function() {
                darkenEditingPanes();
            }, 1000);
            sendResponse({farewell: "goodbye"});
        }
    }
);

function clicked() {
    setTimeout(function() {
        darkenEditingPanes();
    }, 100);
    setTimeout(function() {
        darkenEditingPanes();
    }, 1000);
}

function darkenEditingPanes() {
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL("editingPaneStyling.css");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";

    if (document.getElementById('s_answer_edit_ifr') != null) {
        document.getElementById('s_answer_edit_ifr').contentWindow.document.head.appendChild(cssLink);
    }

    if (document.getElementById('create_post_edit_ifr') != null) {
        document.getElementById('create_post_edit_ifr').contentWindow.document.head.appendChild(cssLink);
    }

    if (document.getElementById('create_followup_ifr') != null) {
        document.getElementById('create_followup_ifr').contentWindow.document.head.appendChild(cssLink);
    }

    let replyEditors = document.querySelectorAll('[id^="create_followup_reply_"][id$="_ifr"]');
    replyEditors.forEach(function(editor) {
        editor.contentWindow.document.head.appendChild(cssLink);
    });
}