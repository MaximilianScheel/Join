setURL('http://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

<<<<<<< HEAD
async function init () {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}



=======
>>>>>>> 28aa0ac7051b82b64b5d3ba712d07aaa97054a67
let allTasks = [];

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('users')) || [];

    backend.setItem('test', 'hallo');
    let a = backend.getItem('test');

    console.log(a);
}

/**
 * Add a new task to the list
 */
function addTask() {
    let description = document.getElementById("description");
    let category = document.getElementById("category");   
    let title = document.getElementById("title");
    let task = {
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'createdAt': new Date().getTime(),
    };
    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksAsString);
    console.log(task);
    clearValues();  
}


/**
 * clear all values
 * 
*/


function clearValues() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let category = document.getElementById("category");
    title.value = '';
    description.value = '';
    category.value = '';
}


/**
 * 
 * Display all tasks in the list
 * 
*/

function showTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let taskElement = document.createElement("div");
        taskElement.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <p>${task.category}</p>
            <p>${task.createdAt}</p>
            <button onclick="deleteTask(${i})">Delete</button>
        `;
        taskList.appendChild(taskElement);
    }
}


/**
 * 
 * Delete a task from the list
 * @param {number} index
 * 
*/

function deleteTask(index) {
    allTasks.splice(index, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem("allTasks", allTasksAsString);
    showTasks();
}



/**
 * Load all tasks from local storage
 * and display them in the list
 * 
*/

function loadAllTasks() {
    localStorage.getItem("allTasks");
    let allTasksAsString = localStorage.getItem("allTasks");
    allTasks = JSON.parse(allTasksAsString);
    console.log(allTasks);
    showTasks();
}

