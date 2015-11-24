'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($scope, $http, drawManager) {

        var colors = {
            TRANSPARENT: 'rgba(0, 0, 0, 0)',
            BLACK:       'rgba(0, 0, 0, 1)',
            GREY:        'rgba(180, 180, 180, 1)'
        };


        //TODO: Cambiar todos los usos de Tool.Name por el value.
        var Tool = {
            PENCIL : 1,
            LINE : 2,
            RECTANGLE : 3,
            CIRCLE : 4,

            properties : {
                1: {name: 'pencil', value: 1, code: 'P'},
                2: {name: 'line', value: 2, code: 'L'},
                3: {name: 'rectangle', value: 3, code: 'R'},
                4: {name: 'circle', value: 4, code: 'C'}
            }
        };

        var canvas;
        var resizeCanvas = function () {
            var container = document.getElementById('canvasContainer');
            var preSize = {
                width : container.clientWidth,
                height : window.innerHeight * 0.70
            };
            drawManager.setScaleFrom(preSize);

            canvas.width  = drawManager.CANVAS_SIZE * drawManager.getScale();
            canvas.height = drawManager.CANVAS_SIZE * drawManager.getScale();

            canvas.width = 500;
            canvas.height = 500;
            drawManager.renderShapeStorage();
        };

        //Bindings
        $scope.shape = {
            ToolName   : Tool.properties[Tool.PENCIL].name,
            LineColor  : colors.BLACK,
            LineWidth  : 1,
            LineCap    : 'round',
            FillStyle  : colors.TRANSPARENT,
            isFilled   : true,
            isStroked  : true
        };

        //Funcions

        $scope.init = function () {
            console.log('Starting');
            canvas = document.getElementById('canvas');
            canvas.width  = drawManager.CANVAS_SIZE;
            canvas.height = drawManager.CANVAS_SIZE;
            drawManager.setContext(canvas.getContext('2d'));

            canvas.ontouchstart =
                canvas.onmousedown = function () {
                    drawManager.setTmpShape($scope.shape);
                    drawManager.startDrawing();
                };

            canvas.ontouchmove = function () {
                event.preventDefault();
                drawManager.continueDrawing ();
            };

            canvas.onmousemove = function () {
                drawManager.continueDrawing ();
            };

            canvas.ontouchend =
                canvas.ontouchcancel =
                    canvas.onmouseleave =
                        canvas.onmouseup = function () {
                            drawManager.endDrawing();
                        };

            window.addEventListener('resize', resizeCanvas);
            window.addEventListener('load', resizeCanvas());
        };

        $scope.resetDraw = function (){
            drawManager.resetDraw();
        };

        $scope.undo = function () {
            drawManager.undo();
        };

        $scope.$watch('shape.toolName', function () {
            $scope.shape.filled = $scope.shape.toolName !== 'pencil';
        });
    });
