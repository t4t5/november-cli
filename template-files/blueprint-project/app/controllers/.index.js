'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);
var models    = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    models[file] = require('./' + file + '/.index.js');
  });

module.exports = models;