'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($scope, $http, Syncer, Enums) {

        var _syncer = new Syncer();
        var canvas;
        var resizeCanvas = function () {
            //var container = document.getElementById('canvasContainer');
            /*var preSize = {
             width : container.clientWidth,
             height : window.innerHeight * 0.70
             };

             canvas.width  = _drawManager.getCanvasSize;
             canvas.height = _drawManager.getCanvasSize;*/

            _syncer.getDrawer().setCanvasSize(600);
            canvas.height = _syncer.getDrawer().getCanvasSize();
            canvas.width = _syncer.getDrawer().getCanvasSize();
            _syncer.getDrawer().renderShapeStorage();
        };

        var newPoint = function (event) {
            return (event.touches) ?
            {
                x: (event.touches[0].pageX - event.target.offsetLeft),
                y: (event.touches[0].pageY - event.target.offsetTop)
            } :
            {
                x: (event.pageX - event.target.offsetLeft),
                y: (event.pageY - event.target.offsetTop)
            };
        };

        //#region Bindings
        $scope.shape = {};
        $scope.Tools = Enums.TOOLS;

        $scope.init = function () {
            $scope.shape = {
                ToolName   : Enums.TOOLS.PENCIL,
                LineColor  : Enums.COLORS.BLACK,
                LineWidth  : 1,
                LineCap    : 'round',
                FillStyle  : Enums.COLORS.GREY,
                Filled     : false,
                Stroked    : true
            };
            canvas = document.getElementById('canvas');
            _syncer.getDrawer().setContext(canvas.getContext('2d'));
            resizeCanvas();
            _syncer.requestSync();

            canvas.ontouchstart =
                canvas.onmousedown = function () {
                    //It's expected to a new Shape to be created. Creating a new one here, would be desire, but unnecessary.
                    _syncer.startDrawing(JSON.stringify($scope.shape));
                };

            canvas.ontouchmove = function (event) {
                event.preventDefault();
                if(_syncer.getDrawer().getTmpShape()){
                    _syncer.getDrawer().getTmpShape().addPoint(newPoint(event));
                    _syncer.refresh();
                }
            };

            canvas.onmousemove = function (event) {
                if(_syncer.getDrawer().getTmpShape()){
                    _syncer.getDrawer().getTmpShape().addPoint(newPoint(event));
                    _syncer.refresh();
                }
            };

            canvas.ontouchend =
                canvas.onmouseleave =
                    canvas.onmouseup = function () {
                        if(_syncer.getDrawer().getTmpShape()){
                            _syncer.endDrawing();
                        }
                    };

            canvas.ontouchcancel = function () {
                _syncer.getDrawer().cancelDraw();
            };

            window.addEventListener('resize', resizeCanvas());
            window.addEventListener('load', resizeCanvas());
        };

        $scope.reset = function (){
            _syncer.resetCanvas();
        };

        $scope.undo = function () {
            _syncer.undo();
        };

        $scope.$watch('shape.ToolName', function () {
            if($scope.shape.ToolName === Enums.TOOLS.PENCIL){
                $scope.shape.Filled = false;
            }
        });

        $scope.$watch('shape.Filled', function () {
            if(($scope.shape.ToolName === Enums.TOOLS.PENCIL || $scope.shape.ToolName === Enums.TOOLS.LINE) && $scope.shape.Filled){
                $scope.shape.ToolName = Enums.TOOLS.RECTANGLE;
            }
        });
    });
