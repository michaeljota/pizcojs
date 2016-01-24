'use strict';

angular.module('tesisApp')
  .controller('SketchpadCtrl', function ($scope, $http, Enums, canvas, whiteboardRenderer, socket) {


        var resizeCanvas = function () {
            var container = document.getElementById('canvasContainer');
            var wid = container.clientWidth;
            var hei = window.innerHeight * 0.80;
            if(wid>hei){
                wid = hei;
            }else{
                hei = wid;
            }
            canvas.setSize(wid,hei);
            container.appendChild(canvas.canvas);

            whiteboardRenderer.setWhiteboard('MVXe2HSwSIs5rrKm');
        };

        var _drawing;
        var _shapeId;

        var newPoint = function (event) {
            var point = (event.touches) ?
            {
                x: (event.touches[0].pageX - event.target.offsetLeft),
                y: (event.touches[0].pageY - event.target.offsetTop)
            } :
            {
                x: (event.pageX - event.target.offsetLeft),
                y: (event.pageY - event.target.offsetTop)
            };
            canvas.screenToCanvas(point);
            return point;
        };

        var start = function () {
            _drawing = true;
            socket.socket.emit('shape:create', 'MVXe2HSwSIs5rrKm', $scope.shape);
        };

        var move = function (event) {
            event.preventDefault();
            if (_drawing && _shapeId){
                socket.socket.emit('point:create', _shapeId, newPoint(event));
            }
        };

        var end = function () {
            _drawing = false;
            _shapeId = false;
        };

        var reset = function (){
           // _syncer.resetCanvas();
        };

        var undo = function () {
           // _syncer.undo();
        };

        var redo = function () {
           // _syncer.redo ();
        };

        //#region Bindings
        $scope.shape = {};
        $scope.tools = Enums.TOOLS;
        $scope.reset = reset();
        $scope.undo = undo();
        $scope.redo = redo();

        $scope.init = function () {
            $scope.shape = {
                shapeType  : Enums.TOOLS.PENCIL,
                lineColor  : Enums.COLORS.BLACK,
                lineWidth  : 3,
                lineCap    : 'round',
                fillColor  : Enums.COLORS.GREY,
                stroked    : true,
                filled     : false
            };

            canvas.canvas.addEventListener('touchstart', start ,false);
            canvas.canvas.addEventListener('mousedown', start, false);

            canvas.canvas.addEventListener('touchmove', move, false);
            canvas.canvas.addEventListener('mousemove', move, false);

            canvas.canvas.addEventListener('touchend', end, false);
            canvas.canvas.addEventListener('mouseup', end, false);
            //TODO: When the mouse leave, should it continue drawing when the pointer is inside the canvas?
            canvas.canvas.addEventListener('mouseleave', end, false);

            canvas.canvas.addEventListener('touchcancel', end, false);

            resizeCanvas();

            window.addEventListener('resize', resizeCanvas);

            socket.socket.on('shape:created', function (shape) {
                console.log('created');
                _shapeId = shape._id;
            });

            socket.socket.on('crud:error', function (err) {
                console.log('Server error: '+ err);
            });
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
