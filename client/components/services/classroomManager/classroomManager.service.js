'use strict';

angular.module('tesisApp')
    .service('classroomRenderer', function (whiteboardRenderer, socket) {
        var _whiteboards = [];
        var classroomId;
        
        this.addWhiteboard = function(whiteboard) {
            console.log('creating')
            socket.socket.emit('whiteboards:create', classroomId);
        }
        
        this.setId = function (id) {
            classroomId = id;
            socket.socket.emit('whiteboards:getall', classroomId);
        }

        socket.socket.on('classrooms:created', function(classroom){
            classroomId = classroom._id;
            this.addWhiteboard();
            socket.socket.emit('whiteboards:getall', classroomId);
        });

        socket.socket.on('whiteboards:sendall', function (whiteboards){
            _whiteboards = whiteboards;
            socket.syncUpdates('whiteboards', _whiteboards);
        });
    });
