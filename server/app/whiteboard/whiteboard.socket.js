'use strict';

const Whiteboard = require('./whiteboard.model');
const Room = require('../room/room.model');

const collection = Whiteboard.collectionName();

function register(io, socket) {
  socket.on(collection+':'+'create', onCreate);
  socket.on(collection+':'+'undo', onUndo);
  socket.on(collection+':'+'redo', onRedo);
  socket.on(collection+':'+'resync', onResync);

  function onCreate(roomId, whiteboard) {
    var wb;
    Whiteboard
      .create(whiteboard)
      .save()
      .then((whiteboard) => {
        wb = whiteboard;
        return Room.loadOne({_id: roomId});
      })
      .then((room) => {
        room.whiteboards.push(wb);
        return room.save();
      })
      .then((room) => {
        emitEventToRoom(collection, 'created', wb);
      })
      .catch(emitError);
  }

  function onUndo(wbId) {
    Whiteboard.loadOne({_id: wbId})
      .then((whiteboard) => {
        if(!whiteboard) {
          return Promise.reject(new Error('Whiteboard not found'));
        }
        if(whiteboard.shapes.length > 0) {
          let shape = whiteboard.shapes.pop();
          whiteboard.redos.push(shape);
          return whiteboard.save();
        }
      })
      .then((whiteboard) => {
        emitEventToRoom(collection, 'resynced', whiteboard);
      })
      .catch(emitError);
  }

  function onRedo(wbId) {
    Whiteboard.loadOne({_id: wbId})
      .then((whiteboard) => {
        if(!whiteboard) {
          return Promise.reject(new Error('Whiteboard not found'));
        }
        if(whiteboard.redos.length > 0) {
          let shape = whiteboard.redos.pop();
          whiteboard.shapes.push(shape);
          return whiteboard.save();
        }
      })
      .then((whiteboard) => {
        emitEventToRoom(collection, 'resynced', whiteboard);
      })
      .catch(emitError);
  }

  function onResync(wbId) {
    Whiteboard.loadOne({_id: wbId})
      .then((whiteboard) => {
        emitEventToRoom(collection, 'resynced', whiteboard);
      })
      .catch(emitError);
  }

  function emitEventToRoom(collection, event, data) {
    io.sockets.in(socket._room).emit(collection+':'+event, data);
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
    socket.emit('server'+':'+'err', err);
  }
}

module.exports = register;
