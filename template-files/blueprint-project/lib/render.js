var giveError = require('./give-error');
var giveJSON = require('./give-json');

module.exports = function(obj, req, res, next) {

  var isValidModel = (
    obj.constructor && obj.constructor === Array && obj.length === 0
    || obj.model
    || (obj[0] && obj[0].dataValues)
    || obj.dataValues
  );


  if (isValidModel) {

    var model, opts;
    if (obj.model) {
      model = obj.model;
      opts = obj;
      delete opts.model;
    } else {
      model = obj;
      opts = null;
    }
    return giveJSON(req, res, model, opts);
  } else {
    return giveError(obj, req, res);
  }

};