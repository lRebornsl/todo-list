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
      for (let i = this.todoData.length - 1; i >= 0; i -= 1) {
        if (this.todoData[i].completed === true) {
          this.delTask(i);
        }
      }
    });
  }

  render() {
    this.todoList.innerHTML = '';

    for (let i = 0; i < this.todoData.length; i += 1) {
      this.todoData.forEach((data) => {
        if (data.index === i) {
          const task = document.createElement('div');
          const line = document.createElement('hr');
          const checkLi = document.createElement('div');
          const checkBtn = document.createElement('button');
          const item = document.createElement('li');
          const itemText = document.createElement('p');
          const svg = document.createElement('div');
          const editForm = document.createElement('form');
          const editInput = document.createElement('input');
          task.classList.add('main__item', 'flex');
          checkLi.classList.add('checkLi', 'flex');
          task.innerHTML = '';
          checkBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cccccc" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            </svg>
          `;
          checkLi.appendChild(checkBtn);
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

          checkBtn.addEventListener('click', () => {
            if (this.todoData[i].completed === false) {
              this.todoData[i].completed = true;
              item.classList.add('completed');
              checkBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4899e9" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              `;
            } else {
              this.todoData[i].completed = false;
              item.classList.remove('completed');
              checkBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cccccc" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                </svg>
              `;
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

  delTask(index) {
    this.todoData.splice(index, 1);
    for (let i = index; i < this.todoData.length; i += 1) {
      this.todoData[i].index -= 1;
    }
    localStorage.setItem('todoData', JSON.stringify(this.todoData));
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