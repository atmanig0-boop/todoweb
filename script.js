const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const progressText = document.getElementById('progressText');
const barFill = document.getElementById('barFill');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.done).length;
  progressText.textContent = `${completed}/${total}`;
  barFill.style.width = total ? `${(completed / total) * 100}%` : '0%';
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateProgress();
}

addTaskBtn.onclick = () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, done: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
};
renderTasks();
