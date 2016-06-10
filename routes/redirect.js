var api = require('../models/api');

var express = require('express');
var redirectRouter = express.Router();

redirectRouter.get(/.+/, function (req, res) {
  api.redirect(req, res);
});

module.exports = redirectRouter;
