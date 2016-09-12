'use strict';

const Whiteboard = require('../whiteboard/whiteboard.model');
const Shape = require('./shape.model');
const Point = require('./shape.model').Point;

const collection = Shape.collectionName();

function register(io, socket) {
  var _shape;

  socket.on(collection+':create', onCreate);
  socket.on(collection+':addPoint', onAddPoint);
  socket.on(collection+':save', onSave);

  function isValidShape() {
    return (_shape && _shape.points.length > 0);
  }

  function onCreate(shape) {
    _shape = Shape.create(shape);
  }

  function onAddPoint(point) {
    point.x = Math.round(point.x);
    point.y = Math.round(point.y);
    if(_shape){
      _shape.points.push(Point.create(point));
    }
    emitEventToRoom(collection, 'draw', _shape);
  }

  function onSave(wbId) {
    if(!isValidShape()) {
      return;
    }
    Whiteboard.loadOne({_id: wbId})
      .then((whiteboard) => {
        if(!whiteboard) {
          return Promise.reject(new Error('Whiteboard not found'));
        }
        //Clear the redos history.
        whiteboard.redos = [];
        whiteboard.shapes.push(_shape);
        return whiteboard.save();
      })
      .then((whiteboard) => {
        emitEventToRoom('whiteboards', 'resynced', whiteboard);
        _shape = null;
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
    emitEventToSocket('server', 'err', err);
  }
}

module.exports = register;
