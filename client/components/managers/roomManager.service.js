(function(){
  'use strict';

  angular
    .module('pizcojs')
    .factory('RoomManager', RoomManager);

  function RoomManager($http, $window, $q, Room, RoomSocket,
    WhiteboardSocket) {

    function error(err) {
      return $q.reject(err);
    }

    var _currentRoom;

    if ($window.sessionStorage.room) {
      setCurrentRoom(JSON.parse($window.sessionStorage.room));
    }

    function setCurrentWhiteboard(whiteboard) {
      _currentRoom.currentWhiteboard = whiteboard;
    }

    function getCurrentWhiteboard() {
      return _currentRoom.currentWhiteboard;
    }

    function setCurrentRoom (room) {
      delete $window.sessionStorage.room;
      if(room) {
        RoomSocket.enter(room);
        _currentRoom = room;
        $window.sessionStorage.room = JSON.stringify(_currentRoom);
        WhiteboardSocket.emitResync(getCurrentWhiteboard()._id);
      }
    }

    function getCurrentRoom () {
      return _currentRoom;
    }

    function create (room) {
      return Room
        .save(
          room,
          setCurrentRoom,
          error
        ).$promise;
    }

    function enter (room) {
      return Room
        .enter(
          room,
          setCurrentRoom,
          error
        )
        .$promise;
    }

    function addWhiteboard() {
      if(getCurrentRoom()) {
        RoomSocket.addWhiteboard(getCurrentRoom()._id);
      }
    }

    function isColaborative() {
      return getCurrentRoom() && getCurrentRoom().colaborative;
    }

    function isOwner(user) {
      return user._id === getCurrentRoom().owner._id;
    }

    //#region Socket functions.

    function setColaborative(colaborative, cb) {
      var data = {
        _id: getCurrentRoom()._id,
        colaborative: colaborative
      }
      RoomSocket.emitColaborative(data);
    }

    RoomSocket.onReset(setCurrentRoom);

    //#endregion

    return {
      create,
      enter,
      addWhiteboard,
      getCurrentRoom,
      getCurrentWhiteboard,
      setCurrentWhiteboard,
      isColaborative,
      setColaborative,
      isOwner
    }
  }
})();
