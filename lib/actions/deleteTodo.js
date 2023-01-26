const fs = require('fs').promises;

function deleteTodo(selectedTodo, todosArr) {
  // filter todos array to exclude todo to be deleted
  const newTodosArr = todosArr.filter((todo) => todo !== selectedTodo);

  // initialise a string and then iterate through todos array adding each todo to it
  let stringOfTodos = '';
  newTodosArr.forEach((todo) => {
    stringOfTodos += todo;
    stringOfTodos += '\n';
  });

  // write the string to file
  return fs
    .writeFile('./todos.txt', stringOfTodos)
    .then(console.log('Todo successfully deleted!\n'))
    .catch((err) => console.log(err));
}

module.exports = deleteTodo;
