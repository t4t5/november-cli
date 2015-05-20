var express    = require('express');
var app        = express();

var middleware = require('./app/middleware');
var router     = require('./app/router');
var novrender  = require('./lib/render');

// Set up all the routes and requirements for HTTP requests
middleware(app);
router(app);

// Render either the model or the error from the routes
app.use(novrender);

// Listen to port 9000 by default
app.listen(process.env.PORT || 9000, function() {
  console.log("November is running on port 9000");
});
