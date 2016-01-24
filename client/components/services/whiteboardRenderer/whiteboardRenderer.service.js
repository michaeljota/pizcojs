'use strict';

angular.module('tesisApp')
    .service('whiteboardRenderer', function ($http, shapeRenderer, canvas, socket) {
        var _shapes = [];
        var intervalId;

        function drawShapes() {
            if(_shapes && _shapes.length > 0) {
                console.log('Drawing');
                canvas.context.clearRect(0, 0, canvas.getSize().width, canvas.getSize().height);
                _shapes.forEach(function (shape) {
                    if (!shape.points || shape.points.length === 0) {
                        return;
                    }
                    shapeRenderer.renderShape(shape);
                });
            }
        }

        this.startRender = function startRender () {
            intervalId = setInterval(drawShapes, 1000/30);
        };

        this.setWhiteboard = function setWhiteboard (whiteboardId) {
            socket.socket.emit('shape:getall', whiteboardId);
        };

        this.stopRender = function stopRender () {
            clearInterval(intervalId);
        };

        socket.socket.on('shape:sendall', function (shapes){
            _shapes = shapes;
            socket.syncUpdates('shapes', _shapes);
            drawShapes();
        });

        socket.socket.on('shapes:save', function (shape){
            drawShapes();
        });
    });
