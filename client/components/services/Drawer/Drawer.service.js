'use strict';

angular.module('tesisApp')
    .factory('Drawer', function (Shape, Enums) {

        //#region PrivateClasses
        function Config (config) {
            //TODO: Check if config is NaN
            var originalSize = 500;
            this.width = config.width || originalSize;
            this.height = config.height || originalSize;
            this.aspectRatio = config.aspectRatio || this.height/this.width;
            this.scale = this.height/originalSize;
        }
        //#endregion

        function Drawer (container) {
            if(!container){
                throw new Error('Drawer must be initialized with a container');
            }
            var _size;
            var _canvas = document.createElement('canvas');
            var _context;
            var _storage = [];
            var _undos = [];
            var _tmpShape = null;

            //Adding the canvas to the container
            container.appendChild(_canvas);
            _context = _canvas.getContext('2d');

            //#region Functions
            var pencil = function (shape) {
                //Todo: Reduce the lenght of the Points array by using trigonometric functions.
                _context.moveTo(shape.getPoints()[0].x, shape.getPoints()[0].y);
                for (var i = 0; i < shape.getPoints().length; i++) {
                    _context.lineTo(shape.getPoints()[i].x, shape.getPoints()[i].y);
                }
            };

            var line = function(shape){
                _context.moveTo(shape.getPoints()[0].x, shape.getPoints()[0].y);
                _context.lineTo(shape.getPoints()[1].x, shape.getPoints()[1].y);
            };

            var rectangle = function(shape){
                var width, height;
                width = shape.getPoints()[1].x - shape.getPoints()[0].x;
                height = shape.getPoints()[1].y - shape.getPoints()[0].y;
                _context.rect(shape.getPoints()[0].x, shape.getPoints()[0].y, width, height);
            };

            var circle = function(shape){
                var radius = (Math.abs(shape.getPoints()[1].x - shape.getPoints()[0].x) + (Math.abs(shape.getPoints()[1].y - shape.getPoints()[0].y)) / 2);
                _context.arc(shape.getPoints()[1].x, shape.getPoints()[1].y, radius, 0, Math.PI * 2, false);
            };

            /**
             * Since the points are related to the Canvas standard size, they have to be normalized to the device canvas size.
             * @param {*|Vector2} point
             * @returns {*|Vector2}
             */
            var normalizePoint = function (point){
                return new Shape.Vector2(point.x * _size.scale, point.y * _size.scale);
            };

            var normalizeAllPoints = function(points){
                points = points || [];
                var pnts = [];
                points.forEach(function(point){
                    pnts.push(normalizePoint(point));
                }, this);
                return pnts;
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

            /**Storage Setter
             * The old storage is clear, and the setter one gets verified.
             * The new storage is made, by pushing the shapes normalized from the setter.
             * The storage is not readable, cause the storage is device formatted.
             *
             * @param {[string]}storage
             */
            this.setStorage = function (storage) {
                _storage = [];
                storage = storage || [];
                for (var i = 0; i < storage.length; i++) {
                    var shape = new Shape(JSON.parse(storage[i]));
                    shape.setPoints(normalizeAllPoints(shape.getPoints()));
                    _storage.push(JSON.stringify(shape));
                }
            };

            /**
             *
             * @param tmpShape
             */

            this.setTmpShape = function (tmpShape) {
                _tmpShape = new Shape(tmpShape);
            };

            this.resetTmpShape = function () {
                _tmpShape = null;
            };

            this.getTmpShape = function () {
                return _tmpShape;
            };
            //#endregion

            //#region FUNCTIONS

            this.setCanvasSize = function (width, height){
                _size = new Config({width: width, height: height});
                _canvas.setAttribute('width', width);
                _canvas.setAttribute('height', height);
                _canvas.style.width = width + 'px';
                _canvas.style.height = height + 'px';
            };

            this.renderShapeStorage = function() {
                _context.clearRect(0,0, _size.width, _size.height);
                for (var i = 0; i < _storage.length; i++) {
                    this.renderShape(new Shape(JSON.parse(_storage[i])));
                }
            };

            this.renderShape = function(shape){
                if(!shape){
                    throw new Error('Can\'t render shape. Is '+shape);
                }
                _context.beginPath();
                //The line width also need to be adjust according to the canvas size.
                _context.lineWidth = shape.getLineWidth() * _size.scale;
                _context.lineCap = shape.getLineCap();
                _context.strokeStyle = shape.isStroked() ? shape.getLineColor() : Enums.COLORS.TRANSPARENT;
                _context.fillStyle = shape.isFilled() ? shape.getFillStyle() : Enums.COLORS.TRANSPARENT;
                switch (shape.getToolName()){
                    case Enums.TOOLS.PENCIL:
                        pencil(shape);
                        break;
                    case Enums.TOOLS.LINE:
                        line(shape);
                        break;
                    case Enums.TOOLS.RECTANGLE:
                        rectangle(shape);
                        break;
                    case Enums.TOOLS.CIRCLE:
                        circle(shape);
                        break;
                    default:
                        console.error('ERR! Tool: '+ shape.getToolName() +' is invalid');
                        _tmpShape = null;
                        break;
                }
                _context.fill();
                _context.stroke();
            };

            this.refresh = function () {
                this.renderShapeStorage();
                if(this.getTmpShape().getPoints().length > 1){
                    this.renderShape(this.getTmpShape());
                }
            };

            this.endDrawing = function () {
                if(this.getTmpShape().getPoints().length > 1){
                    _storage.push(JSON.stringify(this.getTmpShape()));
                }
                _tmpShape = null;
                this.renderShapeStorage();
            };

            this.cancelDraw = function () {
                this.getContext().translate(0,0);
                _tmpShape = null;
            };

            this.resetCanvas = function () {
                this.setStorage([]);
                this.renderShapeStorage();
            };

            this.undo = function () {
                _storage.pop();
                this.renderShapeStorage();
                _tmpShape = null;
            };
            //#endregion
        }
        return Drawer;
    });
