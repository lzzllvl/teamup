var db = require('./models');
var express = require('express');
const PORT = 8080;
var app = express();
db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});