function init(){
    includeHTML();
    countTasks()
}


function search() {  
}

function addTask() {
}

function countTasks() {
    let numbTodo = document.getElementById("todoArea").childElementCount;
    console.log('Todo:', numbTodo);
    let numbProgress = document.getElementById("progressArea").childElementCount;
    console.log('Progress:', numbProgress);
    let numbFeedback = document.getElementById("feedbackArea").childElementCount;
    console.log('Feedback:', numbFeedback);
    let numbArea = document.getElementById("doneArea").childElementCount;
    console.log('Area:', numbArea);
    let numbtask = numbTodo + numbProgress + numbFeedback + numbArea; 
    console.log('Task:', numbtask);

    

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