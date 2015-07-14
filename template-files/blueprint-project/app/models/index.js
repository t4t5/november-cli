'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var inflect   = require('inflect');
var ssaclAttributeRoles = require('ssacl-attribute-roles');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../../config/config.json')[env];
var db        = {};
var sequelize;

// Create database connection
if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Attribute whitelisting/blacklisting
ssaclAttributeRoles(sequelize);

// Import models
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    var underscoreModel = inflect.singularize(inflect.underscore(model.name));
    db[underscoreModel] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;