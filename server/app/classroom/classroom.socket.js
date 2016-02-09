'use strict';

var Classroom = require('../classroom/classroom.model');
var collection = Classroom.collectionName();

function errorHandler (socket, err) {
    socket.emit('server:error', err);
    console.error(err);
}

function successHandler (io, event, obj) {
    io.emit(event, obj);
}

function event (socket, io) {
    socket.on(collection+':create', function (classroom) {
        var cr = Classroom.create(classroom);
        cr.save()
            .then((classroom) => {
                successHandler (io, collection+':created', classroom);
            })
            .catch(err => errorHandler (socket, new Error('Saving the classroom. '+err.message, err.code)));
    });

    //TODO:
    socket.on(collection+':read', function() {});

    socket.on(collection+':update', function() {});

    socket.on(collection+':delete', function() {});

    socket.on(collection+':getall', function () {
        Classroom.loadMany()
            .then((classrooms) => {
                successHandler (io, collection+':sendall', classrooms);
            })
            .catch(err => errorHandler (socket, err));
    });
}

module.exports = event;
