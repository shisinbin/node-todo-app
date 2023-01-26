const inquirer = require('inquirer');
const fs = require('fs').promises;

function clearTodos() {
  return (
    fs
      // read the file
      .readFile('./todos.txt', 'utf-8')

      // use the data to help do a check
      .then((data) => {
        if (data === '') {
          throw new Error('No Todos to clear!');
        }
        return;
      })

      // show a prompt asking to confirm whether to proceed
      .then(() => {
        return inquirer.prompt({
          name: 'confirm',
          type: 'list',
          message: 'Are you sure? This cannot be undone.',
          choices: [
            {
              name: 'No, take me back',
              value: false,
            },
            {
              name: 'Yes, delete all Todos',
              value: true,
            },
          ],
        });
      })

      // based on user's choice, carry out appropriate action
      .then((choice) => {
        // if they cancel, then throw error to break chain
        if (choice.confirm === false) {
          throw new Error('Deletion cancelled.');
        }

        // write to file
        return fs.writeFile('./todos.txt', '');
      })

      // probably don't need another promise here?
      .then(() => console.log('Todos deleted successfully!\n'))
      .catch((err) => {
        if (err.code === 'ENOENT') {
          console.log('No stored Todos!\n');
          return;
        }
        console.log(err.message + '\n');
      })
  );
}

module.exports = clearTodos;
