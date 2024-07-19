const submit = document.querySelector("button");
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');



submit.addEventListener('click', (e) => {
    e.preventDefault();
    const todo = todoInput.value;
    if (todo) {
        addtask(todo);
        todoInput.value = '';
    }
})

function addtask(todo) {
    const li = document.createElement('li');
    li.innerHTML = `${todo}
    <button class="delete">X</button>`
    todoList.appendChild(li);
    const remove = li.querySelector('.delete');

    remove.addEventListener('click', () => {
        li.remove();
        saveTask();
    })
    saveTask();
}

function saveTask(){
    const tasks = [];
    const listItems = document.querySelectorAll('li');
    listItems.forEach(li =>{
        tasks.push(li.textContent.replace('X','').trim());
    })
    const taskJSON = JSON.stringify(tasks)
    localStorage.setItem('Localtasks',taskJSON);
}

function loadTask(){
    const taskJSON = localStorage.getItem('Localtasks')
    if(taskJSON){
        const tasks = JSON.parse(taskJSON);
        tasks.forEach(task => addtask(task));
    }
}

document.addEventListener('DOMContentLoaded',loadTask);