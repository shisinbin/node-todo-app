const inquirer = require('inquirer');
const fs = require('fs').promises;

function showAddMenu() {
  return inquirer
    .prompt({
      name: 'todo',
      message: 'Please enter your todo text.',
    })
    .then((data) => {
      return fs
        .appendFile('./todos.txt', data.todo + '\n')
        .then(() => {
          console.log('Todo added successfully\n');
        })
        .catch((err) => console.log(err));
    });
}

module.exports = showAddMenu;
