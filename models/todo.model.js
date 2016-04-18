module.exports = function() {

  var mongoose = require('mongoose');
  var Schema = require('mongoose').Schema;

  var Todo = new Schema({
    title: String,
    items: [{description:String, date:Date, cost:Number}]
  });

  return mongoose.model('todo', Todo);

};
