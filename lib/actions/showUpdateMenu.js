const inquirer = require('inquirer');
const fs = require('fs').promises;
const editTodo = require('./editTodo');
const deleteTodo = require('./deleteTodo');

function showUpdateMenu() {
  // initialise variables so they can be used lower down the promise chain
  let selectedTodo = '';
  let todosArr = [];

  return (
    fs
      // read the file
      .readFile('./todos.txt', 'utf-8')

      // inject todos array into tracking variable
      .then((todosRaw) => {
        todosArr = todosRaw.split('\n');

        // if file exists but it's empty, then break out of chain by throwing error
        if (todosArr.length === 1) {
          throw new Error('No Todos to update!');
        }

        // remove the last empty string
        todosArr.pop();

        return todosArr;
      })

      // using todos array, show a prompt of choices showing each todo
      .then((todosArr) => {
        return inquirer.prompt({
          type: 'list',
          name: 'todo',
          message: 'Please select a todo to update:',
          choices: [...todosArr],
        });
      })

      // store selected todo and show an edit or delete prompt
      .then((selectedTodoObj) => {
        selectedTodo = selectedTodoObj.todo;
        return inquirer.prompt({
          name: 'option',
          type: 'list',
          message: `Selected Todo: ${selectedTodo}\nEdit or Delete?`,
          choices: ['edit', 'delete'],
        });
      })

      // using choice, trigger appropriate function call
      .then((choice) => {
        switch (choice.option) {
          case 'edit':
            const editPromise = editTodo(selectedTodo, todosArr);
            return editPromise;
          default:
            const deletePromise = deleteTodo(selectedTodo, todosArr);
            return deletePromise;
        }
      })
      .catch((err) => {
        if (err.code === 'ENOENT') {
          console.log('No stored Todos!\n');
          return;
        }
        console.log(err.message + '\n');
      })
  );
}

module.exports = showUpdateMenu;

// First attempt with nested promises
// function showUpdateMenu() {
//   return fs
//     .readFile('./todos.txt', 'utf-8')
//     .then((todosRaw) => {
//       const todosArr = todosRaw.split('\n');
//       if (todosArr.length === 1) {
//         return console.log('No Todos to update!');
//       }
//       // remove the last empty string
//       todosArr.pop();
//       return inquirer
//         .prompt({
//           type: 'list',
//           name: 'todo',
//           message: 'Please select a todo to update:',
//           choices: [...todosArr],
//         })
//         .then((selectedTodo) => {
//           return inquirer
//             .prompt({
//               name: 'option',
//               type: 'list',
//               message: `Selected Todo: ${selectedTodo.todo}\nEdit or Delete?`,
//               choices: ['edit', 'delete'],
//             })
//             .then((choice) => {
//               switch (choice.option) {
//                 case 'edit':
//                   return editTodo(selectedTodo.todo, todosArr);
//                 default:
//                   return deleteTodo(selectedTodo.todo, todosArr);
//               }
//             });
//         });
//     })
//     .catch((err) => console.log(err));
// }
