setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let currentUser = [];
let contacts = [];
let counts = [];
let priorityCount = [0]
let currentDraggedElement;


async function init() {
    await downloadFromServer();
    await loadContacts();
    allTasks = JSON.parse(backend.getItem('allTasks'));
    contacts = JSON.parse(backend.getItem('contacts'));
    currentUser = JSON.parse(backend.getItem(currentUser));
    includeHTML();
    loadTask();
    countTasks();
    console.log('Urgent:', priorityCount);
}

function routeToPage(destination) {
    window.location.href = destination;
}



function search() {
}

function loadTask() {


    let toDoTasks = document.getElementById("todoArea");
    let progressTasks = document.getElementById("progressArea");
    let feedbackTasks = document.getElementById("feedbackArea");
    let doneTasks = document.getElementById("doneArea");
    toDoTasks.innerHTML = "";
    progressTasks.innerHTML = "";
    feedbackTasks.innerHTML = "";
    doneTasks.innerHTML = "";

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        if (allTasks[i].state == "todo") {
            toDoTasks.innerHTML += renderTask(task, i);
        } else if (allTasks[i].state == "progress") {
            progressTasks.innerHTML += renderTask(task, i);
        } else if (allTasks[i].state == "feedback") {
            feedbackTasks.innerHTML += renderTask(task, i);
        } else if (allTasks[i].state == "done") {
            doneTasks.innerHTML += renderTask(task, i);
        }
        // countPrio(task)
    }

}


function renderTask(task, i) {
    return /* html */ `    <div draggable="true" id="${task['id']}" class="taskContainer" ondragstart="startDragging(${task['id']})"  onclick="openTask(i)">
    <div style="background-color: ${task['color']};" class="categoryContainer">
        ${task['category']}
    </div>
    <div class="titleContainer">
        ${task['title']}
    </div>
    <div class="descriptionContainer">${task['description']}
</div>
   
    <div class="subTaskContainer"></div>
    <div class="contactsPrioContainer"></div>
    <div class="contacts"></div>
    <div class="prio"><img class="#" src="./assets/img/Prio_${task['priority']}.png"></div>
</div>
</div> `

}


function startDragging(id) {
    currentDraggedElement = id; // TODO: id is currently only a number 0, 2 or 4.. 
    console.log(currentDraggedElement);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(state) {
    allTasks[currentDraggedElement]['state'] = state;
    console.log(currentDraggedElement.state);
    init();
    // state kommt aus dem backend, daher wird state nicht geändert.
}

function dragHighlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removedragHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
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
    let numbTask = numbTodo + numbProgress + numbFeedback + numbArea;
    console.log('Task:', numbTask);
    countNumbs(numbTodo, numbProgress, numbFeedback, numbArea, numbTask);
}

async function countNumbs(numbTodo, numbProgress, numbFeedback, numbArea, numbTask) {
    let counts = {
        'todoCount': numbTodo,
        'progressCount': numbProgress,
        'feedbackCount': numbFeedback,
        'doneCount': numbArea,
        'boardCount': numbTask,
    };
    //await saveCounts(counts)
}



/*async function saveCounts(counts) {
    counts.push();

}*/



// function countPrio(task) {
//     if (task.priorityNumber == 3) {
//         priorityCount++ + 1
//     }
// }



function openTask(i) {
}


function mouseOverBoard(i) {
    document.getElementById('pathA' + i).classList.add('pathA');
    document.getElementById('pathB' + i).classList.add('pathA');
    document.getElementById('rect' + i).classList.add('rect');
}

function mouseOutBoard(i) {
    document.getElementById('pathA' + i).classList.remove('pathA');
    document.getElementById('pathB' + i).classList.remove('pathA');
    document.getElementById('rect' + i).classList.remove('rect');
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

