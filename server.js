'use strict';

var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/' , (request, response) => response.render('index.ejs', {title: 'Hello'} ));

app.listen(3000, () => console.log('Up on port 3000'));
