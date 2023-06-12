import Task from './task.js';

class ToDoCollection {
  constructor() {
    this.todoData = JSON.parse(localStorage.getItem('todoData')) || [];
    this.todoList = document.querySelector('.main__ulist');
    const addBtn = document.getElementById('addBtn');
    const addEnter = document.getElementById('addEnter');
    const delBtn = document.getElementById('delBtn');

    const addFunction = (e) => {
      e.preventDefault();
      if (addEnter.value !== '') {
        let i = 0;
        this.todoData.forEach(() => { i += 1; });
        const newTask = new Task(addEnter.value, false, i);
        this.addTask(newTask);
        addEnter.value = '';
      }
    };

    addEnter.addEventListener('submit', addFunction);
    addBtn.addEventListener('click', addFunction);
    delBtn.addEventListener('click', () => {
      this.delTask();
    });
  }

  render() {
    this.todoList.innerHTML = '';

    for (let i = 0; i < this.todoData.length; i += 1) {
      this.todoData.forEach((data) => {
        if (data.completed === true) {
          data.completed = false;
          localStorage.setItem('todoData', JSON.stringify(this.todoData));
        }
        if (data.index === i) {
          const task = document.createElement('div');
          const line = document.createElement('hr');
          const checkLi = document.createElement('div');
          const checkInput = document.createElement('input');
          const item = document.createElement('li');
          const itemText = document.createElement('p');
          const svg = document.createElement('div');
          const editForm = document.createElement('form');
          const editInput = document.createElement('input');
          task.classList.add('main__item', 'flex');
          checkLi.classList.add('checkLi', 'flex');
          checkInput.setAttribute('type', 'checkbox');
          checkLi.appendChild(checkInput);
          itemText.classList.add('editText');
          itemText.innerHTML = `${data.description}`;
          item.appendChild(itemText);
          editInput.classList.add('editInput', 'hidden');
          editInput.setAttribute('type', 'text');
          editInput.setAttribute('value', `${data.description}`);
          editInput.setAttribute('required', '');
          editForm.appendChild(editInput);
          item.appendChild(editForm);
          checkLi.appendChild(item);
          task.appendChild(checkLi);
          svg.classList.add('svg');
          svg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cccccc" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </svg>
          `;
          task.appendChild(svg);
          this.todoList.appendChild(line);
          this.todoList.appendChild(task);

          /* Add event listener to the checkbox */

          checkInput.addEventListener('change', () => {
            if (this.todoData[i].completed === false) {
              this.todoData[i].completed = true;
              localStorage.setItem('todoData', JSON.stringify(this.todoData));
              item.classList.add('completed');
            } else {
              this.todoData[i].completed = false;
              localStorage.setItem('todoData', JSON.stringify(this.todoData));
              item.classList.remove('completed');
            }
          });

          item.addEventListener('click', () => {
            const inputList = Array.from(document.querySelectorAll('.editInput'));
            const editText = Array.from(document.querySelectorAll('.editText'));
            const bgInput = Array.from(document.querySelectorAll('.main__item'));
            const svgBtn = Array.from(document.querySelectorAll('.svg'));
            if (editInput.classList.contains('hidden')) {
              const valInput = inputList.find((item) => !item.classList.contains('hidden'));
              const valText = editText.find((item) => item.classList.contains('hidden'));
              const valBg = bgInput.find((item) => item.classList.contains('bg-yellow'));
              const valSvg = svgBtn.find((item) => item.classList.contains('trash'));
              const svgList = document.querySelectorAll('.svg');

              if (valInput) {
                valInput.classList.add('hidden');
                valText.classList.remove('hidden');
                valBg.classList.remove('bg-yellow');
                valSvg.classList.remove('trash');
              }

              editInput.classList.remove('hidden');
              editInput.focus();
              itemText.classList.add('hidden');
              task.classList.add('bg-yellow');
              svg.classList.add('trash');

              const svgTrash = document.querySelector('.trash');

              svgTrash.addEventListener('click', () => {
                this.todoData.splice(i, 1);
                for (let j = i; j < this.todoData.length; j += 1) this.todoData[j].index = j;
                localStorage.setItem('todoData', JSON.stringify(this.todoData));
                this.render();
              });

              svgList.forEach((item) => {
                if (item.classList.contains('trash')) {
                  item.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cccccc" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  `;
                } else {
                  item.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cccccc" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                      <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>
                  `;
                }
              });
            }
          });

          editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.editTask(i, editInput.value);
          });

          svg.addEventListener('click', (e) => {
            e.preventDefault();
            this.render();
          });
        }
      });
    }
  }

  addTask(task) {
    this.todoData.push(task);
    localStorage.setItem('todoData', JSON.stringify(this.todoData));
    this.render();
  }

  delTask() {
    const falseTask = this.todoData.filter(item => item.completed === false);
    for (let i = 0; i < falseTask.length; i += 1) falseTask[i].index = i;
    localStorage.setItem('todoData', JSON.stringify(falseTask));
    this.todoData = falseTask;
    this.render();
  }

  editTask(index, description) {
    const editIndex = this.todoData.findIndex((item) => item.index === index);
    this.todoData[editIndex].description = description;
    localStorage.setItem('todoData', JSON.stringify(this.todoData));
    this.render();
  }
}

export default ToDoCollection;