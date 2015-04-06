module.exports = function(userArgs) {
  var projectName = userArgs[1];

  if (!projectName) {
    return nov.logErr("You need to specify a name for your project");
  }

  var createInitialBlueprint = function() {
    var resolver = Promise.pending();
    nov.logInfo("Creating project folder...");

    var ncp = require('ncp').ncp;
     
    ncp(path.resolve(__dirname, '../template-files/blueprint-project'), projectName, function (err) {
     if (err) return resolver.reject(err);

     resolver.resolve();
    });

    return resolver.promise;
  };

  var getDependencies = function() {
    var resolver = Promise.pending();
    nov.logInfo("Installing NPM dependencies...");

    try {
      process.chdir(projectName);

      // Run "npm install"
      var exec = require('child_process').exec;
      var child = exec('npm install', function(error, stdout, stderr) {
        if (stderr !== null) {
          console.log('' + stderr);
        }
        if (stdout !== null) {
          console.log('' + stdout);
        }
        if (error !== null) {
          console.log('' + error);
        }

        resolver.resolve();
      });
    }
    catch (err) {
      resolver.reject("Could not go to " + projectName + " directory");
    }

    return resolver.promise;
  };


  createInitialBlueprint()
  .then(getDependencies)
  .then(function() {
    nov.logSuccess("Created " + projectName + " project");
  })
  .catch(function(err) {
    return nov.logErr(err);
  });
}