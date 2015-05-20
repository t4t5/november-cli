module.exports = function(req, res, next) {
  var db = require('../models');

  db.sequelize.sync()
  .then(function(err) {
    req.models = db;
    next();
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
    next(err);
  });
};