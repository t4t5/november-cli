'use strict';

var fs        = require('fs');
var path      = require('path');
var inflect   = require('inflect');
var basename  = path.basename(module.filename);
var controls  = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var baseName = path.basename(file, '.js');
    var underscoreName = inflect.underscore(baseName);
    controls[underscoreName] = require('./' + file);
  });

module.exports = controls;