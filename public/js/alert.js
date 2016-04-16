$('.alert > .close > span').map(function (alert) {

  $(alert).on('click', function() {
    console.log('Close.');
  });

});
