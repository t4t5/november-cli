module.exports = function(modelName, callback) {

  if (!modelName) {
    return nov.logErr("You need to specify a name for your model");
  }

  var modelFolderName = inflect.parameterize(inflect.singularize(modelName));


  var updateRouterFile = function() {
    var resolver = Promise.pending();

    var existingFile = 'app/router.js';
    var routerFileEnding = "\n\n};"

    fs.readFile(existingFile, 'utf8', function(err, existingData) {
      if (err) {
        return resolver.reject("Could not find router.js file!");
      }

      // Get the part right before the end and append to that
      existingData = existingData.substr(0, existingData.lastIndexOf('}')); 

      fs.readFile(nov.templateDir('router-route.js'), 'utf8', function (err, newData) {
        if (err) {
          return resolver.reject(err);
        }

        newData = nov.fillTemplatePlaceholders(newData, modelName);

        var replacementData = existingData + "\n" + newData + routerFileEnding;

        fs.writeFile(existingFile, replacementData, function (err) {
          if (err) {
            return resolver.reject(err);
          }

          resolver.resolve();
        });
      });
    });

    return resolver.promise;
  };


  var updateMasterController = function() {
    var resolver = Promise.pending();

    var modelCtrlName   = inflect.decapitalize(inflect.camelize(inflect.pluralize(modelName)));

    // Create folder
    mkdirp('app/controllers/' + modelFolderName, function(err) {
      if (err) {
        return resolver.reject("Could not create " + modelFolderName + " folder in app/controllers!");
      }

      var masterControllerFile = 'app/controllers/index.js';

      // Update the master controller file
      fs.readFile(masterControllerFile, 'utf8', function(err, existingData) {
        if (err) {
          return resolver.reject("Could not find controllers/index.js file!");
        }

        var fileStart  = "{";
        var fileEnding = "\n};"
        existingData = existingData.substr(0, existingData.lastIndexOf(fileEnding));

        // Check if there are any existing models already to detemine whether to add a "," or not:
        function isFirstController() {
          var existingModels = existingData.substr(existingData.indexOf(fileStart) + 1);
          return (existingModels.indexOf('require') === -1);
        }

        var newDataStart = isFirstController() ? "  " : ",\n  ";

        var newData = modelCtrlName + ": require('./" + modelFolderName + "')";
        var replacementData = existingData + newDataStart + newData + fileEnding;

        fs.writeFile(masterControllerFile, replacementData, function (err) {
          if (err) {
            return resolver.reject(err);
          }

          resolver.resolve();
        });
      });
    });

    return resolver.promise;
  };


  var createControllerMethods = function() {
    var resolver = Promise.pending();

    var methods = ['index', 'load', 'list', 'add', 'update', 'remove'];

    async.each(methods, function(method, callback) {
      var templateMethod = 'template-files/controller-files/' + method + '.js';
      var targetMethod   = 'app/controllers/' + modelFolderName + '/' + method + '.js';

      nov.generateFile(templateMethod, targetMethod, modelName, function(err) {
        if (err) return callback(err);

        callback();
      });

    }, function(err) {
      if (err) return resolver.reject(err);

      resolver.resolve();
    });

    return resolver.promise;
  };


  var createModelFile = function() {
    var resolver = Promise.pending();

    var templateModel = 'template-files/model.js';
    var targetModel   = 'app/models/' + modelFolderName + '.js';

    nov.generateFile(templateModel, targetModel, modelName, function(err) {
      if (err) return resolver.reject(err);

      resolver.resolve();
    });

    return resolver.promise;
  };


  var updateMasterModel = function() {
    var resolver = Promise.pending();

    var existingFile = 'app/models/index.js';

    fs.readFile(existingFile, 'utf8', function(err, existingData) {
      if (err) {
        return resolver.reject("Could not find " + existingFile);
      }

      var newData = "  require('./" + modelFolderName + "')(orm, db);\n";

      var n = existingData.indexOf("return cb(null") - 3;
      var replacementData = existingData.substring(0, n) + newData + existingData.substring(n);

      fs.writeFile(existingFile, replacementData, function (err) {
        if (err) {
          return resolver.reject(err);
        }

        resolver.resolve();
      });
    });

    return resolver.promise;
  };


  updateRouterFile()
  .then(updateMasterController)
  .then(createControllerMethods)
  .then(createModelFile)
  .then(updateMasterModel)
  .then(function() {
    callback();
  })
  .catch(function(err) {
    callback(err);
  });
};