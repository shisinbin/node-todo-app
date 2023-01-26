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
      // transform array to specifically replace todo that was edited
      const newTodosArr = todosArr.map((todo) => {
        if (todo === selectedTodo) {
          return editedTodo.todo;
        } else {
          return todo;
        }
      });

      // initialise a string and iterate through transformed array
      // adding each todo to it
      let stringOfTodos = '';
      newTodosArr.forEach((todo) => {
        stringOfTodos += todo;
        stringOfTodos += '\n';
      });

      // write string to file
      return fs
        .writeFile('./todos.txt', stringOfTodos)
        .then(console.log('Todo successfully edited!\n'))
        .catch((err) => console.log(err));
    });
}

module.exports = editTodo;
