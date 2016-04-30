'use strict';
var express = require('express');
var db = require(process.cwd() + '/models/db');
var routes = require(process.cwd() + '/routes');

var app = express();
var development = app.get('env') === 'development';

// Set the view engine
app.set('view engine', 'jade');

if(development) {
  var morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(express.static(process.cwd() + '/public'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler for both production and development
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    path: process.cwd(),
    message: err.message,
    error: (development) ? err : {}
  });
});

// Connect MongoDB
db.connect(function(err) {
  if(err) {
    console.log('Connection error to MongoDB.');
    process.exit(1);
  }
  // Create HTTP server with app
  var http = require('http');
  var server = http.createServer(app);

  // Listen to port 3000
  server.listen(3000);
});
