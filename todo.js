// Initialize an array to store user tasks
let tasks = [];

// Check if there are any saved tasks
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    displayTasks();
}

// Declare form variables {submit, input}
const formSubmit = document.querySelector('form');
const formInput = document.querySelector('form input');
const formButton = document.querySelector('form button');

// When submit the form
formSubmit.addEventListener('submit', e => {
    e.preventDefault();

    // Add tasks
    if (formInput) {
        let task = {
            name: formInput.value,
            complete: false
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        formInput.value = '';
        displayTasks();
    }
})

// Edit task function
function editTask(val,index) {
    let newName = val;
    if (newName) {
        tasks[index].name = newName;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Delete task function
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// ToggleStatus function
function toggleStatus(index) {
    tasks[index].complete = !tasks[index].complete;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Display tasks function
function displayTasks() {
    let taskList = document.querySelector('#taskList');
    let taskCount = document.querySelector('#taskCount');
    let count = 0;
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {

        // List item
        let li = document.createElement('li');
        
        // Checkbox input
        let check = document.createElement('input');
        check.type = 'checkbox';
        check.checked = task.complete;
        check.addEventListener('click', e => {
            toggleStatus(index);
        })
        li.appendChild(check);

        // Span [user task]
        let span = document.createElement('span');
        span.innerText = task.name;
        span.addEventListener('click', e => {
            editTask(index)
        })
        if (task.complete) {
            span.style.textDecoration = 'line-through';
        }
        li.appendChild(span);

        // Edit button
        let openEditScreen = document.createElement('button');
        openEditScreen.innerText = 'Edit';
        openEditScreen.className = 'btn edit';
        openEditScreen.addEventListener('click', e => {
            editScreen.style.display = 'flex';
        })
        li.appendChild(openEditScreen)

        // Edit Popup
        let editScreen = document.createElement('div');
        editScreen.className = 'edit-screen';

        let closeEditScreen = document.createElement('button');
        closeEditScreen.innerText = 'x';
        closeEditScreen.className = 'closeEditScreen';
        closeEditScreen.addEventListener('click', e => {
            editScreen.style.display = 'none';
        })
        
        let editScreenInput = document.createElement('input');
        editScreenInput.placeholder = 'Enter new task'; 
        editScreenInput.className = 'editScreenInput';
        
        let editScreenButton = document.createElement('button');
        editScreenButton.className = 'btn edit';
        editScreenButton.innerText = 'Change Task';
        editScreenButton.addEventListener('click', e => {
            editTask(editScreenInput.value, index);
            editScreen.style.display = 'none';
        })

        editScreen.appendChild(closeEditScreen);
        editScreen.appendChild(editScreenInput);
        editScreen.appendChild(editScreenButton);
        li.appendChild(editScreen);

        // Delete Button
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'btn delete';
        deleteButton.addEventListener('click', e => {
            deleteTask(index);
        })
        li.appendChild(deleteButton);

        // Task Count 
        if (!task.complete) {
            count++;
        }

        taskList.appendChild(li)
    })

    if (count == 0) {
        taskCount.innerText = 'You have no tasks'
    } else {
        taskCount.innerText = `You have ${count} tasks`
    }
}

// ClearAll tasks
const clearAllButton = document.querySelector('.clear');
clearAllButton.addEventListener('click', e => {
    tasks = [];
    localStorage.removeItem('tasks');
    displayTasks();
})

// Set the username
const username = document.querySelector('#username');
username.addEventListener('change', e => {
    localStorage.setItem('username', JSON.stringify(username.value));
})
username.value = JSON.parse(localStorage.getItem('username'));
if (!localStorage.getItem('username')) {
    username.placeholder = 'John Doe....';
} else {
    username.value = JSON.parse(localStorage.getItem('username'))
}