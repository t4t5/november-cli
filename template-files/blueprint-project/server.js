global.orm       = require('orm');
var express      = require('express');

var middleware   = require('./config/middleware');
var router       = require('./app/router');


var app = express();

middleware(app);
router(app);


app.listen(process.env.PORT || 9000, function() {
  console.log("November is running on port 9000");
});