var passport = require('passport');
var User = require('./models/user');

// Routes
module.exports = function(app) {
  app.post('/auth/register', register)
  app.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/auth/login'
  }));
};

login = function(req, res) {
  res.status(200).json(req.user);
}

register = function(req, res) {
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;
  console.log(username, email, password);

  User.register({username: username, email: email}, password, function(err, user) {
    if (err) { 
      res.status(504).json(err.message); 
      return;
    }

    passport.authenticate('local')(req, res, function(err, result) {
      if (err || !req.user) { 
        res.status(504).json(err.message); 
        return;
      }
      else {
        res.status(201).json({
          message: 'success',
          user: req.user
        });
      }
    });
  });
}
