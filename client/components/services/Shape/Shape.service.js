'use strict';

angular.module('tesisApp')
    .factory('Shape', function (Enums) {

        // Public API here
        return (function (shape) {
            this.ToolName = null;
            this.LineColor = null;
            this.LineWidth = null;
            this.LineCap = null;
            this.FillStyle = null;
            this.isFilled = null;
            this.isStroked = null;

            if (shape) {
                this.ToolName = shape.ToolName;
                this.LineColor = shape.LineColor;
                this.LineWidth = shape.LineWidth;
                this.LineCap = shape.LineCap;
                this.FillStyle = shape.FillStyle;
                this.isFilled = shape.isFilled;
                this.isStroked = shape.isStroked;
            }

            this.Points = [];

            this.addPoint = function (point) {
                if (this.ToolName !== Enums.TOOLS.PENCIL && this.Points.length > 1) {
                    this.Points.pop();
                }
                this.Points.push(point)
            }

        });
    });
