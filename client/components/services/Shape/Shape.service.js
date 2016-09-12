(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('Shape', Shape);

  function Shape () {
    function Shape(shape) {
      this.shapeType  = shape.shapeType;
      this.lineColor = shape.lineColor;
      this.lineWidth = shape.lineWidth;
      this.lineCap = shape.lineCap;
      this.fillColor = shape.fillColor;
      this.filled = shape.filled;
      this.stroked = shape.stroked;
      this.points = shape.points || [];
    }

    // Public API here
    return Shape;
  }

})();
