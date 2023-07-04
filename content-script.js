//  alert('hi, this is the content script speaking!');



// console.log(document.getElementById("s_answer_edit_ifr").contentWindow.document.getElementsByTagName(p).style);

// let elements = document.getElementById("s_answer_edit_ifr").contentWindow.document.getElementsByTagName('p');

// for (let x in elements) {
  //  console.log(x.style);
// }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('HELLO');
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "dark") {
            const cssLink = document.createElement("link");
            cssLink.href = chrome.runtime.getURL("editingPaneStyling.css");
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";

            console.log(document.getElementById('s_answer_edit_ifr').contentWindow.document);
            document.getElementById('s_answer_edit_ifr').contentWindow.document.head.appendChild(cssLink);
            sendResponse({farewell: "goodbye"});
        }
    }
);