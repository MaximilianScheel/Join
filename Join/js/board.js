let tasks = [
    {
        'title': ['Website redesign'],
        'description': ['Modify the contents of the main website',],
        'category': ['Design',],
        'state': ['toDo'],
        'color': ['#FF7A00'],
        'priority': ['assets/img/Prio_Low.png'],
        'priorityNumber': 1, 
        'id': 0,
    }, 

    {
        'title': ['Call potential clients'],
        'description': ['Make the product presentation to prospective buyers'],
        'category': ['Sales',],
        'state': ['progress',],
        'color': ['#FC71FF'],
        'priority': ['assets/img/Prio_Urgent.png'],
        'priorityNumber': 3, 
        'id': 1,
    },

    {
        'title': ['Accounting invoices'],
        'description': ['Write open invoices for customer'],
        'category': ['Backoffice'],
        'state': ['feedback'],
        'color': ['#1FD7C1'],
        'priority': ['assets/img/Prio_Medium.png'],
        'priorityNumber': 2, 
        'id': 2,
    },

    {
        'title': ['Social media strategy'],
        'description': ['Develop an ad campaign for brand positioning'],
        'category': ['Marketing'],
        'state': ['done'],
        'color': ['#0038FF'],
        'priority': ['assets/img/Prio_Low.png'],
        'priorityNumber': 1, 
        'id': 3,
    }


];

let priorityCount = [0]
let currentDraggedElement;



function init() {
    includeHTML();
    loadTask();
    countTasks();
    console.log('Urgent:', priorityCount);


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
    
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (tasks[i].state == "toDo") {
            toDoTasks.innerHTML += renderTask(task,i);
        } else if (tasks[i].state == "progress") {
            progressTasks.innerHTML += renderTask(task,i);
        } else if (tasks[i].state == "feedback") {
            feedbackTasks.innerHTML += renderTask(task,i);
        } else if (tasks[i].state == "done") {
            doneTasks.innerHTML += renderTask(task,i);
        }
        countPrio(task) 
    }

}


function renderTask(task,i) {
    return /* html */ `    <div draggable="true" class="taskContainer" ondragstart="startDragging(${task['id']})"  onclick="openTask(i)">
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
    <div class="prio"><img class="#" src="${task['priority']}"></div>
</div>
</div> `

}


function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
  }

function moveTo(state) {
    tasks[currentDraggedElement]['state'] = state;
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

function countPrio(task) {
if (task.priorityNumber == 3) {
    priorityCount +++ 1
}
}


function openTask(i) {
}


function mouseOverBoard(i) {
    document.getElementById('pathA' + i).classList.add('pathA');
    document.getElementById('pathB'+ i).classList.add('pathA');
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

