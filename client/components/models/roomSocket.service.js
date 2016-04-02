(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('RoomSocket', RoomSocket);

  function RoomSocket(socket) {
    var name = 'rooms';

    function create(room, cb) {
      socket.emitEvent(name, 'create', room);
      socket.onEvent(name, 'create', cb);
    }

    function enter(room, cb) {
      socket.emitEvent(name, 'enter', room);
      socket.onEvent(name, 'entered', cb);
    }

    function emitColaborative(data) {
      socket.emitEvent(name, 'colaborative', data);
    }

    function onReset(cb) {
      socket.onEvent(name, 'reset', cb);
    }

    function syncUpdates(array) {
      socket.syncUpdates(name, array);
    }

    function addWhiteboard(roomId) {
      socket.emitEvent(name, 'addWhiteboard', roomId);
    }

    function onDownload(cb) {
      socket.onEvent(name, 'download', cb);
    }

    return {
      create,
      enter,
      emitColaborative,
      onReset,
      syncUpdates,
      addWhiteboard,
      onDownload
    }
  }
})();
