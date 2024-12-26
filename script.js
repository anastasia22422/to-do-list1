    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const todoList = document.getElementById("todo-list");
    const loginButton = document.getElementById("login-button");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginForm = document.getElementById("login-form");
    const todoSection = document.getElementById("todo-section");
    const errorMessage = document.getElementById("error-message");
    const registerLink = document.getElementById("register-link");
    const logoutButton = document.getElementById("logout-button");
    const greetingText = document.getElementById("greeting-text");

    const LOCAL_STORAGE_KEY = "todoListTasks";
    const USER_STORAGE_KEY = "users"; // Store all users in localStorage

    document.addEventListener("DOMContentLoaded", loadTasks);

    loginButton.addEventListener("click", loginUser);
    logoutButton.addEventListener("click", logoutUser);

    function loginUser() {
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || [];

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        // User found, log in successfully
        localStorage.setItem('loggedInUser', username); // Store logged-in user in localStorage
        loginForm.style.display = "none";
        todoSection.style.display = "block";
        displayGreeting(username); // Display the greeting message
        loadTasks(); // Load the user's tasks after login
      } else {
        // Invalid username or password
        errorMessage.style.display = "block";
      }
    }

    registerLink.addEventListener("click", function () {
      const username = prompt("Enter a username for registration:");
      const password = prompt("Enter a password:");

      if (username && password) {
        const users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || [];

        // No need to check for username uniqueness
        users.push({ username, password });
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
        alert("Registration successful! You can now log in.");
      }
    });

    addButton.addEventListener("click", addTask);

    function addTask() {
      const taskText = todoInput.value.trim();

      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }

      const task = {
        text: taskText,
        completed: false,
      };

      createTaskElement(task);
      saveTaskToLocalStorage(task);
      todoInput.value = "";
    }

    function createTaskElement(task) {
      const listItem = document.createElement("li");
      listItem.className = "todo-item";
      if (task.completed) {
        listItem.classList.add("completed");
      }

      const taskSpan = document.createElement("span");
      taskSpan.textContent = task.text;

      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.addEventListener("click", () => {
        listItem.classList.toggle("completed");
        task.completed = !task.completed;
        updateLocalStorage();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        todoList.removeChild(listItem);
        deleteTaskFromLocalStorage(task.text);
      });

      listItem.appendChild(taskSpan);
      listItem.appendChild(completeButton);
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
    }

    function saveTaskToLocalStorage(task) {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      if (!tasks[loggedInUser]) {
        tasks[loggedInUser] = [];
      }
      tasks[loggedInUser].push(task);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }

    function loadTasks() {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const userTasks = tasks[loggedInUser] || [];
      userTasks.forEach(createTaskElement);
    }

    function deleteTaskFromLocalStorage(taskText) {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      const updatedTasks = tasks[loggedInUser].filter(task => task.text !== taskText);
      tasks[loggedInUser] = updatedTasks;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }

    function updateLocalStorage() {
      const loggedInUser = localStorage.getItem('loggedInUser');
      const tasks = [];
      todoList.querySelectorAll(".todo-item").forEach((item) => {
        const taskText = item.querySelector("span").textContent;
        const completed = item.classList.contains("completed");
        tasks.push({ text: taskText, completed: completed });
      });
      const allTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
      allTasks[loggedInUser] = tasks;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allTasks));
    }

    function logoutUser() {
      localStorage.removeItem("loggedInUser");
      loginForm.style.display = "block";
      todoSection.style.display = "none";
    }

    function displayGreeting(username) {
      greetingText.textContent = `Welcome, ${username}!`;
    }
