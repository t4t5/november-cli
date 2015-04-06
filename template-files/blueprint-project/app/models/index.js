var database = require('../../config/database');
require('dotenv').load();

var connection = null;

function setup(db, cb) {

  return cb(null, db);
}

module.exports = function(cb) {
  if (connection) return cb(null, connection);

  orm.connect(database, function (err, db) {
    if (err) return cb(err);

    connection = db;
    db.settings.set('instance.returnAllErrors', true);

    db.alias = {};
    setup(db, cb);
  });
};