exports.test = function (url) {
  var re = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  
  if (re.test(url))
    return true;

  return false;
}

exports.nextString = function (str) {
  var length = str.length;
  var c = str.charAt(length - 1);

  if (c === 'z')
    return (length > 1) ?
      this.nextString(str.substr(0, length - 1)) + 'a' : "aa";

  return str.substr(0, length - 1) + String.fromCharCode(c.charCodeAt(0) + 1);
};
