var env    = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];

module.exports = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', config.allow_origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
};