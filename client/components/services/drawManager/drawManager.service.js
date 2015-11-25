'use strict';

angular.module('tesisApp')
    .factory('drawManager', function () {

        var Colors = {
            TRANSPARENT: 'rgba(0, 0, 0, 0)',
            BLACK:       'rgba(0, 0, 0, 1)',
            GREY:        'rgba(180, 180, 180, 1)'
        };

        var Tool = {
            PENCIL : 0,
            LINE : 1,
            RECTANGLE : 2,
            CIRCLE : 3,

            properties : {
                0: {name: 'pencil', value: 0, code: 'P'},
                1: {name: 'line', value: 1, code: 'L'},
                2: {name: 'rectangle', value: 2, code: 'R'},
                3: {name: 'circle', value: 3, code: 'C'}
            }
        };

        /**
         *
         * @param {Shape} shape
         * @constructor
         */
        function Shape (shape) {
            this.ToolName   = shape.ToolName;
            this.LineColor  = shape.LineColor;
            this.LineWidth  = shape.LineWidth;
            this.LineCap    = shape.LineCap;
            this.FillStyle  = shape.FillStyle;
            this.isFilled   = shape.isFilled;
            this.isStroked  = shape.isStroked;
            this.Points     = [];
            this.addPoint   = function (point) {
                if (this.ToolName !== Tool.PENCIL && this.Points.length > 1) {
                    this.Points.pop();
                }
                this.Points.push(point)
            }
        }

        var
            CANVAS_SIZE = 600;

        var
            context,
            shapeStorage = [],
            tmpShape,
            scale,
            offset,

        //Functions

            _renderShape = function(shape){
                context.beginPath();
                context.lineWidth = shape.LineWidth;
                context.lineCap = shape.LineCap;
                context.strokeStyle = shape.isStroked ? shape.LineColor : Colors.TRANSPARENT;
                context.fillStyle = shape.isFilled ? shape.FillStyle : Colors.TRANSPARENT;
                switch (shape.ToolName){
                    case Tool.PENCIL:
                        _pencil(shape);
                        break;
                    case Tool.LINE:
                        _line(shape);
                        break;
                    case Tool.RECTANGLE:
                        _rectangle(shape);
                        break;
                    case Tool.CIRCLE:
                        _circle(shape);
                        break;
                    default:
                        console.log('ERR! ToolName: '+ shape.ToolName +' is invalid');
                        _setTmpShape(null);
                        break;
                }
                context.fill();
                context.stroke();
            },

            _pencil = function(shape){
                context.moveTo(shape.Points[0].x, shape.Points[0].y);
                for (var i = 0; i < shape.Points.length; i++) {
                    context.lineTo(shape.Points[i].x, shape.Points[i].y);
                }
            },

            _line = function(shape){
                context.moveTo(shape.Points[0].x, shape.Points[0].y);
                context.lineTo(shape.Points[1].x, shape.Points[1].y);
            },

            _rectangle = function(shape){
                var width, height;
                width = shape.Points[1].x - shape.Points[0].x;
                height = shape.Points[1].y - shape.Points[0].y;
                context.rect(shape.Points[0].x, shape.Points[0].y, width, height);
            },

            _circle = function(shape){
                var radius = (Math.abs(shape.Points[1].x - shape.Points[0].x) + (Math.abs(shape.Points[1].y - shape.Points[0].y)) / 2);
                context.arc(shape.Points[1].x, shape.Points[1].y, radius, 0, Math.PI * 2, false);
            },

            _renderShapeStorage = function() {
                context.clearRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
                for (var i = 0; i < shapeStorage.length; i++) {
                    _renderShape(shapeStorage[i]);
                }
            },

            _continueDrawing = function () {
                if (tmpShape) {
                    var point = (window.event.touches) ?
                    {
                        x: (window.event.touches[0].pageX - window.event.target.offsetLeft),
                        y: (window.event.touches[0].pageY - window.event.target.offsetTop)
                    } :
                    {
                        x: (window.event.pageX - window.event.target.offsetLeft),
                        y: (window.event.pageY - window.event.target.offsetTop)
                    };
                    tmpShape.addPoint(point);
                    if(tmpShape.Points.length > 1){
                        //socket.socket.emit('draw', tmpShape);
                        //renderShape(tmpShape);
                    }
                }
            },

            _endDrawing = function () {
                if(tmpShape){
                    _renderShapeStorage();
                    _setTmpShape(null);
                }
            },

            _setScaleFrom = function(preSize) {
                var factor;
                factor = preSize.height < preSize.width ? preSize.height : preSize.width;
                scale = factor/CANVAS_SIZE;
                context.scale(scale, scale);
            },

            _setTmpShape = function(shape){
                if(shape){
                    tmpShape = new Shape(shape);
                }else{
                    tmpShape = null;
                }
            },

            _setShapeStorage = function(storage){
                if(!storage){
                    shapeStorage = [];
                }else{
                    shapeStorage = storage;
                }
            }
            ;

        return {

            getTmpShape : function(){
                return tmpShape;
            },

            setTmpShape : function(shape){
                _setTmpShape(shape);
            },

            startDrawing : function () {

            },

            continueDrawing : function () {
                _continueDrawing();
            },

            endDrawing : function () {
                _endDrawing();
            },

            setContext : function (ctx) {
                context = ctx;
            },

            CANVAS_SIZE : function(){
                return CANVAS_SIZE
            },

            resetDraw : function () {
                context.translate(0,0);
                _setTmpShape(null);
            },

            undo : function () {
                shapeStorage.pop();
                _renderShapeStorage();
                _setTmpShape(null);
            },

            renderShapeStorage : function () {
                _renderShapeStorage();
            },

            renderShape : function(shape){
                _renderShape(shape);
            },

            setScaleFrom : function (preSize) {
                _setScaleFrom(preSize);
            },

            getScale : function(){
                return scale;
            },

            setShapeStorage : function(storage){
                _setShapeStorage(storage);
            }

        };
    });
