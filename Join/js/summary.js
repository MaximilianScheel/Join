setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let counts = []
let prioCounts = []

async function init() {
    await loadSummary();
    loadingFinished();
}


async function loadSummary() {
    await downloadFromServer();
    const date = new Date();
    const dateFormatted = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'Europe/Berlin' }).format(date)
    document.getElementById('currentDate').innerHTML = dateFormatted;
    counts = JSON.parse(backend.getItem('counts'));
    prioCount = JSON.parse(backend.getItem('prioCount'));
    includeHTML();
    greetUser();
    currentTasks();
    currentUrgent();
}


function loadingFinished() {
    document.getElementById('preloader').classList.add('d-none');
}


function loadAtStart() {
    let nameTest = JSON.parse(backend.getItem("currentUser")) || [];
    if (nameTest.length < 2) {
        ShowCurrentUserNameForSummery = "Guest user";
    } else {
        ShowCurrentUserNameForSummery = nameTest;
    }
}


function currentTasks() {
    for (let i = 0; i < counts.length; i++) {
        countsNumber = counts[i]
        let boardNumber = countsNumber['boardCount']
        let progressNumber = countsNumber['progressCount']
        let feedbackNumber = countsNumber['feedbackCount']
        let todoNumber = countsNumber['todoCount']
        let doneNumber = countsNumber['doneCount']
        document.getElementById('boardCount').innerHTML = boardNumber;
        document.getElementById('progressCount').innerHTML = progressNumber;
        document.getElementById('feedbackCount').innerHTML = feedbackNumber;
        document.getElementById('todoCount').innerHTML = todoNumber;
        document.getElementById('doneCount').innerHTML = doneNumber;
    }
}


function currentUrgent() {
    prioCounts = prioCount
    let urgentNumber = prioCounts.length
    document.getElementById('urgentCount').innerHTML = urgentNumber;
}


function greetUser() {
    let currentTime = new Date().getHours();
    // let name = ShowCurrentUserNameForSummery["userName"];
    if (currentTime < 12) {
        document.getElementById("greetTime").innerHTML = "Good morning, ";
    } else if (currentTime < 17) {
        document.getElementById("greetTime").innerHTML = "Good afternoon, ";
    } else {
        document.getElementById("greetTime").innerHTML = "Good evening, ";
    }
}


function routeToPage(destination) {
    window.location.href = destination;
}


function mouseOverTodo(i) {
    document.getElementById('todo' + i).classList.add('linkBackground');
    document.getElementById('todo' + i).classList.add('textHover');
    document.getElementById('circle' + i).classList.add('circle');
    document.getElementById('pathBig' + i).classList.add('path');
    document.getElementById('pathSmall' + i).classList.add('path');
}


function mouseOutTodo(i) {
    document.getElementById('todo' + i).classList.remove('linkBackground');
    document.getElementById('todo' + i).classList.remove('textHover');
    document.getElementById('circle' + i).classList.remove('circle');
    document.getElementById('pathBig' + i).classList.remove('path');
    document.getElementById('pathSmall' + i).classList.remove('path');
}


function mouseOverDone(i) {
    document.getElementById('todo' + i).classList.add('linkBackground');
    document.getElementById('todo' + i).classList.add('textHover');
    document.getElementById('circle' + i).classList.add('circle');
    document.getElementById('pathBig' + i).classList.add('stroke');
}


function mouseOutDone(i) {
    document.getElementById('todo' + i).classList.remove('linkBackground');
    document.getElementById('todo' + i).classList.remove('textHover');
    document.getElementById('circle' + i).classList.remove('circle');
    document.getElementById('pathBig' + i).classList.remove('stroke');
}


function mouseOverSmall(i) {
    document.getElementById('todo' + i).classList.add('linkBackground');
    document.getElementById('todo' + i).classList.add('textHover');
}


function mouseOutSmall(i) {
    document.getElementById('todo' + i).classList.remove('linkBackground');
    document.getElementById('todo' + i).classList.remove('textHover');
}


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}