'use strict';

var User = require ('../app/user/user.model');

function passport (passport) {
  
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.loadOne({_id: id}, {populate: ['name', 'email', 'role', 'provider']})
            .then(user => {
                done(null, user);
            })
            .catch(err => done(err, false));
  });

  require('./strategies/local.js')(User, passport);
};

module.exports = passport; 