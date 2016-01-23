'use strict';

angular.module('tesisApp')
    .service('whiteboardRenderer', function ($http, shapeRenderer, canvas, socket) {
        var _shapes = [];

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
            setInterval(drawShapes, 1000/30);
        };

        this.setWhiteboard = function setWhiteboard (whiteboardId) {
            $http.get('/api/whiteboards/'+whiteboardId+'/shapes/')
                .then(function (response) {
                    _shapes = response.data;
                    socket.syncUpdates('shapes', _shapes);
                })
                .catch(function (err) {
                    throw err;
                })
        }
    });
