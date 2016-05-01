var express = require('express');
var apiRouter = express.Router();
var api = require('../models/api');

// todo: 80 characters limit
var regex = /^\/([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
apiRouter.get(regex, function(req, res, next) {
  res.json({ result: req.params["0"] });
  // todo: send req.params["0"] to api model
});

module.exports = apiRouter;
