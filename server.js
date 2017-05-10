const db = require('./models');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');


const PORT = process.env.PORT || 8080;
const app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static(process.cwd() + "/public"));

//methodOverride to support ReST methods
app.use(methodOverride("_method"));

//templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// //use express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
 }));

//Passport initialize

app.use(passport.initialize());
app.use(passport.session());
require('./config/strategy.js')(passport, LocalStrategy, db.User);

// //Passport routes
// var usersRoutes = require('./server/routes/usersRoutes')(app, express, passport);
// app.use('/users', usersRoutes);
const router = app.Router();

//investor dashboard

app.use('/', router);


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});






