'use strict';

angular.module('tesisApp')
    .service('jkgjkhgkh', function (whiteboardRenderer, socket) {
        var _whiteboards = [];
        var _classroomId;
        
        this.addWhiteboard = function(whiteboard) {
            socket.socket.emit('whiteboards:create', _classroomId);
        }
        
        this.setId = function (id) {
            _classroomId = id;
            socket.socket.emit('whiteboards:getall', _classroomId);
        }

        socket.socket.on('whiteboards:sendall', function (whiteboards){
            _whiteboards = whiteboards;
            socket.syncUpdates('whiteboards', _whiteboards);
        });
        
        socket.socket.on('rooms:created', function (room) {
            _classroomId = room.classroom._id;
            whiteboardRenderer.setId (room.classroom.currentWhiteboard._id);
        });
    });
