var Promise = require('bluebird');
var inflect = require('inflect');
var nov     = require('../lib/nov');
var colors  = require('../lib/colors');
var fs      = require('fs');

Promise.promisifyAll(fs);

/*
 * Update router.js and add the action file
 */
module.exports = function(actionName) {
  var finalResolver = Promise.pending();

  if (!actionName) {
    return nov.logErr("You need to specify a name for your action!");
  }

  // Check if the action already exists
  try {
    stats = fs.lstatSync(nov.novemberDir() + 'app/actions/' + actionName + '.js');
    finalResolver.reject("There's already an action with the name " + actionName + "!");
  }
  catch (e) {
    var actionFileName   = inflect.parameterize(actionName);
    var routerFileEnding = '\n\n};'
    var routerContents;

    // Get current contents of router.js file and remove last part
    fs.readFileAsync(nov.novemberDir() + 'app/router.js', 'utf8')
    .then(function(fileContents) {
      routerContents = fileContents.substr(0, fileContents.lastIndexOf('}'));
      return fs.readFileAsync(nov.templateDir('router-action.js'), 'utf8');
    })
    // Inject the code for a new route and save the new router.js file
    .then(function(actionCode) {
      actionCode     = nov.fillTemplatePlaceholders(actionCode, actionName);
      routerContents = routerContents + actionCode + routerFileEnding;
      return fs.writeFileAsync(nov.novemberDir() + 'app/router.js', routerContents, 'utf8');
    })
    // Add action file
    .then(function() {
      var templateFile = 'template-files/action.js';
      var targetPath   = 'app/actions/' + inflect.dasherize(actionName) + '.js';

      return nov.generateFile(templateFile, targetPath, actionName);
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
