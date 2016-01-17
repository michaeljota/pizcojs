'use strict';

var Classroom = require('./classroom.model').Classroom;
var Whiteboard = require('./classroom.model').Whiteboard;
var Shape = require('./classroom.model').Shape;
var Point = require('./classroom.model').Point;

function send (socket, signal, obj) {
    socket.emit(signal, obj)
}

function register (socket) {
    socket.on('whiteboard:new', function(classId) {
        // Classroom.loadOne ({_id: classId})
        Classroom.loadOne ({_id: 'yIcpGwIu0R4um6LD'})
            .then(function(classroom){
                var whiteboard = Whiteboard.create();
                classroom.whiteboards.push(whiteboard);
                classroom.save()
                    .then(send (socket, 'whiteboard:update', whiteboard))
                    .catch(err => send (socket, 'error', err));
            })
            .catch(err => send (socket, 'error', err));
    });

    socket.on('shape:new', function (classId, shape) {
        //Classroom.loadOne({_id: classId})
        Classroom.loadOne({_id: 'yIcpGwIu0R4um6LD'})
            .then(function(classroom) {
                var shape = Shape.create({
                    type: shape.type,
                    lineColor: shape.lineColor,
                    fillColor: shape.fillColor,
                    lineCap: shape.lineCap,
                    stroked: shape.stroked,
                    filled: shape.filled
                });
                var wbIndex = classroom.whiteboards.length-1;
                classroom.whiteboards[wbIndex].shapes.push(shape);
                classroom.save()
                    .then(send (socket, 'shape:update', shape))
                    .catch(err => send (socket, 'error', err));
            })
            .catch(err => send (socket, 'error', err));
    });

    socket.on('point:new', function (classId, point) {
        //Classroom.loadOne({_id: classId})
        Classroom.loadOne({_id: 'yIcpGwIu0R4um6LD'})
            .then(function(classroom) {
                var point = Point.create({
                    x: point.x,
                    y: point.y
                });
                var wbIndex = classroom.whiteboards.length-1;
                var sIndex = classroom.whiteboards[wbIndex].shapes.length-1;
                classroom.whiteboards[wbIndex].shapes[sIndex].points.push(point);
                classroom.save()
                    .then(send (socket, 'point:update', point))
                    .catch(err => send (socket, 'error', err));
            })
            .catch(err => send (socket, 'error', err));
    })
}

module.exports.register = register;
