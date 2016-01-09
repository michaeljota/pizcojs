'use strict';

angular.module('tesisApp')
  .controller('SketchpadCtrl', function ($scope, $http, Syncer, Enums) {

        var _syncer = new Syncer(document.getElementById('canvasContainer'));
        var canvas;

        var tools = [];
        tools.push({
            label: 'Pencil',
            onClick: function() {
                $scope.shape.ToolName = Enums.TOOLS.PENCIL;
            },
            icon: 'pencil'
        });

        tools.push({
            label: 'Line',
            onClick: function() {
                $scope.shape.ToolName = Enums.TOOLS.LINE;
            },
            icon: 'vector-line'
        });

        tools.push({
            label: 'Rectangle',
            onClick: function() {
                $scope.shape.ToolName = Enums.TOOLS.RECTANGLE;
            },
            icon: 'vector-square'
        });

        tools.push({
            label: 'Circle',
            onClick: function() {
                $scope.shape.ToolName = Enums.TOOLS.CIRCLE;
            },
            icon: 'vector-circle'
        });

        tools.push({
            label: 'Undo',
            onClick: function() {
                undo();
            },
            icon: 'undo-variant'
        });

        tools.push({
            label: 'Redo',
            onClick: function() {
                redo();
            },
            icon: 'redo-variant'
        });

        tools.push({
            label: 'Reset',
            onClick: function() {
                reset();
            },
            icon: 'delete'
        });

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
            var t = (event.touches) ?
            {
                x: (event.touches[0].pageX - event.target.offsetLeft),
                y: (event.touches[0].pageY - event.target.offsetTop)
            } :
            {
                x: (event.pageX - event.target.offsetLeft),
                y: (event.pageY - event.target.offsetTop)
            };
            console.log(t);
            return t;
        };

        var start = function () {
            _syncer.startDrawing($scope.shape);
        };

        var move = function (event) {
            event.preventDefault();
            if(_syncer.getDrawer().isDrawing()){
                _syncer.getDrawer().addPoint(newPoint(event));
                _syncer.refresh();
            }
        };

        var end = function () {
            if (_syncer.getDrawer().isDrawing()) {
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
        $scope.tools = tools;

        $scope.init = function () {
            $scope.shape = {
                ToolName   : Enums.TOOLS.PENCIL,
                LineColor  : Enums.COLORS.BLACK,
                LineWidth  : 3,
                LineCap    : 'round',
                FillStyle  : Enums.COLORS.GREY,
                Filled     : false,
                Stroked    : true
            };

            canvas = _syncer.getCanvas();

            canvas.addEventListener('touchstart', start ,false);
            canvas.addEventListener('mousedown', start, false);

            canvas.addEventListener('touchmove', move, false);
            canvas.addEventListener('mousemove', move, false);

            canvas.addEventListener('touchend', end, false);
            canvas.addEventListener('mouseup', end, false);
            //TODO: When the mouse leave, should it continue drawing when the pointer is inside the canvas?
            canvas.addEventListener('mouseleave', end, false);

            canvas.addEventListener('touchcancel', function () {
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
