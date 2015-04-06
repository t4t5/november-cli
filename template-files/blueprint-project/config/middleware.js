var path      = require('path');
var express   = require('express');

var models       = require('../app/models');
global.giveError = require('../lib/give-error');

module.exports = function(app) {
  
  // Public assets
  app.use(express.static(path.join(path.normalize(path.join(__dirname, '..')), 'public')));
  
  // Load db models
  app.use(function(req, res, next) {
    models(function(err, db) {
      if (err) return next(err);

      req.models = db.alias;
      req.db     = db;

      return next();
    });
  });

  // Error handling
  app.use(giveError);
  
};