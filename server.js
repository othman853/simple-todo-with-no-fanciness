'use strict';

var express = require('express');
var app = express();
var io = require('socket.io');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/' , (request, response) => response.render('new-todo.ejs'));

var httpServer = require('http').createServer(app);
var socketClient = io(httpServer);

httpServer.listen(3000, () => console.log('Up on port 3000'));

socketClient.on('connect', (client) => {

  client.on('new todo step 1', (data) => {
    client.emit('new todo step 1 response', {message: data.title + ' was created'});
  });

  client.on('new todo', (data) => {
    console.log(require('util').inspect(data, { depth: null }));
  });

});
