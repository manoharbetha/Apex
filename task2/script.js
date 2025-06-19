document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;

            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required.';
                nameError.style.display = 'block';
                nameInput.closest('.form-group').classList.add('error');
                isValid = false;
            } else {
                nameError.textContent = '';
                nameError.style.display = 'none';
                nameInput.closest('.form-group').classList.remove('error');
            }

            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required.';
                emailError.style.display = 'block';
                emailInput.closest('.form-group').classList.add('error');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                emailInput.closest('.form-group').classList.add('error');
                isValid = false;
            } else {
                emailError.textContent = '';
                emailError.style.display = 'none';
                emailInput.closest('.form-group').classList.remove('error');
            }

            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required.';
                messageError.style.display = 'block';
                messageInput.closest('.form-group').classList.add('error');
                isValid = false;
            } else {
                messageError.textContent = '';
                messageError.style.display = 'none';
                messageInput.closest('.form-group').classList.remove('error');
            }

            if (isValid) {
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }

    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✕';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            newTaskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskButton.addEventListener('click', addTask);

    newTaskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
