let submitButton = document.querySelector('button');
let input = document.querySelector('input');
let list = document.querySelector('ul');
localStorage.setItem('tasks', '[]');

submitButton.addEventListener('click', addTask);

function addTask(e) {
  e.preventDefault();
  let task = input.value;
  /////
  let listItem = document.createElement('li');
  listItem.classList = 'item';
  list.appendChild(listItem);
  ////////

  listItem.innerHTML = `
  <div class="text">
    <p>${task}</p>
  </div>
  <div class="icon">
    <i class="fa-solid fa-trash"></i>
    <i class="fa-solid fa-pen-to-square"></i>
  </div>
  `;
  input.value = '';

  saveToLocalStorage(task);
}

function saveToLocalStorage(value) {
  let allTasks = JSON.parse(localStorage.getItem('tasks'));
  allTasks.push(value);

  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

// let item = document.querySelector('li');
// // console.log(item);

// item.addEventListener('click', printHi);

// function printHi(e) {
//   let content = e.target.textContent;
//   console.log(e.target.innerHTML.includes('<'));
//   if (!e.target.innerHTML.includes('<')) {
//     e.target.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
//     console.log(e.target.innerHTML);

//     console.log(content);
//   } else {
//     e.target.innerHTML = content;
//   }
// }

// [
//   arr[0][0],
//   arr[0][1],
//   arr[0][2],
//   arr[1][2],
//   arr[2][2],
//   arr[2][1],
//   arr[2][0],
//   arr[1][0],
//   arr[1][1],
// ];

// let textDiv = document.createElement('div');
// textDiv.classList = 'text';
// listItem.appendChild(textDiv);
// listItem.appendChild(textDiv);

// //////////

// let text = document.createElement('p');
// text.textContent = task;
// textDiv.appendChild(text);

// ///
// let iconDiv = document.createComment('div');
// iconDiv.classList = 'icon';
// listItem.appendChild(iconDiv);

// iconDiv.innerHTML = '<i class="fa-solid fa-trash"></i>';
