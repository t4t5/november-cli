var Promise = require('bluebird');
var path    = require('path');
var inflect = require('inflect');
var colors  = require('./colors');
var fs      = require('fs');
var Finder  = require('fs-finder');

Promise.promisifyAll(fs);

/*
 * Some nice colorized logging
 */
module.exports.logErr = function(str) {
  if (typeof(str) !== "string") {
    str = str.toString();
  }

  if (arguments[1] === "sys") {
    str = str.substring(str.lastIndexOf(':') + 2);
    str = "Error: " + str.replace(/(\r\n|\n|\r)/gm,"");
  }

  console.log(str.error);
};
module.exports.logInfo = function(str) {
  console.log(str.data);
};
module.exports.logSuccess = function(str) {
  console.log(str.info);
};


/*
 * Check if the user is inside a November app directory (or a sub-directory) by >
 * > seeing if there's a package.json-file (this function could be better)
 */
var novemberDir = function() {
  var files = Finder.in('.').findFiles('package.json');

  var novemberDir;
  if (files.length) {
    novemberDir = files[0];
    novemberDir = novemberDir.replace(/package.json/, '');
  }

  return novemberDir;
};
exports.novemberDir = novemberDir;


/*
 * Generate a new file based on a template file
 */
module.exports.generateFile = function(sourceFile, targetFile, modelName) {
  var resolver = Promise.pending();

  fs.readFileAsync(path.resolve(__dirname, '../' + sourceFile), 'utf8')
  .then(function(data) {
    if (modelName) {
      data = fillTemplatePlaceholders(data, modelName);
    }
    return fs.writeFileAsync(novemberDir() + targetFile, data, 'utf8');
  })
  .then(function() {
    console.log(('Generated ' + targetFile).data);
    resolver.resolve();
  })
  .catch(function(err) {
    resolver.reject(err);
  });

  return resolver.promise;
};


/*
 * Replace {{x}} in the template files with the model/action name
 */
var fillTemplatePlaceholders = function(str, modelName) {
  str = str.replace(/{{x}}/g, modelName);
  str = str.replace(/{{x-singular}}/g, inflect.decapitalize(inflect.camelize(inflect.singularize(modelName))));
  str = str.replace(/{{x-plural}}/g, inflect.decapitalize(inflect.camelize(inflect.pluralize(modelName))));

  str = str.replace(/{{x-camelcase}}/g, inflect.decapitalize(inflect.camelize(modelName.replace(/-/g, '_'))));
  str = str.replace(/{{x-dashed}}/g, inflect.dasherize(modelName));
  str = str.replace(/{{x-underscore}}/g, inflect.underscore(modelName));
  str = str.replace(/{{x-human}}/g, inflect.humanize(modelName).replace(/-/g, ' '));

  str = str.replace(/{{x-plural-camelcase}}/g, inflect.decapitalize(inflect.camelize(inflect.pluralize(modelName.replace(/-/g, '_')))));
  str = str.replace(/{{x-singular-camelcase}}/g, inflect.decapitalize(inflect.camelize(inflect.singularize(modelName.replace(/-/g, '_')))));
  str = str.replace(/{{x-singular-capitalize}}/g, inflect.camelize(inflect.singularize(modelName.replace(/-/g, '_'))));
  str = str.replace(/{{x-singular-underscore}}/g, inflect.underscore(inflect.singularize(modelName)));
  str = str.replace(/{{x-table}}/g, inflect.underscore(inflect.pluralize(modelName)));

  return str;
};
exports.fillTemplatePlaceholders = fillTemplatePlaceholders;


/*
 * Quick access to the template-files directory
 */
module.exports.templateDir = function(dir) {
  return path.resolve(__dirname, '../template-files/' + dir);
};
