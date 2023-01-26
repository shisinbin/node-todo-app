const fs = require('fs').promises;

function deleteTodo(selectedTodo, todosArr) {
  // console.log(selectedTodo, todosArr);
  const newTodosArr = todosArr.filter((todo) => todo !== selectedTodo);
  let stringOfTodos = '';
  newTodosArr.forEach((todo) => {
    stringOfTodos += todo;
    stringOfTodos += '\n';
  });
  return fs
    .writeFile('./todos.txt', stringOfTodos)
    .then(console.log('Todo successfully deleted!\n'))
    .catch((err) => console.log(err));
}

module.exports = deleteTodo;
