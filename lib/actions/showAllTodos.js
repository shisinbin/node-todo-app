const { fstat } = require('fs');

const fs = require('fs').promises;

function showAllTodos() {
  return fs.readFile('./todos.txt', 'utf-8').then((data) => {
    console.log(data);
  });
}

module.exports = showAllTodos;
