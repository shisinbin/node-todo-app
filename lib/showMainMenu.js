const inquirer = require('inquirer');
const showAllTodos = require('./actions/showAllTodos');
const showAddMenu = require('./actions/showAddMenu');
const showUpdateMenu = require('./actions/showUpdateMenu');
const clearTodos = require('./actions/clearTodos');

function showMainMenu() {
  inquirer
    .prompt({
      type: 'list',
      name: 'option',
      message: 'Please select an option.',
      choices: [
        {
          name: 'Show all Todos',
          value: 'show',
        },
        {
          name: 'Add a Todo',
          value: 'add',
        },
        {
          name: 'Update a Todo',
          value: 'update',
        },
        {
          name: 'Clear Todos',
          value: 'clear',
        },
        {
          name: 'Exit the app.',
          value: 'exit',
        },
      ],
    })
    .then((choice) => {
      // Call a function on their choice
      switch (choice.option) {
        case 'show':
          showAllTodos()
            // show main menu afterwards
            .then(showMainMenu);
          break;
        case 'add':
          showAddMenu()
            // show main menu afterwards
            .then(showMainMenu);
          break;
        case 'update':
          showUpdateMenu()
            // show main menu afterwards
            .then(showMainMenu);
          break;
        case 'clear':
          clearTodos()
            // show main menu afterwards
            .then(showMainMenu);
          break;
        default:
          console.log('Thank you for using the Todo Pro App!');
          process.exit();
      }
    });
}

module.exports = showMainMenu;
