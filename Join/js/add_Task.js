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