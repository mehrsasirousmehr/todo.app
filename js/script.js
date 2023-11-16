const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-task");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// save to local storage
const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
console.log(saveToLocalStorage());

// creat id for todos
const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString();
};

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
        id: generateId(),
        task,
        date,
        completed: false,
    };
    if (task) {
        todos.push(todo);
        saveToLocalStorage();
        taskInput.value = "";
        dateInput.value = "";
        showAlert("todo added successfully", "success");
    } else {
        showAlert("please enter a todo!", "error");
    }
};

addButton.addEventListener("click", addHandler);
