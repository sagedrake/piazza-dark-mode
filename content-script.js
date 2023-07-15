chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting === "dark") {

            const cssLink = document.createElement("link");
            cssLink.href = chrome.runtime.getURL("editingPaneStyling.css");
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";

            console.log('hello, I can talk');

            if (document.getElementById('s_answer_edit_ifr') != null) {
                document.getElementById('s_answer_edit_ifr').contentWindow.document.head.appendChild(cssLink);
            }

            if (document.getElementById('create_post_edit_ifr') != null) {
                document.getElementById('create_post_edit_ifr').contentWindow.document.head.appendChild(cssLink);
            }

            if (document.getElementById('s_answerPlaceholderId') != null) {
                console.log('the thing exists');
            }

            sendResponse({farewell: "goodbye"});
        }
    }
);