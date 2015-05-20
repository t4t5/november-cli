#! /usr/bin/env node

'use strict';

// November commands
var newProject    = require('./actions/new-project');
var generateFiles = require('./actions/generate-files');


// Everything starts here...
readFromCommand(process.argv.splice(2));


function readFromCommand(userArgs) {
  var action = userArgs[0];

  switch (action) {

    case "new":
      newProject(userArgs);
      break;

    case "generate":
    case "g":
      generateFiles(userArgs);
      break;

    default:
      console.log("Invalid command".error);
      console.log("Here are some things you can do:".help);
  }

}