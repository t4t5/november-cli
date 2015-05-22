// var Promise = require('bluebird');
// var path    = require('path');
// var exec    = require('promised-exec');
// var nov     = require('../lib/nov');
// var colors  = require('../lib/colors');
// var ncp     = require('ncp');
// var fs      = require('fs');
// var Spinner = require('cli-spinner').Spinner;

// Promise.promisifyAll(fs);
// Promise.promisifyAll(ncp);

/*
 * Copy the blueprint folder, and run "npm install" inside it
 */
 
module.exports = function(userArgs) {

  console.log("\nAvailable commands in November CLI:\n".help);

  console.log("november new " + "<project-name>".yellow);
  console.log(" Creates a new November project from scratch.\n".grey);

  console.log("november generate model " + "<model-name>".yellow);
  console.log(" Creates routes, controllers and a model.js file for your new model.\n".grey);

  console.log("november generate action " + "<model-name>".yellow);
  console.log(" Creates a route and a controller for your new action.\n".grey);

  console.log("november help");
  console.log(" Bring up this info box. :)\n".grey);

  console.log('');

  // var projectName = userArgs[1];

  // if (!projectName) {
  //   return nov.logErr("You need to specify a name for your project");
  // }

  // if (nov.novemberDir()) {
  //   userArgs.shift();
  //   return nov.logErr("You're trying to create a new November project inside an existing one! Did you mean to use `november generate " + userArgs.join(' ') + "?");
  // }

  // // Check if the folder already exists
  // try {
  //   stats = fs.lstatSync(projectName);
  //   return nov.logErr("There's already a project with the name " + projectName + " in this directory!");
  // }
  // catch (e) {
  //   var spinner = new Spinner('%s Building November project...');

  //   // Copy the contents of the blueprint folder to the user's app folder 
  //   ncp.ncpAsync(path.resolve(__dirname, '../template-files/blueprint-project'), projectName)
  //   .then(function() {
  //     return fs.readFileAsync(projectName + '/package.json', 'utf8');
  //   })
  //   // Set the name of the app in package.json
  //   .then(function(packageJsonContents) {
  //     packageJsonContents = nov.fillTemplatePlaceholders(packageJsonContents, projectName);
  //     return fs.writeFileAsync(projectName + '/package.json', packageJsonContents, 'utf8');
  //   })
  //   .then(function() {
  //     return fs.readFileAsync(projectName + '/public/index.html', 'utf8');
  //   })
  //   // Set the name of the app in index.html
  //   .then(function(htmlContents) {
  //     htmlContents = nov.fillTemplatePlaceholders(htmlContents, projectName);
  //     return fs.writeFileAsync(projectName + '/public/index.html', htmlContents, 'utf8');
  //   })
  //   .then(function() {
  //     return fs.readFileAsync(projectName + '/README.md', 'utf8');
  //   })
  //   // Set the name of the app in README.md
  //   .then(function(readmeContents) {
  //     readmeContents = nov.fillTemplatePlaceholders(readmeContents, projectName);
  //     return fs.writeFileAsync(projectName + '/README.md', readmeContents, 'utf8');
  //   })
  //   // Install NPM dependencies
  //   .then(function() {
  //     spinner.start();
  //     process.chdir(projectName); // Go into the created app's directory
  //     return exec('npm install')
  //   })
  //   .then(function() {
  //     spinner.stop(true);
  //     nov.logSuccess("Created " + projectName + " project! Now run `cd " + projectName + "` to get started!");
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //     nov.logErr(err);
  //   });
  // }

};
