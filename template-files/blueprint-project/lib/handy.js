/*
 * These functions are used in giveError and giveJSON
 */

function getModelName(req) {
  var modelURL = getBaseURL(req);

  if (urlContainsId(req) && modelURL.indexOf('/') !== -1) {
    modelURL = modelURL.substr(0, modelURL.lastIndexOf('/'));
  }

  return (modelURL.substr(modelURL.lastIndexOf('/') + 1));
}

function getModelId(req) {
  var modelId;
  var baseURL = getBaseURL(req);

  if (baseURL.indexOf('/') !== -1) {
    modelId = baseURL.substr(baseURL.lastIndexOf('/') + 1);
  }

  return (!isNaN(modelId)) ? modelId : null;
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

  if ((baseURL.match(/\//g) || []).length > 1) {
    modelId = baseURL.substr(baseURL.lastIndexOf('/') + 1);
  }

  return !! modelId;
}

module.exports.getModelName  = getModelName;
module.exports.getModelId    = getModelId;
module.exports.getBaseURL    = getBaseURL;
module.exports.urlContainsId = urlContainsId;
