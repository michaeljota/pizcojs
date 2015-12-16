'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($scope, $http, Syncer, Enums) {

        var _syncer = new Syncer(document.getElementById('canvasContainer'));
        var canvas;
        var resizeCanvas = function () {
            var container = document.getElementById('canvasContainer');
            var wid = container.clientWidth;
            var hei = window.innerHeight * 0.70;
            if(wid>hei){
                wid = hei;
            }else{
                hei = wid;
            }
            _syncer.getDrawer().setCanvasSize(wid,hei);
            _syncer.requestSync();
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

            canvas = _syncer.getDrawer().getCanvas();

            canvas.ontouchstart =
                canvas.onmousedown = function () {
                    _syncer.startDrawing($scope.shape);
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

            window.addEventListener('resize', resizeCanvas);
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
