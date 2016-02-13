'use strict';

var Classroom = require('../classroom/classroom.model');
var Whiteboard = require('./whiteboard.model');
var collection = Whiteboard.collectionName();

function errorHandler (socket, err) {
    socket.emit('server:error', err);
    console.error(err);
}

function successHandler (io, event, obj) {
    io.emit(event, obj);
}

function event (socket, io) {
    socket.on(collection+':create', function (crId, whiteboard) {
        var wb = Whiteboard.create(whiteboard);
        wb.save()
            .then((whiteboard) => {
                Classroom.loadOne({_id: crId})
                    .then((classroom) => {
                        classroom.whiteboards.push(whiteboard);
                        classroom.save()
                            .then(wb => successHandler (io, collection+':created', whiteboard))
                            .catch(err => errorHandler (socket, new Error('Saving the classroom. '+err.message, err.code)));
                    })
                    .catch(err => errorHandler (socket, err));
            })
            .catch(err => errorHandler (socket, new Error('Saving the whiteboard. '+err.message, err.code)));
    });

    //TODO:
    socket.on(collection+':read', function() {});

    socket.on(collection+':update', function() {});

    socket.on(collection+':delete', function() {});

    socket.on(collection+':getall', function (crId) {
        Classroom.loadOne({_id: crId})
            .then((classroom) => successHandler (io, collection+':sendall', classroom.whiteboards))
            .catch(err => errorHandler (socket, err));
    });
}

module.exports = event;
