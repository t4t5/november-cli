module.exports = function(userArgs) {
  var projectName = userArgs[1];

  if (!projectName) {
    return nov.logErr("You need to specify a name for your project");
  }

  var createInitialBlueprint = function() {
    var resolver = Promise.pending();

    var ncp = require('ncp').ncp;
     
    ncp(path.resolve(__dirname, '../template-files/blueprint-project'), projectName, function (err) {
     if (err) return resolver.reject(err);

     resolver.resolve();
    });

    return resolver.promise;
  };


  createInitialBlueprint()
  .then(function() {
    nov.logSuccess("Created " + projectName + " project");
  })
  .catch(function(err) {
    return nov.logErr(err);
  });
}