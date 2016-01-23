'use strict';

angular.module('tesisApp')
    .service('shapeRenderer', function (canvas, Enums) {

        //#region Functions
        var pencil = function (points) {
            //Todo: Reduce the lenght of the Points array by using trigonometric functions.
            canvas.context.moveTo(points[0].x, points[0].y);
            for (var i = 0; i < points.length; i++) {
                canvas.context.lineTo(points[i].x, points[i].y);
            }
        };

        var line = function(points){
            var i = points.length - 1;
            canvas.context.moveTo(points[0].x, points[0].y);
            canvas.context.lineTo(points[i].x, points[i].y);
        };

        var rectangle = function(points){
            var i = points.length - 1;
            var width, height;
            width = points[i].x - points[0].x;
            height = points[i].y - points[0].y;
            canvas.context.rect(points[0].x, points[0].y, width, height);
        };

        var circle = function(points){
            var i = points.length - 1;
            var radius = (Math.abs(points[i].x - points[0].x) + (Math.abs(points[i].y - points[0].y)) / 2);
            canvas.context.arc(points[i].x, points[i].y, radius, 0, Math.PI * 2, false);
        };

        //#endregion

        this.renderShape = function(shape, cb){
            cb = cb || angular.noop;
            if(!shape){
                cb(new Error('Can\'t render shape. Is '+shape));
                return;
            }
            var points = shape.points;
            canvas.canvasToScreenAll(points);
            canvas.context.beginPath();
            canvas.context.lineWidth = shape.lineWidth * canvas.getSize().scale;
            canvas.context.lineCap = shape.lineCap;
            canvas.context.strokeStyle = shape.lineColor;
            canvas.context.fillStyle = shape.fillStyle;
            switch (shape.shapeType){
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
                    cb(new Error ('Tool: '+ shape.shapeType +' is invalid'));
                    return;
            }
            if (shape.stroked) {
                canvas.context.stroke();
            }
            if (shape.filled) {
                canvas.context.fill();
            }
            canvas.screenToCanvasAll(shape.points);
        };
    });
