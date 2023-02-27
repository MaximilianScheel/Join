setURL('http://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let tasks = [];
let priority = "low" ;

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('users')) || [];

    backend.setItem('test', 'Backend Einbindung funktioniert!');
    let a = backend.getItem('test');

    console.log(a);
}

function renderPrioBtnClicked(prio) {
    return `
        <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
        <img src="assets/img/Prio_${prio}_White.png" width="18px"/>
    `;
}

function renderPrioBtnUnclicked(prio) {
    return `
        <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
        <img src="assets/img/Prio_${prio}.png" width="18px"/>
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

//  function addTask() {
//     let description = document.getElementById("description");
//     let category = document.getElementById("category");   
//     let title = document.getElementById("title");
//     let task = {
//         'title': title.value,
//         'description': description.value,
//         'category': category.value,
//         'createdAt': new Date().getTime(),
//     };
//     allTasks.push(task);
//     let allTasksAsString = JSON.stringify(allTasks);
//     localStorage.setItem("allTasks", allTasksAsString);
//     console.log(task);
//     clearValues();  
//  }