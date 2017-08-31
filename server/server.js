var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());

// Express server
var app = express();
app.listen(80, function () {
  console.log('Listening on port 80')
});

// Connect to Mongo with Mongoose
mongoose.connect('mongodb://localhost/dev');
var db = mongoose.connection;
mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', function() {
    console.log('Connected to database');
});

// Stringify API requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Set up user sessions
app.use(session({
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'OpenSesame',
  resave: false,
  saveUnitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Passport config
var User = require('./models/user');
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Point to Angular App
app.use(express.static(path.join(__dirname, '../dist')));
// Include Routes
var routes = require('./routes')(app);
// Catch all other routes
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});
