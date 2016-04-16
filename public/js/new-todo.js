$(document).ready(function() {

  var socketServer = io.connect('http://localhost:3000');

  $('#new-todo-form').on('submit', function(event) {
    event.preventDefault();

    var todoTitle = $('#todo-title').val();
    socketServer.emit('new todo step 1', {title: todoTitle});
  });

  socketServer.on('new todo step 1 response', function (data) {
    var pageContainer = $('#container');
    var alertMessage = $('.alert-boilerplate').first().clone();

    alertMessage.find('.alert-text').text(data.message);
    alertMessage.removeClass('alert-boilerplate');

    pageContainer.prepend(alertMessage);

  });

});
