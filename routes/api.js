var express = require('express'),
    apiRouter = express.Router();

apiRouter.get('/:url', function(req, res, next) {
  res.json({ });
});

module.exports = apiRouter;
