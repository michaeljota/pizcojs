'use strict';

angular.module('tesisApp')
    .controller('MainCtrl', function ($scope, $http, Syncer, Enums) {

        var _syncer = new Syncer(document.getElementById('canvasContainer'));
        var canvas;

        $scope.tiles = buildGridModel({
            icon : "avatar:svg-",
            title: "Svg-",
            background: ""
        });

        function buildGridModel(tileTmpl){
            var it, results = [ ];

            for (var j=0; j<11; j++) {

                it = angular.extend({},tileTmpl);
                it.icon  = it.icon + (j+1);
                it.title = it.title + (j+1);
                it.span  = { row : 1, col : 1 };

                switch(j+1) {
                    case 1:
                        it.background = "red";
                        it.span.row = it.span.col = 2;
                        break;

                    case 2: it.background = "green";         break;
                    case 3: it.background = "darkBlue";      break;
                    case 4:
                        it.background = "blue";
                        it.span.col = 2;
                        break;

                    case 5:
                        it.background = "yellow";
                        it.span.row = it.span.col = 2;
                        break;

                    case 6: it.background = "pink";          break;
                    case 7: it.background = "darkBlue";      break;
                    case 8: it.background = "purple";        break;
                    case 9: it.background = "deepBlue";      break;
                    case 10: it.background = "lightPurple";  break;
                    case 11: it.background = "yellow";       break;
                }

                results.push(it);
            }
            return results;
        }

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

        //#region Bindings
        $scope.shape = {};
        $scope.Tools = Enums.TOOLS;

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

            canvas = _syncer.getDrawer().getCanvas();

            canvas.addEventListener('touchstart', start ,false);
            canvas.addEventListener('mousedown', start, false);

            canvas.addEventListener('touchmove', move, false);
            canvas.addEventListener('mousemove', move, false);

            canvas.addEventListener('touchend', end, false);
            canvas.addEventListener('mouseup', end, false);
            //TODO: When the mouse leave, should it continue drawing when the pointer is inside the canvas?
            canvas.addEventListener('mouseleave', end, false);

            canvas.addEventListener('touchcancel', function () {
                _syncer.getDrawer().cancelDraw();
            }, false);

            resizeCanvas();

            window.addEventListener('resize', resizeCanvas);
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
