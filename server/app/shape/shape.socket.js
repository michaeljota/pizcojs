'use strict';

const Whiteboard = require('../whiteboard/whiteboard.model');
const Shape = require('./shape.model');
const Point = require('./shape.model').Point;
const collection = Shape.collectionName();
const pointCollection = Point.collectionName();

var _shape;

function errorHandler (socket, err) {
    socket.emit('server:error', err);
    console.error(err);
}

function successHandler (io, event, obj) {
    io.emit(event, obj);
}

function draw(io, shape) {
  successHandler (io, collection+':draw', shape);
}

function isValidShape() {
  return (_shape && _shape.points.length > 0);
}

function event (socket, io) {
  socket.on(collection+':create', function(shape) {
    _shape = Shape.create(shape);
  });

  socket.on(collection+':save', function(wbId) {
    if(!isValidShape()) {
      return;
    }
    Whiteboard.loadOne({_id: wbId})
      .then((whiteboard) => {
        if(!whiteboard) {
          return errorHandler (socket, new Error('Whiteboard not found'));
        }
        //Clear the redos history.
        whiteboard.redos = [];
        whiteboard.shapes.push(_shape);
        return whiteboard.save();
      })
      .then((whiteboard) => {
        successHandler (io, collection+':saved', _shape);
        _shape = null;
      })
      .catch((err) => {
        errorHandler (socket, err)
      });
  });

  //TODO:
  socket.on(collection+':read', function() {});

  socket.on(collection+':update', function() {});

  socket.on(collection+':delete', function() {});

  socket.on(collection+':addPoint', function(point) {
    var p = Point.create(point);
    _shape.points.push(p);
    draw(io, _shape);
  });

}

module.exports = event;
