var api = require('../models/api');

var express = require('express');
var newUrlRouter = express.Router();

newUrlRouter.get(/.*/, function (req, res) {
  api.newUrl(req, res);
});

module.exports = newUrlRouter;
