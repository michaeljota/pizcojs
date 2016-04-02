(function(){
  'use strict';

  angular
    .module('pizcojs')
    .controller('SketchpadController', SketchpadController);

  function SketchpadController($http, $stateParams, $window, TOOLS, COLORS,
    canvas, RoomManager, whiteboardRenderer, Auth, ShapeSocket,
    WhiteboardSocket, RoomSocket, moment) {
    var vm = this;
    var timerResize;

    function delayedResize() {
      if(timerResize) {
        $window.clearTimeout(timerResize);
      }
      timerResize = $window.setTimeout(resizeCanvas, 100);
    }

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
      WhiteboardSocket.emitResync(RoomManager.getCurrentWhiteboard()._id);
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
      if(isOwner() || RoomManager.isColaborative()){
        _drawing = true;
        ShapeSocket.create(vm.shape);
      }
    }

    /**
     * Creates a new point at every move, and send it to the server using socket.
     *
     * @param event (description)
     */
    function move (event) {
      if (_drawing){
        event.preventDefault();
        ShapeSocket.addPoint(newPoint(event));
      }
    }

    /**
     * Finish the draw.
     */
    function end () {
      if(_drawing){
        _drawing = false;
        ShapeSocket.save(
          RoomManager.getCurrentWhiteboard()._id
        );
      }
    }

    function downloadCanvas() {
      var dataURL = canvas.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      var fileName = 'Clase:'+RoomManager.getCurrentRoom().title+'('+moment().format("MMM Do YY")+')'+RoomManager.getCurrentWhiteboard()._id+'.png';
      downloadLink.attr('href', dataURL);
      downloadLink.attr('download', fileName);
      downloadLink[0].click();
    }

    function reset() {
      RoomManager.addWhiteboard();
    }

    function undo() {
      WhiteboardSocket.undo(RoomManager.getCurrentWhiteboard()._id);
    }

    function redo() {
      WhiteboardSocket.redo(RoomManager.getCurrentWhiteboard()._id);
    }

    function setTool(tool) {
      vm.shape.shapeType = tool;
      if(tool === TOOLS.PENCIL || tool === TOOLS.LINE) {
        vm.shape.filled = false;
        vm.shape.stroked = true;
      }
    }

    function isOwner() {
      var user = Auth.getCurrentUser();
      return RoomManager.isOwner(user);
    }

    function setColaborative() {
      RoomManager.setColaborative(vm.colaborative);
    }

    function isShapeFilleable() {
      return (vm.shape.shapeType !== TOOLS.PENCIL) && (vm.shape.shapeType !== TOOLS.LINE);
    }

    vm.colaborative = RoomManager.getCurrentRoom().colaborative;

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
    vm.setTool = setTool;
    vm.isOwner = isOwner;
    vm.setColaborative = setColaborative;
    vm.isShapeFilleable = isShapeFilleable;

    canvas.canvas.addEventListener('touchstart', start, false);
    canvas.canvas.addEventListener('mousedown', start, false);

    canvas.canvas.addEventListener('touchmove', move, false);
    canvas.canvas.addEventListener('mousemove', move, false);

    canvas.canvas.addEventListener('touchend', end);
    canvas.canvas.addEventListener('mouseup', end);
    //TODO: When the mouse leave, should it continue drawing when the pointer is inside the canvas?
    canvas.canvas.addEventListener('mouseleave', end);

    canvas.canvas.addEventListener('touchcancel', end);

    $window.addEventListener('resize', delayedResize);
    delayedResize();

    RoomSocket.onReset(function(room) {
      vm.colaborative = room.colaborative;
    });

    RoomSocket.onDownload(downloadCanvas);
  }
})();
