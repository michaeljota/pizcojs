'use strict';

angular.module('tesisApp')
  .controller('SketchpadCtrl', function ($scope, $http, Syncer, Enums) {

        var _syncer = new Syncer(document.getElementById('canvasContainer'));
        var _canvas;

        var resizeCanvas = function () {
            var container = document.getElementById('canvasContainer');
            var wid = container.clientWidth;
            var hei = window.innerHeight * 0.80;
            if(wid>hei){
                wid = hei;
            }else{
                hei = wid;
            }
            _syncer.setCanvasSize(wid,hei);
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

        var start = function () {
            _syncer.startDrawing($scope.shape);
        };

        var move = function (event) {
            event.preventDefault();
            if(_syncer.isDrawing()){
                _syncer.addPoint(newPoint(event));
                _syncer.refresh();
            }
        };

        var end = function () {
            if (_syncer.isDrawing()) {
                _syncer.endDrawing();
            }
        };

        var reset = function (){
            _syncer.resetCanvas();
        };

        var undo = function () {
            _syncer.undo();
        };

        var redo = function () {
            _syncer.redo ();
        };

        //#region Bindings
        $scope.shape = {};
        $scope.tools = Enums.TOOLS;
        $scope.reset = reset();
        $scope.undo = undo();
        $scope.redo = redo();

        $scope.init = function () {
            $scope.shape = {
                type       : Enums.TOOLS.PENCIL,
                lineColor  : Enums.COLORS.BLACK,
                lineWidth  : 3,
                lineCap    : 'round',
                fillColor  : Enums.COLORS.GREY,
                filled     : false,
                stroked    : true
            };

            _canvas = _syncer.getCanvas();

            _canvas.addEventListener('touchstart', start ,false);
            _canvas.addEventListener('mousedown', start, false);

            _canvas.addEventListener('touchmove', move, false);
            _canvas.addEventListener('mousemove', move, false);

            _canvas.addEventListener('touchend', end, false);
            _canvas.addEventListener('mouseup', end, false);
            //TODO: When the mouse leave, should it continue drawing when the pointer is inside the canvas?
            _canvas.addEventListener('mouseleave', end, false);

            _canvas.addEventListener('touchcancel', function () {
                _syncer.cancelDraw();
            }, false);

            resizeCanvas();

            window.addEventListener('resize', resizeCanvas);
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
