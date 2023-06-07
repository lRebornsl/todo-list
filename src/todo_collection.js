const todo = [
  {
    description: 'Task 1',
    completed: true,
    index: 2,
  },
  {
    description: 'Task 2',
    completed: true,
    index: 0,
  },
  {
    description: 'Task 3',
    completed: true,
    index: 1,
  },
];

class ToDoCollection {
  constructor() {
    this.todoData = todo;
    this.todoList = document.querySelector('.main__ulist');
  }

  render() {
    this.todoList.innerHTML = '';

    for (let i = 0; i < this.todoData.length; i += 1) {
      this.todoData.forEach((data) => {
        if (data.index === i) {
          const task = document.createElement('div');
          const line = document.createElement('hr');
          task.classList.add('main__item');
          task.innerHTML = `<li>${data.description}</li>`;
          this.todoList.appendChild(line);
          this.todoList.appendChild(task);
        }
      });
    }
  }
}

export default ToDoCollection;