var prettyjson = require('prettyjson');
var colors     = require('colors/safe');
var inflect    = require('inflect');
var handy      = require('./handy');

/*
 * Take a Sequelize error (or one thrown by the user) and >
 * > show a detailed error for the dev while showing a human-friendly
 * > error for the client user
 */
module.exports = function(err, req, res, next) {
  var userErr = generateUserError(req);

  if (typeof err === "string") {
    userErr[1] = err;
  }

  if (err.constructor && err.constructor === Array
    && err.length > 1
    && (typeof err[0] === "number") && (typeof err[1] === "string")) {
    
    userErr[0] = err[0];
    userErr[1] = err[1];
  }

  errorForDev(req, err, userErr);
  errorForUser(res, userErr);
};

// Error that the client user sees in the browser (JSON)
function errorForUser(res, err) {
  var errorObj = {
    code: err[0],
    title: err[1]
  };

  res.status(err[0]).json({ error: errorObj });
  return true;
}

// Error that the developer sees in the terminal
function errorForDev(req, err, userErr) {
  var errorObj = {
    code: err.code || userErr[0],
    api_message: userErr[1],
    error: err.message
  };

  if (getFormatedStack(err.stack)) {
    errorObj.stack = getFormatedStack(err.stack);
  }
  
  errorObj.at = (new Date).toUTCString();

  logErr(req.method + ' ' + req.url);
  logErr(errorObj);
}

// Nice colors for the developer
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
  if (!stack) return '';
  var stack = stack.match(/\n\s{4}at\s(.*)\s\((.*\/)?(.*)\:([\d]+\:[\d]+)\)\n/);
  stack[2]  = stack[2]&&stack[2].length?stack[2].replace(/^.*\/(.*\/)$/, " $1"):"";
  stack     = "in " + stack[1] + ", " + stack[2] + stack[3] + " " + stack[4];
  return stack;
}

/*
 * If no custom error was set, we can generate a generic one using the req-object.
 * The client user will always get a friendly notice that something went wrong.
 */
function generateUserError(req) {
  if (req) {
    var hasId         = handy.urlContainsId(req);
    var modelName     = handy.getModelName(req);
    var modelSingular = inflect.decapitalize(inflect.humanize(inflect.singularize(modelName)));
    var modelPlural   = inflect.decapitalize(inflect.humanize(inflect.pluralize(modelName)));

    var isLoad   = (hasId  && req.method === "GET");
    var isUpdate = (hasId  && req.method === "PUT");
    var isDelete = (hasId  && req.method === "DELETE");
    var isList   = (!hasId && req.method === "GET");
    var isAdd    = (!hasId && req.method === "POST");

    var modelId;
    if (hasId) {
      modelId = handy.getModelId(req);
    }

    if (isLoad) {
      return [500, "Could not load the " + modelSingular + " with id " + modelId];
    } else if (isUpdate) {
      return [500, "Could not update the " + modelSingular + " with id " + modelId];
    } else if (isDelete) {
      return [500, "Could not delete the " + modelSingular + " with id " + modelId];
    } else if (isList) {
      return [500, "Could not load " + modelPlural];
    } else if (isAdd) {
      return [500, "Could not create a new " + modelSingular];
    }
  }

  function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
}
