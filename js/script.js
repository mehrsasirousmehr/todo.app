const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-task");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// save to local storage
const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

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

// show todos
const displayTodos = (data) => {
    todosBody.innerHTML = "";
    if (!todos.length) {
        todosBody.innerHTML = "<tr><td colspan='4'>No task found!</td></tr>";
        return;
    }

    todos.forEach((todo) => {
        todosBody.innerHTML += `
        <tr>
            <td>${todo.task}</td>
            <td>${todo.date ? todo.date : "No date!"}</td>
            <td>${todo.completed ? "completed ✅" : "pending"}</td>
            <td>
                <button onclick="editHandler('${todo.id}')">Edit</button>
                <button onclick="toggleHandler('${todo.id}')">
                    ${todo.completed ? "undo" : "Do"}
                </button>
                <button onclick="deleteHandler('${todo.id}')">Delete</button>
            </td>
        </tr>`;
    });
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
        displayTodos();
        taskInput.value = "";
        dateInput.value = "";
        showAlert("todo added successfully", "success");
    } else {
        showAlert("please enter a todo!", "error");
    }
};

// delete all todos
const deleteAllHandler = () => {
    if (todos.length) {
        todos = [];
        saveToLocalStorage();
        displayTodos();
        showAlert("All todos cleared successfully:))", "success");
    } else {
        showAlert("No todos to cleared", "error");
    }
};

// delete one todo
const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    todos = newTodos;
    saveToLocalStorage();
    displayTodos();
    showAlert("Todo deleted successfully:))", "success");
};

// changing the status of todos
const toggleHandler = (id) => {
    const newTodos = todos.map((todo) => {
        if (todo.id === id) {
            return {
                id: todo.id,
                task: todo.task,
                date: todo.date,
                completed: !todo.completed,
            };
        } else {
            return todo;
        }
    });
    todos = newTodos;
    saveToLocalStorage();
    displayTodos();
    showAlert("Todo status changed successfully", "success");
};

// edit todos
const editHandler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    taskInput.value = todo.task;
    dateInput.value = todo.date;
    addButton.style.display = "none";
    editButton.style.display = "inline-block";
    editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
    const id = event.target.dataset.id;
    const todo = todos.find((todo) => todo.id === id);
    todo.task = taskInput.value;
    todo.date = dateInput.value;
    taskInput.value = "";
    dateInput.value = "";
    addButton.style.display = "inline-block";
    editButton.style.display = "none";
    saveToLocalStorage();
    displayTodos();
    showAlert("Todo Edited successfullt", "success");
};

window.addEventListener("load", displayTodos);
addButton.addEventListener("click", addHandler);

deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);