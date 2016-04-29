'use strict';

var express = require('express');
var routes = require(process.cwd() + '/routes/index');

var app = express();

// Set the views directory
app.set('views', process.cwd() + '/views');
// Set the view engine
app.set('view engine', 'jade');

app.use(express.static(process.cwd() + '/public'));
app.use('/', routes);

// Create HTTP server with app
var http = require('http');
var server = http.createServer(app);

// Listen to port 3000
server.listen(3000);
//server.on('listening', function);
