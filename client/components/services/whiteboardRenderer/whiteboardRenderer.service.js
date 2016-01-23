'use strict';

angular.module('tesisApp')
    .service('whiteboardRenderer', function ($http, Shape, shapeRenderer, canvas, socket) {
        var _shapes = [];

        //$http.get('/api/whiteboards/'+wbId+'/shapes/').success(function(shapes){
        $http.get('/api/whiteboards/R0hilkMR3XKFMJ6v/shapes/').success(function(shapes){
            _shapes = shapes;
            socket.syncUpdates('shapes', _shapes);
        });

        function drawShapes() {
            canvas.context.clearRect(0,0, canvas.getSize().width, canvas.getSize().height);
            _shapes.forEach(function(shape) {
                shapeRenderer.renderShape(shape);
            });
        }

        this.startRender = function startRender () {
            setInterval(drawShapes, 1000/30);
        }
    });
