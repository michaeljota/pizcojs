(function(){
  'use strict';

  angular
    .module('pizcojs')
    .controller('SketchpadController', SketchpadController);

  function SketchpadController($http, $stateParams, $window, TOOLS, COLORS,
    canvas, socket, RoomManager) {
    var vm = this;

    function resizeCanvas() {
      var container = document.getElementById('canvasContainer');
      var wid = container.clientWidth;
      var hei = $window.innerHeight * 0.80;
      if(wid>hei){
        wid = hei;
      }else{
        hei = wid;
      }
      canvas.setSize(wid,hei);
      container.appendChild(canvas.canvas);
    }

    var _drawing;
    var downloadLink = angular.element('<a></a>');


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
    }


    /**
     * Starts the drawing setting a new shape.
     */
    function start () {
      _drawing = true;
      socket.socket.emit('shapes:create', vm.shape);
    }

    /**
     * Creates a new point at every move, and send it to the server using socket.
     *
     * @param event (description)
     */
    function move (event) {
      if (_drawing){
        event.preventDefault();
        socket.socket.emit('shapes:addPoint', newPoint(event));
      }
    }

    /**
     * Finish the draw.
     */
    function end () {
      _drawing = false;
      socket.socket.emit('shapes:save', RoomManager.getCurrentWhiteboardId());
    }


    function downloadCanvas() {
      var dataURL = canvas.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      var fileName = 'whiteboard-'+RoomManager.getCurrentWhiteboardId()+'.png';
      downloadLink.attr('href', dataURL);
      downloadLink.attr('download', fileName);
      downloadLink[0].click();
    }

    function reset() {
      downloadCanvas();
      RoomManager.addWhiteboard();
    }

    function undo() {
        // _syncer.undo();
    }

    function redo() {
        // _syncer.redo ();
    }

    function checkShape() {
      if(vm.shape.shapeType === TOOLS.PENCIL){
        vm.shape.Filled = false;
      }
      if((vm.shape.shapeType === TOOLS.PENCIL || vm.shape.shapeType === TOOLS.LINE) && vm.shape.filled){
        vm.shape.shapeType = TOOLS.RECTANGLE;
      }
    }

    function setTool(tool) {
      vm.shape.shapeType = tool;
    }

    //#region Bindings
    vm.shape = {
      shapeType  : TOOLS.PENCIL,
      lineColor  : COLORS.BLACK,
      lineWidth  : 1.5,
      lineCap    : 'round',
      fillColor  : COLORS.GREY,
      stroked    : true,
      filled     : false
    };
    vm.TOOLS = TOOLS;
    vm.reset = reset;
    vm.undo = undo;
    vm.redo = redo;
    vm.checkShape = checkShape;
    vm.setTool = setTool;

    canvas.canvas.addEventListener('touchstart', start, false);
    canvas.canvas.addEventListener('mousedown', start, false);

    canvas.canvas.addEventListener('touchmove', move, true);
    canvas.canvas.addEventListener('mousemove', move, true);

    canvas.canvas.addEventListener('touchend', end);
    canvas.canvas.addEventListener('mouseup', end);
    //TODO: When the mouse leave, should it continue drawing when the pointer is inside the canvas?
    canvas.canvas.addEventListener('mouseleave', end);

    canvas.canvas.addEventListener('touchcancel', end);

    $window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  }
})();
