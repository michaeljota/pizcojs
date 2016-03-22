(function(){
  'use strict';

  angular
    .module('pizcojs')
    .service('canvas', CanvasService);

  function CanvasService() {

    //#region PrivateClasses
    /**@name SizeSetting
     *
     * @param {number} width
     * @param {number} height
     * @constructor
     */
    function SizeSetting (width, height) {
      var StandardSize = 500;
      /*Check if the exist and it's valid. If exist, but is NaN or less than 1, we set the default value*/
      if(width && (isNaN(width) || width <1)) {
        width = StandardSize;
      }
      if (height && (isNaN(height) || height <1)) {
        height = StandardSize;
      }
      this.width = width;
      this.height = height;
      this.aspectRatio = this.height/this.width;
      this.scale = this.height/StandardSize;
    }
    //#endregion

    var _size;
    var _canvas = document.createElement('canvas');

    function canvasToScreen(point){
      point.x *= _size.scale;
      point.y *= _size.scale;
    }

    /**
     * @description
     * Since the points are related to the canvas standard size, they have to be transform it to the device canvas screen size.
     * @param {int, int} points
     */
    function canvasToScreenAll(points){
      points = points || [];
      points.forEach(function(point){
        canvasToScreen(point);
      });
    }

    function screenToCanvas(point){
      point.x /= _size.scale;
      point.y /= _size.scale;
    }

    function screenToCanvasAll(points){
      points = points || {};
      points.forEach(function(point){
        screenToCanvas(point);
      });
    }

    function getSize() {
      return _size;
    }

    /**
     *
     * @param width
     * @param height
     */
    function setSize(width, height){
      _size = new SizeSetting(width, height);
      _canvas.setAttribute('width', width);
      _canvas.setAttribute('height', height);
      _canvas.style.width = width + 'px';
      _canvas.style.height = height + 'px';
    };



    this.getSize = getSize;
    this.setSize = setSize;

    this.screenToCanvas = screenToCanvas;
    this.screenToCanvasAll = screenToCanvasAll;
    this.canvasToScreen = canvasToScreen;
    this.canvasToScreenAll = canvasToScreenAll;

    this.context = _canvas.getContext('2d');

    this.canvas = _canvas;
  }
})();
