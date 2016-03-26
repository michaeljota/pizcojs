(function(){
  'use strict';

  angular
    .module('pizcojs')
    .service('whiteboardRenderer', whiteboardRenderer);

  function whiteboardRenderer(shapeRenderer, canvas, socket) {
    var _whiteboard;
    var _intervalId;

    function clearCanvas() {
      canvas.context.fillStyle="#FFFFFF";
      canvas.context.fillRect(0, 0, canvas.getSize().width, canvas.getSize().height);
    }

    function drawShapes() {
      if(isShapesEmpty) {
        clearCanvas();
        _whiteboard.shapes.forEach(function (shape) {
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
      socket.socket.emit('whiteboards:resync', whiteboardId);
    }

    function isShapesEmpty() {
      return angular.isUndefined(_whiteboard) && _whiteboard.shapes.length === 0;
    }

    function isRedosEmpty() {
      return angular.isUndefined(_whiteboard) && _whiteboard.redos.length === 0;
    }

    this.startRender = startRender;
    this.stopRender = stopRender;
    this.setWhiteboard = setWhiteboard;
    this.drawShapes = drawShapes;
    this.isShapesEmpty = isShapesEmpty;
    this.isRedosEmpty = isRedosEmpty;

    //#region Socket functions.
    function onShapesSaved(shape) {
      _whiteboard.shapes.push(shape);
      drawShapes();
    }

    function onWhiteboardsResynced(whiteboard) {
      _whiteboard = whiteboard;
      console.log(_whiteboard);
      drawShapes();
    }

    function onShapesDraw(shape) {
      drawShapes();
      shapeRenderer.renderShape(shape);
    }

    socket.socket.on('whiteboards:resynced', onWhiteboardsResynced);
    socket.socket.on('shapes:saved', onShapesSaved);
    socket.socket.on('shapes:draw', onShapesDraw);
    //#endregion
  }
})();
