'use strict';

angular.module('tesisApp')
    .controller('SketchpadCtrl', function ($scope, $http, $stateParams, Enums, canvas, socket, classroomRenderer, whiteboardRenderer) {
      
        classroomRenderer.setId($stateParams.classroomId);
        
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
        };

        var _shapeId;
        
        
        /**
         * Creates a new point canvas related. 
         * 
         * @param event (description)
         * @returns point
         */
        function newPoint (event) {
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


        /**
         * Starts the drawing setting a new shape in the whiteboardRenderer.
         */
        function start () {
            whiteboardRenderer.newShape($scope.shape);
        };

        /**
         * Creates a new point at every move, and send it to the server using socket.
         * 
         * @param event (description)
         */
        function move (event) {
            event.preventDefault();
            if (_shapeId){
                socket.socket.emit('points:create', _shapeId, newPoint(event));
            }
        };

        
        /**
         * Finish the draw.
         */
        function end () {
            _shapeId = false;
        };

        var reset = function (){
            classroomRenderer.addWhiteboard();
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

            canvas.canvas.addEventListener('touchstart', start, false);
            canvas.canvas.addEventListener('mousedown', start, false);

            canvas.canvas.addEventListener('touchmove', move, true);
            canvas.canvas.addEventListener('mousemove', move, true);

            canvas.canvas.addEventListener('touchend', end);
            canvas.canvas.addEventListener('mouseup', end);
            //TODO: When the mouse leave, should it continue drawing when the pointer is inside the canvas?
            canvas.canvas.addEventListener('mouseleave', end);

            canvas.canvas.addEventListener('touchcancel', end);

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
        
        
        socket.socket.on('shape:created', function (shape) {
            console.log('created');
            _shapeId = shape._id;
        });

        socket.socket.on('crud:error', function (err) {
            console.log('Server error: '+ err);
        });
    });
