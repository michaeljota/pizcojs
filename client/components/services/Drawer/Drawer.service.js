'use strict';

angular.module('tesisApp')
    .factory('Drawer', function (Shape, Enums) {

        function Drawer (canvasSize, context) {
            this._canvasSize = canvasSize;
            this._context = context;
            this._shapeStorage = [];
            this._tmpShape = null;

            //#region Functions
            this.pencil = function(shape){
                //Todo: Reduce the lenght of the Points array by using trigonometric functions.
                this._context.moveTo(shape.getPoints()[0].x, shape.getPoints()[0].y);
                for (var i = 0; i < shape.getPoints().length; i++) {
                    this._context.lineTo(shape.getPoints()[i].x, shape.getPoints()[i].y);
                }
            };

            this.line = function(shape){
                this._context.moveTo(shape.getPoints()[0].x, shape.getPoints()[0].y);
                this._context.lineTo(shape.getPoints()[1].x, shape.getPoints()[1].y);
            };

            this.rectangle = function(shape){
                var width, height;
                width = shape.getPoints()[1].x - shape.getPoints()[0].x;
                height = shape.getPoints()[1].y - shape.getPoints()[0].y;
                this._context.rect(shape.getPoints()[0].x, shape.getPoints()[0].y, width, height);
            };

            this.circle = function(shape){
                var radius = (Math.abs(shape.getPoints()[1].x - shape.getPoints()[0].x) + (Math.abs(shape.getPoints()[1].y - shape.getPoints()[0].y)) / 2);
                this._context.arc(shape.getPoints()[1].x, shape.getPoints()[1].y, radius, 0, Math.PI * 2, false);
            };
            //#endregion
        }

        //#region GettersAndSetters
        Drawer.prototype.setCanvasSize = function (canvasSize) {
            this._canvasSize = canvasSize;
        };

        Drawer.prototype.getCanvasSize = function () {
            return this._canvasSize;
        };

        Drawer.prototype.setContext = function (context) {
            this._context = context;
        };

        Drawer.prototype.getContext = function () {
            return this._context;
        };

        Drawer.prototype.setShapeStorage = function (shapeStorage) {
            this._shapeStorage = shapeStorage ? shapeStorage : [];
        };

        Drawer.prototype.getShapeStorage = function () {
            return this._shapeStorage;
        };

        Drawer.prototype.setTmpShape = function (tmpShape) {
            this._tmpShape = tmpShape ? new Shape(tmpShape) : null;
        };

        Drawer.prototype.getTmpShape = function () {
            return this._tmpShape;
        };
        //#endregion

        //#region FUNCTIONS

        Drawer.prototype.renderShapeStorage = function() {
            this._context.clearRect(0,0, this._canvasSize, this._canvasSize);
            for (var i = 0; i < this._shapeStorage.length; i++) {
                this.renderShape(this._shapeStorage[i]);
            }
        };

        Drawer.prototype.renderShape = function(shape){
            if(!shape){
                console.error('Shape is '+shape);
                return;
            }
            this._context.beginPath();
            this._context.lineWidth = shape.getLineWidth();
            this._context.lineCap = shape.getLineCap();
            this._context.strokeStyle = shape.isStroked() ? shape.getLineColor() : Enums.COLORS.TRANSPARENT;
            this._context.fillStyle = shape.isFilled() ? shape.getFillStyle() : Enums.COLORS.TRANSPARENT;
            switch (shape.getToolName()){
                case Enums.TOOLS.PENCIL:
                    this.pencil(shape);
                    break;
                case Enums.TOOLS.LINE:
                    this.line(shape);
                    break;
                case Enums.TOOLS.RECTANGLE:
                    this.rectangle(shape);
                    break;
                case Enums.TOOLS.CIRCLE:
                    this.circle(shape);
                    break;
                default:
                    console.error('ERR! Tool: '+ shape.getToolName() +' is invalid');
                    this.setTmpShape(null);
                    break;
            }
            this._context.fill();
            this._context.stroke();
        };

        Drawer.prototype.refresh = function () {
            this.renderShapeStorage();
            if(this.getTmpShape().getPoints().length > 1){
                this.renderShape(this.getTmpShape());
            }
        };

        Drawer.prototype.endDrawing = function () {
            if(this.getTmpShape()){
                if(this.getTmpShape().getPoints().length > 1){
                    this.getShapeStorage().push(new Shape(this.getTmpShape()));
                }
                this.setTmpShape(null);
                this.renderShapeStorage();
            }
        };

        Drawer.prototype.cancelDraw = function () {
            this.getContext().translate(0,0);
            this.setTmpShape(null);
        };

        Drawer.prototype.resetCanvas = function () {
            this.setShapeStorage([]);
            this.renderShapeStorage();
        };

        Drawer.prototype.undo = function () {
            this.getShapeStorage().pop();
            this.renderShapeStorage();
            this.setTmpShape(null);
        };

        //TODO: Hacer la función de escalado del Canvas.

        //#endregion

        return Drawer;
    });
