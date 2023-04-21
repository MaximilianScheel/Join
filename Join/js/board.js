setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let currentUser = [];
let prioCount = [];
let contacts = [];
let counts = [];
let priorityCount = [0]
let currentDraggedElement;


async function init() {
    loadBoard();
    loadingFinished();
}

async function loadBoard() {
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

function loadingFinished() {
    document.getElementById('preloader').classList.add('d-none');
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
       let id = task['id'];
        if (allTasks[i].state == "todo") {
            toDoTasks.innerHTML += renderTask(task, i);
            renderAssigned(id);
            countPrio(i,task);
        } else if (allTasks[i].state == "progress") {
            progressTasks.innerHTML += renderTask(task, i);
            renderAssigned(id);
            countPrio(i,task);
        } else if (allTasks[i].state == "feedback") {
            feedbackTasks.innerHTML += renderTask(task, i);
            renderAssigned(id);
            countPrio(i,task);
        } else if (allTasks[i].state == "done") {
            doneTasks.innerHTML += renderTask(task, i);
            renderAssigned(id);
            countPrio(i,task);
        }
    
    }

}


function renderTask(task, id, i) {
    return /* html */ `    <div draggable="true" id="${task['id']}" class="taskContainer" ondragstart="startDragging(${task['id']})"  onclick="openTask(id)">
    <div style="background-color: ${task['color']};" class="categoryContainer">
        ${task['category']}
    </div>
    <div class="titleContainer">
        ${task['title']}
    </div>
    <div class="descriptionContainer">${task['description']}
</div>
   
    <div class="subTaskContainer">
        <div class="progressBar"></div>
        <div>1/2 Done</div>
    </div>
    <div class="contactsPrioContainer">
    <div id="boardInitials${id}" class="contactsPictureContainer">renderAssigned()</div>
    <div class="prioImage"><img class="#" src="./assets/img/Prio_${task['priority']}.png"></div>
    </div>
</div>
</div> `
}




function renderAssigned(id){
    let task = allTasks[id];
    let assignedName = task['contactNames'];
    document.getElementById(`boardInitials${id}`).innerHTML ='';
    for (let k = 0; k < assignedName.length; k++) {
        const fullname = assignedName[k];
        let splitNames = fullname.split(' ');
        let bothLetters = splitNames[0].charAt(0)+splitNames[1].charAt(0);
        let favouriteColor = contacts[k].favouriteColor;
        document.getElementById(`boardInitials${id}`).innerHTML +=/*html*/`
        <div class="boardInitialsInitials">
        <div class="boardInitialsShortName" style="background-color: ${favouriteColor};">${bothLetters}</div>     
        </div>
        `;
    }
}


function startDragging(id) {
    currentDraggedElement = id; // TODO: id is currently only a number 0, 2 or 4.. 
    console.log(currentDraggedElement);
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(state) {
    allTasks[currentDraggedElement]['state'] = state;
    console.log(currentDraggedElement.state);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
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
    let countsBoard = {
        'todoCount': numbTodo,
        'progressCount': numbProgress,
        'feedbackCount': numbFeedback,
        'doneCount': numbArea,
        'boardCount': numbTask,
    };
    counts.push(countsBoard)
    await backend.setItem("counts", JSON.stringify(counts));
}






async function countPrio(i,task ) {
    if (task['priority'] == 'Urgent') {
        priorityCount++ 
    }
    prioCount.push(priorityCount)
    await backend.setItem("prioCount", JSON.stringify(prioCount));
}




// Start Pop Up Task 

function openTask(id) {
    document.getElementById('TaskOverview').classList.remove('d-none');
    document.getElementById('TaskCard').innerHTML='';
    renderFullscreenView(id);
}

async function renderFullscreenView(id){
    let task = allTasks[id];
    let title = task['title'];
    let contactNames = task['contactNames'];
    let description = task['description'];
    let category = task['category'];
    let date = task['date'];
    let prio = task['priority'];
    let subtask = task['subtasks']['name'];
    let color = task['color'];
    
    document.getElementById('TaskCard').innerHTML = generateFullscreenView(id, title, description, category, color, date, prio);
    generateAssignedToOverlay(id,contactNames);
    generateSubtaskOverlay(id, subtask);
}

function generateFullscreenView(id, title, description, category, color, date, prio){
    return /*html*/`
    <div class="innerContentBoxOverlay">
        <img class="overlayTaskClose" src="assets/img/cross.png" onclick="closeOverview()">
        <img class="overlayTaskEdit" src="assets/img/editTask_button.png" onclick="displayEditTask(${id})">
        <div class="overlayCategory" style="background-color: ${color}";>${category}</div>
        <div class="overlayTitle"><h5>${title}</h5></div>
        <div class="overlayDiscription">${description}</div>
        <div class="overlayDate"> <div><b>Due date:</b></div> <div>${date}</div> </div>
        <div class="overlayPrio"><div><b>Priority:</b></div><div class="overlayCardPrio ${prio}"> <div> ${prio}</div><img src='assets/img/prio_${prio}_white.png'></div></div>
        <div id="overlaySubtasks" class="overlaySubtasks"><b>Subtasks:</b></div>
        <div><b>Assigned To:</b></div>
        <div id="overlayInitials" class="overlayInitialArea">
        </div>
    </div>
    `;
}

function generateAssignedToOverlay(id,contactNames){
    document.getElementById(`overlayInitials`).innerHTML ='';
    for (let t = 0; t < contactNames.length; t++) {
        const fullname = contactNames[t];
        let splitNames = fullname.split(' ');
        let bothLetters = splitNames[0].charAt(0)+splitNames[1].charAt(0);
        let favouriteColor = contacts.find(contact => contact.name === splitNames[1]).favouriteColor;
        document.getElementById(`overlayInitials`).innerHTML +=/*html*/`
          <div class="overlayInitials">
            <div class="overlayTaskShortName" style="background-color: ${favouriteColor};">${bothLetters}</div>
            <div class="overlayCardName">${fullname}</div>        
          </div>
        `;
    }
}

function generateSubtaskOverlay(id,subtask){
    // document.getElementById('overlaySubtasks').innerHTML ='';

    for (let i = 0; i < allTasks[id]['subtasks'].length; i++) {
        const subtask = allTasks[id]['subtasks'][i];
        const isChecked = subtask.state === 'isChecked';

        document.getElementById('overlaySubtasks').innerHTML +=/*html*/`
            <div class="singleSubTask">
                <input type="checkbox" id="${id}-${i}" ${isChecked ? 'checked' : ''} onclick="subtaskIsChecked(${id},${i})">
                <h5>${subtask.name}</h5>
            </div> 
        `;
    }
}

/** this function is checking if a subtask is checked and saves it */
// async function subtaskIsChecked(id, index){
//     const task = allTasks[id];
//     const subtask = task.subtasks[index];
//     if (document.getElementById(`${id}-${index}`).checked) {
//         subtask.state = 'isChecked';
//     } else {
//         subtask.state = 'todo';
//     }
//     await backend.setItem('allTasks', JSON.stringify(allTasks));
//     init()
// }

function closeOverview(id) {
    document.getElementById('TaskOverview').classList.add('d-none');
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

