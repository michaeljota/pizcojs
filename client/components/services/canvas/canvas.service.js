'use strict';

angular.module('tesisApp')
    .service('canvas', function () {

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

        var canvasToScreen = function (point){
            point.x *= _size.scale;
            point.y *= _size.scale;
        };

        /**
         * @description
         * Since the points are related to the canvas standard size, they have to be transform it to the device canvas screen size.
         * @param {*|[Vector2]} points
         */
        var canvasToScreenAll = function(points){
            points = points || [];
            points.forEach(function(point){
                canvasToScreen(point);
            });
        };

        var screenToCanvas = function (point){
            point.x /= _size.scale;
            point.y /= _size.scale;
        };

        var screenToCanvasAll = function (points){
            points = points || {};
            points.forEach(function(point){
                screenToCanvas(point);
            });
        };

        /**
         *
         * @param width
         * @param height
         */
        var setSize = function (width, height){
            _size = new SizeSetting(width, height);
            _canvas.setAttribute('width', width);
            _canvas.setAttribute('height', height);
            _canvas.style.width = width + 'px';
            _canvas.style.height = height + 'px';
        };

        this.getSize = function () {
            return _size;
        };

        this.setSize = setSize;

        this.screenToCanvas = screenToCanvas;
        this.screenToCanvasAll = screenToCanvasAll;
        this.canvasToScreen = canvasToScreen;
        this.canvasToScreenAll = canvasToScreenAll;

        this.context = _canvas.getContext('2d');

        this.canvas = _canvas;
    });
