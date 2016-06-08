var api = require('../models/api');

var express = require('express');
var newUrlRouter = express.Router();

newUrlRouter.get(/.*/, function (req, res, next) {
  res.json(api.process(req.url.substr(1)));
});

module.exports = newUrlRouter;
