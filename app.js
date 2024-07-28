const submit = document.querySelector("button");
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');


const allTasksButton = document.getElementById('all-tasks');
const completedTasksButton = document.getElementById('completed-tasks');
const uncompletedTasksButton = document.getElementById('uncompleted-tasks');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const todo = todoInput.value;
    if (todo) {
        addtask(todo);
        todoInput.value = '';
    }
})

function addtask(todo, completed = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (completed) {
        li.classList.add('completed');
    }
    li.innerHTML = `${todo}
    <button class="delete">X</button> <button class="complete">✔</button>`
    todoList.appendChild(li);
    const remove = li.querySelector('.delete');

    remove.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    const completeButton = li.querySelector('.complete');
    completeButton.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const items = todoList.querySelectorAll('li');
    items.forEach(item => {
        const taskText = item.childNodes[0].textContent.trim();
        const completed = item.classList.contains('completed');
        tasks.push({ text: taskText, completed });
    });
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksJSON);
}

function loadTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    if (tasksJSON) {
        const tasks = JSON.parse(tasksJSON);
        tasks.forEach(task => addtask(task.text, task.completed));
    }
}


allTasksButton.addEventListener('click', () => {
    uncompletedTasksButton.style.backgroundColor = "#4a754cec";
    allTasksButton.style.backgroundColor = "#aff706ec";
    completedTasksButton.style.backgroundColor = "#4a754cec";

    const items = todoList.querySelectorAll('li');
    items.forEach(item => item.style.display = 'list-item');
});

completedTasksButton.addEventListener('click', () => {
    uncompletedTasksButton.style.backgroundColor = "#4a754cec";
    allTasksButton.style.backgroundColor = "#4a754cec";
    completedTasksButton.style.backgroundColor = "#aff706ec";

    const items = todoList.querySelectorAll('li');
    items.forEach(item => {
        if (item.classList.contains('completed')) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
});

uncompletedTasksButton.addEventListener('click', () => {
    uncompletedTasksButton.style.backgroundColor = "#aff706ec";
    allTasksButton.style.backgroundColor = "#4a754cec";
    completedTasksButton.style.backgroundColor = "#4a754cec";

    const items = todoList.querySelectorAll('li');
    items.forEach(item => {
        if (item.classList.contains('completed')) {
            item.style.display = 'none';
        } else {
            item.style.display = 'list-item';
        }
    });
});


document.addEventListener('DOMContentLoaded', loadTasks);