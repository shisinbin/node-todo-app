const inquirer = require('inquirer');
const fs = require('fs').promises;

function editTodo(selectedTodo, todosArr) {
  return inquirer
    .prompt({
      name: 'todo',
      message: 'Please enter your new edit.',
      default: `${selectedTodo}`,
    })
    .then((editedTodo) => {
      const newTodosArr = todosArr.map((todo) => {
        if (todo === selectedTodo) {
          return editedTodo.todo;
        } else {
          return todo;
        }
      });
      let stringOfTodos = '';
      newTodosArr.forEach((todo) => {
        stringOfTodos += todo;
        stringOfTodos += '\n';
      });
      return fs
        .writeFile('./todos.txt', stringOfTodos)
        .then(console.log('Todo successfully edited!\n'))
        .catch((err) => console.log(err));
    });
}

module.exports = editTodo;
