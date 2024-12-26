// Select DOM elements
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// Event listener for the Add button
addButton.addEventListener("click", addTask);

// Function to add a new task
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create new list item
  const listItem = document.createElement("li");
  listItem.className = "todo-item";

  // Add task text
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  // Create Complete button
  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", () => {
    listItem.classList.toggle("completed");
  });

  // Create Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(listItem);
  });

  // Add elements to list item
  listItem.appendChild(taskSpan);
  listItem.appendChild(completeButton);
  listItem.appendChild(deleteButton);

  // Add list item to the list
  todoList.appendChild(listItem);

  // Clear input field
  todoInput.value = "";
}

