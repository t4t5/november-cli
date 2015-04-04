module.exports = function(userArgs) {
  var fileType = userArgs[1];

  if (!nov.isNovemberDir()) {
    return nov.logErr("You have to be inside a November project in order to use this command.");
  }

  if (!fileType) {
    return nov.logErr("You need to specify what you want to generate");
  }


  switch (fileType) {

    // case "router":
    //   nov.generateFile('template-files/router.js', 'router.js', function(err) {
    //     if (err) {
    //       return nov.logErr(err);
    //     }
    //   });
    //   break;

    case "model":
      var modelName = userArgs[2];

      nov.generateModel(modelName, function(err) {
        if (err) {
          return nov.logErr(err);
        }
        nov.logInfo("Updated router.js");
      });
      break;

    default:
      nov.logErr('Unknown file type');
  }
}
