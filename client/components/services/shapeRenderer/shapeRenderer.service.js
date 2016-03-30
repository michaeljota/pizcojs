(function(){
  'use strict';

  angular
    .module('pizcojs')
    .service('shapeRenderer', ShapeRenderer);

  function ShapeRenderer(canvas, TOOLS) {
    var RendererError = Error;

    //#region Functions
    function pencil(points) {
      //Todo: Reduce the lenght of the Points array by using trigonometric functions.
      canvas.context.moveTo(points[0].x, points[0].y);
      for (var i = 0; i < points.length; i++) {
        canvas.context.lineTo(points[i].x, points[i].y);
      }
    };

    function line(points){
      var i = points.length - 1;
      canvas.context.moveTo(points[0].x, points[0].y);
      canvas.context.lineTo(points[i].x, points[i].y);
    };

    function rectangle(points){
      var i = points.length - 1;
      var width = points[i].x - points[0].x;
      var height = points[i].y - points[0].y;
      canvas.context.rect(points[0].x, points[0].y, width, height);
    };

    function circle(points){
      var i = points.length - 1;
      var radius = (Math.abs(points[i].x - points[0].x) + (Math.abs(points[i].y - points[0].y)) / 2);
      canvas.context.arc(points[i].x, points[i].y, radius, 0, Math.PI * 2, false);
    };

    //#endregion

    this.renderShape = renderShape;

    function renderShape(shape){
      if(!shape){
        throw RendererError('Can\'t render shape. Is '+shape);
      }
      var points = shape.points;
      canvas.canvasToScreenAll(points);
      canvas.context.beginPath();
      canvas.context.lineWidth = shape.lineWidth * canvas.getSize().scale;
      canvas.context.lineCap = shape.lineCap;
      canvas.context.strokeStyle = shape.lineColor;
      canvas.context.fillStyle = shape.fillColor;
      switch (shape.shapeType){
        case TOOLS.PENCIL:
          pencil(points);
          break;
        case TOOLS.LINE:
          line(points);
          break;
        case TOOLS.RECTANGLE:
          rectangle(points);
          break;
        case TOOLS.CIRCLE:
          circle(points);
          break;
        default:
          throw RendererError ('Tool: '+ shape.shapeType +' is invalid');
      }
      if (shape.stroked) {
        canvas.context.stroke();
      }
      if (shape.filled) {
        canvas.context.fill();
      }
      canvas.screenToCanvasAll(shape.points);
    };
  }
})();
