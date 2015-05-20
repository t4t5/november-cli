var nov            = require('../lib/nov');
var colors         = require('../lib/colors');
var generateModel  = require('./generate-model');
var generateAction = require('./generate-action');

module.exports = function(userArgs) {
  var fileType = userArgs[1];

  if (!nov.novemberDir()) {
    return nov.logErr("You have to be inside a November project in order to use this command.");
  }

  if (!fileType) {
    return nov.logErr("You need to specify what you want to generate");
  }

  if (!userArgs[2]) {
    return nov.logErr("You need to specify the name of what you want to generate!");
  }


  switch (fileType) {

    case "model":
      var modelName = userArgs[2];

      generateModel(modelName).then(function() {
        nov.logSuccess(modelName + " model created");
      }).catch(nov.logErr);

      break;

    case "action":
      var actionName = userArgs[2];

      generateAction(actionName).then(function() {
        nov.logSuccess(actionName + " action created");
      }).catch(nov.logErr);

      break;

    default:
      nov.logErr('Unknown type. Did you mean `november generate model ' + userArgs[2] + '`?');

  }
};
