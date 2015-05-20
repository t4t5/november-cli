'use strict';

var fs        = require('fs');
var path      = require('path');
var inflect   = require('inflect');
var basename  = path.basename(module.filename);
var models    = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var underscore = inflect.singularize(inflect.underscore(file));
    models[underscore] = require('./' + file + '/.index.js');
  });

module.exports = models;