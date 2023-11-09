// Run when message received from background.js, indicating that current tab was just updated
//       "Updated" include opened for the first time, reloaded, or URL changed
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        addListeners();

        setTimeout(function() {
            QAEditingPanes();
        }, 100);
        setTimeout(function() {
            QAEditingPanes();
        }, 1000);

        sendResponse({farewell: "goodbye"});
    }
);



// Add event listeners to elements that will open editing panes when clicked
function addListeners() {
    // wait 1 second, then add event listeners
    // the 1-second delay is needed because these elements might not exist until some milliseconds after the site loads
    setTimeout( function() {

        // it's necessary to know when these editing panes are created because they are html documents within iframes,
        //    and style tags must be added to them after creation in order to make their text white

        if (document.getElementById('s_answerPlaceholderId') != null) {
            document.getElementById('s_answerPlaceholderId').addEventListener("mousedown", editingPaneInitializerClicked);
        }
        if (document.getElementById('followup-box') != null) {
            document.getElementById('followup-box').addEventListener("mousedown", editingPaneInitializerClicked);
        }
        let replyButtons = document.querySelectorAll('input[data-id^="followup_reply_id"]');
        replyButtons.forEach(function(button) {
            button.addEventListener('mousedown', editingPaneInitializerClicked);
        });

        let editButtons = document.querySelectorAll('button[data-id="edit_button"]');
        editButtons.forEach(function(button) {
            button.addEventListener('click', editingPaneInitializerClicked);
        });

    }, 1000)
}

// Darken any editing panes that are open after a time delay
function editingPaneInitializerClicked() {
    // 100ms delay is so editing panes that load quickly will immediately have the right styling
    setTimeout(function() {
        QAEditingPanes();
    }, 100);
    // 1000ms delay is so editing panes that do not load quickly will also be styled correctly with some potential delay
    setTimeout(function() {
        QAEditingPanes();
    }, 1000);
}

// Darken any editing panes that are open
function QAEditingPanes() {
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL("stylesheets/editing-panes.css");
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

    if (document.getElementById('edit_post_ifr') != null) {
        document.getElementById('edit_post_ifr').contentWindow.document.head.appendChild(cssLink);
    }

    let replyEditors = document.querySelectorAll('[id^="create_followup_reply_"][id$="_ifr"]');
    replyEditors.forEach(function(editor) {
        editor.contentWindow.document.head.appendChild(cssLink);
    });
}



