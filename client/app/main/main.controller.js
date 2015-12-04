'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($log, $scope, $http, syncManager, Shape, Enums) {

        var _drawManager;
        var canvas;
        var resizeCanvas = function () {
            var container = document.getElementById('canvasContainer');
            /*var preSize = {
                width : container.clientWidth,
                height : window.innerHeight * 0.70
            };

            canvas.width  = _drawManager.getCanvasSize;
            canvas.height = _drawManager.getCanvasSize;*/

            _drawManager.setCanvasSize(500);
            canvas.height = _drawManager.getCanvasSize();
            canvas.width = _drawManager.getCanvasSize();
            _drawManager.renderShapeStorage();
        };

        //Bindings
        $scope.shape = new Shape();
        $scope.Tools = Enums.TOOLS;

        //Funcions

        $scope.init = function () {
            $scope.shape = new Shape({
                ToolName   : Enums.TOOLS.PENCIL,
                LineColor  : Enums.COLORS.BLACK,
                LineWidth  : 1,
                LineCap    : 'round',
                FillStyle  : Enums.COLORS.GREY,
                isFilled   : false,
                isStroked  : true
            });
            canvas = document.getElementById('canvas');
            _drawManager = syncManager.DrawManager();
            _drawManager.setContext(canvas.getContext('2d'));

            resizeCanvas();
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

            window.addEventListener('resize', resizeCanvas());
            window.addEventListener('load', resizeCanvas());
        };

        $scope.resetDraw = function (){
            syncManager.resetDraw();
        };

        $scope.undo = function () {
            syncManager.undo();
        };

        $scope.$watch('shape.ToolName', function () {
            if($scope.shape.ToolName === Enums.TOOLS.PENCIL){
                $scope.shape.isFilled = false;
            }
        });

        $scope.$watch('shape.isFilled', function () {
            if(($scope.shape.ToolName === Enums.TOOLS.PENCIL || $scope.shape.ToolName === Enums.TOOLS.LINE)&& $scope.shape.isFilled){
                $scope.shape.ToolName = Enums.TOOLS.RECTANGLE;
            }
        });
    });
