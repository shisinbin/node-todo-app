const { fstat } = require('fs');

const fs = require('fs').promises;

function showAllTodos() {
  return fs
    .readFile('./todos.txt', 'utf-8')
    .then((data) => {
      if (data === '') {
        return console.log('No Todos to show!\n');
      }
      console.log(data);
    })
    .catch((err) => console.log(err));
}

module.exports = showAllTodos;
