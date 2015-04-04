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


exports.isNovemberDir = function() {
  // These are the folders that should exist in order for the directory to be considered
  var folders = ['app', 'lib', 'app/actions', 'app/controllers', 'app/models'];

  for (var i = 0; i < folders.length; i++) {
    var folder = folders[i];
    try {
      var stats = fs.statSync(folder);
      if (!stats.isDirectory()) {
        isNovemberDir = false;
      }
    } catch (err) {
      return false;
    }
  }

  return true;
};


module.exports.generateFile = function(sourceFile, targetFile, callback) {

  fs.readFile(path.resolve(__dirname, '../' + sourceFile), 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }

    fs.writeFile(targetFile, data, 'utf8', function(err, data) {
      if (err) {
        return callback(err);
      }

      nov.logInfo('Generated ' + targetFile);
      callback();
    });

  });
};


module.exports.generateModel = function(modelName, callback) {

  if (!modelName) {
    return nov.logErr("You need to specify a name for your model");
  }

  var updateRouter = function() {
    var resolver = Promise.pending();

    var existingFile = 'app/router.js';
    var routerFileEnding = "\n\n\n  return router;\n};"

    fs.readFile(existingFile, 'utf8', function(err, existingData) {
      if (err) {
        return resolver.reject("Could not find router.js file!");
      }

      existingData = existingData.replace(/return(.|\n)*$/, '');

      fs.readFile(path.resolve(__dirname, '../template-files/router-route.js'), 'utf8', function (err, newData) {
        if (err) {
          return resolver.reject(err);
        }

        newData = newData.replace(/{{x-singular}}/g, inflect.singularize(modelName));
        newData = newData.replace(/{{x-plural-capitalize}}/g, inflect.capitalize(inflect.pluralize(modelName)));
        newData = newData.replace(/{{x-plural}}/g, inflect.pluralize(modelName));

        // Formatting
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


  updateRouter()
  .then(function() {
    nov.logSuccess(modelName + " model created");
  })
  .catch(function(err) {
    callback(err);
  });
};
