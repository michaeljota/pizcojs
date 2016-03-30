'use strict';

const Room = require('./room.model');
const Whiteboard = require('../whiteboard/whiteboard.model');

const collection = Room.collectionName();

function register(io, socket) {
  socket.on(collection+':colaborative', onColaborative);
  socket.on(collection+':enter', onEnter);

  function onColaborative(data) {
    Room.loadOne({_id: data._id})
      .then((room) => {
        room.colaborative = data.colaborative;
        return room.save();
      })
      .then((room) => {
        emitEventToRoom(collection, 'colaborative', room);
      })
      .catch(emitError);
  }

  function onEnter(room) {
    if(socket._room) {
      socket.leave(socket._room);
    }
    socket.join(room._id);
    socket._room = room._id;
  }

  function emitEventToRoom(collection, event, data) {
    io.to(socket._room).emit(collection+':'+event, data);
  }

  function emitEventToAll(collection, event, data) {
    io.sockets.emit(collection+':'+event, data);
  }

  function emitEventToSocket(collection, event, doc) {
    socket.emit(collection+':'+event, data);
  }

  function onEvent(collection, event, cb) {
    socket.on(collection+':'+event, cb);
  }

  function emitError(err) {
    emitEventToSocket('server', 'err', err);
  }
}

module.exports = register;
