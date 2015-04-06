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


module.exports.generateFile = function(sourceFile, targetFile, modelName, callback) {

  fs.readFile(path.resolve(__dirname, '../' + sourceFile), 'utf8', function (err, data) {
    if (err) {
      return callback(err);
    }

    if (modelName) {
      data = nov.fillTemplatePlaceholders(data, modelName);
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


module.exports.fillTemplatePlaceholders = function(str, modelName) {
  str = str.replace(/{{x}}/g, modelName);
  str = str.replace(/{{x-table}}/g, inflect.underscore(inflect.pluralize(modelName)));
  str = str.replace(/{{x-singular}}/g, inflect.decapitalize(inflect.camelize(inflect.singularize(modelName))));
  str = str.replace(/{{x-plural}}/g, inflect.decapitalize(inflect.camelize(inflect.pluralize(modelName))));
  // str = str.replace(/{{x-plural-capitalize}}/g, inflect.capitalize(inflect.pluralize(modelName)));
  return str;
};


module.exports.templateDir = function(dir) {
  return path.resolve(__dirname, '../template-files/' + dir);
};
