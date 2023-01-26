const inquirer = require('inquirer');
const fs = require('fs').promises;
const editTodo = require('./editTodo');
const deleteTodo = require('./deleteTodo');

function showUpdateMenu() {
  return fs
    .readFile('./todos.txt', 'utf-8')
    .then((todosRaw) => {
      const todosArr = todosRaw.split('\n');
      if (todosArr.length === 1) {
        return console.log('No Todos to update!\n');
      }

      // remove the last empty string
      todosArr.pop();

      return inquirer
        .prompt({
          type: 'list',
          name: 'todo',
          message: 'Please select a todo to update:',
          choices: [...todosArr],
        })
        .then((selectedTodo) => {
          return inquirer
            .prompt({
              name: 'option',
              type: 'list',
              message: `Selected Todo: ${selectedTodo.todo}\nEdit or Delete?`,
              choices: ['edit', 'delete'],
            })
            .then((choice) => {
              switch (choice.option) {
                case 'edit':
                  return editTodo(selectedTodo.todo, todosArr);
                default:
                  return deleteTodo(selectedTodo.todo, todosArr);
              }
            });
        });
    })
    .catch((err) => console.log(err));
}

module.exports = showUpdateMenu;
