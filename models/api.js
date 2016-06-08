var db = require('./db.js').get();

exports.test = function(url) {
  var re = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  
  if (re.test(url))
    return true;

  return false;
}

exports.next = function() {

}

exports.process = function(url) {
  if (! this.test(url)) {
    return { error: "Invalid URL format." };
  }
  return { original_url: url, short_url: "" };
}

exports.getUrl = function(id) {
  // todo: find id
  // if exists return original url.
  return null;
}
