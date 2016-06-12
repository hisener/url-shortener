var db = require('../models/db');
var api = require('../models/api');

var express = require('express');
var redirectRouter = express.Router();

redirectRouter.get(/.+/, function (req, res) {
  var collection = db.getCollection();

  collection.findOne({
    "short_url": req.url.substr(1)
  }).then(function(obj) {
    if (obj) {
      res.redirect(obj["original_url"]);
      return;
    }
    res.json({ error: "No short URL found." });
  });
});

module.exports = redirectRouter;
