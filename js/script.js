const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-task");
const addButton = document.getElementById("add-button");

let todos = [];

// get todo values
const addHandler = () => {
    const task = taskInput.value;
    const date = dateInput.value;
    const todo = {
        task,
        date,
        completed: false,
    };

    if (task) {
        todos.push(todo);
        taskInput.value = "";
        dateInput.value = "";
    } else {
        alert("pls enter a task");
    }
};

addButton.addEventListener("click", addHandler);
