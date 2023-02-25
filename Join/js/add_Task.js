setURL('http://gruppenarbeit-join-474.developerakademie.net/smallest_backend_ever');

let tasks = [];

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('users')) || [];

    backend.setItem('test', 'Backend Einbindung funktioniert!');
    let a = backend.getItem('test');

    console.log(a);
}

// function addTask() {
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
// }