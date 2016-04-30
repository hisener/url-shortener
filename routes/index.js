var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'API Project: URL Shortener Microservice',
    desc: '',
  });
});

router.use('/', require('./api.js'));

module.exports = router;
