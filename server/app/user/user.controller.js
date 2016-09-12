'use strict';

var User = require('./user.model');
var auth = require ('../auth/auth.middleware');
var jwt = require('jsonwebtoken');

function validationError (res, err) {
    return res.status(422).json(err);
}

function sendHandler (res, err, status) {
    status = status || 500;
    return res.status(status).send(err.message);
}

function jsonpHandler (res, obj, status) {
    status = status || 200;
    return res.status(status).jsonp(obj);
}

/**
 * Get list of users
 */
exports.index = function(req, res) {
  User.loadMany()
    .then((users) => {
        jsonpHandler(res, users);
    })
    .catch((err) => sendHandler(res, err));
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = User.create(req.body);
  newUser.save()
    .then((user) => {
        var token = auth.signToken(user._id, user.role);
        jsonpHandler(res, {token: token});
    })
    .catch((err) => {
        return validationError (res, err);
    });
};


/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.loadOne({ _id: userId })
    .then((user) => {
        if (!user) {
            return res.status(401).send('Unauthorized');
        }
        jsonpHandler (res, user);
    })
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
