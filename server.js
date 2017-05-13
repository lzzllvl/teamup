const db = require('./models');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(cookieParser());


// Static directory
app.use(express.static(process.cwd() + "/public"));

//methodOverride to support ReST methods
app.use(methodOverride("_method"));

//templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//use express-session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
 }));
 var currentUserId;

//Passport initialize
app.use(passport.initialize());
app.use(passport.session());
require('./config/strategy.js')(passport, LocalStrategy, db.User);




const router = express.Router();
require('./controllers/project-controller.js')(router, db, passport);
require('./controllers/investor-controller.js')(router, db, passport);
require('./controllers/developer-controller.js')(router, db, passport);
require('./controllers/entrepeneur-controller.js')(router, db, passport);
require('./controllers/user-controller.js')(router, db, passport);

app.use('/', router);



db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});






