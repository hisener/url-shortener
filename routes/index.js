var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.render('index', {
    title: 'API Project: URL Shortener Microservice',
    desc: '',
    path: fullUrl
  });
});

module.exports = router;
