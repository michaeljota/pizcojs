'use strict';

var Room = require('./room.model');
var User = require('../user/user.model');
var Classroom = require('../classroom/classroom.model');
var Whiteboard = require('../whiteboard/whiteboard.model');

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
    var r = Room.create(req.body);
    User.loadOne({_id: req.user._id})
        .then((user) => {
            r.owner = user;
            r.clients.push(user);
            var c = Classroom.create ({className: r.title});
            var w = Whiteboard.create();
            w.save()
                .then((whiteboard) => {
                    c.whiteboards.push(w);
                    c.save()
                        .then((classroom) => {
                            r.classroom = c;
                            r.save()
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
                })
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

function enter (req, res) {
    Room.loadOne({_id: req.params.roomId})
        .then((room) => {
            User.loadOne({_id: req.user._id})
                .then((user) => {
                    if(contains(room.clients, user)) {
                        //TODO: This shouldn't happen. If the user leaves the room, it must be logged out.
                        successHandler (res, room);
                    } else {
                        room.clients.push(user);
                        room.save()
                            .then(() => {
                                successHandler (res, room);
                            })
                            .catch((err) => {
                                errorHandler (res, err);
                            });
                    }
                })
                .catch((err) => {
                    errorHandler (res, err);
                });
        })
        .catch((err) => {
            errorHandler (res, err);
        });
}


/**
 * (description)
 *
 * @param {Array} array The array to look into.
 * @param {Any} obj The object to look.
 * @returns {Boolean} Wherever if the object was found or not.
 */
function contains(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * Naming for endpoints.
 * GET      /room                   ->  findAll
 * POST     /room                   ->  create
 * GET      /room/:roomId           ->  find
 * PUT      /room/:roomId           ->  update
 * DELETE   /room/:roomId           ->  destroy
 * POST     /room/:roomId           ->  enter a room
 */

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.destroy = destroy;
module.exports.enter = enter;
