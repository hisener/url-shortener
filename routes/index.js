var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
    title: 'API Project: URL Shortener Microservice',
    desc: ''
  });
});

router.use('/new', require('./newUrl'));
router.use('/', require('./redirect'));

module.exports = router;
