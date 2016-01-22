'use strict';

angular.module('tesisApp')
    .factory('Shape', function (Enums) {

        function Vector2(x,y){
            this.x = x;
            this.y = y;
        }

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

        Shape.Vector2 = Vector2;

        // Public API here
        return Shape;
    });
