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

    function syncUpdates(array) {
      socket.syncUpdates(name, array);
    }

    return {
      create,
      enter,
      syncUpdates
    }
  }
})();
