var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/urlshortener';
var collection = 'shortlinks';

var state = {
  db: null
};

exports.connect = function (done) {
  if (state.db)
    return done();

  MongoClient.connect(url, function (err, db) {
    if (err)
      return done(err);
    state.db = db;
    done();
  });
};

exports.get = function () {
  return state.db;
};

exports.getCollection = function() {
  return this.get().collection(collection);
}

exports.close = function (done) {
  if (state.db) {
    state.db.close(function (err, result) {
      state.db = null;
      done(err);
    });
  }
};
