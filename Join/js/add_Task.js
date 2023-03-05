setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let tasks = [];
let allTasks = [];
let priority = "low" ;


async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('users')) || [];

    backend.setItem('test', 'Backend Einbindung funktioniert!');
    let a = backend.getItem('test');

    console.log(a);
    includeHTML();
    loadAllTasks();
}

function addTask() {
    let description = document.getElementById("description");
    let category = document.getElementById("category");   
    let title = document.getElementById("title");
    let date = document.getElementById('date');
    let task = {
        'title': title.value,
        'description': description.value,
        'category': selectedCategory,
        'color': selectedColor,
        'date': date.value,
        };
    allTasks.push(task);
    let allTasksAsString = JSON.stringify(allTasks); //Array wird zu string
    localStorage.setItem("allTasks", allTasksAsString); 
    console.log(task);
    clearValues();  
    }

function clearValues() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let category = document.getElementById("category");
    title.value = '';
    description.value = '';
    category.value = '';
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
    // showTasks();
}

/**
 * 
 * Display all tasks in the list
 * 
*/

// function showTasks() {
//     let taskList = document.getElementById("taskList");
//     taskList.innerHTML = '';
//     for (let i = 0; i < allTasks.length; i++) {
//         let task = allTasks[i];
//         let taskElement = document.createElement("div");
//         taskElement.innerHTML = `
//             <h2>${task.title}</h2>
//             <p>${task.description}</p>
//             <p>${task.category}</p>
//             <p>${task.createdAt}</p>
//             <button onclick="deleteTask(${i})">Delete</button>
//         `;
//         taskList.appendChild(taskElement);
//     }
// }

function renderPrioBtnClicked(prio) {
    return `
        <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
        <img src="assets/img/prio_${prio}_white.png" width="18px"/>
    `;
}

function renderPrioBtnUnclicked(prio) {
    return `
        <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
        <img src="assets/img/prio_${prio}.png" width="18px"/>
    `;
}

function choosePriority(priority) {
    let urgent = document.getElementById("urgentBtn");
    let medium = document.getElementById("mediumBtn");
    let low = document.getElementById("lowBtn");

    switch (priority) {
        case "urgent":
            urgent.style.backgroundColor = "#FF3D00";
            medium.style.backgroundColor = "#FFF";
            low.style.backgroundColor = "#FFF";
            urgent.style.color = "#FFF";
            medium.style.color = "#000";
            low.style.color = "#000";
            urgent.innerHTML = renderPrioBtnClicked("urgent");
            medium.innerHTML = renderPrioBtnUnclicked("medium");
            low.innerHTML = renderPrioBtnUnclicked("low");
            break;
        case "medium":
            medium.style.backgroundColor = "#FFA800";
            urgent.style.backgroundColor = "#FFF";
            low.style.backgroundColor = "#FFF";
            urgent.style.color = "#000";
            medium.style.color = "#FFF";
            low.style.color = "#000";
            urgent.innerHTML = renderPrioBtnUnclicked("urgent");
            medium.innerHTML = renderPrioBtnClicked("medium");
            low.innerHTML = renderPrioBtnUnclicked("low");
            break;
        case "low":
            low.style.backgroundColor = "#7AE229";
            medium.style.backgroundColor = "#FFF";
            urgent.style.backgroundColor = "#FFF";
            urgent.style.color = "#000";
            medium.style.color = "#000";
            low.style.color = "#FFF";
            urgent.innerHTML = renderPrioBtnUnclicked("urgent");
            medium.innerHTML = renderPrioBtnUnclicked("medium");
            low.innerHTML = renderPrioBtnClicked("low");
            break;
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