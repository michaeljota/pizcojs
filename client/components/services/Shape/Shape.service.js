'use strict';

angular.module('tesisApp')
    .factory('Shape', function (Enums) {

        function Vector2(x,y){
            this.x = x;
            this.y = y;
        }

        function Shape(shape) {
            var _toolName = shape.ToolName;
            var _lineColor = shape.LineColor;
            var _lineWidth = shape.LineWidth;
            var _lineCap = shape.LineCap;
            var _fillStyle = shape.FillStyle;
            var _filled = shape.Filled;
            var _stroked = shape.Stroked;
            var _points = shape.Points ? shape.Points : [];

            //#region GettersAndSetters
            this.getToolName = function () {
                return _toolName;
            };

            this.setToolName = function (toolName) {
                _toolName = toolName;
            };

            this.getLineColor = function () {
                return _lineColor;
            };

            this.setLineColor = function (lineColor) {
                _lineColor = lineColor;
            };

            this.getLineWidth = function () {
                return _lineWidth;
            };

            this.setLineWidth = function (lineWidth) {
                _lineWidth = lineWidth;
            };

            this.getLineCap = function () {
                return _lineCap;
            };

            this.setLineCap = function (lineCap) {
                _lineCap = lineCap;
            };

            this.getFillStyle = function () {
                return _fillStyle;
            };

            this.setFillStyle = function (fillStyle) {
                _fillStyle = fillStyle;
            };

            this.isFilled = function () {
                return _filled;
            };

            this.setFilled = function (filled) {
                _filled = filled;
            };

            this.isStroked = function () {
                return _stroked;
            };

            this.setStroked = function (stroked) {
                _stroked = stroked;
            };

            this.getPoints = function () {
                return _points;
            };

            this.setPoints = function (points) {
                _points = points;
            };
            //#endregion

            //#region Public Functions
            this.addPoint = function (point) {
                if (_toolName !== Enums.TOOLS.PENCIL && _points.length > 1) {
                    _points.pop();
                }
                _points.push(point);
            };

            this.toJSON = function () {
                return {
                    ToolName: _toolName,
                    LineColor: _lineColor,
                    LineWidth: _lineWidth,
                    LineCap: _lineCap,
                    FillStyle: _fillStyle,
                    Filled: _filled,
                    Stroked: _stroked,
                    Points: _points
                };
            };
            //#endregion
        }

        Shape.clone = function (shape) {
            if ((!shape instanceof Shape)) {
                throw new Error('Can\'t clone shape');
            }
            return new Shape(shape.toJSON());
        };

        Shape.Vector2 = Vector2;

        // Public API here
        return Shape;
    });
