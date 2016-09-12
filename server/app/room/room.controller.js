'use strict';

var Room = require('./room.model');
var User = require('../user/user.model');
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
  let r = Room.create(req.body);
  User.loadOne({_id: req.user._id})
    .then((user) => {
      r.owner = user;
      r.clients.push(user);
      return Whiteboard.create().save();
    })
    .then((whiteboard) => {
      r.whiteboards.push(whiteboard);
      return r.save();
    })
    .then((room) => {
      successHandler (res, room);
    })
    .catch((err) => {
      errorHandler (res, err);
    });
}

function update (req, res) {
  Room.loadOneAndUpdate({_id: req.params.roomId},req.body)
    .then((room) => {
      successHandler(res, room);
    })
    .catch((err) => {
      errorHandler(res, err);
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
  let room;
  Room.loadOne({_id: req.params.roomId})
    .then((roomLoaded) => {
      room = roomLoaded;
      return User.loadOne({_id: req.user._id});
    })
    .then((user) => {
      if(!contains(room.clients, user)) {
        //TODO: If the user leaves the room, it must be logged out.
        room.clients.push(user);
        return room.save();
      }
    })
    .then((room) => {
        successHandler (res, room);
    })
    .catch((err) => {
        errorHandler (res, err);
    });
}

function findAllWhiteboards (req, res) {
  Room.loadOne({_id: req.params.roomId})
    .then((room) => {
      successHandler (res, room.whiteboards)
    })
    .catch((err) => {
      errorHandler (res, err)
    });
}

function addWhiteboard (req, res) {
  let tempWhiteboard;
  Whiteboard
    .create()
    .save()
    .then((whiteboard) => {
      tempWhiteboard = whiteboard;
      return Room.loadOne({_id: req.params.crId});
    })
    .then((room) => {
      room.whiteboards.push(tempWhiteboard);
      return room.save();
    })
    .then((room) => {
      successHandler (res, whiteboard)
    })
    .catch((err) => {
      errorHandler (res, err)
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

module.exports = {
  findAll,
  find,
  add,
  update,
  destroy,
  enter,
  findAllWhiteboards,
  addWhiteboard
};
