/* script.js */
// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  ['name', 'email', 'message'].forEach(id => document.getElementById(id + 'Error').textContent = '');

  const name = document.getElementById('name').value.trim();
  if (!name) { document.getElementById('nameError').textContent = 'Name is required.'; valid = false; }

  const emailField = document.getElementById('email');
  const email = emailField.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) { document.getElementById('emailError').textContent = 'Email is required.'; valid = false; }
  else if (!emailPattern.test(email)) { document.getElementById('emailError').textContent = 'Enter a valid email.'; valid = false; }

  const message = document.getElementById('message').value.trim();
  if (!message) { document.getElementById('messageError').textContent = 'Message cannot be empty.'; valid = false; }

  if (valid) { alert('Message sent successfully!'); this.reset(); }
});

// To-Do List Functionality
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = task;
    const btn = document.createElement('button');
    btn.innerHTML = '&times;';
    btn.classList.add('delete-btn');
    btn.addEventListener('click', () => { tasks.splice(index, 1); saveTasks(); renderTasks(); });
    li.append(span, btn);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) { tasks.push(task); saveTasks(); renderTasks(); todoInput.value = ''; }
});

function saveTasks() { localStorage.setItem('tasks', JSON.stringify(tasks)); }

renderTasks();
