setURL('https://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let tasks = [];
let allTasks = [];
let priority = '"Low"' ;
let selectedTitle;
let selectedDescription;
let selectedDate;
let activePriority;
let selectedSubtasks = [];
let allSubtasks = [];
let idCounter = 0;
let state = 'todo';
let subtasksChecked = [];


async function initTask() {
  await loadAddTask();
  loadingFinished();
  updateMin();
}

async function loadAddTask() {
  await downloadFromServer();
  await loadContacts();
  allTasks = JSON.parse(backend.getItem(allTasks)) || [];
  renderAllContacts()
  includeHTML();
  loadAllTasks();
}

function loadingFinished() {
  document.getElementById('preloader').classList.add('d-none');
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
      'subtasksChecked': subtasksChecked,
      };
      showInfo();
    await saveAllTasks(task);
    clearValues();
    idCounter++;
    loadAllTasks();
    loadTask();
    hideAddTask();
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

/**
 * this function save the new created Task in the backend
 * 
 * @param {JSON} - task contains all informations for a task
 */

async function saveAllTasks(task) {
  allTasks.push(task);
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  loadAllTasks();
}

/**
 * function to show a PopUp Information 
 */

function showInfo() {
  document.getElementById('createTaskBtn').classList.remove('d-none');
  setTimeout(function() {
    document.getElementById('createTaskBtn').classList.add('d-none');
  },3800);
}

/**
 * function to clear all values in AddTask template
 */

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
 * Load all tasks from local storage and display them in the list
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
    // console.log(allTasks);
}


/**
 * function for clicked or unclicked priority button
 * 
 * @param {string} prio
 * @returns 
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

/**
 * function to choose the priority with the buttons
 * 
 * @param {string} priority - This is the priority you choose with the button
 */

function choosePriority(priority) {
    let urgent = document.getElementById("urgentBtn");
    let medium = document.getElementById("mediumBtn");
    let low = document.getElementById("lowBtn");

    switch (priority) {
        case "Urgent":
            urgent.style.backgroundColor = "#FF3D00";
            medium.style.backgroundColor = "#FFF";
            low.style.backgroundColor = "#FFF";
            urgent.style.color = "#FFF";
            medium.style.color = "#000";
            low.style.color = "#000";
            urgent.innerHTML = renderPrioBtnClicked("Urgent");
            medium.innerHTML = renderPrioBtnUnclicked("Medium");
            low.innerHTML = renderPrioBtnUnclicked("Low");
            break;
        case "Medium":
            medium.style.backgroundColor = "#FFA800";
            urgent.style.backgroundColor = "#FFF";
            low.style.backgroundColor = "#FFF";
            urgent.style.color = "#000";
            medium.style.color = "#FFF";
            low.style.color = "#000";
            urgent.innerHTML = renderPrioBtnUnclicked("Urgent");
            medium.innerHTML = renderPrioBtnClicked("Medium");
            low.innerHTML = renderPrioBtnUnclicked("Low");
            break;
        case "Low":
            low.style.backgroundColor = "#7AE229";
            medium.style.backgroundColor = "#FFF";
            urgent.style.backgroundColor = "#FFF";
            urgent.style.color = "#000";
            medium.style.color = "#000";
            low.style.color = "#FFF";
            urgent.innerHTML = renderPrioBtnUnclicked("Urgent");
            medium.innerHTML = renderPrioBtnUnclicked("Medium");
            low.innerHTML = renderPrioBtnClicked("Low");
            break;
    }
}

/**
 * function to get the active priority for backend
 * 
 * @returns 
 */

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

/**
 * function to reset the priority buttons
 */

function resetPriority() {
  document.getElementById('urgentBtn').style.backgroundColor = '#FFF';
  document.getElementById('mediumBtn').style.backgroundColor = '#FFF';
  document.getElementById('lowBtn').style.backgroundColor = '#FFF';
  document.getElementById('urgentBtn').style.color = '#000';
  document.getElementById('mediumBtn').style.color = '#000';
  document.getElementById('lowBtn').style.color = '#000';
  document.getElementById('urgentBtn').innerHTML = renderPrioBtnUnclicked('Urgent');
  document.getElementById('mediumBtn').innerHTML = renderPrioBtnUnclicked('Medium');
  document.getElementById('lowBtn').innerHTML = renderPrioBtnUnclicked('Low');
}

/**
 * function to add a new Subtask to the subtasks list
 */
function addNewSubtask() {
  let newSubtaskInput = document.getElementById('newSubtaskInput');
  document.getElementById('newSubtasks').innerHTML = '';
  if (!newSubtaskInput.value == '') {
    let newSubtask = newSubtaskInput.value;
    allSubtasks.push(newSubtask);
    selectedSubtasks.push({ "name": newSubtask, "state": "todo" }); // add new subtask to selectedSubtasks
    for (let i = 0; i < allSubtasks.length; i++) {
      let subtaskImageSrc = changeImage(allSubtasks[i], selectedSubtasks); // pass selectedSubtasks to changeImage()
      document.getElementById('newSubtasks').innerHTML += showSubtask(i, allSubtasks[i], subtaskImageSrc);
    }
  }
  newSubtaskInput.value = '';
}

/**
 * function to change the image for selected subtasks
 * 
 * @param {string} newSubtask - the subtask(s) who was created in addNewSubtask()
 * @param {JSON} selectedSubtasks - All subtasks who are selected with the checkmark
 * @returns 
 */

