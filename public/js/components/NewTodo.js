var Todos = Todos || {};
Todos.Components = Todos.Components || {};

Todos.Components.NewTodo = function (container, alert, socketServer) {

  var template =
  "<div class='col-lg-12 text-center'>" +
    "<h2>Create a new Todo</h2>" +
  "</div>" +

  "<div id='new-todo-form' class='col-lg-8 col-lg-offset-2'>" +

    "<div class='form-group'>" +
      "<label for='todo-title'>Todo Title</label>" +
      "<input type='text' class='form-control' id='todo-title' placeholder='Todo Title'>" +
    "</div>" +

    "<div id='todo-item-container'></div>" +

    "<button id='add-todo-item' type='button' class='btn btn-default'>Add Todo Item</button>" +
    "<button id='create-todo' type='button' class='btn btn-primary pull-right'>Create Todo</button>" +
  "</div>";

  var todoItemTemplate =
  "<div class='todo-item form-inline margin-bottom-15'> " +
    "<div class='form-group'> " +
      "<label>Description</label> " +
      "<input type='text' class='form-control' name='todo-item-description' placeholder='My Todo Item'>" +
    "</div>" +

    "<div class='form-group margin-left-25'> " +
      "<label>Date</label> " +
      "<input type='date' class='form-control' name='todo-item-date' placeholder='09/09/2016'> " +
    "</div> " +

    "<div class='form-group pull-right'> " +
      "<label>Cost</label> " +
      "<input type='number' class='form-control' name='todo-item-cost'> " +
    "</div> " +
  "</div>";

  function bindEvents() {
    $('#add-todo-item').on('click', function() {
      $('#todo-item-container').append($(todoItemTemplate));
    });

    $('#create-todo').on('click', function() {
      var todoData = getTodoData();

      socketServer.emit('new todo', todoData);
    });

    socketServer.on('new todo step 1 response', function (data) {
      container.prepend(alert.create(data.message, 'success'));
    });
  }

  function getTodoData() {
    var todoTitle = $('#todo-title').val();

    var items = [];

    $('#todo-item-container').children('.todo-item').each(function(index, todoNode) {
        var todo = {};

        todo.description = $(todoNode).find("input[name='todo-item-description']").val();
        todo.date = $(todoNode).find("input[name='todo-item-date']").val();
        todo.price = $(todoNode).find("input[name='todo-item-price']").val();

        items.push(todo);
    });

    return {title: todoTitle, items: items};
  }

  var initialize = function() {
    container.append($(template));
    bindEvents();
  };

  return {
    initialize: initialize
  };

};
