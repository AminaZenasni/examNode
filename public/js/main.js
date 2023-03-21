import {  addFormTask,resetBtn, tbody, urlApi,submitBtn,refrech } from "./config.js";

const TaskInput=document.getElementById("TaskInput");

addFormTask.addEventListener('submit',async (event)=>{
   event.preventDefault();
   console.log('JokeInput value:', TaskInput.value);

    if (!TaskInput) {
        console.error('Input fields not found');
        return;
      }
      else{
    const response = await fetch(urlApi+ "tasks", {
        method: "post",
        body:JSON.stringify({
            task: TaskInput.value
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) return alert("error");
      try {
        const dataReceived = await response.json();
            addTaskToTable(dataReceived.data);
            console.log(dataReceived);
        } catch (error) {
            console.error(error);
        }
    }
})

export const addTaskToTable=(tasks)=>{
 
    console.log(tasks);
        const tr=document.createElement("tr")
        const tdTasks=document.createElement("td")
        const btnDelete=document.createElement("button")
        const btnMoveUp = document.createElement("button");
        const btnMoveDown = document.createElement("button");

    

        tr.appendChild(tdTasks)
        tr.appendChild(btnDelete);
        tr.appendChild(btnMoveUp);
        tr.appendChild(btnMoveDown);
    
    

        tdTasks.innerText=tasks.task
        btnDelete.innerText="X";
        btnMoveUp.innerText = "Move Up";
        btnMoveDown.innerText = "Move Down";
        console.log(tasks.task);
        btnDelete.classList.add("btnDelete");
    


btnMoveUp.addEventListener("click", () => {
    const currentIndex = tasks.findIndex((t) => t.task === currentTask.task);
    if (currentIndex > 0) {

    const temp = tasks[currentIndex];
    tasks[currentIndex] = tasks[currentIndex - 1];
    tasks[currentIndex - 1] = temp;

    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    tasks.forEach(addTaskToTable);
}
})
        
btnMoveDown.addEventListener("click", () => {
          //
        });


btnDelete.addEventListener('click',()=>{
    
             fetch("http://localhost:3000/tasks/"+tasks.task,{method:"DELETE"
            })
            .then((response) => {

            if(response.ok){
                tr.remove();}else throw "error";
            })
            .catch((err) => alert("error on deleting"));       
            })       
        document.getElementById("tbody").appendChild(tr);
        
    }

refrech.addEventListener('click',()=>{
    fetch("http://localhost:3000/tasks/session", {
        method: "DELETE"
      })
      .then((response) => {
        if (response.ok) {
          console.log("Session cleared");
        } else throw "error";
      })
      .catch((err) => alert("error on clearing session"));
  
    // empty tasks table
    tbody.innerHTML = "";

})



