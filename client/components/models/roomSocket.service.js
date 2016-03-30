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

    function onColaborative(cb) {
      socket.onEvent(name, 'colaborative', cb);
    }

    function syncUpdates(array) {
      socket.syncUpdates(name, array);
    }

    return {
      create,
      enter,
      emitColaborative,
      onColaborative,
      syncUpdates
    }
  }
})();
