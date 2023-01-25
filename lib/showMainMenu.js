const inquirer = require('inquirer');
const showAllTodos = require('./actions/showAllTodos');
const showAddMenu = require('./actions/showAddMenu');

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
            // Call main menu to show the menu after displaying todos
            .then(showMainMenu);
          break;
        case 'add':
          showAddMenu()
            // Call main menu to show the menu after displaying todos
            .then(showMainMenu);
          break;
        default:
          console.log('Thanks for using the Todo Pro App!');
          process.exit();
      }
    });
}

module.exports = showMainMenu;
