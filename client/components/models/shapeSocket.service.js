(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('ShapeSocket', ShapeSocket);

  function ShapeSocket(socket) {
    var name = 'shapes';

    function create(shape) {
      socket.emitEvent(name, 'create', shape);
    }

    function addPoint(point) {
      socket.emitEvent(name, 'addPoint', point);
    }

    function save(wbId, cb) {
      socket.emitEvent(name, 'save', wbId);
      socket.onEvent(name, 'saved', cb);
    }

    function onDraw(cb) {
      socket.onEvent(name, 'draw', cb);
    }

    return {
      create,
      addPoint,
      save,
      onDraw
    }
  }
})();
