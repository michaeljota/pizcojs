(function(){
  'use strict';

  angular
    .module('pizcojs')
    .service('whiteboardRenderer', whiteboardRenderer);

  function whiteboardRenderer(shapeRenderer, canvas, RoomManager, ShapeSocket,
    WhiteboardSocket) {
    var _intervalId;

    function clearCanvas() {
      canvas.context.fillStyle="#FFFFFF";
      canvas.context.fillRect(0, 0, canvas.getSize().width, canvas.getSize().height);
    }

    function drawShapes() {
      if(!isShapesEmpty()) {
        clearCanvas();
        RoomManager.getCurrentWhiteboard().shapes.forEach(function (shape) {
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

    function isShapesEmpty() {
      return RoomManager.getCurrentWhiteboard().shapes.length === 0;
    }

    function isRedosEmpty() {
      return RoomManager.getCurrentWhiteboard().redos.length === 0;
    }

    this.startRender = startRender;
    this.stopRender = stopRender;
    this.drawShapes = drawShapes;
    this.isShapesEmpty = isShapesEmpty;
    this.isRedosEmpty = isRedosEmpty;

    function onDraw(shape) {
      drawShapes();
      shapeRenderer.renderShape(shape);
    }

    ShapeSocket.onDraw(onDraw);

    function onWhiteboardsResynced(whiteboard) {
      RoomManager.setCurrentWhiteboard(whiteboard);
      drawShapes();
    }

    WhiteboardSocket.onResynced(onWhiteboardsResynced);
  }
})();
