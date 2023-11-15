const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-task");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");

let todos = [];

// show alert message
const showAlert = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement("p");
    alert.innerText = message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
};

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
        showAlert("todo added successfully", "success");
    } else {
        showAlert("please enter a todo!", "error");
    }
};

addButton.addEventListener("click", addHandler);
