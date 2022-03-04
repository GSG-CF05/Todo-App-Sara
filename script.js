let submitButton = document.querySelector('button');
let input = document.querySelector('input');
let list = document.querySelector('ul');
let deleteBtn = document.getElementsByClassName('delete');

submitButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', pageOnLoad);
list.addEventListener('click', deleteElement);
list.addEventListener('click', editElement);

function addTask(e) {
  e.preventDefault();
  let task = input.value;
  /////
  if (task !== '') {
    let listItem = document.createElement('li');
    listItem.classList = 'item';
    listItem.addEventListener('dblclick', editContent);
    list.appendChild(listItem);
    ////////

    listItem.innerHTML = `
    <div class="text">
      <p>${task}</p>
    </div>
    <div class="icon">
      <i class="fa-solid fa-trash delete"></i>
      <i class="fa-solid fa-pen-to-square edit"></i>
    </div>
    `;
    input.value = '';

    saveToLocalStorage(task);
  } else {
    alert('please add a task');
  }
}

function saveToLocalStorage(value) {
  let allTasks = JSON.parse(localStorage.getItem('tasks'));
  if (allTasks) {
    allTasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  } else {
    let allTasks = [];
    allTasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }
}

function pageOnLoad() {
  let allTasks = JSON.parse(localStorage.getItem('tasks'));

  if (allTasks) {
    allTasks.forEach((task) => {
      let listItem = document.createElement('li');
      listItem.classList = 'item';
      list.appendChild(listItem);

      listItem.innerHTML = `
      <div class="text">
        <p>${task}</p>
      </div>
      <div class="icon">
        <i class="fa-solid fa-trash delete"></i>
        <i class="fa-solid fa-pen-to-square edit"></i>
      </div>
      `;
    });
  }
}

function deleteElement(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
    let li = e.target.parentElement.parentElement;
    let taskContent = li.firstElementChild.firstElementChild.textContent;
    deleteFromLocalStorage(taskContent);
  }
}

function deleteFromLocalStorage(taskContent) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let index = tasks.indexOf(taskContent);
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editContent(e) {
  console.log('item is double clicked');
}

function editElement(e) {
  let paraDiv = e.target.parentElement.parentElement.firstElementChild;
  let para =
    e.target.parentElement.parentElement.firstElementChild.firstElementChild;
  let paraContent = para.textContent;
  let checkInput = document.getElementsByClassName('edit-input');
  let iconDiv = document.getElementsByClassName('icon')[0];

  if (e.target.classList.contains('edit')) {
    if (checkInput.length === 0) {
      addEditInput(e.target, paraDiv, para, iconDiv);
    }
  } else if (e.target.classList.contains('check')) {
    let checkInput = document.getElementsByClassName('edit-input')[0];
    saveEdit(e, checkInput.value, paraContent);
    checkInput.remove();
    para.style.display = 'block';
    if (checkInput.value !== '') {
      para.textContent = checkInput.value;
    }
  }
}

function addEditInput(e, paraDiv, para, iconDiv) {
  e.parentElement.innerHTML = '<i class="fa-solid fa-square-check check"></i>';

  ////////
  let editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.classList = 'edit-input';
  editInput.value = para.textContent;
  paraDiv.appendChild(editInput);
  para.style.display = 'none';
}

function saveEdit(e, value, oldValue) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let index = tasks.indexOf(value);
  let oldIndex = tasks.indexOf(oldValue);
  if (index === -1 && value !== '') {
    tasks.splice(oldIndex, 1, value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    e.target.parentElement.innerHTML = `
    <i class="fa-solid fa-trash delete"></i>
    <i class="fa-solid fa-pen-to-square edit"></i>
    `;
  } else {
    e.target.parentElement.innerHTML = `
    <i class="fa-solid fa-trash delete"></i>
    <i class="fa-solid fa-pen-to-square edit"></i>
    `;
  }
}
