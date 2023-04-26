setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let currentUser = [];
let prioCount = [];
let contacts = [];
let counts = [];
let priorityCount = [0]
let currentDraggedElement;
let subtaskChecked = [];


async function init() {
    loadBoard();
    loadingFinished();
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
    countPrio(i,task);
    }
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
}

function loadingFinished() {
    document.getElementById('preloader').classList.add('d-none');
  }

function routeToPage(destination) {
    window.location.href = destination;
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
            renderProgressBar(task, id, i);
            renderAssigned(id);
            
        } else if (allTasks[i].state == "progress") {
            progressTasks.innerHTML += renderTask(task, i);
            renderProgressBar(task, id, i);
            renderAssigned(id);
            // countPrio(i,task);
        } else if (allTasks[i].state == "feedback") {
            feedbackTasks.innerHTML += renderTask(task, i);
            renderProgressBar(task, id, i);
            renderAssigned(id);
            // countPrio(i,task);
        } else if (allTasks[i].state == "done") {
            doneTasks.innerHTML += renderTask(task, i);
            renderProgressBar(task, id, i);
            renderAssigned(id);
            // countPrio(i,task);
            
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
   

    <div id="subTaskContainer${id}" class="subTaskContainer">
</div>


    <div class="contactsPrioContainer">
    <div id="boardInitials${id}" class="contactsPictureContainer">renderAssigned()</div>
    <div class="prioImage"><img class="#" src="./assets/img/prio_${task['priority']}.png"></div>
    </div>
</div>
</div> `
}



function renderProgressBar(task, id, i) {
let percent = allTasks[id]['subtasksChecked'].length / allTasks[id]['subtasks'].length
percentProgress = percent * 100

if (allTasks[id]['subtasks'].length == 0) {

} else {
    document.getElementById(`subTaskContainer${id}`).innerHTML += /* html */ `
    <div class="progressBarContainer">
    <div id="progressBar${id}" class="progressBar"></div>
    </div>
        <div id="subtaskCheckedCount" class="subtaskCheckedCount">${allTasks[id]['subtasksChecked'].length}</div>
        <div class="subTasksCount">/${allTasks[id]['subtasks'].length} Done</div>
    </div>
`;

document.getElementById(`progressBar${id}`).style = `width: ${percentProgress}%`;

}  
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
        document.getElementById(`boardInitials${id}`).innerHTML +=`
        <div class="boardInitialsInitials">
        <div class="boardInitialsShortName" style="background-color: ${favouriteColor};">${bothLetters}</div>     
        </div>
        `;
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(state) {
    allTasks[currentDraggedElement]['state'] = state;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    init();
}

function dragHighlight(id) {
    document.getElementById(id).classList.add('dragAreaHighlight');
}

function removedragHighlight(id) {
    document.getElementById(id).classList.remove('dragAreaHighlight');
}

function countTasks() {
    let numbTodo = document.getElementById("todoArea").childElementCount;
    let numbProgress = document.getElementById("progressArea").childElementCount;
    let numbFeedback = document.getElementById("feedbackArea").childElementCount;   
    let numbArea = document.getElementById("doneArea").childElementCount;    
    let numbTask = numbTodo + numbProgress + numbFeedback + numbArea; 
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




/**
 * function to open the task
 * 
 * @param {number} id - number to get the correct task
 */

function openTask(id) {
    document.getElementById('TaskOverview').classList.remove('d-none');
    document.getElementById('TaskCard').innerHTML='';
    renderFullscreenView(id);
}

/**
 * function to get all informations for the open task
 * 
 * @param {number} id - number to get the correct task
 */

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

/**
 * function to show the open Task with all informations
 * 
 * @param {number} id - number to geht the correct task
 * @param {string} title - title for task
 * @param {string} description - description for task
 * @param {string} category - categrory fot task
 * @param {number} color - color fot the category
 * @param {Date} date - date for the dateline to finish the task
 * @param {string} prio - priority for the task
 * @returns 
 */

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

/**
 * function to show the contact names for the task
 * 
 * @param {number} id - number to get the correct task
 * @param {string} contactNames - name assigned to the task
 */

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

/**
 * Adds all subtasks of the selected main task to the "overlaySubtasks" div.
 * 
 * @param {number} id - The ID of the selected main task.
 * @param {string} subtask - The information about the subtask.
 */

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

/**
 * this function is checking if a subtask is checked and saves it
 * 
 */

async function subtaskIsChecked(id, index){
    const task = allTasks[id];
    const subtask = task.subtasks[index];
    if (document.getElementById(`${id}-${index}`).checked) {
        subtask.state = 'isChecked';
        allTasks[id]['subtasksChecked'].push(allTasks[id]['subtasks'][index]['name'])
    } else {
        subtask.state = 'todo';
        allTasks[id]['subtasksChecked'].pop(allTasks[id]['subtasks'][index]['name'])
    }
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    init()
}

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

/**
 * function to search Task in board
 */

function searchTasks() {            
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    showSearchedTask(search);
}

/**
 * function to show searched task
 * 
 * @param {string} search - search is the value from the search input field
 */

function showSearchedTask(search) {
    for (let i = 0; i < allTasks.length; i++) {
        let currentTask = allTasks[i]['title'];
        let currentDescription = allTasks[i]['description'];
        document.getElementById(i).classList.add('d-none');
        if (currentTask.toLowerCase().includes(search) || currentDescription.toLowerCase().includes(search)) {
            document.getElementById(i).classList.remove('d-none');
        
        }
    }
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

