(function(){
  'use strict';

  angular
    .module('pizcojs')
    .service('whiteboardRenderer', whiteboardRenderer);

  function whiteboardRenderer(shapeRenderer, canvas, socket) {
    var _shapes = [];
    var _intervalId;

    function clearCanvas() {
      canvas.context.fillStyle="#FFFFFF";
      canvas.context.fillRect(0, 0, canvas.getSize().width, canvas.getSize().height);
    }

    function drawShapes() {
      if(_shapes && _shapes.length > 0) {
        clearCanvas();
        _shapes.forEach(function (shape) {
          if (!shape.points || shape.points.length === 0) {
            return;
          }
          shapeRenderer.renderShape(shape);
        });
      }
    }

    this.startRender = function startRender () {
      _intervalId = setInterval(drawShapes, 1000/30);
    };

    this.stopRender = function stopRender () {
      clearInterval(_intervalId);
    };

    this.setWhiteboard = function setWhiteboard (whiteboardId) {
      socket.socket.emit('shapes:getall', whiteboardId);
    }

    socket.socket.on('shapes:sendall', function (shapes){
      _shapes = shapes;
      socket.syncUpdates('shapes', _shapes);
      drawShapes();
    });

    socket.socket.on('shapes:saved', function (shape){
      drawShapes();
    });
  }
})();
