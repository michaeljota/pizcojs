'use strict';

angular.module('tesisApp')
    .factory('drawManager', function ($log, Shape, Enums) {

        var
            _canvasSize,
            _context,
            _shapeStorage = [],
            _tmpShape,

        //Functions

            _renderShape = function(shape){
                if(!shape){
                    $log.error("Shape is "+shape);
                    return;
                }
                _context.beginPath();
                _context.lineWidth = shape.LineWidth;
                _context.lineCap = shape.LineCap;
                _context.strokeStyle = shape.isStroked ? shape.LineColor : Enums.COLORS.TRANSPARENT;
                _context.fillStyle = shape.isFilled ? shape.FillStyle : Enums.COLORS.TRANSPARENT;
                switch (shape.ToolName){
                    case Enums.TOOLS.PENCIL:
                        _pencil(shape);
                        break;
                    case Enums.TOOLS.LINE:
                        _line(shape);
                        break;
                    case Enums.TOOLS.RECTANGLE:
                        _rectangle(shape);
                        break;
                    case Enums.TOOLS.CIRCLE:
                        _circle(shape);
                        break;
                    default:
                        $log.error('ERR! Tool: '+ shape.ToolName +' is invalid');
                        _setTmpShape(null);
                        break;
                }
                _context.fill();
                _context.stroke();
            },

            _pencil = function(shape){
                if(!shape){
                    $log.error("Shape is "+shape);
                    return;
                }
                //Todo: Reduce the lenght of the Points array by using trigonometric functions.
                _context.moveTo(shape.Points[0].x, shape.Points[0].y);
                for (var i = 0; i < shape.Points.length; i++) {
                    _context.lineTo(shape.Points[i].x, shape.Points[i].y);
                }
            },

            _line = function(shape){
                if(!shape){
                    $log.error("Shape is "+shape);
                    return;
                }
                _context.moveTo(shape.Points[0].x, shape.Points[0].y);
                _context.lineTo(shape.Points[1].x, shape.Points[1].y);
            },

            _rectangle = function(shape){
                if(!shape){
                    $log.error("Shape is "+shape);
                    return;
                }
                var width, height;
                width = shape.Points[1].x - shape.Points[0].x;
                height = shape.Points[1].y - shape.Points[0].y;
                _context.rect(shape.Points[0].x, shape.Points[0].y, width, height);
            },

            _circle = function(shape){
                if(!shape){
                    $log.error("Shape is "+shape);
                    return;
                }
                var radius = (Math.abs(shape.Points[1].x - shape.Points[0].x) + (Math.abs(shape.Points[1].y - shape.Points[0].y)) / 2);
                _context.arc(shape.Points[1].x, shape.Points[1].y, radius, 0, Math.PI * 2, false);
            },

            _renderShapeStorage = function() {
                _context.clearRect(0,0, _canvasSize, _canvasSize);
                for (var i = 0; i < _shapeStorage.length; i++) {
                    _renderShape(_shapeStorage[i]);
                }
            },

            _continueDrawing = function () {
                if (_tmpShape) {
                    var point = (window.event.touches) ?
                    {
                        x: (window.event.touches[0].pageX - window.event.target.offsetLeft),
                        y: (window.event.touches[0].pageY - window.event.target.offsetTop)
                    } :
                    {
                        x: (window.event.pageX - window.event.target.offsetLeft),
                        y: (window.event.pageY - window.event.target.offsetTop)
                    };
                    _tmpShape.addPoint(point);
                    if(_tmpShape.Points.length > 1){
                        //socket.socket.emit('draw', tmpShape);
                        //renderShape(tmpShape);
                    }
                }
            },

            _endDrawing = function () {
                if(_tmpShape){
                    _renderShapeStorage();
                    _setTmpShape(null);
                }
            },

            _setScaleFrom = function(preSize) {
                //TODO: Make a function to set an scale to the canvas. This maybe in another class.
            },

            _setTmpShape = function(shape){
                _tmpShape = shape ? new Shape(shape) : null;
            },

            _setShapeStorage = function(storage){
                _shapeStorage = storage ? storage : [];
            };

        return {
            
            getTmpShape : function(){
                return _tmpShape;
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
                _context = ctx;
            },

            getCanvasSize : function(){
                return _canvasSize;
            },

            setCanvasSize : function (canvasSize) {
                _canvasSize = canvasSize;
            },

            resetDraw : function () {
                _context.translate(0,0);
                _setTmpShape(null);
            },

            undo : function () {
                _shapeStorage.pop();
                _renderShapeStorage();
                _setTmpShape(null);
            },

            renderShapeStorage : function () {
                _renderShapeStorage();
            },

            renderShape : function(shape){
                _renderShape(shape);
            },

            /*setScaleFrom : function (preSize) {
                _setScaleFrom(preSize);
            },*/

            setShapeStorage : function(storage){
                _setShapeStorage(storage);
            }

        };
    });
