var Promise = require('bluebird');
var async   = require('async');
var inflect = require('inflect');
var nov     = require('../lib/nov');
var colors  = require('../lib/colors');
var fs      = require('fs');
var mkdirp  = require('mkdirp');

Promise.promisifyAll(fs);
Promise.promisifyAll(mkdirp);

/*
 * Update router.js, add the CRUD-files and finally the model file
 */
module.exports = function(modelName) {

  var finalResolver = Promise.pending();

  if (!modelName) {
    return nov.logErr("You need to specify a name for your model");
  }

  // Check if the model already exists
  try {
    stats = fs.lstatSync(nov.novemberDir() + 'app/models/' + modelName + '.js');
    finalResolver.reject("There's already a model with the name " + modelName + "!");
  }
  catch (e) {
    var routerContents;
    var routerFileEnding = "\n\n};";
    var modelFolderName  = inflect.parameterize(inflect.singularize(modelName));

    // Get current contents of router.js file and remove last part
    fs.readFileAsync(nov.novemberDir() + 'app/router.js', 'utf8')
    .then(function(fileContents) {
      routerContents = fileContents.substr(0, fileContents.lastIndexOf('}'));
      return fs.readFileAsync(nov.templateDir('router-model.js'), 'utf8');
    })
    // Inject the code for a new route and save the new router.js file
    .then(function(routeCode) {
      console.log("before_fill_template".info);
      routeCode = '\n' + nov.fillTemplatePlaceholders(routeCode, modelName);
      console.log("after_fill_template".info);
      routerContents = routerContents + routeCode + routerFileEnding;
      return fs.writeFileAsync(nov.novemberDir() + 'app/router.js', routerContents);
    })
    // Create the model's folder inside "controllers"
    .then(function() {
      return mkdirp.mkdirpAsync(nov.novemberDir() + 'app/controllers/' + modelFolderName)
    })
    // Add all the CRUD-actions for the model
    .then(function() {
      var resolver = Promise.pending();

      var files = ['.index', 'load', 'list', 'add', 'update', 'remove'];

      async.each(files, function(file, callback) {
        var templateMethod = 'template-files/controller-files/' + file + '.js';
        var targetMethod   = 'app/controllers/' + modelFolderName + '/' + file + '.js';

        nov.generateFile(templateMethod, targetMethod, modelName)
        .then(function() {
          callback();
        })
        .catch(function(err) {
          return callback(err);
        });

      }, function(err) {
        if (err) return resolver.reject(err);
        resolver.resolve();
      });

      return resolver.promise;
    })
    // Generate the file inside "models"
    .then(function() {
      var templateFile = 'template-files/model.js';
      var targetPath = 'app/models/' + modelFolderName + '.js';

      return nov.generateFile(templateFile, targetPath, modelName);
    })
    .then(function() {
      finalResolver.resolve();
    })
    .catch(function(err) {
      finalResolver.reject(err);
    });
  }

  return finalResolver.promise;

};
