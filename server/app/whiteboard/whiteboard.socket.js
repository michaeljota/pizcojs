'use strict';

var Classroom = require('../classroom/classroom.model');
var Whiteboard = require('./whiteboard.model');
var collection = Whiteboard.collectionName();
var _io;

function errorHandler(socket, err) {
  socket.emit('server:error', err);
  console.error(err);
}

function successHandler(event, obj) {
  event = collection+':'+event;
  _io.emit(event, obj);
}

function onWhiteboardsCreate(crId, whiteboard) {
  var wb = Whiteboard.create(whiteboard);
  wb.save()
    .then((whiteboard) => {
      return Classroom.loadOne({_id: crId});
    })
    .then((classroom) => {
      classroom.whiteboards.push(whiteboard);
      return classroom.save();
    })
    .then((wb) => {
      return successHandler('created', whiteboard);
    })
    .catch((err) => {
      return errorHandler (socket, new Error('Saving the whiteboard. '+err.message, err.code));
    });
}

function onWhiteboardsUndo(wbId) {
  Whiteboard.loadOne({_id: wbId})
    .then((whiteboard) => {
      if(!whiteboard) {
        return Promise.reject(new Error('Whiteboard not found'));
      }
      if(whiteboard.shapes.length === 0) {
        return Promise.reject(new Error('Empty shapes'));
      }
      whiteboard.redos.push(whiteboard.shapes.pop());
      return whiteboard.save();
    })
    .then((whiteboard) => {
      successHandler('resynced', whiteboard);
    })
    .catch((err) => {
      errorHandler(socket, err);
    });
}

function onWhiteboardsRedo(wbId) {
  Whiteboard.loadOne({_id: wbId})
    .then((whiteboard) => {
      if(!whiteboard) {
        return Promise.reject(new Error('Whiteboard not found'));
      }
      if(whiteboard.redos.length === 0) {
        return Promise.reject(new Error('Empty redos'));
      }
      let shape = whiteboard.redos.pop();
      whiteboard.shapes.push(shape);
      return whiteboard.save();
    })
    .then((whiteboard) => {
      successHandler('resynced', whiteboard);
    })
    .catch((err) => {
      errorHandler(socket, err);
    });
}

function onWhiteboardsResync(wbId) {
  Whiteboard.loadOne({_id: wbId})
    .then((whiteboard) => {
      successHandler('resynced', whiteboard);
    })
    .catch((err) => {
      errorHandler (socket, err);
    });
}

function event(socket, io) {
  _io = io;
  socket.on(collection+':create', onWhiteboardsCreate);
  socket.on(collection+':undo', onWhiteboardsUndo);
  socket.on(collection+':redo', onWhiteboardsRedo);
  socket.on(collection+':resync', onWhiteboardsResync);


  //TODO:
  socket.on(collection+':read', function() {});

  socket.on(collection+':update', function() {});

  socket.on(collection+':delete', function() {});

  socket.on(collection+':getall', function (crId) {
    Classroom.loadOne({_id: crId})
      .then((classroom) => {
        successHandler (io, 'sendall', classroom.whiteboards);
      })
      .catch((err) => {
        errorHandler (socket, err);
      });
  });
}

module.exports = event;
