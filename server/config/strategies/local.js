'use strict';

var LocalStrategy = require('passport-local').Strategy;

function setup (User, passport) {
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(username, password, done) {
      User.loadOne({
        username: username.toLowerCase()
      })
        .then((user) => {
            if (!user) {
                return done(null, false, { message: 'This username is not registered.' });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { message: 'This password is not correct.' });
            }
                return done(null, user);
        })
        .catch((err) => done (err));
    }));
};

module.exports = setup;