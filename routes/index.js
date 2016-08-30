var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  res.render('index', {
    title: 'API Project: URL Shortener Microservice',
    path: fullUrl
  })
})

router.use('/new', require('./newUrl'))
router.use('/', require('./redirect'))

module.exports = router
