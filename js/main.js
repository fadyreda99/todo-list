//get all ekements

let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//empty array to store the tasks in it
let arrayOfTasks = [];

//check if there is tasks in local storage to fill the array of tasks from the local storage
if(localStorage.getItem("tasks")){
  //fill the array of tasks from local storage
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//call function to get all data from local storage 
getDataFromLocalStorage();

/*----------------------------------add task---------------------------------------*/

submit.onclick = function () {
  //check if input not empty
  if (input.value !== "") {
    //call function (add task to array of tasks)
    addTasakToArray(input.value);

    //set the input value empty
    input.value = "";
  }
};

//click on task element
tasksDiv.addEventListener("click", (e) => {
  //check if it delete button
  if(e.target.classList.contains("del")){
    //call function to remove task from local storage with data-id
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));

    //remove task from page
    e.target.parentElement.remove();

 

  }
     //task element
     if(e.target.classList.contains("task")){
       //toggle done class
       e.target.classList.toggle("done");

       //call function to toggle completed for the task data 
       toggleStatusTask(e.target.getAttribute("data-id"));
     }
})

//function (add task to array of tasks)
function addTasakToArray(taskText) {
  //task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  //push the task into array of tasks
  arrayOfTasks.push(task);

  //call function to add tasks elements to page
  addTaskElementToPage(arrayOfTasks);

  //call function to add tasks to local storage from array of tasks
  addDataToLocalStorage(arrayOfTasks);


}

//function to add tasks elements to page
function addTaskElementToPage(arrayOfTasks) {
  //set the tasks div empty (3lshan lma agy a3ml add l task gded mykrrsh l taskt l adema)
  tasksDiv.innerHTML = "";

  //looping on array of tasks to make element for each task
  arrayOfTasks.forEach((task) => {
    //create main div for each task
    let div = document.createElement("div");
    div.className = "task";

    //check if the task is done
    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    let txtOfTask = document.createTextNode(task.title);
    div.appendChild(txtOfTask);

    //create delete btn
    let span = document.createElement("span");
    span.className = "del";
    let spanTxt = document.createTextNode("Delete");
    span.appendChild(spanTxt);

    //append delete button to the main div
    div.appendChild(span);

    //add task element to the tasks div containet on page
    tasksDiv.appendChild(div);
  });
}

  //function to add tasks to local storage from array of tasks
function addDataToLocalStorage(arrayOfTasks){
  //add array to local storage
  window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}


//func to get data from local storage
function getDataFromLocalStorage(){
  let data = window.localStorage.getItem("tasks");

  if(data){
    let tasks = JSON.parse(data);
    addTaskElementToPage(tasks);
  }
 
}

 //function to remove task from local storage with data-id and return other tasks
function deleteTaskFromLocalStorage(taskId){
  //for explain and testing
  // for(let i=0; i<arrayOfTasks.length; i++){
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }

  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
  addDataToLocalStorage(arrayOfTasks);
}


  //function to toggle completed for the task data 
  function toggleStatusTask(taskId){
  for(let i=0; i<arrayOfTasks.length; i++){
   if(arrayOfTasks[i].id == taskId){
     arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) :  (arrayOfTasks[i].completed = false)
   }
  }
  addDataToLocalStorage(arrayOfTasks);
  }