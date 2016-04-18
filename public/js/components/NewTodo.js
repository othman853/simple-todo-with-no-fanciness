var Todos = Todos || {};
Todos.Components = Todos.Components || {};

Todos.Components.NewTodo = function (container, alert, socketServer) {

  var template =
  "<div class='col-lg-12 text-center'>" +
    "<h2>Create a new Todo</h2>" +
  "</div>" +

  "<form id='new-todo-form' class='col-lg-6 col-lg-offset-3'>" +

    "<div class='form-group'>" +
      "<label for='todo-title'>Todo Title</label>" +
      "<input type='text' class='form-control' id='todo-title' placeholder='Todo Title'>" +
    "</div>" +

    "<button type='submit' class='btn btn-default'>Create</button>"
  "</form>";

  var render = function() {
    container.append($(template));
  };

  var bindEvents = function() {
    $('#new-todo-form').on('submit', function(event) {
      event.preventDefault();

      var todoTitle = $('#todo-title').val();
      $('#todo-title').val('');
      
      socketServer.emit('new todo step 1', {title: todoTitle});
    });

    socketServer.on('new todo step 1 response', function (data) {
      var pageContainer = $('#container');
      var alertMessage = alert.create(data.message, 'success');
      pageContainer.prepend(alertMessage);

    });
  };

  return {
    render: render,
    bindEvents: bindEvents
  };

};
