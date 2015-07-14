var prettyjson = require('prettyjson');
var colors     = require('colors/safe');
var inflect    = require('inflect');
var humps      = require('humps');
var handy      = require('./handy');

/*
 * Take a Sequelize model (with all of its eventual associations) >
 * > and convert it to simple JSON according to the JSON API spec >
 * > used by Ember Data.
 */
module.exports = function(req, res, obj, opts) {
  var JSONKey = determineJSONKeyName(req);

  // Convert Sequelize model to simple JSON
  var objData = unwrapProperties(obj);
  objData     = replaceForeignKeys(objData);
  objData     = humps.camelizeKeys(objData);

  // Set the key name for that object
  var json = {};
  json[JSONKey] = objData;

  // Determine whether to sideload associations or not
  if (!opts || opts && opts.embedded !== true) {
    json = sideload(json, JSONKey, opts);
  }

  console.log(colors.green(req.method + ' ' + req.url)); // console output (for dev)
  res.json(json); // http output (for user)
}


/* 
 * Convert embedded data to sideloaded data
 * Go through each element, keep their ids intact and push the values to a new root key
 * Example: { user: {...} } => becomes { user: 1 } with a sideloaded user
 */
function sideload(json, JSONKey, opts) {

  if (json[JSONKey].constructor === Array) {
    json[JSONKey].forEach(function(element) {
      element = convertToSideload(element);
    });
  } else {
    json[JSONKey] = convertToSideload(json[JSONKey]);
  }

  function convertToSideload(obj) {
    for (i in obj) {
      var value = obj[i];
      var isArray = (value && typeof value[0] === "object");
      var isSingleObj = (typeof value === "object" && value && value.id);
      
      // For both
      if (isArray || isSingleObj) {
        var sideKey = inflect.pluralize(i);

        // Check if user doesnt want certain objects embedded
        if (opts && opts.embedded && opts.embedded.indexOf(sideKey) !== -1) {
          continue;
        }

        if (!json[sideKey]) {
          json[sideKey] = [];
        }
      }

      // Specific cases
      if (isArray) {
        json[sideKey].push(value[0]);

        var onlyIds = [];
        value.forEach(function(valueObj) {
          onlyIds.push(valueObj.id);
        });

        obj[i] = onlyIds;

      } else if (isSingleObj) {
        json[sideKey].push(value);
        obj[i] = value.id;
      }
    }

    return obj;
  }

  return json;
}


/*
 *  If one of the keys is a foreign key (ends with _id) >
 *  > then replace it with the name of the field (nicer to work with in Ember)
 *  Example: user_id => user
 */
function replaceForeignKeys(objData) {

  if (objData.constructor === Array) {
    for (i in objData) {
      var objEl = objData[i];
      objData[i] = removeIdPart(objEl);
    }
  } else {
    objData = removeIdPart(objData);
  }

  function removeIdPart(objEl) {
    for (key in objEl) {
      var lastThree = key.substr(key.length - 3);
      var keyWithoutLastThree = key.substr(0, key.length - 3);
      
      if (lastThree === "_id") {
        if (!objEl[keyWithoutLastThree]) {
          objEl[keyWithoutLastThree] = objEl[key];
        }
        delete objEl[key];
      }
    }
    return objEl;
  }

  return objData;
}


/*
 * Takes a Sequelize object and returns a >
 * > simple JavaScript object with the model values
 */
function unwrapProperties(obj) {

  var objData;

  // Get standard properties
  if (obj.constructor === Array) {
    objData = [];
    if (obj.length) {
      obj.forEach(function(objEl) {
        objData.push(objEl.get());
      });
    }
  } else {
    objData = obj.get();
  }

  // Get pseudo (computed) properties
  if (obj.constructor === Array) {
    for (i in obj) {
      var objEl = obj[i];
      objData[i] = getPseudoProperties(objData[i], objEl);
    }
  } else {
    objData = getPseudoProperties(objData, obj);
  }

  function getPseudoProperties(objData, objEl) {
    if (objEl.__options && objEl.__options.getterMethods) {
      for (getter in objEl.__options.getterMethods) {
        objData[getter] = objEl[getter];
      }
    }

    return objData;
  }

  function isForeignKey(value) {
    return (
      value && 
      typeof value === "object" && 
      (value[0] && value[0]['dataValues'] || value.dataValues)
    );
  }

  if (objData.constructor && objData.constructor === Array) {
    objData.forEach(function(dataRow) {
      dataRow = simplifyEmbedded(dataRow);
    });
  } else {
    objData = simplifyEmbedded(objData);
  }

  // We call the function recursively so that the associations are also unwrapped
  function simplifyEmbedded(objData) {
    for (i in objData) {
      if (isForeignKey(objData[i])) {
        objData[i] = unwrapProperties(objData[i]);
      }
    }

    return objData;
  }

  return objData;
}

/*
 * The root key of the returned JSON should >
 * > contain the model name (plural or singular depending on the request)
 */
function determineJSONKeyName(req) {
  var modelName = handy.getModelName(req);

  if (handy.urlContainsId(req)) { // Singular
    modelName = inflect.singularize(modelName);
  } else {
    modelName = inflect.pluralize(modelName);
  }

  return inflect.decapitalize(inflect.camelize(modelName));
}