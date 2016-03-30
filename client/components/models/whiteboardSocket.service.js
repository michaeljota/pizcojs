(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('WhiteboardSocket', WhiteboardSocket);

  function WhiteboardSocket(socket) {
    var name = 'whiteboards';

    function create() {
      socket.emitEvent(name, 'create');
    }

    function redo(wbId) {
      socket.emitEvent(name, 'redo', wbId);
    }

    function undo(wbId) {
      socket.emitEvent(name, 'undo', wbId);
    }

    function onResynced(cb) {
      socket.onEvent(name, 'resynced', cb);
    }

    function emitResync(wbId) {
      socket.emitEvent(name, 'resync', wbId);
    }

    return {
      create,
      redo,
      undo,
      onResynced,
      emitResync
    }
  }
})();
