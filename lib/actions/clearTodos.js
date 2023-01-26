const inquirer = require('inquirer');
const fs = require('fs').promises;

function clearTodos() {
  return fs
    .readFile('./todos.txt', 'utf-8')
    .then((data) => {
      if (data === '') {
        return console.log('No Todos to clear!\n');
      }

      return inquirer
        .prompt({
          name: 'confirm',
          type: 'list',
          message: 'Are you sure? This cannot be undone.',
          choices: [
            {
              name: 'Yes, delete all Todos',
              value: true,
            },
            {
              name: 'No, take me back',
              value: false,
            },
          ],
        })
        .then((choice) => {
          if (choice.confirm === false) {
            return console.log('');
          }
          return fs
            .writeFile('./todos.txt', '')
            .then(() => console.log('Todos deleted successfully!\n'))
            .catch((err) => console.log(err));
        });
    })
    .catch((err) => console.log(err));
}

module.exports = clearTodos;
