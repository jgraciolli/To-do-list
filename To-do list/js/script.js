const addBtn = document.getElementById("add-new-task");
const inputField = document.getElementById("new-task");
const inputMsg = document.getElementById("input-msg")

const pendingTasks = document.getElementById("pending-tasks")
const completedTasks = document.getElementById("completed-tasks")

const clearAll = document.querySelector("#clear-all-container button")
const noTasksMsg = document.querySelector("#clear-all-line label")
const modal = document.getElementById("modal")
const confirmClear = document.getElementById("confirm-clear")
const cancelClear = document.getElementById("cancel-clear")

const allTasks = document.getElementById("all-tasks")
const taskElement = document.getElementById("task-element")

let taskCount = 0

const verifyIfThereAreAnyTask = () => {    
    if (taskCount > 0){
        for (let x = 0; x <= taskCount; x++){
            let task = allTasks.querySelector("#task" + x)
            if (task)
                return true
        }
    }
    return false
}

const clearAllTasks = () => {
    if (verifyIfThereAreAnyTask())
        modal.classList.remove("hidden")
    else{
        console.log('cheguei')
        console.log(noTasksMsg)

        noTasksMsg.style.display = ""; 

        setTimeout(() => {
            noTasksMsg.style = "display: none;"    
        }, 3000)
    }    
}

confirmClear.addEventListener("click", () => { 
    modal.classList.add("hidden");

    for (let x = 1; x <= taskCount; x++){
        const task = allTasks.querySelector("#task" + x)
        
        if (task)
            allTasks.removeChild(task)

        pendingTasks.innerText = "0"
        completedTasks.innerText = "0"
    }
});

cancelClear.addEventListener("click", () => {
    modal.classList.add("hidden");
});

clearAll.addEventListener("click", clearAllTasks)

const verifyTaskName = () => {
    inputField.value = inputField.value.trim()  
    const taskName = inputField.value

    if (taskName != "")
        addTask(taskName)           
    else {
        inputMsg.style.display = ""

        setTimeout(() => {
            inputMsg.style.display = "none"
        }, 3000)
    }           
}

const addTask = (taskName) => {    
    const newTaskContainer = taskElement.cloneNode(true)
    taskCount++
    newTaskContainer.id = "task" + taskCount
    newTaskContainer.style.display = "flex"
    pendingTasks.innerText++

    const taskTitle = newTaskContainer.querySelector(".task-title")
    taskTitle.value = taskName

    const handleTaskButton = newTaskContainer.querySelector(".task-buttons .handle-task")
    const deleteTaskButton = newTaskContainer.querySelector(".task-buttons .delete-task")
    
    handleTaskButton.addEventListener("click", handleTask)
    handleTaskButton.addEventListener("mouseover", mouseOver)
    handleTaskButton.addEventListener("mouseout", mouseOut)

    deleteTaskButton.addEventListener("click", deleteTask)
    deleteTaskButton.addEventListener("mouseover", mouseOver)
    deleteTaskButton.addEventListener("mouseout", mouseOut)

    allTasks.appendChild(newTaskContainer)
}

const mouseOver = (e) => {
    if (e.target.innerText == "Done")
        e.target.style.backgroundColor = "#104e10"
    else if (e.target.innerText == "Undone")
        e.target.style.backgroundColor = "#0e2768"
    else
        e.target.style.backgroundColor = "#5e0f12"
}

const mouseOut = (e) => {
    if (e.target.innerText == "Done")
        e.target.style.backgroundColor = "#09882f"
    else if (e.target.innerText == "Undone")
        e.target.style.backgroundColor = "#134bba"
    else
        e.target.style.backgroundColor = "#b60724"
}

const handleTask = (e) => {
    const btn = e.target
    const title = btn.parentNode.parentNode.querySelector(".task-title")
    const img = btn.parentNode.parentNode.querySelector(".task-status")        

    if (btn.innerText == "Done"){
        title.style.textDecoration = "line-through"
        btn.innerText = "Undone"
        btn.style = "background-color: #134bba;"
        img.src = "../img/done-task.png"
        img.alt = "Completed task"
        
        console.log(pendingTasks.innerText)
        pendingTasks.innerText--
        completedTasks.innerText++

    } else if (btn.innerText == "Undone") {
        title.style.textDecoration = "";
        btn.innerText = "Done"
        btn.style = "background-color: #09882f;"
        img.src = "../img/pending-task.png"
        img.alt = "Pending task"

        pendingTasks.innerText++
        completedTasks.innerText--
    }
}

const deleteTask = (e) => {
    const btn = e.target
    const taskContainer = btn.parentNode.parentNode
    const img = taskContainer.querySelector(".task-status")

    console.log(img.src)

    if (img.alt == "Pending task")
        pendingTasks.innerText--
    else if (img.alt == "Completed task")
        completedTasks.innerText--

    taskContainer.remove()
}

addBtn.addEventListener("click", verifyTaskName);