#! /usr/bin/env node

'use strict';

// November commands
var newProject    = require('./actions/new-project');
var generateFiles = require('./actions/generate-files');
var showHelp      = require('./actions/show-help');


// Everything starts here...
readFromCommand(process.argv.splice(2));


function readFromCommand(userArgs) {
  var action = userArgs[0];

  switch (action) {

    case "new":
    case "n":
      newProject(userArgs);
      break;

    case "generate":
    case "g":
      generateFiles(userArgs);
      break;

    case "help":
    case "h":
      showHelp();
      break;

    default:
      console.log("Invalid command".error);
      showHelp();
      //console.log("Here are some things you can do:".help);
  }

}