'use strict';

var Room = require('./room.model');
var User = require('../user/user.model');
var Classroom = require('../classroom/classroom.model');

function errorHandler (res, err) {
    res.status(500).send(err.message);
}

function successHandler (res, obj) {
    res.status(200).jsonp(obj);
}

function findAll (req, res) {
    Room.loadMany()
        .then((rooms) => {
            successHandler (res, rooms); 
        })
        .catch((err) => {
            errorHandler (res, err);
        });
}

function find (req, res) {
    Room.loadOne({_id: req.params.roomId})
        .then((room) => {
            successHandler (res, room); 
        })
        .catch((err) => {
            errorHandler (res, err);
        });
}

function add (req, res) {
    console.log(req.body);
    var room = Room.create(req.body.room);
    User.loadOne({_id: req.user._id})
        .then((user) => {
            room.owner = user;
            room.clients.push(user);
            var c = Classroom.create ({className: room.title});
            c.save()
                .then((classroom) => {
                    room.classroom = classroom;
                    room.save()
                        .then((room) => {
                            successHandler (res, room); 
                        })
                        .catch((err) => {
                            errorHandler (res, err);
                        });
                })
                .catch((err) => {
                    errorHandler (res, err);
                });
        })
        .catch((err) => {
            errorHandler (res, err);
        });
}

function update (req, res) {
    Room.loadOneAndUpdate({_id: req.params.roomId},req.body)
        .then((room) => {
            successHandler (res, room); 
        })
        .catch((err) => {
            errorHandler (res, err);
        });
}

function destroy (req, res) {
    Room.loadOneAndDelete({_id: req.params.roomId})
        .then(() => {
            successHandler (res, null); 
        })
        .catch((err) => {
            errorHandler (res, err);
        });
}

/**
 * Naming for endpoints.
 * GET      /room                   ->  findAll
 * POST     /room                   ->  create
 * GET      /room/:roomId           ->  find
 * PUT      /room/:roomId           ->  update
 * DELETE   /room/:roomId           ->  destroy
 */

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;
