'use strict';

var Whiteboard = require('../whiteboard/whiteboard.model');
var Shape = require('./shape.model');
var Point = require('./shape.model').Point;
var collection = Shape.collectionName();
var pointCollection = Point.collectionName();

function errorHandler (socket, err) {
    socket.emit('server:error', err);
    console.error(err);
}

function successHandler (io, event, obj) {
    io.emit(event, obj);
}

function event (socket, io) {
    socket.on(collection+':create', function (wbId, shape) {
        var s = Shape.create(shape);
        s.save()
            .then(shape => {
                Whiteboard.loadOne({_id: wbId})
                    .then((whiteboard) => {
                        if(!whiteboard) {
                            errorHandler (socket, new Error('Loading the whiteboard.'));
                        }
                        whiteboard.shapes.push(shape);
                        whiteboard.save()
                            .then((wb) => {
                                successHandler (io, collection+':created', shape);
                            })
                            .catch(err => errorHandler (socket, new Error('Saving the whiteboard. '+err.message, err.code)));
                    })
                    .catch(err => errorHandler (socket, err));
            })
            .catch(err => errorHandler (socket, new Error('Saving the shape. '+err.message, err.code)));
    });

    //TODO:
    socket.on(collection+':read', function() {});

    socket.on(collection+':update', function() {});

    socket.on(collection+':delete', function() {});

    socket.on(collection+':getall', function (wbId) {
        Whiteboard.loadOne({_id: wbId})
            .then(whiteboard => successHandler (io, collection+':sendall', whiteboard.shapes))
            .catch(err => errorHandler (socket, err));
    });

    socket.on(pointCollection+':create', function (shapeId, point) {
        var p = Point.create({
            x: point.x,
            y: point.y
        });
        Shape.loadOne ({_id: shapeId})
            .then((shape) => {
                shape.points.push(p);
                shape.save()
                    .then((shape) => {
                    })
                    .catch((err) => errorHandler(socket, new Error('Saving the shape. '+err.message, err.code)));
            })
            .catch(err => errorHandler(socket, err));
    });
}

module.exports = event;
