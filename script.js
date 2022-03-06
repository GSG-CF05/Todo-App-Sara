// Get access to all the items that need to be clicked/edited/saved
let submitButton = document.querySelector('button'); //The submit button
let input = document.querySelector('input'); // The input element 'to get the value'
let list = document.querySelector('ul'); //The entire list
// .........................................................................
//..........................................................................

submitButton.addEventListener('click', addTask); // To add an element
document.addEventListener('DOMContentLoaded', pageOnLoad); // To have the tasks on page when loaded
list.addEventListener('click', deleteElement); // click event on the ul for deleting items
list.addEventListener('click', editElement); // click event on the ul for editing items
list.addEventListener('click', finishedTask);

// ------------------------ To add list items on the page ----------------------- //
// ------------------------------------------------------------------------------ //
function addTask(e) {
  e.preventDefault(); // First prevent the button from reloading the page
  let task = input.value; // Get the value from the input

  // check if the value is not an empty string
  if (task !== '') {
    let listItem = document.createElement('li'); // Get the li element

    listItem.classList = 'item'; // Give the new li the class 'item'

    list.appendChild(listItem); // Append the new li to the ul

    // Give the new li the content below// ${task} => input value
    listItem.innerHTML = `
    <div class="text">
      <p>${task}</p>
    </div>
    <div class="icon">
      <i class="fa-solid fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash delete"></i> 
    </div>
    `;
    // empty the input
    input.value = '';
    // Save the new task in the local storage using (saveToLocalStorage) function
    // which takes the task as parameter
    saveToLocalStorage(task);
  } else {
    // alert is the input value is ''
    alert('please add a task');
  }
}

// -------------------- To Save the task in the local storage ---------------------- //
// --------------------------------------------------------------------------------- //
function saveToLocalStorage(value) {
  let taskObject = {
    todo: value,
    status: 'incomplete',
  };
  let allTasks = JSON.parse(localStorage.getItem('tasks')); // Get the task array and check if it exists
  if (allTasks) {
    // push the new task to task array and save it again in the local storage
    allTasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  } else {
    // If there is no task array, create an empty array for the tasks
    let allTasks = [];
    // push the task and save the array in the local storage
    allTasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }
}

// ------------------- to get the list on page even after reloading the page ------------ //
// -------------------------------------------------------------------------------------- //
function pageOnLoad() {
  // Get the task array from local storage and test if it exists
  let allTasks = JSON.parse(localStorage.getItem('tasks'));

  if (allTasks) {
    // Loop over the array
    allTasks.forEach((task) => {
      if (task.status === 'incomplete') {
        // create a new li for each task
        let listItem = document.createElement('li');
        listItem.classList = 'item';

        // Append each li to th ul
        list.appendChild(listItem);
        // Give each li the content below
        listItem.innerHTML = `
      <div class="text">
        <p>${task.todo}</p>
      </div>
      <div class="icon">
        <i class="fa-solid fa-pen-to-square edit"></i>
        <i class="fa-solid fa-trash delete"></i>
      </div>
      `;
      } else {
        // create a new li for each task
        let listItem = document.createElement('li');
        listItem.classList = 'item';
        listItem.classList.add('completed');

        // Append each li to th ul
        list.appendChild(listItem);
        // Give each li the content below
        listItem.innerHTML = `
      <div class="text">
        <p class="completed-task">${task.todo}</p>
      </div>
      <div class="icon completed">
        <i class="fa-solid fa-pen-to-square edit"></i>
        <i class="fa-solid fa-trash delete"></i>
      </div>
      `;
      }
    });
  }
}
// ------------------ to delete a list item from the page ---------------------- //
// ----------------------------------------------------------------------------- //
function deleteElement(e) {
  //When ul is clicked, it checks is the clicked element has the 'delete' class
  if (e.target.classList.contains('delete')) {
    // get the li element
    let li = e.target.parentElement.parentElement;
    // To reach the content of the paragraph in the li (The task)
    let taskContent = li.firstElementChild.firstElementChild.textContent;
    // Remove the li element from the page
    li.remove();
    // execute the 'deleteFromLocalStorage' function which takes the task as a parameter
    deleteFromLocalStorage(taskContent);
  }
}

