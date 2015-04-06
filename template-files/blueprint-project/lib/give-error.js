var prettyjson = require('prettyjson');
var colors     = require('colors/safe');
var inflect    = require('inflect');
var database   = require('../config/database');

module.exports = function(err, req, res, next) {
  if (knownError(err, res)) return;
  
  var userErr = generateUserError(req);
  errorForDev(req, err);
  errorForUser(res, userErr[0], userErr[1]);
};


// Check if the error code is known => if yes, return a more descriptive error message
function knownError(err, res) {
  switch (err.code) {
    case "ECONNREFUSED":
      logErr("Could not establish database connection. Are you sure that " + database.protocol + " is running?");
      return errorForUser(res, 500, "Could not establish database connection.");
      break;
  }
}

// Error that the client user sees in the browser (JSON)
function errorForUser(res, code, message) {
  var errorObj = {
    code: code,
    message: message
  };

  res.status(code).json({ error: errorObj });
  return true;
}

// Error that the developer sees in the terminal
function errorForDev(req, err) {
  console.log(""); // Blank row ( = easier to distinguish separate error messages)

  var errorObj = {
    code: err.code,
    message: err.message,
    user_message: generateUserError(req)[1],
    stack: getFormatedStack(err.stack),
    at: (new Date).toUTCString()
  };

  logErr(req.method + ' ' + req.url);
  logErr(errorObj);
}

// Simple error message for developer
function logErr(err) {
  if (typeof err === "object") {
    console.log(prettyjson.render(err, {
      keysColor:    'yellow',
      dashColor:    'magenta',
      numberColor:  'cyan',
      stringColor:  'white'
    }));
  } else {
    console.log(colors.red(err));
  }
}

// Show relevant information from the stack trace
function getFormatedStack(stack) {
  if (!stack) return "";
  var stack = stack.match(/\n\s{4}at\s(.*)\s\((.*\/)?(.*)\:([\d]+\:[\d]+)\)\n/);
  stack[2] = stack[2]&&stack[2].length?stack[2].replace(/^.*\/(.*\/)$/, " $1"):"";
  stack = "in "+stack[1]+", "+stack[2]+stack[3]+" "+stack[4];
  return stack;
}

// If no custom error was set, we can generate one using the req-object
// The client user will always get a friendly notice on what went wrong
function generateUserError(req) {
  if (req) {
    var hasId         = urlContainsId(req);
    var modelName     = getModelName(req);
    var modelSingular = inflect.decapitalize(inflect.humanize(inflect.singularize(modelName)));
    var modelPlural   = inflect.decapitalize(inflect.humanize(inflect.pluralize(modelName)));

    var isLoad   = (hasId  && req.method === "GET");
    var isUpdate = (hasId  && req.method === "PUT");
    var isDelete = (hasId  && req.method === "DELETE");
    var isList   = (!hasId && req.method === "GET");
    var isAdd    = (!hasId && req.method === "POST");

    var modelId;
    if (hasId) {
      modelId = getModelId(req);
    }

    if (isLoad) {
      return [404, "Could not load the " + modelSingular + " with id " + modelId];
    } else if (isUpdate) {
      return [406, "Could not update the " + modelSingular + " with id " + modelId];
    } else if (isDelete) {
      return [412, "Could not delete the " + modelSingular + " with id " + modelId];
    } else if (isList) {
      return [404, "No " + modelPlural + " were found."];
    } else if (isAdd) {
      return [412, "Could not create a new " + modelSingular];
    }
  }

  function getModelName(req) {
    var modelURL = getBaseURL(req);

    if (urlContainsId(req) && modelURL.indexOf('/') !== -1) {
      modelURL = modelURL.substr(0, modelURL.lastIndexOf('/'));
    }

    return (modelURL.substr(modelURL.lastIndexOf('/') + 1));
  }

  function getBaseURL(req) {
    var baseURL = null;

    if (req.url) {
      if (req.url.indexOf("?") !== -1){
        baseURL = req.url.substr(0, req.url.indexOf("?"));
      } else {
        baseURL = req.url;
      }
    }

    return baseURL;
  }

  function urlContainsId(req) {
    var modelId;
    var baseURL = getBaseURL(req);

    if (baseURL.indexOf('/') !== -1) {
      modelId = baseURL.substr(baseURL.lastIndexOf('/') + 1);
    }

    return !isNaN(modelId);
  }

  function getModelId(req) {
    var modelId;
    var baseURL = getBaseURL(req);

    if (baseURL.indexOf('/') !== -1) {
      modelId = baseURL.substr(baseURL.lastIndexOf('/') + 1);
    }

    return (!isNaN(modelId)) ? modelId : null;
  }

  function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
}