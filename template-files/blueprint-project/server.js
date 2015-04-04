var express    = require('express');
var app        = express();
var router     = express.Router();


app.use(bodyParser.json({ limit: '10mb' }));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb' })); // to support URL-encoded bodies

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, x-access-token');
  next();
});

// Connect to database and load the models
app.use(orm.express(process.env.DB_URL, {
  define: require('./app/model-relations.js').setRelations
}));

// Listen to port 9000
app.use('/v1', router);

app.listen(process.env.PORT || 9000, function() {
  console.log("November is running on port 9000");
});


// Router
require('./app/router.js').getRouter(router, controller)


// Errors
process.on('uncaughtException', function (err) {

  if (err.code === "ECONNREFUSED") {
    var mysqlError = new Error("Could not connect to MySQL database. Did you forget to turn on MAMP? (ECONNREFUSED)");
    return console.log(mysqlError);
  }

  console.log(err.code);
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);

  process.exit(0);
});