'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($log, $scope, $http, syncManager) {

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

        var _drawManager;
        var canvas;
        var resizeCanvas = function () {
            var container = document.getElementById('canvasContainer');
            var preSize = {
                width : container.clientWidth,
                height : window.innerHeight * 0.70
            };
            _drawManager.setScaleFrom(preSize);

            canvas.width  = _drawManager.CANVAS_SIZE * _drawManager.getScale();
            canvas.height = _drawManager.CANVAS_SIZE * _drawManager.getScale();

            canvas.width = 500;
            canvas.height = 500;
            _drawManager.renderShapeStorage();
        };

        //Bindings
        $scope.shape = {};

        //Funcions

        $scope.init = function () {
            $scope.shape = {
                ToolName   : Tool.PENCIL,
                LineColor  : Colors.BLACK,
                LineWidth  : 1,
                LineCap    : 'round',
                FillStyle  : Colors.GREY,
                isFilled   : false,
                isStroked  : true
            };
            _drawManager = syncManager.DrawManager();
            canvas = document.getElementById('canvas');
            canvas.width  = _drawManager.CANVAS_SIZE;
            canvas.height = _drawManager.CANVAS_SIZE;
            _drawManager.setContext(canvas.getContext('2d'));

            syncManager.requestSync();

            canvas.ontouchstart =
                canvas.onmousedown = function () {
                    _drawManager.setTmpShape($scope.shape);
                    syncManager.startDrawing();
                };

            canvas.ontouchmove = function () {
                event.preventDefault();
                syncManager.continueDrawing ();
            };

            canvas.onmousemove = function () {
                syncManager.continueDrawing ();
            };

            canvas.ontouchend =
                canvas.ontouchcancel =
                    canvas.onmouseleave =
                        canvas.onmouseup = function () {
                            syncManager.endDrawing();
                        };

            window.addEventListener('resize', resizeCanvas);
            window.addEventListener('load', resizeCanvas());
        };

        $scope.resetDraw = function (){
            syncManager.resetDraw();
        };

        $scope.undo = function () {
            syncManager.undo();
        };

        $scope.$watch('shape.ToolName', function () {
            if($scope.shape.ToolName === Tool.PENCIL){
                $scope.shape.isFilled = false;
            }
        });

        $scope.$watch('shape.isFilled', function () {
            if(($scope.shape.ToolName === Tool.PENCIL || $scope.shape.ToolName === Tool.LINE)&& $scope.shape.isFilled){
                $scope.shape.ToolName = Tool.RECTANGLE;
            }
        });
    });
