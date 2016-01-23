'use strict';

var Whiteboard = require('./classroom.model').Whiteboard;
var Shape = require('./classroom.model').Shape;
var Point = require('./classroom.model').Point;

function errorHandler (socket, err) {
    console.log(err);
}

function successHandler (socket, event, obj) {
    socket.emit(event, obj);
}

function event (socket){
    socket.on('shape:create', function (wbId, shape) {
        console.log('creating');
        console.log(shape);
        var s = Shape.create({
            shapeType: shape.shapeType,
            lineColor: shape.lineColor,
            lineWidth: shape.lineWidth,
            lineCap:   shape.lineCap,
            fillColor: shape.fillColor,
            stroked:   shape.stroked,
            filled:    shape.filled
        });
        s.save()
            .then(shape => {
                Whiteboard.loadOne({_id: wbId})
                    .then(whiteboard => {
                        if(!whiteboard) {
                            return errorHandler (socket, new Error('Whiteboard not found'));
                        }
                        whiteboard.shapes.push(shape);
                        whiteboard.save()
                            .then(wb => successHandler (socket, 'shape:created', shape))
                            .catch(err => errorHandler (socket, err));
                    })
                    .catch(err => errorHandler (socket, err));
            })
            .catch(err => errorHandler (socket, err));
    });

    //TODO:
    socket.on('shape:read', function() {});

    socket.on('shape:update', function() {});

    socket.on('shape:delete', function() {});

    socket.on('point:create', function (shapeId, point) {
        Shape.loadOne ({_id: shapeId})
            .then(shape => {
                shape.points.push(point);
                shape.save()
                    .catch(err => errorHandler(socket, err));
            })
            .catch(err => errorHandler(socket, err));
    });
}

module.exports = event;
