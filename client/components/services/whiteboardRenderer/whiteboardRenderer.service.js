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

    function startRender() {
      _intervalId = setInterval(drawShapes, 1000/30);
    }

    function stopRender() {
      clearInterval(_intervalId);
    }

    function setWhiteboard(whiteboardId) {
      socket.socket.emit('shapes:getall', whiteboardId);
    }

    this.startRender = startRender;
    this.stopRender = stopRender;
    this.setWhiteboard = setWhiteboard;
    this.drawShapes = drawShapes;

    //#region Socket functions.
    function onShapesSaved(shape) {
      _shapes.push(shape);
      drawShapes();
    }

    function onShapesSendAll(shapes) {
      _shapes = shapes;
      drawShapes();
    }

    function onShapesDraw(shape) {
      drawShapes();
      shapeRenderer.renderShape(shape);
    }

    socket.socket.on('shapes:sendall', onShapesSendAll);
    socket.socket.on('shapes:saved', onShapesSaved);
    socket.socket.on('shapes:draw', onShapesDraw);
    //#endregion
  }
})();
