const inputBox = document.getElementById("input-box");
// const inputBtn = document.getElementById("Button");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00D7";
        li.appendChild(span);

        span.onclick = function () {
            this.parentElement.remove();
            saveData();
        };

        li.onclick = function () {
            this.classList.toggle("checked");
            saveData();
        };
    }

    inputBox.value = "";
    saveData();
}

//ANOTHER WAY TO CHECK AND REMOVE FUNCTIONS
// listContainer.addEventListener("click", function (e) {
//     if (e.target.tagName === "LI") {
//         e.target.classList.toggle("checked");
//          saveData();
//     } else if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
//         saveData();
//     }
// }, false);

//ANOTHER WAY TO USE LOCAL STORAGE
// function saveData() {
//     localStorage.setItem("data", listContainer.innerHTML);
// }

// function showTask() {
//     listContainer.innerHTML = localStorage.getItem("data");
//     console.log(listContainer)
// }
// showTask();



// Function to save tasks to localStorage
function saveData() {
    let tasks = [];
    for (let li of listContainer.getElementsByTagName("li")) {
        tasks.push({
            text: li.innerHTML.replace("<span>\u00D7</span>", "").trim(),
            checked: li.classList.contains("checked"),
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadData() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        for (let task of storedTasks) {
            let li = document.createElement("li");
            li.innerHTML = task.text;
            if (task.checked) {
                li.classList.add("checked");
            }
            listContainer.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00D7";
            li.appendChild(span);

            // Remove task on close button click
            span.onclick = function () {
                this.parentElement.remove();
                saveData();
            };

            // Toggle checked status on task click
            li.onclick = function () {
                this.classList.toggle("checked");
                saveData();
            };
        }
    }
}

// Load the tasks from localStorage when the page is loaded
window.onload = function () {
    loadData();
};


// Function to handle pressing "Enter" to add a task
document.getElementById("input-box").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
      addTask();
  }
});