// ----------------- to delete the task from local storage ------------------ //
// -------------------------------------------------------------------------- //
function deleteFromLocalStorage(taskContent) {
  //get the tasks array from the local storage
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let taskValues = [];
  tasks.forEach((task) => {
    taskValues.push(task.todo);
  });

  // save the index of given task in a variable
  let index = taskValues.indexOf(taskContent);
  // then delete the task from the task array using splice
  tasks.splice(index, 1);
  // save the new array in the local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --------------------------- to edit a task --------------------------- //
// ---------------------------------------------------------------------- //
function editElement(e) {
  // get access to the div which contains the paragraph
  let paraDiv = e.target.parentElement.parentElement.firstElementChild;
  // access the paragraph
  let para = paraDiv.firstElementChild;
  // access the content of the paragraph (the task)
  let paraContent = para.textContent;

  // check if the clicked element in ul contains the class 'edit'
  if (e.target.classList.contains('edit')) {
    // execute the 'addEditInput' function which takes the clicked element/<div>/ and <p> as parameters
    addEditInput(e.target, paraDiv, para);

    // else check if the clicked element in ul contains the class 'check'
    // which is the element responsible for saving the changes
  } else if (e.target.classList.contains('check')) {
    // let checkInput = document.getElementsByClassName('edit-input')[0];

    // get th input value of the li that contains the clicked icon
    let checkInput =
      e.target.parentElement.parentElement.firstElementChild.children[1];
    // save the modified value in the local storage
    // the 'saveEdit' takes three parameters// 1-e  2-the modified task 3-the old task
    saveEdit(e, checkInput.value, paraContent);

    //delete the added input element
    checkInput.remove();
    //return the paragraph
    para.style.display = 'block';

    //if input value != '' , give the paragraph the value
    if (checkInput.value !== '') {
      para.textContent = checkInput.value;
    }
  }
}

// ------------------- to add input element for the edit ------------------ //
// ------------------------------------------------------------------------ //
function addEditInput(e, paraDiv, para) {
  // change the icons from (delete - edit) to a (check) icon
  e.parentElement.innerHTML = '<i class="fa-solid fa-square-check check"></i>';

  // create a new input element
  let editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.classList = 'edit-input';
  // give it the value of the paragraph
  editInput.value = para.textContent;
  // append the input in the task-div
  paraDiv.appendChild(editInput);
  // make the paragraph invisible
  para.style.display = 'none';

  //// ---- basically change the paragraph with an input in order to modify the task ------//
}

// ----------------- to save the edited task in local storage ---------------- //
// --------------------------------------------------------------------------- //
function saveEdit(e, value, oldValue) {
  // get the task array
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let taskValues = [];
  tasks.forEach((task) => {
    taskValues.push(task.todo);
  });
  // save the indexes of the new task value and old one in variables
  let index = taskValues.indexOf(value);
  let oldIndex = taskValues.indexOf(oldValue);

  // if the new task isn't in the array and != ''
  if (index === -1 && value !== '') {
    // replace the old task with the new one and save to local storage
    tasks[oldIndex].todo = value;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // change the icons from (check) to (delete- edit)
    e.target.parentElement.innerHTML = `
    <i class="fa-solid fa-pen-to-square edit"></i>
    <i class="fa-solid fa-trash delete"></i>
    `;
  } else {
    // if the task value is already in task array
    e.target.parentElement.innerHTML = `
    <i class="fa-solid fa-pen-to-square edit"></i>
    <i class="fa-solid fa-trash delete"></i>
    `;
  }
}

// ----------------------- when the task is finished --------------------- //
// ----------------------------------------------------------------------- //
function finishedTask(e) {
  // get the para content
  // get access to li element
  // get the tasks array from local storage
  let task = e.target.textContent;
  let listItem = e.target.parentElement.parentElement; // li
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let taskValues = []; // take only the todos
  tasks.forEach((task) => {
    taskValues.push(task.todo);
  });
  let index = taskValues.indexOf(task); // the index of the task
  if (e.target.tagName === 'P') {
    if (listItem.classList.contains('completed')) {
      // remove class = completed from both the li and icons div
      // remove class = completed-task from the para
      listItem.classList.remove('completed');
      listItem.children[1].classList.remove('completed');
      e.target.classList.remove('completed-task');
      tasks[index].status = 'incomplete'; // change the status of the task
      localStorage.setItem('tasks', JSON.stringify(tasks)); // save the changes
    } else {
      // give both the li and icons div class = completed from
      // give the para class = completed-task
      listItem.classList.add('completed');
      listItem.children[1].classList.add('completed');
      e.target.classList = 'completed-task';
      tasks[index].status = 'completed';
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
}
