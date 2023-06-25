import {getActiveTabURL} from "./utils.js";

document.addEventListener('DOMContentLoaded', async () => {
    const dialogBox = document.getElementById('dialog-box');
    const activeTab = await getActiveTabURL();

    if (activeTab.url.includes("piazza.com")) {
    } else {
        dialogBox.innerHTML = 'This is not Piazza';
        document.getElementById("sun").style.display = 'none';
        document.getElementById("moon").style.display = 'none';
        document.getElementById("toggle").style.display = 'none';
    }
    // alert('Please work');
});

document.getElementById("toggleSwitch").addEventListener("click", darken);

function darken(){
    if (document.getElementById("toggleSwitch").checked === true) {
        // alert("DARKNESS IS DESCENDING");
        const toDarken = document.getElementsByClassName('.gray-bar');
        console.log(document.body.style.color);
        document.body.style.color = "pink";
        console.log(document.body.style.color);
        console.log(toDarken);
        toDarken.forEach(e => {
            e.style.color = 'white';
        });
    }
}








