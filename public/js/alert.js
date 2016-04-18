var Todos = Todos || {};

Todos.Alert = function Alert() {

  console.log('New Todo.Alert.');

  var template =
  "<div class='alert-boilerplate alert alert-dismissible' role='alert'> " +
    "<button type='button' class='close' data-dismiss='alert' aria-label='Close'> " +
      "<span class='close-span' aria-hidden='true'>&times;</span> " +
    "</button> " +
    "<span class='alert-text'></span> " +
  "</div>";

  var create = function create(message, messageType) {
    var alert = $(template);

    alert.removeClass('alert-boilerplate');
    alert.addClass('alert-' + messageType);

    $(alert.find('.alert-text')).html(message);

    var closeButton = $(alert.find('.close-span'));

    closeButton.on('click', function() {
      alert.remove();
    });

    return alert;
  };

  return {
    create : create
  };

};
