var db = require('./db');

var test = function (url) {
  var re = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  
  if (re.test(url))
    return true;

  return false;
}

var nextString = function (str) {
  var length = str.length;
  var c = str.charAt(length - 1);

  if (c === 'z')
    return (length > 1) ? nextString(str.substr(0, length - 1)) + 'a' : "aa";

  return str.substr(0, length - 1) + String.fromCharCode(c.charCodeAt(0) + 1);
};

exports.newUrl = function(req, res) {
  var url = req.url.substr(1);

  if (! test(url)) {
    res.json({ error: "Invalid URL format." });
    return;
  }

  var collection = db.get().collection('shortlinks');
  collection.findOneAndUpdate(
    { "last": true },
    { $set: { "last": false } }
  ).then(function (obj) {
    var last = obj.value;
    var shortUrl = (last === null) ? "aaa" : nextString(last["short_url"]);
    
    collection.insertOne({
      "short_url": shortUrl,
      "original_url": url,
      "last": true
    });

    var fullUrl = req.protocol + '://' + req.get('host');
    res.json({ "original_url": url, "short_url": fullUrl + '/' + shortUrl });
  });
}

exports.redirect = function (req, res) {
  var shortUrl = req.url.substr(1);
  
  var collection = db.get().collection('shortlinks');
  collection.findOne({
    "short_url": shortUrl
  }).then(function(obj) {
    if (obj) {
      res.redirect(obj["original_url"]);
      return;
    }
    res.json({ error: "No short URL found." });
  });
}