function changeImage(newSubtask, selectedSubtasks) {
  let subtaskImageSrc = "assets/img/subtask_rectangle.png";
  if (selectedSubtasks && selectedSubtasks.some(task => task.name === newSubtask)) {
    subtaskImageSrc = "assets/img/subtask_check.png";
  }
  return subtaskImageSrc;
}
/**
 * function to show the new subtask and the correct image left to it. checkmark or rectangle
 * 
 * @param {number} i - number to check the correct subtask
 * @param {string} newSubtask - subtask which was written in the input field
 * @returns 
 */
function showSubtask (i, newSubtask) {
  const subtaskImageSrc = changeImage(newSubtask, selectedSubtasks);
  return `
    <div class="newSubtasks">
      <img src=${subtaskImageSrc} class="paddingRight" id="checkbox${i}" onclick="checkmark(${i})"><span class="newSubtask">${newSubtask}</span>
    </div>
  `;
}

/**
 * function to add or remove the checkmark next to the subtask
 * 
 * @param {number} i - number to checkmark the correct subtask 
 */

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

/**
 * function to display AddTask template and create the state
 *
 * @param {string} type - type ist the state for the task
 */

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
  clearValues();
}


function hideEditTask() {
  document.getElementById('editTaskPopUp-container').classList.add('hideAddTask');
  document.getElementById('popupAddTaskBoard').classList.add('d-none')
}

/**
 * function to choose the new priority in editTask
 * 
 * @param {string} priority - This is the priority you choose with the button
 */
function choosePriorityEdit(priority) {
  let urgent = document.getElementById("urgentBtnEdit");
  let medium = document.getElementById("mediumBtnEdit");
  let low = document.getElementById("lowBtnEdit");

  switch (priority) {
      case "Urgent":
          urgent.style.backgroundColor = "#FF3D00";
          medium.style.backgroundColor = "#FFF";
          low.style.backgroundColor = "#FFF";
          urgent.style.color = "#FFF";
          medium.style.color = "#000";
          low.style.color = "#000";
          urgent.innerHTML = renderPrioBtnClicked("Urgent");
          medium.innerHTML = renderPrioBtnUnclicked("Medium");
          low.innerHTML = renderPrioBtnUnclicked("Low");
          break;
      case "Medium":
          medium.style.backgroundColor = "#FFA800";
          urgent.style.backgroundColor = "#FFF";
          low.style.backgroundColor = "#FFF";
          urgent.style.color = "#000";
          medium.style.color = "#FFF";
          low.style.color = "#000";
          urgent.innerHTML = renderPrioBtnUnclicked("Urgent");
          medium.innerHTML = renderPrioBtnClicked("Medium");
          low.innerHTML = renderPrioBtnUnclicked("Low");
          break;
      case "Low":
          low.style.backgroundColor = "#7AE229";
          medium.style.backgroundColor = "#FFF";
          urgent.style.backgroundColor = "#FFF";
          urgent.style.color = "#000";
          medium.style.color = "#000";
          low.style.color = "#FFF";
          urgent.innerHTML = renderPrioBtnUnclicked("Urgent");
          medium.innerHTML = renderPrioBtnUnclicked("Medium");
          low.innerHTML = renderPrioBtnClicked("Low");
          break;
  }

  newPrio = priority;
}

/**
 * function to render the information for selected task
 * 
 * @param {number} id - number to show the right information for the selceted task
 */

function renderFullscreenEdit(id){
  if(id != undefined){
      let task = allTasks[id];
      document.getElementById('Edittitle').value = task['title'];
      document.getElementById('Editdescription').value = task['description'];
      document.getElementById('Editdate').value = task['date'];
      let prio = task['priority'];
  }
}

/**
 * function to display editTaks template
 * 
 * @param {number} id -number to show the right information for the selected task
 */

async function displayEditTask(id) {
  let task = allTasks[id];
  let title = task['title'];
  let description = task['description'];
  let date = task['date'];
  let prio = task['priority'];

  document.getElementById('TaskOverview').classList.add('d-none');
  document.getElementById('editTaskPopUp-container').classList.remove('hideAddTask');
  document.getElementById('popupAddTaskBoard').classList.remove('d-none')
  choosePriorityEdit(prio);
  renderFullscreenEdit(id)

  document.getElementById('Edittitle').value = title;
  document.getElementById('Editdescription').value = description;
  document.getElementById('Editdate').value = date;

  };


/**
 * function for save the changes in the open task
 * 
 */

async function editTask() {

  let id = idCounter;   

    let newTitle = document.getElementById('Edittitle').value;
    let newDescription = document.getElementById('Editdescription').value;
    let newDate = document.getElementById('Editdate').value;

    allTasks[id]['title'] = newTitle;
    allTasks[id]['description'] = newDescription;
    allTasks[id]['date'] = newDate;
    allTasks[id]['priority'] = newPrio;

    await backend.setItem('allTasks', JSON.stringify(allTasks));

    hideEditTask()

    renderFullscreenView(id);
    init();
}


function routeToPage(destination) {
  window.location.href = destination;
}

/**
 * function for Datepicker to get the Date from today
 * 
 * @returns {string} - Today's date in yyyy-mm-dd format
 */
function getTodayDate() {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
}

/**
 * Add the minimum date to an HTML date input field based on today's date
 *
 * @returns {void}
 */
function updateMin() {
  const datepicker = document.getElementById('date');
  datepicker.setAttribute('min', getTodayDate());
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