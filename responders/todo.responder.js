var Todo = require('../models/todo.model.js')();

module.exports = (client) => {

  client.on('new todo step 1', (data) => {
    client.emit('new todo step 1 response', {message: data.title + ' was created'});
  });

  client.on('new todo', (data) => {
    var todo = new Todo(data);
    todo
      .save()
      .then( () => client.emit('new todo save success', {message: 'Todo Created!'}))
      .catch( (error) => client.emit('new todo save error', {message: 'Failed to create todo.'}));
  });
};
