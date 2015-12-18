'use strict';

angular.module('tesisApp')
    .factory('Drawer', function (Shape, Enums) {

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

        /**@name Drawer
         *
         * @param container
         * @constructor
         */
        function Drawer (container) {
            if(!container){
                throw new Error('Drawer must be initialized with a container');
            }
            var _size;
            var _canvas = document.createElement('canvas');
            var _context;
            var _storage = [];
            var _undos = [];
            var _tmpShape;
            var _drawing = false;

            //Adding the canvas to the container
            container.appendChild(_canvas);
            _context = _canvas.getContext('2d');

            //#region Functions
            var pencil = function (points) {
                //Todo: Reduce the lenght of the Points array by using trigonometric functions.
                _context.moveTo(points[0].x, points[0].y);
                for (var i = 0; i < points.length; i++) {
                    _context.lineTo(points[i].x, points[i].y);
                }
            };

            var line = function(points){
                _context.moveTo(points[0].x, points[0].y);
                _context.lineTo(points[1].x, points[1].y);
            };

            var rectangle = function(points){
                var width, height;
                width = points[1].x - points[0].x;
                height = points[1].y - points[0].y;
                _context.rect(points[0].x, points[0].y, width, height);
            };

            var circle = function(points){
                var radius = (Math.abs(points[1].x - points[0].x) + (Math.abs(points[1].y - points[0].y)) / 2);
                _context.arc(points[1].x, points[1].y, radius, 0, Math.PI * 2, false);
            };

            var canvasToScreen = function (point){
                point.x *= _size.scale;
                point.y *= _size.scale;
            };

            /**
             * @description
             * Since the points are related to the canvas standard ize, they have to be transform it to the device canvas screen size.
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

            //#endregion

            //#region GettersAndSetters
            this.getCanvas = function() {
                return _canvas;
            };

            this.setContext = function (context) {
                _context = context;
            };

            this.getContext = function () {
                return _context;
            };

            this.setStorage = function (storage) {
                _storage = storage;
            };

            this.setTmpShape = function (tmpShape) {
                _tmpShape = new Shape(tmpShape);
            };

            this.getTmpShape = function () {
              return _tmpShape;
            };

            this.addPoint = function(point) {
                screenToCanvas(point);
                _tmpShape.addPoint(point);
            };

            this.isDrawing = function () {
                return _drawing;
            };

            this.setDrawing = function (drawing){
                _drawing = drawing;
            };
            //#endregion

            //#region FUNCTIONS
            /**
             *
             * @param width
             * @param height
             */
            this.setCanvasSize = function (width, height){
                _size = new SizeSetting(width, height);
                _canvas.setAttribute('width', width);
                _canvas.setAttribute('height', height);
                _canvas.style.width = width + 'px';
                _canvas.style.height = height + 'px';
            };

            this.renderStorage = function() {
                _context.clearRect(0,0, _size.width, _size.height);
                for (var i = 0; i < _storage.length; i++) {
                    this.renderShape(new Shape(JSON.parse(_storage[i])));
                }
            };

            this.renderShape = function(shape){
                if(!shape){
                    throw new Error('Can\'t render shape. Is '+shape);
                }
                var points = shape.getPoints();
                canvasToScreenAll(points);
                _context.beginPath();
                //The line width also need to be adjust according to the canvas size.
                _context.lineWidth = shape.getLineWidth() * _size.scale;
                _context.lineCap = shape.getLineCap();
                _context.strokeStyle = shape.isStroked() ? shape.getLineColor() : Enums.COLORS.TRANSPARENT;
                _context.fillStyle = shape.isFilled() ? shape.getFillStyle() : Enums.COLORS.TRANSPARENT;
                switch (shape.getToolName()){
                    case Enums.TOOLS.PENCIL:
                        pencil(points);
                        break;
                    case Enums.TOOLS.LINE:
                        line(points);
                        break;
                    case Enums.TOOLS.RECTANGLE:
                        rectangle(points);
                        break;
                    case Enums.TOOLS.CIRCLE:
                        circle(points);
                        break;
                    default:
                        throw  new Error ('Tool: '+ shape.getToolName() +' is invalid');
                        _drawing = false;
                        break;
                }
                _context.fill();
                _context.stroke();
                screenToCanvasAll(shape.getPoints());
            };

            this.refresh = function () {
                this.renderStorage();
                if(_tmpShape.getPoints().length > 1){
                    this.renderShape(_tmpShape);
                }
            };

            this.endDrawing = function () {
                _undos = [];
                if(_tmpShape.getPoints().length > 1){
                    _storage.push(JSON.stringify(_tmpShape));
                }
                _drawing = false;
                this.renderStorage();
            };

            this.cancelDraw = function () {
                this.getContext().translate(0,0);
                _drawing = false;
            };

            this.resetCanvas = function () {
                _storage = [];
                this.renderStorage();
            };

            this.undo = function () {
                if(_storage.length <= 0) {
                    return;
                }
                _undos.push(_storage.pop());
                this.renderStorage();
                _drawing = false;
            };

            this.redo = function () {
                if(_undos.length <= 0){
                    return;
                }
                _storage.push(_undos.pop());
                this.renderStorage();
                _drawing = false;
            };
            //#endregion
        }
        return Drawer;
    });
