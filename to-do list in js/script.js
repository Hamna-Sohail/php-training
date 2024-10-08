const addButton = document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const filterSelect = document.getElementById('Select');

addButton.addEventListener('click', function() {
    const taskText = todoInput.value;
    if (taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="taskCheckbox">
            <span>${taskText}</span>
            <button class="deleteButton">Clear</button>
        `;
        todoList.appendChild(li);
        todoInput.value = '';
        const checkbox = li.querySelector('.taskCheckbox');
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                li.querySelector('span').classList.add('completed');
            } else {
                li.querySelector('span').classList.remove('completed');
            }
            filterTasks();
        });

        const deleteButton = li.querySelector('.deleteButton');
        deleteButton.addEventListener('click', function() {
            todoList.removeChild(li);
        });
    }
});

filterSelect.addEventListener('change', filterTasks);

function filterTasks() {
    const filterValue = filterSelect.value;
    const tasks = todoList.getElementsByTagName('li');

    for (let task of tasks) {
        const isCompleted = task.querySelector('.taskCheckbox').checked;

        if (filterValue === 'all') {
            task.style.display = '';
        } else if (filterValue === 'completed' && !isCompleted) {
            task.style.display = 'none';
        } else if (filterValue === 'incompleted' && isCompleted) {
            task.style.display = 'none';
        } else {
            task.style.display = '';
        }
    }
}