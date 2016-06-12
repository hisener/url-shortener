var db = require('../models/db');
var api = require('../models/api');

var express = require('express');
var newUrlRouter = express.Router();

newUrlRouter.get(/.*/, function (req, res) {
  var url = req.url.substr(1); // remove "/" from request url
  if (! api.test(url)) {
    res.json({ error: "Invalid URL format." });
    return;
  }
  
  var collection = db.getCollection();
  collection.findOneAndUpdate(
    { "last": true },
    { $set: { "last": false } }
  ).then(function (obj) {
    var last = obj.value;
    var shortUrl = (last === null) ? "aaa" : api.nextString(last["short_url"]);
    
    collection.insertOne({
      "short_url": shortUrl,
      "original_url": url,
      "last": true
    });

    var hostUrl = req.protocol + '://' + req.get('host');
    res.json({ "original_url": url, "short_url": hostUrl + '/' + shortUrl });
  });
});

module.exports = newUrlRouter;
