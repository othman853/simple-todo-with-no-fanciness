'use strict';

var mongoose = require('mongoose');

global.db = mongoose.connect('mongodb://localhost:27017/todos-and-expenses', (error) => {

  if (error) {
    console.error('Could not connect to the database on localhost');
    process.exit(1);
  }

  var express = require('express');
  var app = express();
  var io = require('socket.io');

  var routes = require('./routes');
  var responders = require('./responders');

  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/public'));

  app.get('/' , routes.root);

  var httpServer = require('http').createServer(app);
  var socketClient = io(httpServer);

  httpServer.listen(3000, () => console.log('Up on port 3000'));

  socketClient.on('connect', responders.todo);

});
