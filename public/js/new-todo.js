var Todos = Todos || {};

$(document).ready(function() {

  var socketServer = io.connect('http://localhost:3000');
  var alert = new Todos.Alert();
  var newTodo = new Todos.Components.NewTodo($('#container'), alert, socketServer);

  newTodo.initialize();

});
