#! /usr/bin/env node

'use strict';

global.fs      = require('fs');
global.inflect = require('inflect');
global.path    = require('path');
global.Promise = require('bluebird');
global.mkdirp  = require('mkdirp');
global.async   = require('async');

global.colors  = require('./lib/colors');          // Log messages in color
global.nov     = require('./lib/nov');             // Tiny library for November-specific stuff

// November commands
var createProject = require('./actions/new-project');
var generateFiles = require('./actions/generate-files');



// Everything starts here...
readFromCommand(process.argv.splice(2));


function readFromCommand(userArgs) {
  var action = userArgs[0];

  switch (action) {

    case "new":
      createProject(userArgs);
      break;

    case "generate":
    case "g":
      generateFiles(userArgs);
      break;

    default:
      nov.logErr("Invalid command");
      console.log("Here are some things you can do:".help);

  }
}