'use strict';

angular.module('tesisApp')
    .service('whiteboardRenderer', function (shapeRenderer, canvas, socket) {
        var _shapes = [];
        var intervalId;
        var whiteboardId;

        function drawShapes() {
            if(_shapes && _shapes.length > 0) {
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

        this.stopRender = function stopRender () {
            clearInterval(intervalId);
        };
        
        this.newShape = function (shape) {
            socket.socket.emit('shapes:create', whiteboardId, shape);
        };
        
        socket.socket.on('whiteboards:created', function(whiteboard) {
            whiteboardId = whiteboard._id;
            socket.socket.emit('shapes:getall', whiteboardId);
        });

        socket.socket.on('shapes:sendall', function (shapes){
            console.log(shapes);
            _shapes = shapes;
            socket.syncUpdates('shapes', _shapes);
            drawShapes();
        });

        socket.socket.on('shapes:saved', function (shape){
            drawShapes();
        });
    });
