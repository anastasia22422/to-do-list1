// Select elements from the DOM
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// Key for storing tasks in localStorage
const LOCAL_STORAGE_KEY = "todoListTasks";

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task when clicking the "Add" button
addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = todoInput.value.trim();

  // Prevent adding empty tasks
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create a task object
  const task = {
    text: taskText,
    completed: false, // New tasks are not completed by default
  };

  // Add task to the DOM
  createTaskElement(task);

  // Save task to localStorage
  saveTaskToLocalStorage(task);

  // Clear the input box
  todoInput.value = "";
}

function createTaskElement(task) {
  // Create the <li> element
  const listItem = document.createElement("li");
  listItem.className = "todo-item";
  if (task.completed) {
    listItem.classList.add("completed"); // Add 'completed' class if the task is completed
  }

  // Create the <span> for the task text
  const taskSpan = document.createElement("span");
  taskSpan.textContent = task.text;

  // Create the "Complete" button
  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", () => {
    listItem.classList.toggle("completed");
    task.completed = !task.completed; // Update the task's completion status
    updateLocalStorage();
  });

  // Create the "Delete" button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(listItem);
    deleteTaskFromLocalStorage(task.text); // Remove task from localStorage
  });

  // Add the task text and buttons to the <li>
  listItem.appendChild(taskSpan);
  listItem.appendChild(completeButton);
  listItem.appendChild(deleteButton);

  // Add the <li> to the task list
  todoList.appendChild(listItem);
}

function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  tasks.push(task);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks)); // Save tasks as a JSON string
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  tasks.forEach(createTaskElement); // Recreate each task in the DOM
}

function deleteTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const updatedTasks = tasks.filter((task) => task.text !== taskText); // Remove the deleted task
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
}

function updateLocalStorage() {
  const tasks = [];
  todoList.querySelectorAll(".todo-item").forEach((item) => {
    const taskText = item.querySelector("span").textContent;
    const completed = item.classList.contains("completed");
    tasks.push({ text: taskText, completed: completed });
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
}
