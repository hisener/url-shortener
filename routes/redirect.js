var api = require('../models/api');

var express = require('express');
var redirectRouter = express.Router();

redirectRouter.get(/.+/, function (req, res) {
  var url = api.getUrl(req.url.substr(1));
  if (url) {
    res.redirect(url);
    return;
  }
  res.json({ error: "No short URL found." });
  // Maybe redirect or render 404.
});

module.exports = redirectRouter;
