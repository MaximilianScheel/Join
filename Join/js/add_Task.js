setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let tasks = [];
let allTasks = [];
let priority = '"low"' ;
let selectedTitle;
let selectedDescription;
let selectedDate;
let activePriority;
let selectedSubtasks = [];
let allSubtasks = [];
let idCounter = 0;
let state = []


async function initTask() {
  await downloadFromServer();
  await loadContacts();
  allTasks = JSON.parse(backend.getItem(allTasks)) || [];
  renderAllContacts()
  includeHTML();
  loadAllTasks();
}

async function addTask() {
  addDate();
  let task = {
      'title': selectedTitle,
      'description': selectedDescription,
      'category': selectedCategory,
      'color': selectedColor,
      'date': selectedDate,
      'contactNames': selectedContactNames,
      'priority': getActivePriority(),
      'subtasks': selectedSubtasks,
      'id': idCounter,
      'state': state,
      };
      showInfo();
    await saveAllTasks(task);
    clearValues();
    idCounter++;
    loadAllTasks();
  }

function addTitle() {
  let title = document.getElementById('title');
  selectedTitle = '';
  selectedTitle = title.value;
}

function addDescription() {
  let description = document.getElementById('description');
  selectedDescription = '';
  selectedDescription = description.value;
}

function addDate() {
  selectedDate = document.getElementById('date').value;
}

async function saveAllTasks(task) {
  allTasks.push(task);
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  loadAllTasks();
}

function showInfo() {
  document.getElementById('createTaskBtn').classList.remove('d-none');
  setTimeout(function() {
    document.getElementById('createTaskBtn').classList.add('d-none');
  },3800);
}

function clearValues() {
  resetVariables();
  resetContent();
}

function  resetVariables() {
  selectedLetters = [];
  selectedContactNames = [];
  selectedSubtasks = [];
  allSubtasks = [];
}

function resetContent() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  document.getElementById('date').value = '';
  document.getElementById('newSubtasks').innerHTML = '';
  document.getElementById('newSubtaskInput').value = '';
  document.getElementById('addedContacts').innerHTML = '';
  document.getElementById('contact').value = '';
  for (let i = 0; i < allContacts.length; i++) {
    document.getElementById('contactButton'+i).innerHTML = '<img src="assets/img/button_rectangle.png">';
  }
  cancelNewCategory();
  closeCategories();
  resetPriority();
  closeContacts();
}


/**
 * function to close the opened contacts and categories field
 */
function closeContacts() {
  if ($(window).width() > 720) {
    document.getElementById('selectFieldContact').style.height = '50px';
  } else {
    document.getElementById('selectFieldContact').style.height = '43px';

  }
  document.getElementById('openedContacts').classList.add('d-none');
}

function closeCategories() {
  if ($(window).width() > 720) {
    document.getElementById('selectField').style.height = '50px';
  } else {
    document.getElementById('selectField').style.height = '43px';
  }
  document.getElementById('openedCategories').classList.add('d-none');
}


/**
 * Load all tasks from local storage
 * and display them in the list
 *
*/

function loadAllTasks() {
    backend.getItem("tasks");
    let allTasksAsString = backend.getItem("allTasks");
    allTasks = JSON.parse(allTasksAsString) || [];
    idCounter = allTasks.reduce((maxId, task) => Math.max(maxId, task.id), -1) + 1;
    if (allTasks.length > 0) {
      idCounter = Math.max(...allTasks.map(task => task.id)) + 1;
    }
    console.log(allTasks);
}



/**
 *
 * Prio
 *
*/

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

function getActivePriority() {
  let activePriority = "";
  let urgent = document.getElementById("urgentBtn");
  let medium = document.getElementById("mediumBtn");
  let low = document.getElementById("lowBtn");

  if (urgent.style.backgroundColor === "rgb(255, 61, 0)") {
    activePriority = "Urgent";
  } else if (medium.style.backgroundColor === "rgb(255, 168, 0)") {
    activePriority = "Medium";
  } else if (low.style.backgroundColor === "rgb(122, 226, 41)") {
    activePriority = "Low";
  }

  return activePriority;
}

function resetPriority() {
  document.getElementById('urgentBtn').style.backgroundColor = '#FFF';
  document.getElementById('mediumBtn').style.backgroundColor = '#FFF';
  document.getElementById('lowBtn').style.backgroundColor = '#FFF';
  document.getElementById('urgentBtn').style.color = '#000';
  document.getElementById('mediumBtn').style.color = '#000';
  document.getElementById('lowBtn').style.color = '#000';
  document.getElementById('urgentBtn').innerHTML = renderPrioBtnUnclicked('urgent');
  document.getElementById('mediumBtn').innerHTML = renderPrioBtnUnclicked('medium');
  document.getElementById('lowBtn').innerHTML = renderPrioBtnUnclicked('low');
}

/**
 * Subtask
 */

function addNewSubtask() {
    let newSubtaskInput = document.getElementById('newSubtaskInput');
    document.getElementById('newSubtasks').innerHTML = '';
    if (!newSubtaskInput.value == '') {
      allSubtasks.push(newSubtaskInput.value);
      for (let i = 0; i < allSubtasks.length; i++) {
        let newSubtask = allSubtasks[i];
        let subtaskImageSrc = changeImage(newSubtask);
        document.getElementById('newSubtasks').innerHTML += showSubtask(i, newSubtask, subtaskImageSrc);
      }
    }
    newSubtaskInput.value = '';
  }

function changeImage(newSubtask, selectedSubtasks) {
  let subtaskImageSrc = "assets/img/subtask_rectangle.png";
  if (selectedSubtasks && selectedSubtasks.some(task => task.name === newSubtask)) {
    subtaskImageSrc = "assets/img/subtask_check.png";
  }
  return subtaskImageSrc;
}

function showSubtask (i, newSubtask) {
  const subtaskImageSrc = changeImage(newSubtask, selectedSubtasks);
  return `
    <div class="newSubtasks">
      <img src=${subtaskImageSrc} class="paddingRight" id="checkbox${i}" onclick="checkmark(${i})"><span class="newSubtask">${newSubtask}</span>
    </div>
  `;
}

function checkmark(i) {
  const newSubtask = { "name": allSubtasks[i], "state": "todo" };
  const index = selectedSubtasks.findIndex(task => task.name === newSubtask.name);
  if (index === -1) {
    selectedSubtasks.push(newSubtask);
  } else {
    selectedSubtasks.splice(index, 1);
  }
  const subtaskImageSrc = changeImage(newSubtask.name, selectedSubtasks);
  document.getElementById('checkbox' + i).src = subtaskImageSrc;
}

// Pop Up Add Task

function displayAddTask(type) {
  initTask();
  document.getElementById('addTaskPopUp-container').classList.remove('hideAddTask');
  switch (type) {
    case "todo":
      state = "todo";
      break;
    case "progress":
      state = "progress";
      break;
    case "feedback":
      state = "feedback";
      break;
    case "done":
      state = "done";
      break;
    default:
      state = "todo";
      break;
  }
}

function hideAddTask() {
  document.getElementById('addTaskPopUp-container').classList.add('hideAddTask');
}

function routeToPage(destination) {
  window.location.href = destination;
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