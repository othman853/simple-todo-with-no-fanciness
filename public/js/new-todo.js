
$(document).ready(function() {

  var alert = new Todos.Alert();
  var socketServer = io.connect('http://localhost:3000');

  $('#new-todo-form').on('submit', function(event) {
    event.preventDefault();

    var todoTitle = $('#todo-title').val();
    socketServer.emit('new todo step 1', {title: todoTitle});
  });

  socketServer.on('new todo step 1 response', function (data) {
    var pageContainer = $('#container');
    var alertMessage = alert.create(data.message, 'success');
    pageContainer.prepend(alertMessage);

  });

});
