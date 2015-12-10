'use strict';

angular.module('tesisApp')  .factory('Shape', function (Enums) {

    function Shape(shape) {
        if (shape instanceof Shape) {
            this._toolName = shape.getToolName();
            this._lineColor = shape.getLineColor();
            this._lineWidth = shape.getLineWidth();
            this._lineCap = shape.getLineCap();
            this._fillStyle = shape.getFillStyle();
            this._filled = shape.isFilled();
            this._stroked = shape.isStroked();
            this._points = shape.getPoints().length > 1 ? shape.getPoints() : [];
        }else if (typeof shape === 'string') {
            try {
                var s = JSON.parse(shape);
                this._toolName = s.ToolName;
                this._lineColor = s.LineColor;
                this._lineWidth = s.LineWidth;
                this._lineCap = s.LineCap;
                this._fillStyle = s.FillStyle;
                this._filled = s.Filled;
                this._stroked = s.Stroked;
                this._points = s.Points ? s.Points : [];
            }catch(err){
                console.error('Error: Shape could not be created. Invalid JSON.');
            }
        }else{
            console.error('Error: Shape could not be created. Invalid data.');
        }
    }

    Shape.prototype.getToolName = function () {
        return this._toolName;
    };

    Shape.prototype.setToolName = function (toolName) {
        this._toolName = toolName;
    };

    Shape.prototype.getLineColor = function () {
        return this._lineColor;
    };

    Shape.prototype.setLineColor = function (lineColor) {
        this._lineColor = lineColor;
    };

    Shape.prototype.getLineWidth = function () {
        return this._lineWidth;
    };

    Shape.prototype.setLineWidth = function (lineWidth) {
        this._lineWidth = lineWidth;
    };

    Shape.prototype.getLineCap = function () {
        return this._lineCap;
    };

    Shape.prototype.setLineCap = function (lineCap) {
        this._lineCap = lineCap;
    };

    Shape.prototype.getFillStyle = function () {
        return this._fillStyle;
    };

    Shape.prototype.setFillStyle = function (fillStyle) {
        this._fillStyle = fillStyle;
    };

    Shape.prototype.isFilled = function () {
        return this._filled;
    };

    Shape.prototype.setFilled = function (filled) {
        this._filled = filled;
    };

    Shape.prototype.isStroked = function () {
        return this._stroked;
    };

    Shape.prototype.setStroked = function (stroked) {
        this._stroked = stroked;
    };

    Shape.prototype.getPoints = function () {
        return this._points;
    };

    Shape.prototype.setPoints = function (points) {
        this._points = points;
    };

    Shape.prototype.addPoint = function (point) {
        if (this._toolName !== Enums.TOOLS.PENCIL && this._points.length > 1) {
            this._points.pop();
        }
        this._points.push(point);
    };

    Shape.prototype.toJSON = function () {
        return {
            ToolName: this._toolName,
            LineColor: this._lineColor,
            LineWidth: this._lineWidth,
            LineCap: this._lineCap,
            FillStyle: this._fillStyle,
            Filled: this._filled,
            Stroked: this._stroked,
            Points: this._points
        };
    };

    Shape.fromJSON = function (json) {
        return new Shape(json);
    };

    // Public API here
    return Shape;
});
